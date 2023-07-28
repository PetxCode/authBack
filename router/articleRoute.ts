import express from "express";
import {
  createArticle,
  getAuthorArticles,
} from "../controller/articleController";
import upload from "../config/multer";

const router = express.Router();

router.route("/:authorID/create-article").post(upload, createArticle);
router.route("/:authorID/read-article").get(getAuthorArticles);

export default router;
