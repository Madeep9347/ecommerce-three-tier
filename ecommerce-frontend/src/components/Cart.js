// src/components/Cart.js

import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './Cart.css'; // Import the CSS file

function Cart({ cartItems, removeFromCart, clearCart }) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');

  // Ensure cartItems is always an array, even if it's undefined or null
  const items = Array.isArray(cartItems) ? cartItems : [];

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      name,
      address,
      pincode,
      mobileNumber: mobile,
      cartItems,
    };

    try {
      const response = await fetch(`${apiUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok) {
        clearCart(); // Clear the cart on successful payment
        setShowModal(false);
        alert('Thank you! Your payment has been processed.');
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      alert('Payment processing failed. Please try again.');
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="cart text-center">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="list-unstyled">
          {items.map((item) => (
            <li key={item.productId} className="cart-item">
              {item.name} - ${item.price} x {item.quantity}
              <Button variant="danger" onClick={() => removeFromCart(item.productId)}>
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Proceed to Payment
        </Button>
      )}

      {/* Modal for Payment Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your pincode" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your mobile number" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)} 
                required 
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Cart;
