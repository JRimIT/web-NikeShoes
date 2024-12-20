const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../controller/emailController');

router.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, category, stock, size, description } = req.body;

    try {
        // SQL query to update the product
        const sql = `
      UPDATE Products 
      SET name = ?, price = ?, category = ?, stock = ?, size = ?, description = ?
      WHERE product_id = ?
    `;

        // Execute the update query
        const [result] = await db.promise().query(sql, [
            name,
            price,
            category,
            stock,
            size,
            description,
            id
        ]);

        // Check if the product was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Return success response
        res.json({ message: "Product updated successfully" });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
});

// New route to fetch product details by ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    const query = 'SELECT * FROM products WHERE product_id = ?'; // Use product_id instead of id
    db.query(query, [productId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching product details' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(results[0]); // Return the first product
    });
});

router.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM products WHERE product_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});



router.post("/api/products", async (req, res) => {
    const {
        name,
        price,
        category,
        stock,
        size,
        color,
        list_color,
        description,
        primary_image,
        pro_message_list
    } = req.body;

    try {
        const sql = `
      INSERT INTO Products (
        name, price, category, stock, size, color, list_color, description, primary_image, pro_message_list
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

        const [rows] = await db.promise().query(sql, [name, price, category, stock, size, color, list_color, description, primary_image, pro_message_list])
        res.json({
            message: "Product Created successfully!",
        })
    } catch (error) {
        console.log("Error Create product: ", error);
        res.json(error)

    }

})

router.get("/api/allProducts", async (req, res) => {
    const sql = `
    SELECT * FROM products;
  `

    try {
        const [rows] = await db.promise().query(sql)
        const total_Product = rows.length
        res.json({ total_Product: total_Product, products: rows })
    } catch (error) {
        console.log("Can not get all product: ", error);
        res.json(error);

    }

    // db.query(sql, (err, data) => {
    //   if (err) {
    //     return res.json(err);
    //   }
    //   return res.json(data);
    // });
})

// admin
router.get("/api/allAdmin", (req, res) => {
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

router.get("/api/allInvoices", (req, res) => {
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
router.get("/api/orders", async (req, res) => {
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
        // console.log("Tao Row: ", rows);

        // Send the result back as JSON
        return res.json(rows);
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({ error: "Failed to fetch order details" });
    }

});
// -------- user

router.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM Users 
        WHERE user_id = ?;
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    });
});

router.get('/api/order_Of_user', async (req, res) => {
    const { id } = req.query;
    const sql = `
        SELECT 
            o.order_id,
            DATE_FORMAT(o.order_date, '%d-%m-%Y') AS order_date,
            o.order_status,
            o.total_amount,
            p.payment_method,
            p.payment_status,
            p.amount AS payment_amount,
            oi.product_id,
            pr.name AS product_name,
            oi.quantity,
            oi.size,
            oi.color,
            pr.price AS product_price
        FROM 
            Orders o
        JOIN 
            Payments p ON o.order_id = p.order_id
        JOIN 
            Order_Items oi ON o.order_id = oi.order_id
        JOIN 
            Products pr ON oi.product_id = pr.product_id
        LEFT JOIN 
            User_Addresses ua ON o.user_id = ua.user_id
        WHERE 
            o.user_id = ?
        ORDER BY 
            o.order_date DESC;
    `

    try {
        const [rows] = await db.promise().query(sql, [id]);
        return res.json(rows);
    } catch (error) {
        res.status(401).json({ message: 'error get order by user_id' });
    }
})


router.get('/api/user', (req, res) => {
    const { id } = req.query;
    const sql = `
        SELECT *
        FROM Users
        WHERE user_id = ?;
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);  // Log the error for debugging
            return res.status(500).json({ message: "An error occurred", error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(result);
    });
});


