import { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const { user, accessToken, logout, refreshAccessToken } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchProtected = useCallback(async () => {
    if (!accessToken) {
      setMessage("Not logged in");
      return;
    }
    try {
      const res = await axios.get("http://localhost:8000/api/protected/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setMessage(res.data.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Try to refresh token once
        const newAccess = await refreshAccessToken();
        if (newAccess) {
          try {
            const res2 = await axios.get("http://localhost:8000/api/protected/", {
              headers: { Authorization: `Bearer ${newAccess}` },
            });
            setMessage(res2.data.message);
            return;
          } catch {
            logout();
            setMessage("Session expired. Please login again.");
            navigate("/login");
          }
        } else {
          setMessage("Session expired. Please login again.");
          navigate("/login");
        }
      } else {
        setMessage("Error fetching protected data");
      }
    }
  },  [accessToken, refreshAccessToken, logout, navigate]);

  useEffect(() => {
    fetchProtected();
  }, [fetchProtected]);

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      {!user ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <p>Welcome, {user.username}!</p>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
