import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Stack, InputGroup } from "react-bootstrap";
import { Mail, Lock } from "lucide-react";
import api from "../utils/api";
import { Navigate } from "react-router-dom";

const LoginPage = ({ setUser, user }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", formData);
      console.log("Login successful", response.data);
      setError("");

      const token = response.data.token;
      sessionStorage.setItem("authToken", token);
      setUser(response.data.user);

      api.defaults.headers["authorization"] = `Bearer ${token}`;
      navigate("/");
    } catch (error) {
      console.error("Login failed.", error);
      const errorMessage = error.message || "Incorrect email or password";
      setError(errorMessage);
    }
  };

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="display-center">
      <Form onSubmit={handleSubmit} className="w-100">
        <h1>Login</h1>

        <Stack gap={2}>
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
                autoComplete="current-password"
              />
            </InputGroup>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
        </Stack>
        <Stack gap={3} className="mt-3">
          <Button type="submit">Login</Button>
          <span>
            Need an account? <Link to="/register">Register&rarr;</Link>
          </span>
        </Stack>
      </Form>
    </div>
  );
};

export default LoginPage;
