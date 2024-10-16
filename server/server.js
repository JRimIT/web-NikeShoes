const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '12345', 
  database: 'Nike'  
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

// New route to fetch product details by ID
app.get('/products/:id', (req, res) => {
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

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//get category and pro message list
app.get('/products', (req, res) => {
  const { category, pro_message_list } = req.query;

  let query = 'SELECT * FROM products';
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
  }

  if (pro_message_list) {
    query = `SELECT * FROM products where pro_message_list LIKE ?`;
    queryParams.push(`%${pro_message_list}%`);
  }

  console.log('Executing query:', query);
  console.log('With parameters:', queryParams);

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Error fetching products' });
    }

    res.json({ totalCount: results.length, products: results });
  });
});


