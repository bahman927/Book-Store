// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null); // null = checking

  useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setAllowed(false);
        return;
      }

      try {
      const decoded = jwtDecode(token);

      // Check token expiration
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        setAllowed(false);
        return;
      }

      setAllowed(true);
    } catch (error) {
      setAllowed(false);
    }
  }, []);

  if (allowed === null) return null; // Still checking, avoid flicker

  if (!allowed) {
    return (
      <div className="p-4 text-red-500 font-bold">
        Access Denied — Please log in.
      </div>
    );
  }

  return children;
}
