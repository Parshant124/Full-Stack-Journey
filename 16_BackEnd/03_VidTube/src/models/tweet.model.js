import mongoose, { mongo, Schema } from "mongoose"

const tweetSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      maxLength: [100, "Your tweet is exceeding the length limit."],
    },
  },
  {
    timestamps: true,
  }
)

const Tweet = mongoose.model("Tweet", tweetSchema)
