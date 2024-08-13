export const login = (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        res.json({ token: "secretToken" });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
};
