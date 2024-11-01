import React from 'react';
import Card from 'react-bootstrap/Card';
import './FeaturedCard.scss'; // Import CSS cho card

const FeaturedCard = ({ id, name, image, price, onProductClick }) => {
  return (
    <Card className="featured-card" onClick={() => onProductClick(id)}>
      <div className="image-container">
        <Card.Img variant="top" src={image} alt={name} className="product-image" />
      </div>
      <Card.Body>
        <Card.Title className="product-name">{name}</Card.Title>
        <Card.Text className="product-price">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeaturedCard;
