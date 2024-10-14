// src/pages/Login.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (email === "soukunri@gmail.com" && password === "123") {
        setSuccess(true);
        setTimeout(() => navigate("/"), 2000); // Redirect after 2s
    } else {
        setError("Invalid email or password");
        setTimeout(() => setError(""), 2000); // Clear error after 3s
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">🎉 Login successful!</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">Login</Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
