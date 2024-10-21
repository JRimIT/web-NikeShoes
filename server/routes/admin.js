const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();


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

module.exports = router;