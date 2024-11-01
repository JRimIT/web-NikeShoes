// server/routes/products.js
const express = require('express');
const db = require('../config/db'); // Import kết nối MySQL
const router = express.Router();

// Route to add a product to the cart
router.post('/add-to-cart', (req, res) => {
  console.log(req.body);
  const { userId, productId, size, color, quantity } = req.body;

  // Kiểm tra xem userId và productId có tồn tại không
  if (!userId || !productId || !size || !color || !quantity) {
    return res.status(400).json({ message: 'User ID, Product ID, Size, Color, and Quantity are required.' });
  }

  // Truy vấn để lấy cart_id của user hiện tại
  const getCartQuery = `SELECT cart_id FROM Cart WHERE user_id = ?`;

  db.query(getCartQuery, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching cart' });
    }

    let cartId;

    if (rows.length > 0) {
      // Nếu đã có cart_id, lấy cart_id
      cartId = rows[0].cart_id;
    } else {
      // Nếu chưa có cart_id, tạo mới
      const createCartQuery = `INSERT INTO Cart (user_id) VALUES (?)`;
      
      db.query(createCartQuery, [userId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating cart' });
        }
        cartId = result.insertId; // Lấy cartId từ kết quả
        // Tiếp tục thêm sản phẩm vào cart
        addToCart(cartId, productId, size, color, quantity, res);
      });
      return; // Ngừng hàm ở đây
    }

    // Nếu đã có cartId, tiếp tục thêm sản phẩm vào giỏ hàng
    addToCart(cartId, productId, size, color, quantity, res);
  });
});

// Hàm để thêm sản phẩm vào giỏ hàng
const addToCart = (cartId, productId, size, color, quantity, res) => {
  const checkItemQuery = `
    SELECT * FROM Cart_Items 
    WHERE cart_id = ? AND product_id = ? AND size = ? AND color = ?
  `;

  db.query(checkItemQuery, [cartId, productId, size, color], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking cart item.' });
    }

    if (rows.length > 0) {
      const updateQuery = `
        UPDATE Cart_Items SET quantity = quantity + ? 
        WHERE cart_id = ? AND product_id = ? AND size = ? AND color = ?
      `;
      db.query(updateQuery, [quantity, cartId, productId, size, color], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error updating cart item' });
        }
        res.status(200).json({ message: 'Cart item updated successfully.' });
      });
    } else {
      const insertQuery = `
        INSERT INTO Cart_Items (cart_id, product_id, size, color, quantity)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(insertQuery, [cartId, productId, size, color, quantity], (err) => {
        if (err) {
          console.error('Error adding product to cart:', err);
          return res.status(500).json({ message: 'Error adding product to cart.' });
        }
        res.status(200).json({ message: 'Product added to cart successfully.' });
      });
    }
  });
};

// Route to get cart items for a user
router.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log('Fetching cart for userId:', userId);

  if (!userId) {
    console.error('User ID is missing.');
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = `
    SELECT 
      ci.cart_item_id, ci.cart_id, ci.quantity, 
      ci.color AS cart_color, ci.size AS cart_size, 
      p.product_id, p.name, p.price, 
      p.primary_image AS image, 
      p.size AS available_sizes, 
      p.color AS available_colors, 
      p.description
    FROM 
      Cart_Items ci
    JOIN 
      Cart c ON ci.cart_id = c.cart_id
    JOIN 
      Products p ON ci.product_id = p.product_id
    WHERE 
      c.user_id = ?
  `;

  db.query(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ message: 'Error fetching cart items.' });
    }

    if (rows.length === 0) {
      console.warn('No items found for user ID:', userId);
      return res.status(404).json({ message: 'No items found in cart.' });
    }

    console.log('Cart items fetched successfully for user ID:', userId);
    res.json(rows);
  });
});

router.delete('/api/cart/:userId/:cartItemId', (req, res) => {
  const { userId, cartItemId } = req.params;

  const deleteQuery = `DELETE FROM Cart_Items WHERE cart_item_id = ?`;

  db.query(deleteQuery, [cartItemId], (err, result) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      return res.status(500).json({ message: 'Error deleting cart item.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    console.log(`Cart item ${cartItemId} deleted successfully.`);
    res.status(200).json({ message: 'Cart item deleted successfully.' });
  });
});

// Hàm Promise cho MySQL query
const queryAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// API để cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/api/cart/:userId/:cartItemId', (req, res) => {
  const { userId, cartItemId } = req.params;
  const { quantity } = req.body;

  const updateQuery = `UPDATE Cart_Items SET quantity = ? WHERE cart_item_id = ?`;

  db.query(updateQuery, [quantity, cartItemId], (err, result) => {
    if (err) {
      console.error('Error updating cart item:', err);
      return res.status(500).json({ message: 'Error updating cart item.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    console.log(`Cart item ${cartItemId} updated successfully.`);
    res.status(200).json({ message: 'Cart item updated successfully.' });
  });
});

module.exports = router;
