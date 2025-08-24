import { logout } from "./api";

export default function Logout() {
  const handleLogout = () => {
    logout();
    // alert("Logged out");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
