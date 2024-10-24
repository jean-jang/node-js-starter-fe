import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Stack, InputGroup } from "react-bootstrap";
import { User, Mail, Lock } from "lucide-react";
import api from "../utils/api";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Make sure both passwords are the same");
      return;
    }
    try {
      const response = await api.post("/user", formData);
      console.log("Account created successfully", response.data);
      setError("");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed.", error);
      const errorMessage = error.message || "This account already in use";
      setError(errorMessage);
    }
  };

  return (
    <div className="display-center">
      <Form onSubmit={handleSubmit} className="w-100">
        <h1>Join</h1>

        <Stack gap={2}>
          <Form.Group controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <User size={15} />
              </InputGroup.Text>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Mail size={15} />
              </InputGroup.Text>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Lock size={15} />
              </InputGroup.Text>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Lock size={15} />
              </InputGroup.Text>
              <Form.Control
                required
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                isInvalid={formData.password !== formData.confirmPassword}
              />
            </InputGroup>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
        </Stack>
        <Stack gap={3} className="mt-3">
          <Button type="submit">Join</Button>
          <span>
            Have an account? <Link to="/login">Login&rarr;</Link>
          </span>
        </Stack>
      </Form>
    </div>
  );
};

export default RegisterPage;
