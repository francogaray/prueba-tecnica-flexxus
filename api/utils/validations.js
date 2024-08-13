export const validateArticle = (req, res, next) => {
    const { name, brand } = req.body;
    if (!name || !brand || brand.length === 0) {
        return res.status(400).json({ error: "El nombre y la Marca son requeridos " });
    }
    next();
};

export const validateArticleUpdate = (data) => {
    const updatedFields = {};
    if (data.name) updatedFields.name = data.name;
    if (data.brand) updatedFields.brand = data.brand;
    if (data.isActive !== undefined) updatedFields.isActive = data.isActive;
    return updatedFields;
};
