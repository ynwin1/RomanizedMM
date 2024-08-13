import express from 'express';

const router = express.Router();

router.post("/login",  async (req, res) => {
    const adminUserName = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const { username, password } = req.body;
    if (username === adminUserName && password === adminPassword) {
        return res.status(200).json({ message: "Login successful" });
    } else if (username === adminUserName) {
        return res.status(401).json({ message: "Invalid password" });
    } else if (password === adminPassword) {
        return res.status(401).json({ message: "Invalid username" });
    }
    return res.status(401).json({ message: "Invalid credentials" });
});

export default router;