router.get('/api/allUser', async (req, res) => {
    const sql = `
        SELECT
            u.user_id,
            u.username,
            u.user_image,
            u.email,
            u.phone,
            u.role_id,
            DATE_FORMAT(u.created_at, '%d-%m-%Y') AS created_at,
            a.address_line,
            a.city,
            a.state,
            a.country,
            a.postal_code
        FROM
            Users u
        LEFT JOIN
            User_Addresses a ON u.user_id = a.user_id
        WHERE
            u.role_id = 1;
    `
    try {
        const [rows] = await db.promise().query(sql);
        return res.json(rows);
    } catch (error) {
        res.status(401).json({ message: 'error get user by id' });
    }
})



router.post("/api/user", async (req, res) => {
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


router.delete("/api/orders/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM Orders WHERE order_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result);
    });
});


router.get("/api/revenue-per-month", async (req, res) => {
    const year = req.query.year || new Date().getFullYear();

    const sql = `
   SELECT
      MONTH(o.order_date) AS month,
      YEAR(o.order_date) AS year,
      SUM(p.amount) AS total_amount
    FROM
      Orders o
    JOIN
      Payments p ON o.order_id = p.order_id
    JOIN
      Order_Items oi ON o.order_id = oi.order_id
    JOIN
      Products pr ON oi.product_id = pr.product_id
    WHERE
      YEAR(o.order_date) = ?  
    GROUP BY
      YEAR(o.order_date), MONTH(o.order_date)
    ORDER BY
      YEAR(o.order_date), MONTH(o.order_date);
  `
    db.query(sql, [year], (err, result) => {
        if (err) {
            return res.json(err);
        }
        return res.json(result)
    })

    // try {
    //   const [rows] = await db.promise().query(sql, [year]);  // Pass the year dynamically
    //   res.json(rows);  // Send the result back to the client
    // } catch (error) {
    //   console.error('Error fetching revenue data:', error);
    //   res.status(500).json({ error: 'Failed to fetch revenue data' });
    // }

})

router.get("/api/most-popular-product", async (req, res) => {
    const year = req.query.year || new Date().getFullYear;
    const month = req.query.month || new Date().getMonth;

    const sql = `
      SELECT
          p.product_id,
          p.name,
          COUNT(oi.product_id) AS total_orders
      FROM
          Order_Items oi
      JOIN
          Products p ON oi.product_id = p.product_id
      JOIN
          Orders o ON oi.order_id = o.order_id
      WHERE
          MONTH(o.order_date) = ?  -- Replace with desired month (October in this case)
          AND YEAR(o.order_date) = ?  -- Replace with desired year
      GROUP BY
          p.product_id, p.name
      ORDER BY
          total_orders DESC
      LIMIT 5;  -- Get the top 5 products

  `

    // db.query(sql, [month, year], (err, results) => {
    //   if (err) {
    //     console.log("error get 5 popular products: ", err);
    //     res.json(err)
    //   }
    //   res.json(results)
    // })

    try {
        const [rows] = await db.promise().query(sql, [month, year]);
        res.json(rows);
    } catch (error) {
        console.log("error get 5 popular products: ", error);
        res.json(error)
    }

})

router.get('/api/user/count', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT count(*) as total_users From Users');
        const totalUsers = rows[0].total_users;
        res.json(totalUsers)

    } catch (error) {
        console.error('Error retrieving user count:', error);
        res.status(500).json({ message: 'Database error, could not retrieve user count' });
    }
})

router.get('/api/user/countNewUser', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT COUNT(*) AS new_users_count
            FROM Users
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);`)
        res.json(rows)

    } catch (error) {
        console.error('Error retrieving user count:', error);
        res.status(500).json({ message: 'Database error, could not retrieve user count' });
    }
})


router.get('/api/transaction', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            select 
                bt.transaction_id,
                us.username,
                DATE_FORMAT(bt.transaction_date, '%d-%m-%Y') AS transaction_date,
                bt.amount,
                bt.status
            From 
                bank_transactions bt
            Join
                Orders o ON bt.order_id = o.order_id
            Join
                Users us ON us.user_id = o.user_id
            where
                bt.status = "success"
            ORDER BY transaction_date DESC
            LIMIT 10;
            `)

        res.json(rows)
    } catch (error) {
        console.log('Error retrieving transactions: ', error);
        res.status(500).json({ message: "Database error, could not retrieve transactions" })

    }
})


