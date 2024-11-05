// src/components/ProductList.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const products = [
  {
    productId: 1,
    name: 'Apple',
    price: 1.2,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Dz7-XilV0DK4h05_jPJkesswadW5b_KikQ&s',
  },
  {
    productId: 2,
    name: 'Grape',
    price: 2.5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfambS60vTU5yzVsYsw0UgKi96DXJv0qJDuQ&s',
  },
  {
    productId: 3,
    name: 'Banana',
    price: 0.5,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJhPGUzTP_ds8vnDK3pzL0UUZM-Y1TEZKPg&s',
  },
  {
    productId: 4, // New product ID
    name: 'Guava', // New product name
    price: 1.8, // Price for the new product
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTICQ_bjPqgE2Wa4E8DMzSvW5xww0wd-M3oJA&s', // Image URL for the new product
  },
];

const ProductList = ({ addToCart }) => {
  return (
    <div className="product-list" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <Card key={product.productId} style={{ width: '18rem', margin: '10px' }}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>${product.price.toFixed(2)}</Card.Text>
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
