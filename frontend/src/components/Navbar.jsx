// src/components/NavBar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/api2";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const user = localStorage.getItem("username");
      if (user) {
        setUser(user); 
      }
    } catch (err) {
        setUser(null);
    }
  }, []);

  const handleListBooksClick = (e) => {
    e.preventDefault(); // stop normal Link navigation
    if (location.pathname === "/listbook") {
      navigate(0); // 🔄 force remount if already there
    } else {
      navigate("/listbook");
    }
  };

  const handleCreateBooksClick = (e) => {
    e.preventDefault(); // stop normal Link navigation
    if (location.pathname === "/createbook") {
      navigate(0); // 🔄 force remount if already there
    } else {
      navigate("/createbook");
    }
  };

  return (
    

    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <h2 className="text-xl font-bold">BOOK STORE</h2>
      <div className="space-x-4">
         <a href="/listbook" onClick={handleListBooksClick} className="hover:underline">
          List Books
        </a>
         <a href="/createbook" onClick={handleCreateBooksClick} className="hover:underline">
          Create Book
        </a>

        {/* <Link to="/createbook">Create Book</Link> */}
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <span>Welcome, {user}</span>
            <button
              onClick={logout}
              className="hover:underline text-red-300 space-x-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
  
}
