import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import api from "../utils/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
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
      const errorMessage =
        error.response?.data?.message || "Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>Log In</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            Don't have an account? <Link to="/register">Create one&rarr; </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
