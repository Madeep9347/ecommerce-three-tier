import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PaymentModal = ({ show, handleClose, handlePayment }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment({ name, address, pincode, mobileNumber: mobile }); // Ensure the key matches the server's expectation
    handleClose(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Information</Modal.Title>
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
  );
};

export default PaymentModal;
