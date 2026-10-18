import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body

  // console.log(req.body)
  console.log(1)
  if (
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  console.log(2)
  //   const existedUser = await User.findOne({
  //     $or: [{ username }, { email }],
  //   })

  //   if (existedUser) {
  //     throw new ApiError(409, "User with same email/username exists.")
  //   }

  // console.warn(req.files)

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverLocalPath = req.files?.coverImage[0]?.path

  console.log(3)
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing.")
  }

  console.log(4)
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  let coverImage = ""

  console.log(5)
  if (coverLocalPath) {
    coverImage = await uploadOnCloudinary(coverLocalPath)
    console.log("coverImage", coverImage)
  }

  console.log(6)
  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username?.toLowerCase(),
  })

  console.log(7)

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while register a user")
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"))
})

export { registerUser }
