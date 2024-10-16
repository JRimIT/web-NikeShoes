import express from "express";
import mysql from "mysql2";
import cors from "cors";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2004",
    database: "nike",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/api/allAdmin", (req, res) => {
    const sql = `
        SELECT Users.user_id, Users.user_image, Users.username, Users.email, Users.phone, Roles.role_name
        From Users
        Join Roles on Users.role_id = Roles.role_id
        WHERE Roles.role_name = 'admin'
    
    `;
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.get("/api/allInvoices", (req, res) => {
    const sql = `
       SELECT Orders.order_id, Orders.total_amount, Orders.order_status, Orders.shipping_id, Orders.cart_id,
               Users.username, Users.email, Users.phone,
               Shipping_Methods.method_name AS shipping_method, Shipping_Methods.cost AS shipping_cost
              

        FROM Orders
        JOIN Users ON Orders.user_id = Users.user_id
        LEFT JOIN Shipping_Methods ON Orders.shipping_id = Shipping_Methods.shipping_id
       
    `;

    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

///
app.get("/api/orders", async (req, res) => {
    const { order_id } = req.query; ///api/orders?order_id=${order_id}
    // const { order_id } = req.params; when using api/orders/:order_id/products

    const sql = `
        SELECT
        oi.order_item_id,
        oi.quantity,
        oi.price,
        oi.color,
        oi.size,
        p.name,
        p.primary_image
      FROM Order_Items oi
      JOIN Products p ON oi.product_id = p.product_id
      WHERE oi.order_id = ?
       
    `;


    // db.query(sql, [order_id], (err, data) => {
    //     if (err) {
    //         return res.json(err);
    //     }
    //     // console.log(data);
    //     return res.json(data);
    // });

    try {
        // Using async/await for querying the database
        const [rows] = await db.promise().query(sql, [order_id]);
        //row = data 
        // Log order details for debugging
        console.log("Tao Row: ", rows);

        // Send the result back as JSON
        return res.json(rows);
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({ error: "Failed to fetch order details" });
    }

});

app.post("/api/user", async (req, res) => {
    const {
        username,
        user_image,
        email,
        password,
        phone,
        role_id,
        address_line,
        city,
        state,
        country,
    } = req.body;

    try {
        // Start the transaction
        await db.promise().beginTransaction();

        // Check if the email already exists
        const userCheckQuery = "SELECT email FROM Users WHERE email = ?";
        const [existingUser] = await db.promise().query(userCheckQuery, [email]);

        if (existingUser.length > 0) {
            await db.promise().rollback();
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the Users table
        const userSql = `
            INSERT INTO Users (username, user_image, email, password, phone, role_id) VALUES (?,?,?,?,?,?)
        `;
        const [userResult] = await db.promise().query(userSql, [
            username, user_image, email, hashedPassword, phone, role_id,
        ]);

        const userId = userResult.insertId; // Get the inserted user ID

        // Insert the user's address into the User_Addresses table
        const addressSql = `
            INSERT INTO User_Addresses (user_id, address_line, city, state, country)
            VALUES (?, ?, ?, ?, ?)
        `;
        await db.promise().query(addressSql, [
            userId, address_line, city, state, country,
        ]);

        // Commit the transaction
        await db.promise().commit();

        // Send success response
        res.status(201).json({
            message: "User and address created successfully",
            userId: userId,
        });
    } catch (error) {
        // Roll back the transaction in case of an error
        await db.promise().rollback();
        console.error("Error creating user and address:", error);
        return res.status(500).json({ error: "Server error" });
    }
});


app.delete("/api/orders/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM Orders WHERE order_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});

app;

app.listen(8802, () => {
    console.log("Connect to backend1");
});
