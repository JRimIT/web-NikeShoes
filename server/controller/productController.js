// productController.js
const db = require("../db");

// Function get products
const getProducts = (req, res) => {
  const category = req.query.category;
  let query;
  const queryParams = [];

  if (category) {
    if (category.includes("Men")) {
      query = `
        SELECT * 
        FROM products 
        WHERE category LIKE ? 
        AND category NOT LIKE '%Women%'`;
      queryParams.push(`%${category}%`);
    } else {
      query = `
        SELECT * 
        FROM products 
        WHERE category LIKE ?`;
      queryParams.push(`%${category}%`);
    }
  } else {
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
};

// Get product by ID
const getProductById = (req, res) => {
  const productId = req.params.id;

  const query = "SELECT * FROM products WHERE product_id = ?";
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
};

module.exports = { getProducts, getProductById };
