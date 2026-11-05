import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new ApiError(400, "User not found")
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      "Error occured while generating Access and Refresh Token."
    )
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body

  if (
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  })

  if (existedUser) {
    throw new ApiError(409, "User with same email/username exists.")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverLocalPath = req.files?.coverImage[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing.")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  let coverImage = ""

  if (coverLocalPath) {
    coverImage = await uploadOnCloudinary(coverLocalPath)
  }

  try {
    const user = await User.create({
      fullName,
      avatar: avatar?.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username?.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    )

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while register a user")
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"))
  } catch (error) {
    console.log("User Creation failed!!!")

    if (avatar) {
      await deleteFromCloudinary(avatar.public_id)
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id)
    }

    throw new ApiError(
      500,
      "Something went wrong while register a user and images deleted"
    )
  }
})

const loginUser = asyncHandler(async (req, res) => {
  console.log(1)
  const { email, username, password } = req.body
  console.log(2)

  if (!email && !username) {
    throw new ApiError(400, "username or email is required")
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token is required!!!")
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, "Invalid refresh Token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh Token does not match")
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id)

    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      )
  } catch (err) {
    throw new ApiError(401, "Error occured while decoding the token.")
  }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body

  const user = await User.findById(req.user._id)
  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordValid){
    throw new ApiError(401, "Old Password is incorrect.")
  }

  user.password = newPassword
  await user.save({validateBeforeSave: false})

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
  return res.status(200).json(new ApiResponse (200, req.user, "Current User details"))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
  const {fullname, email} = req.body

  if(!fullname || !email){
    throw new ApiError(400, "Fullname and email are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        fullname,
        email
      }
    },
    {new: true}
  ).select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, user, "Account Details Updated Successfully")) 
})

export { registerUser, loginUser, refreshAccessToken, logoutUser }
