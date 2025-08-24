import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar     from "./components/Navbar";
import ListBooks  from "./components/ListBooks";
import CreateBook from "./components/CreateBook";
import Register   from "./pages/Register";
import Login      from "./pages/Login"

export default function App() {
  
return (  
  <Router>
   <Navbar />
   <div className="p-4">
    <Routes>
      <Route path="/"           element={null} />
      <Route path="/listbook"   element={<ListBooks />} />  
      <Route path="/createbook" element={<CreateBook />} />
      <Route path="/login"      element={<Login />} />
      <Route path="/register"   element={<Register />} />
      
      {/* redirect any unknown or root path to /login */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
   </div>
  </Router>

  );
}