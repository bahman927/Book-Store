import axios from "axios";

import { checkAuth } from "../utils/userCheck";
import ErrorMessage from "./ErrorMessage"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const API_URL = "http://localhost:8000/api";
const [authError, setAuthError] = useState(null);
const { id } = useParams();
const navigate = useNavigate();
console.log(` id = ${id}`)

useEffect(() => {
    const { valid, error } = checkAuth();
    if (!valid) setAuthError(error);
  }, []);

  if (authError) return <ErrorMessage message={authError} redirectTo="/" />;

useEffect(() => {
  const deleteBook = async () => {
    try {
      
      const token = localStorage.getItem("access_token");
      await api.delete(`${API_URL}/books/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete book.");
    }
  };

  deleteBook();
}, [id, navigate]);


