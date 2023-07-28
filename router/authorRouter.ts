import express from "express";
import {
  signinAuthor,
  createAuthor,
  deleteOneAuthor,
  findAuthors,
  findOneAuthor,
  updateOneAuthor,
} from "../controller/authorController";
import upload from "../config/multer";

const router = express.Router();

router.route("/get-authors").get(findAuthors);
router.route("/register-authors").post(upload, createAuthor);
router.route("/signin-authors").post(signinAuthor);

router.route("/:authorID/get-one-author").get(findOneAuthor);
router.route("/:authorID/update-one-author").patch(updateOneAuthor);
router.route("/:authorID/delete-one-author").delete(deleteOneAuthor);

export default router;
