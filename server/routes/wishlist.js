// server/routes/wishlist.js
const express = require('express');
const db = require('../config/db'); // Import MySQL connection
const router = express.Router();

// Route to add a product to the wishlist
router.post('/add-to-wishlist', (req, res) => {
  console.log(req.body);
  const { userId, productId, size, color, quantity } = req.body;

  if (!userId || !productId || !size || !color || !quantity) {
    return res.status(400).json({
      message: 'User ID, Product ID, Size, Color, and Quantity are required.',
    });
  }

  const checkQuery = `
    SELECT * FROM WishLists 
    WHERE user_id = ? AND product_id = ?
  `;

  db.query(checkQuery, [userId, productId], (err, rows) => {
    if (err) {
      console.error('Error checking wishlist item:', err);
      return res.status(500).json({ message: 'Error checking wishlist item.' });
    }

    if (rows.length > 0) {
      return res.status(409).json({ message: 'Product already in wishlist.' });
    }

    const insertQuery = `
      INSERT INTO WishLists (user_id, product_id, size, color, quantity) 
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [userId, productId, size, color, quantity], (err) => {
      if (err) {
        console.error('Error adding product to wishlist:', err);
        return res.status(500).json({ message: 'Error adding product to wishlist.' });
      }
      res.status(200).json({ message: 'Product added to wishlist successfully.' });
    });
  });
});

// Route to fetch wishlist items for a user
router.get('/api/wishlist/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = `
      SELECT 
          w.wishlist_id, w.size, w.color as image, p.product_id, p.name,p.category, p.price
      FROM 
          WishLists w  
      JOIN 
          Products p ON w.product_id = p.product_id
      WHERE 
          w.user_id = ?
  `;

  db.query(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching wishlist items:', err);
      return res.status(500).json({ message: 'Error fetching wishlist items.' });
    }

    res.json(rows);
  });
});

// Route to delete a product from the wishlist
router.delete('/api/wishlist/:userId/:wishlistId', (req, res) => {
  const { userId, wishlistId } = req.params;

  const deleteQuery = `DELETE FROM Wishlists WHERE user_id = ? AND wishlist_id = ?`;

  db.query(deleteQuery, [userId, wishlistId], (err, result) => {
    if (err) {
      console.error('Error deleting wishlist item:', err);
      return res.status(500).json({ message: 'Error deleting wishlist item.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Wishlist item not found.' });
    }

    res.status(200).json({ message: 'Product removed from wishlist.' });
  });
});

// Route to move a product from wishlist to cart
router.post('/move-to-cart', (req, res) => {
  const { userId, productId, size, color, quantity } = req.body;
  console.log(req.body);

  if (!userId || !productId || !size || !color || !quantity) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Step 1: Delete the product from the wishlist
  db.query(
    'DELETE FROM WishLists WHERE user_id = ? AND product_id = ? AND size = ? AND color = ?',
    [userId, productId, size, color],
    (err) => {
      if (err) {
        console.error('Error deleting product from wishlist:', err);
        return res.status(500).json({ message: 'Error deleting product from wishlist.' });
      }

      // Step 2: Check if the user already has a cart
      db.query('SELECT cart_id FROM Cart WHERE user_id = ?', [userId], (err, cart) => {
        if (err) {
          console.error('Error checking cart:', err);
          return res.status(500).json({ message: 'Error checking cart.' });
        }

        let cartId = cart.length ? cart[0].cart_id : null;

        if (!cartId) {
          // Step 3: Create a new cart if it doesn't exist
          db.query('INSERT INTO Cart (user_id) VALUES (?)', [userId], (err, result) => {
            if (err) {
              console.error('Error creating cart:', err);
              return res.status(500).json({ message: 'Error creating cart.' });
            }
            cartId = result.insertId;

            // Continue to add the product to the cart after creating a new cart
            addToCart(cartId, productId, size, color, quantity, res);
          });
        } else {
          // Step 4: If cart exists, add the product to the cart
          addToCart(cartId, productId, size, color, quantity, res);
        }
      });
    }
  );
});

// Helper function to add a product to the cart
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
          return res.status(500).json({ message: 'Error updating cart item.' });
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

module.exports = router;