router.get('/api/count_transaction', async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT 
                COUNT(bt.transaction_id) AS total_transactions
            FROM 
                bank_transactions bt
            WHERE 
                bt.status = "success";
            `)
        res.json(rows)
    } catch (error) {
        console.log('Error retrieving count transactions: ', error);
        res.status(500).json({ message: "Database error, could not retrieve transactions" })
    }
})

router.get('/api/blackList', async (req, res) => {
    const sql = `
        SELECT
            u.user_id,
            u.username,
            u.user_image,
            u.email,
            b.reason,
            DATE_FORMAT(b.added_at, '%d-%m-%Y') AS added_at,
            DATE_FORMAT(b.removed_at, '%d-%m-%Y') AS removed_at
        FROM
            blacklist b
        JOIN
            users u ON b.user_id = u.user_id;
    `
    try {
        const [rows] = await db.promise().query(sql)
        res.json(rows)

    } catch (error) {
        console.log('Error retrieving all blackList: ', error);
        res.status(500).json({ message: "Database error, could not retrieve all blackList!" })
    }
})

router.get('/api/get_user_blacklist', async (req, res) => {
    const { id } = req.query;
    const sql = `
        SELECT
            u.user_id,
            u.username,
            u.user_image,
            u.email,
            b.reason,
            DATE_FORMAT(b.added_at, '%d-%m-%Y') AS added_at,
            DATE_FORMAT(b.removed_at, '%d-%m-%Y') AS removed_at
        FROM
            blacklist b
        JOIN
            users u ON b.user_id = u.user_id
        WHERE 
            u.user_id = ?
    `;
    try {
        const [rows] = await db.promise().query(sql, [id]);
        res.json(rows);
    } catch (error) {
        console.log('Error retrieving user from blackList: ', error);
        res.status(500).json({ message: "Database error, could not retrieve user from blackList!" });
    }
});

router.delete('/api/blacklist', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "User ID is required to delete from blacklist" });
    }

    const sql = `
        DELETE FROM blacklist
        WHERE user_id = ?;
    `;

    try {
        const [result] = await db.promise().query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found in blacklist" });
        }
        res.json({ message: "User successfully removed from blacklist" });
    } catch (error) {
        console.log("Error removing user from blacklist: ", error);
        res.status(500).json({ message: "Database error, could not remove user from blacklist!" });
    }
});

// review
router.delete("/api/reviews/:review_id", async (req, res) => {
    const { review_id } = req.params;

    try {
        const [result] = await db.promise().execute(
            "DELETE FROM reviews WHERE review_id = ?",
            [review_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Review không tồn tại." });
        }

        res.status(200).json({ message: "Xoá review thành công!" });
    } catch (error) {
        console.error("Lỗi khi xoá review:", error);
        res.status(500).json({ message: "Lỗi server khi xoá review." });
    }
});

router.delete('/api/reviews/user/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const sql = `DELETE FROM reviews WHERE user_id = ?`;

    try {
        const [result] = await db.promise().query(sql, [user_id]);
        res.json({ message: `Deleted ${result.affectedRows} reviews for user_id ${user_id}.` });
    } catch (error) {
        console.error("Error deleting reviews:", error);
        res.status(500).json({ message: "Failed to delete reviews." });
    }
});

router.post("/api/blacklist", async (req, res) => {
    const { user_id, reason } = req.body;
    try {
        await db.promise().query(
            "INSERT INTO blacklist (user_id, reason) VALUES (?, ?)",
            [user_id, reason]
        );
        res.status(200).json({ message: "Người dùng đã được thêm vào blacklist!" });
    } catch (error) {
        console.error("Lỗi khi thêm vào blacklist:", error);
        res.status(500).json({ message: "Lỗi server khi thêm vào blacklist." });
    }
});

router.post("/email/sendEmail", sendEmail);

module.exports = router;