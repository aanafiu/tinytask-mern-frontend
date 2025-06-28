import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../Loading/Loading";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({});
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://tinytask-backend.vercel.app/admin?object=admin_data&email=${email}` // Adjust the URL as needed
      );
      const data = await response.json();
      console.log(data.data);
      setAdminData(data.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    }
  };

  // console.log(adminData);
  useEffect(() => {
    if (email) {
      fetchData(email);
    }
  }, [email]);


  const handleLogin = (e) => {
    // // fetchData(email);
    // console.log(adminData);
    // console.log(email, pass);

    e.preventDefault();
    if (email === adminData.email && adminData.pass === pass) {
      setSuccess(true);
      setError("");
      navigate("/admin/dashboard");
      setLoading(false);
    } else {
      setError("Invalid credentials");
      setSuccess(false);
    }
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-Gold">
      <form
        onSubmit={handleLogin}
        className="border-2 p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
            placeholder="admin"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
            placeholder="admin"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mb-4">Login successful!</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
