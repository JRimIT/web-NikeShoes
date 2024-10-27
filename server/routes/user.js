const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/api/userinfo', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: "No token provided" })

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const sql = `
            SELECT *
            FROM Users
            WHERE user_id = ?;
        `;
        const [rows] = await db.promise().query(sql, [userId]);

        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

        res.json(rows[0]);


    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
})

module.exports = router;