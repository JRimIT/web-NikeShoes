// server/routes/products.js
const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();

// Route để tìm kiếm sản phẩm theo tên hoặc category
router.get('/', (req, res) => {
  const category = req.query.category;
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
  } else {
    query = 'SELECT * FROM products WHERE category LIKE ? AND category NOT LIKE ?';
    queryParams.push('%Men%', '%Women%');
  }

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching products' });
    }
    const totalCount = results.length;
    res.json({ totalCount, products: results });
  });
});

// Route để tìm kiếm sản phẩm theo tên hoặc category, fuzzy search và suggestion
router.get('/search', (req, res) => {
  const searchTerm = req.query.term; // Từ khóa tìm kiếm từ query params
  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  // Sử dụng LIKE để tìm kiếm mờ (fuzzy search) trên cả name và category
  const query = `
    SELECT * FROM products
    WHERE name LIKE ? OR category LIKE ?
  `;
  const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.json({ products: results });
  });
});

// Route để tìm gợi ý (suggestion) khi nhập từ khóa
router.get('/suggestions', (req, res) => {
  const searchTerm = req.query.term;
  
  if (!searchTerm) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  // Sử dụng câu truy vấn để lấy cả id và name
  const query = `
    SELECT DISTINCT product_id AS id, name FROM products
    WHERE name LIKE ? OR category LIKE ? LIMIT 5
  `;
  const queryParams = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(query, queryParams, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching suggestions' });
    }

    // Map lại kết quả để trả về cả id và name
    const suggestions = results.map((result) => ({
      id: result.id,  // Đảm bảo trả về cả id
      name: result.name
    }));
    
    res.json({ suggestions });
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
