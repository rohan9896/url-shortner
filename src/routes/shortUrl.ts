import express from "express";
import {
  createUrl,
  deleteUrl,
  getAllUrl,
  getUrl,
} from "../controllers/shortUrl";

const router = express.Router();

router.post("/short-urls", createUrl);
router.get("/short-urls", getAllUrl);
router.get("/short-urls/:id", getUrl);
router.delete("/short-urls/:id", deleteUrl);

export default router;
