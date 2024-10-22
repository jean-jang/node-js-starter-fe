import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
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

  const handleLogin = async (e) => {
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
      <Form onSubmit={handleLogin} className="w-100">
        <h1>Log In</h1>

        <Stack gap={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Form.Group>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </Stack>

        <Stack gap={2} className="mt-3">
          <Button type="submit" variant="primary">
            Login
          </Button>
          {/* <Button
            variant="outline-primary"
            onClick={() => navigate("/forgot-password")}
            className="rounded-pill"
          >
            Github
          </Button> */}

          <span>
            Don't have an account? <Link to="/register">Create one&rarr; </Link>
          </span>
        </Stack>
      </Form>
    </div>
  );
};

export default LoginPage;
