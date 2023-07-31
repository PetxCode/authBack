import { Request, Response } from "express";
import articleModel from "../model/articleModel";
import ratingModel from "../model/ratingModel";
import authorModel from "../model/authorModel";
import mongoose from "mongoose";

export const createRating = async (req: Request, res: Response) => {
  try {
    const { authorID, articleID } = req.params;
    const { rate } = req.body;

    const author = await authorModel.findById(authorID);
    const article: any = await articleModel.findById(articleID);

    const rating = await ratingModel.create({
      rate,
      ratedBy: author!._id,
      article,
    });

    article?.ratings?.push(new mongoose.Types.ObjectId(rating._id!));
    article!.save();

    res.status(201).json({
      message: "Rating created ",
      data: rating,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error ",
    });
  }
};

export const readRating = async (req: Request, res: Response) => {
  try {
    const { authorID, articleID } = req.params;
    const { rate } = req.body;

    const author = await authorModel.findById(authorID);
    const article: any = await articleModel.findById(articleID).populate({
      path: "ratings",
    });

    res.status(200).json({
      message: "show ratings ",
      data: article.ratings,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error ",
    });
  }
};

export const rateArticle = async (req: Request, res: Response) => {
  try {
    const { authorID, articleID } = req.params;
    const { rate } = req.body;

    const author = await authorModel.findById(authorID);

    const article: any = await articleModel.findById(articleID).populate({
      path: "ratings",
    });

    let totalRate = article.ratings.length;
    let totalScore = article.ratings
      .map((el: any) => {
        return el.rate;
      })

      .reduce((a: number, b: number) => {
        return a + b;
      });

    let myRate = totalScore / totalRate;

    const rated = await articleModel.findByIdAndUpdate(
      articleID,
      {
        rate: parseFloat(myRate.toFixed(2)),
      },
      { new: true },
    );

    res.status(200).json({
      message: "show ratings value ",
      data: rated,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error ",
      data: error.message,
    });
  }
};
