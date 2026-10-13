import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String, //URL
      required: true,
    },
    coverImage: {
      type: String, //URL
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [{
      type: Schema.Types.ObjectId,
      ref: "Video",
    }],
  },
  { timestamps: true }
)

export const User = mongoose.model("User", userSchema)
