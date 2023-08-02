import { Request, Response } from "express";
import authorModel from "../model/authorModel";
import articleModel from "../model/articleModel";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";

export const createArticle = async (req: any, res: Response) => {
  try {
    const { email, description, content, title } = req.body;
    const { authorID } = req.params;

    // const author: any = await authorModel.findOne({ email });
    const author: any = await authorModel.findById(authorID);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
    );

    const article = await articleModel.create({
      description,
      content,
      title,
      authorID: author._id,
      author,
      image: secure_url,
      imageID: public_id,
    });

    author?.articles.push(new mongoose.Types.ObjectId(article._id));

    author.save();

    res.status(201).json({
      message: "Article created",
      data: article,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error Found",
      data: error.message,
    });
  }
};

export const getAuthorArticles = async (req: any, res: Response) => {
  try {
    const { authorID } = req.params;

    const author: any = await authorModel.findById(authorID).populate({
      path: "articles",
      options: {
        sort: {
          createdAt: -1,
        },
      },
    });

    res.status(201).json({
      message: "Author's Article ",
      data: author,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error Found",
      data: error.message,
    });
  }
};

export const getAllArticles = async (req: any, res: Response) => {
  try {
    const author: any = await articleModel.find();

    res.status(201).json({
      message: "veiwing all Article",
      data: author,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error Found",
      data: error.message,
    });
  }
};

export const getFriendArticles = async (req: any, res: Response) => {
  try {
    const { authorID } = req.params;

    const authors = await authorModel.findById(authorID);
    const article = await articleModel.find();

    let data = article?.filter((el: any) =>
      authors?.friends!.includes(el.authorID),
    );

    res.status(201).json({
      message: "Author's Article ",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error Found",
      data: error.message,
    });
  }
};