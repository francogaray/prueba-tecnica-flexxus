import Article from "../models/article.models.js";
import { validateArticle, validateArticleUpdate } from "../utils/validations.js";

export const getArticles = async (req, res) => {
    const { name, isActive } = req.query;
    try {
        let articles = await Article.findAll();
        if (name) {
            articles = articles.filter((article) =>
                article.name.includes(name)
            );
        }
        if (isActive !== undefined) {
            articles = articles.filter(
                (article) => article.isActive === (isActive === "true")
            );
        }
        if (articles.length != 0) {
            res.json({ articles });
        } else {
            res.json({ message: "No se encontraron coincidencias" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({ error: `No se encuentran artículos con el ID: ${id}` });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createArticle = async (req, res) => {
    const { name, brand } = req.body;
    try {
        const newArticle = await Article.create({
            name,
            brand,
        });
        res.status(201).json(newArticle);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ error: "Articulo no encontrado" });
        }

        const updatedFields = validateArticleUpdate(req.body);
        await article.update(updatedFields);
        res.json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ error: "Articulo no encontrado" });
        }

        await article.update({ isActive: false })
        // Aquí se puede hacer la desactivación cambiando el valor de la propiedad del objeto

        // También desde el modelo se le añadió un "Soft delete" para asegurarnos de quitarlo de la base de datos pero si que no se incluyan en las otras consultas
        await article.destroy();
        res.json({ message: "Articulo deactivatado", article });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
