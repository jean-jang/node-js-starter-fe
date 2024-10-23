import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import LoginPage from "./pages/LoginPage.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import api from "./utils/api";
import React, { useEffect } from "react";

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getUser = async () => {
    const storedToken = sessionStorage.getItem("authToken");
    try {
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data);
      }
    } catch (error) {
      setUser(null);
      console.error("Invalid token", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return isLoading ? (
    <div className="display-center text-muted">
      <h2>Loading...</h2>
    </div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <TodoPage setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage setUser={setUser} user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
