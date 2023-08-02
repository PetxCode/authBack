import mongoose from "mongoose";
import { iAuthorData } from "../config/interface";

const authorModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      toLowercase: true,
    },

    password: {
      type: String,
    },

    avatar: {
      type: String,
    },

    avatarID: {
      type: String,
    },

    articles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "articles",
      },
    ],

    friends: {
      type: Array<String>,
    },

    request: {
      type: Array<String>,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iAuthorData>("authors", authorModel);
