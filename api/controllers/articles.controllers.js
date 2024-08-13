import Article from "../models/article.models.js";
import {
    validateArticle,
    validateArticleUpdate,
} from "../utils/validations.js";

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Obtener todos los articulos
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
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
/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Obtener un articulo por ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Article not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
export const getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findByPk(id);
        if (!article) {
            return res
                .status(404)
                .json({ error: `No se encuentran artículos con el ID: ${id}` });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Crear un nuevo artículo
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /articles/{id}:
 *   patch:
 *     summary: Actualizar un artículo
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Article not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Eliminar un artículo
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Article not found
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error'
 */
export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) {
            return res.status(404).json({ error: "Articulo no encontrado" });
        }

        await article.update({ isActive: false });
        // Aquí se puede hacer la desactivación cambiando el valor de la propiedad del objeto

        // También desde el modelo se le añadió un "Soft delete" para asegurarnos de quitarlo de la base de datos pero si que no se incluyan en las otras consultas
        await article.destroy();
        res.json({ message: "Articulo deactivatado", article });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
