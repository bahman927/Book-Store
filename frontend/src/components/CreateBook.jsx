import React, { useState, useEffect } from "react";
import { userCheck } from "../utils/userCheck";
import ErrorMessage from "./ErrorMessage";
import { createBook } from "../utils/books";   // ✅ use centralized books.js

const BookForm = () => {
  const [authError, setAuthError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    published_date: "",
  });
  const [message, setMessage] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const { valid, error } = userCheck();
    if (!valid) setAuthError(error);
  }, []);

  if (authError) return <ErrorMessage message={authError} redirectTo="/" />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);   // ✅ use books.js function
      setMessage("Book created successfully!");
      setFormData({ title: "", author: "", published_date: "" }); // reset form
    } catch (error) {
      setMessage(
        "Session expired or error creating book, please login again."
      );
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
      {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="published_date"
          value={formData.published_date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
