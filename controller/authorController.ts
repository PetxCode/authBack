import { Request, Response } from "express";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary";
import authorModel from "../model/authorModel";
import mongoose from "mongoose";

export const createAuthor = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path,
    );

    const user: any = await authorModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    user.friends?.push(new mongoose.Types.ObjectId(user!._id));
    user.save();

    res.status(201).json({
      message: "creating author",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error creating author",
      data: error.message,
    });
  }
};

export const findAuthors = async (req: any, res: Response) => {
  try {
    const user = await authorModel.find().sort({ createdAt: -1 });

    res.status(201).json({
      message: "find authors",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding author",
    });
  }
};

export const findOneAuthor = async (req: any, res: Response) => {
  try {
    const { authorID } = req.params;
    const user = await authorModel.findById(authorID);

    res.status(201).json({
      message: "find one authors",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding author",
    });
  }
};

export const updateOneAuthor = async (req: any, res: Response) => {
  try {
    const { name } = req.body;
    const { authorID } = req.params;

    const user = await authorModel.findByIdAndUpdate(
      authorID,
      { name },
      { new: true },
    );

    res.status(201).json({
      message: "find authors",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding author",
    });
  }
};

export const deleteOneAuthor = async (req: any, res: Response) => {
  try {
    const { authorID } = req.params;

    const user = await authorModel.findByIdAndDelete({ id: authorID });

    res.status(201).json({
      message: "find authors",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error finding author",
    });
  }
};

export const signinAuthor = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authorModel.findOne({ email });

    if (user) {
      const checkPassword = await bcrypt.compare(password, user?.password!);

      if (checkPassword) {
        return res.status(201).json({
          message: "user sign in",
          data: user._id,
        });
      } else {
        res.status(404).json({ message: "password not correct" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error finding author",
    });
  }
};
