const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "02111109",
  database: "Nike",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

app.get("/products", (req, res) => {
  const category = req.query.category;
  let query;
  const queryParams = [];

  if (category) {
    if (category.includes("Men")) {
      // Nếu category có chứa "Men", đảm bảo không lấy Women's products
      query = `
        SELECT * 
        FROM products 
        WHERE category LIKE ? 
        AND category NOT LIKE '%Women%'`;
      queryParams.push(`%${category}%`);
    } else {
      // Nếu không phải "Men", lấy sản phẩm theo category bình thường
      query = `
        SELECT * 
        FROM products 
        WHERE category LIKE ?`;
      queryParams.push(`%${category}%`);
    }
  } else {
    // Trả về tất cả sản phẩm liên quan đến Men nếu không có category trong query
    query =
      "SELECT * FROM products WHERE category LIKE ? AND category NOT LIKE ?";
    queryParams.push("%Men%", "%Women%");
  }

  console.log("Executing query:", query);
  console.log("With parameters:", queryParams);

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ message: "Error fetching products" });
    }

    const totalCount = results.length;
    res.json({ totalCount, products: results });
  });
});

// New route to fetch product details by ID
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;

  const query = "SELECT * FROM products WHERE product_id = ?"; // Use product_id instead of id
  db.query(query, [productId], (error, results) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching product details" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(results[0]); // Return the first product
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
