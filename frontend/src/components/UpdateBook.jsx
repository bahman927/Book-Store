import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook1, getBookById } from "../utils/books"; 

export default function UpdateBook() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  console.log("✅ UpdateBook mounted")
  // Fetch book details on mount
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id); 
        setFormData(data);
      } catch (err) {
        console.error("Error fetching book:", err);
        setMessage("Failed to load book details. Please try again.");
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log("➡️ Submitting update:", formData);
    await updateBook1(id, formData);
    console.log("✅ Update success, navigating...");
    navigate("/listbook");
  } catch (err) {
    console.error("❌ Error updating book:", err);
    setMessage("Failed to update book. Please login again if session expired.");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Update Book</h2>
      {message && <p className="mb-2 text-sm text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
