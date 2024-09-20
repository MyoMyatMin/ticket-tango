import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
