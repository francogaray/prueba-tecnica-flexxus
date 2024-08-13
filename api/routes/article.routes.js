import express from "express";
const { Router } = express;

import {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/articles.controllers.js";
import { validateArticle } from "../utils/validations.js";

const router = Router();

router.get("/",  getArticles);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticle);
router.patch("/:id", updateArticle);
router.post("/", validateArticle, createArticle);

export default router;
