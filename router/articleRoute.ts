import express from "express";
import {
  createArticle,
  getAllArticles,
  getAuthorArticles,
  getFriendArticles,
} from "../controller/articleController";
import upload from "../config/multer";

const router = express.Router();

router.route("/:authorID/create-article").post(upload, createArticle);
router.route("/:authorID/read-article").get(getAuthorArticles);
router.route("/read-all-article").get(getAllArticles);
router.route("/:authorID/read-friend-article").get(getFriendArticles);

export default router;
