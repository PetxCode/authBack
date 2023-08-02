import { Request, Response } from "express";
import mongoose from "mongoose";
import authorModel from "../model/authorModel";

export const makeRequest = async (req: Request, res: Response) => {
  try {
    const { authorID, friendID } = req.params;

    const author: any = await authorModel.findById(authorID);
    const friend: any = await authorModel.findById(friendID);

    if (author && friend) {
      friend!.request.push(new mongoose.Types.ObjectId(authorID));
      friend.save();

      return res.status(200).json({
        message: "Your request has been sent",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const { authorID, friendID } = req.params;

    const author: any = await authorModel.findById(authorID);
    const friend: any = await authorModel.findById(friendID);

    if (author && friend) {
      friend!.request.pull(new mongoose.Types.ObjectId(authorID));
      friend.save();

      return res.status(200).json({
        message: "delete request has been sent",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const viewRequest = async (req: Request, res: Response) => {
  try {
    const { authorID, friendID } = req.params;

    const author: any = await authorModel.findById(authorID);

    if (author) {
      const data = await authorModel.findById(authorID).populate({
        path: "request",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      });

      return res.status(200).json({
        message: "viewing request",
        data,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
