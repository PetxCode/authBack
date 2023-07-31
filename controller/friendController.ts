import { Request, Response } from "express";
import mongoose from "mongoose";
import authorModel from "../model/authorModel";

export const beFriend = async (req: Request, res: Response) => {
  try {
    const { authorID, friendID } = req.params;

    const author: any = await authorModel.findById(authorID);
    const friend: any = await authorModel.findById(friendID);

    if (author && friend) {
      await author.friends?.push(new mongoose.Types.ObjectId(friendID!));
      author.save();
      await friend.friends?.push(new mongoose.Types.ObjectId(authorID!));
      friend.save();

      return res.status(201).json({
        message: "you are now friends",
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Friend",
    });
  }
};

export const unFriend = async (req: Request, res: Response) => {
  try {
    const { authorID, friendID } = req.params;

    const author: any = await authorModel.findById(authorID);
    const friend: any = await authorModel.findById(friendID);

    if (author && friend) {
      await author.friends?.pull(new mongoose.Types.ObjectId(friendID!));
      author.save();
      await friend.friends?.pull(new mongoose.Types.ObjectId(authorID!));
      friend.save();

      return res.status(201).json({
        message: "you are no longer friends",
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating Friend",
    });
  }
};
