// ListBooks.jsx
import { useEffect, useState } from "react";
import {getBooks, deleteBook}  from '../utils/books'
import { userCheck } from "../utils/userCheck";
import ErrorMessage from "./ErrorMessage";
import api from "../utils/api"
import { useLocation } from "react-router-dom";

export default function ListBooks() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [error, setError] = useState("")
  const { valid, error:authError } = userCheck();

 useEffect(() => {
    getBooks()
      .then((data) => { 
        //  console.log("✅ Books fetched:", data);
         setBooks(data)
      })
      .catch((err) => {
        console.error("Fetch error: ", err);
        setError(err.response?.data?.detail || "Failed to fetch books");
      });
  }, []);

    if (!valid) return <ErrorMessage message={authError} redirectTo="/" />;

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to delete book");
    }
  };

  if (error) {
      return <ErrorMessage message={error} />;
   }

  const handleEditClick = (book) => {
    setSelectedBook(book);
    setFormData({ title: book.title, author: book.author });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    await api.put(`books/${selectedBook.id}/update/`, formData);

    // refresh books list
    const updatedBooks = await getBooks();
    setBooks(updatedBooks);

    // close modal
    setShowModal(false);
    setSelectedBook(null);

  } catch (err) {
    console.error("Error updating book:", err);
    setError(err.response?.data?.detail || "Failed to update book");
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
    
      {error && <p className="text-red-500">{error}</p>}
     
      <ul className="space-y-2">
    
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{book.title}</p>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(book)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Update Book</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}