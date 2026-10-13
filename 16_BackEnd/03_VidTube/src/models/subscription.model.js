import mongoose, { Schema } from "mongoose"

const subsSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
)

const Subscription = mongoose.model("Subscription", subsSchema)
