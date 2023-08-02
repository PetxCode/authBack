import express from "express";
import {
  deleteRequest,
  makeRequest,
  viewRequest,
} from "../controller/requestController";

const router = express.Router();

router.route("/:authorID/:friendID/make-request").post(makeRequest);
router.route("/:authorID/:friendID/delete-request").post(deleteRequest);
router.route("/:authorID/view-request").get(viewRequest);

export default router;
