// server/routes/products.js
const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();

// Route để tìm kiếm sản phẩm theo tên hoặc category
router.get('/', (req, res) => {
  const { category, pro_message_list } = req.query;
  let query;
  const queryParams = [];

  if (category) {
    if (category.includes('Men')) {
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
  }

  if (pro_message_list) {
    // Nếu có điều kiện tìm theo pro_message_list
    query = `SELECT * FROM products WHERE pro_message_list LIKE ?`;
    queryParams.push(`%${pro_message_list}%`);
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ message: 'Error fetching products' });
    }

    const totalCount = results.length;
    res.json({ totalCount, products: results });
  });
});

// Route để tìm kiếm sản phẩm theo name, category, và pro_message_list
router.get('/search', (req, res) => {
  const searchTerm = req.query.term; // Từ khóa tìm kiếm từ query params
  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  // Sử dụng LIKE để tìm kiếm mờ (fuzzy search) trên cả name, category và pro_message_list
  const query = `
    SELECT * FROM products
    WHERE name LIKE ? OR category LIKE ? OR pro_message_list LIKE ?
  `;
  const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.json({ products: results, totalCount: results.length });
  });
});

// Route để tìm gợi ý (suggestion) khi nhập từ khóa
router.get('/suggestions', (req, res) => {
  const searchTerm = req.query.term;

  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  // Sử dụng câu truy vấn để lấy id, name, price và image
  const query = `
    SELECT DISTINCT product_id AS id, name, price, primary_image AS image
    FROM products
    WHERE name LIKE ? OR category LIKE ? LIMIT 5
  `;
  const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching suggestions' });
    }

    // Map lại kết quả để trả về id, name, price và image
    const suggestions = results.map((result) => ({
      id: result.id,      // ID sản phẩm
      name: result.name,  // Tên sản phẩm
      price: result.price,  // Giá sản phẩm
      image: result.image  // Ảnh sản phẩm
    }));

    res.json({ suggestions });
  });
});


// Route để tìm sản phẩm theo category và searchTerm, bao gồm pro_message_list
router.get('/products', (req, res) => {
  const { category, searchTerm } = req.query;

  let query = 'SELECT * FROM products WHERE 1=1';
  const queryParams = [];

  if (category) {
    query += ' AND category = ?';
    queryParams.push(category);
  }

  if (searchTerm) {
    query += ' AND (name LIKE ? OR category LIKE ? OR pro_message_list LIKE ?)';
    queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`);
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.json({ products: results, totalCount: results.length });
  });
});

// Route để lấy 8 sản phẩm "Best Seller"
router.get('/best-sellers', (req, res) => {
  const query = `
    SELECT product_id AS id, name, price, primary_image AS image
    FROM products
    WHERE pro_message_list LIKE '%Bestseller%'
    LIMIT 8
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching Best Seller products' });
    }

    res.json({ products: results });
  });
});


// Route để lấy thông tin chi tiết sản phẩm theo ID
router.get('/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM products WHERE product_id = ?'; // product_id là tên cột đúng
  db.query(query, [productId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching product details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(results[0]); // Trả về sản phẩm đầu tiên tìm thấy
  });
});

module.exports = router;
