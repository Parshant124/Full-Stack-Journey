import mongoose, { Schema } from "mongoose"

const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

const Playlist = mongoose.model("Playlist", playlistSchema)
