import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import loginImg from "../../assets/heroarea.png";
import { Link, useLocation, useNavigate } from "react-router";
import Loading from "../Loading/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAccount, setLoading, loading } = useContext(AuthContext);
  const navi = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogin = async (e) => {
    e.preventDefault();

    loginAccount(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          color: "#e8c42d",
          background: "#14141a",
          confirmButtonColor: "#e8c42d",
          confirmButtonText: "&#x2715;",
          iconColor: "#e8c42d",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(false);
            navi(from, { replace: true });
            // navi("/"); // Redirect to home page
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
          color: "#e8c42d",
          background: "#14141a",
          confirmButtonColor: "#e8c42d",
          confirmButtonText: "&#x2715;",
          iconColor: "#e8c42d",
        })
        .then((result) => {
          if (result.isConfirmed) {
            navi("/login");
          } })
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:flex-row p-8 rounded-lg shadow-lg container mx-auto h-fit mt-[3rem] mb-[7rem]">
      {/* Login Form */}
      <div className="w-full h-full font-Main">
        <h1 className="text-4xl font-bold text-center text-Gold mb-6 drop-shadow-[0_0_10px_Gold]">
          Welcome Back
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-Gold text-Muted py-3 rounded-lg font-Second hover:bg-Muted hover:text-Gold transition-all focus:drop-shadow-[0_0_10px_Gold]"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="w-[100%] max-w-[1200px] h-fit my-3 relative">
        <img
          src={loginImg}
          alt="Login Visual"
          className="w-full h-full object-fill"
        />
        {/* Register Link Section */}
        <div className="absolute w-[80%] mb-5 bottom-0 left-1/2 transform -translate-x-1/2 bg-Primary/60 backdrop-blur-md px-6 py-4 rounded-lg text-center shadow-[0_0_20px_Gold]">
          <p className="text-Light font-Main text-lg">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-Gold hover:underline font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
