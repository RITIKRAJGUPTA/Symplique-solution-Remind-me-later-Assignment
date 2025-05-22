import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReminderForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    message: '',
    method: 'SMS',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reminders', formData);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save reminder');
    }
  };

  if (submitted) {
    return (
      <Container className="mt-5">
        <Alert variant="success">
          <Alert.Heading>Reminder Set Successfully!</Alert.Heading>
          <p>
            Your reminder for {formData.date} at {formData.time} has been saved.
          </p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Set a Reminder</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reminder Method</Form.Label>
          <Form.Select
            name="method"
            value={formData.method}
            onChange={handleChange}
          >
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
          </Form.Select>
        </Form.Group>

        {formData.method === 'SMS' ? (
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required={formData.method === 'SMS'}
              placeholder="Enter phone number"
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required={formData.method === 'Email'}
              placeholder="Enter email address"
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Set Reminder
        </Button>
      </Form>
    </Container>
  );
};

export default ReminderForm;