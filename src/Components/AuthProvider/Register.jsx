import React, { useContext, useState } from "react";
import { FaFileImage } from "react-icons/fa";

import img from "../../assets/heroarea.png";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const Register = () => {
  const [photoLink, setPhotoLink] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 ;

  const from = location.state?.from?.pathname || "/";

  //   Auth Context
  const { registerNewAccount, updateDetails } = useContext(AuthContext);

  //   Alert Function
  const Notification = (type, message) => {
    return Swal.fire({
      icon: type, // 'success' or 'error'
      title: message,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      color: "#e8c42d",
      background: "#14141a",
      confirmButtonColor: "#e8c42d",
      confirmButtonText: "&#x2715;",
      iconColor: "#e8c42d",
    });
  };

  // Handle image selection and upload
  const handleImageChange = async (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const imageData = new FormData();
    imageData.append("image", imageFile);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const data = await res.json();

      if (data.success) {
        setPhotoLink(data.data.url);
        setLoading(false);
      } else {
        alert("Image upload failed!");
      }
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const userInfo = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      photoURL: photoLink,
    };

    console.log(userInfo);
    // Submit to backend or handle registration logic here
    registerNewAccount(userInfo.email, userInfo.password)
      .then((userCredential) => {
        updateDetails(userInfo.username, userInfo.photoURL)
          .then(() => {
            Notification("success", "Registration Successful!").then(
              (result) => {
                // Post Data To MongoDB
                fetch("https://tinytask-backend.vercel.app/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: userInfo.email,
                    username: userInfo.username,
                    role: userInfo.role,
                    photoURL: userInfo.photoURL,
                    coin: userInfo.role === "Player" ? 50 : 10,
                    package: userInfo.role === "Player" ? "Player" : "Regular",
                  }),
                });

                if (result.isConfirmed) {
                  navigate(from, { replace: true });
                }
              }
            );
          })
          .catch((err) => {
            Notification("error", "Profile update failed!");
            // console.error(err);
          });
      })
      .catch((err) => {
        Notification("error", "Already have an account!");
        // console.error(err);
      });
  };

  return (
    <div className="flex flex-col-reverse justify-center items-center lg:flex-row p-8 rounded-lg shadow-lg container mx-auto h-fit mt-[3rem] mb-[7rem]">
      {/* Form Left Side */}
      <div className="w-full h-full font-Main">
        <h1 className="text-4xl font-bold text-center text-Gold mb-6 drop-shadow-[0_0_10px_Gold]">
          Join the Quest
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {photoLink ? (
              <img
                src={photoLink}
                alt="Preview"
                className="mt-4 mx-auto w-32 h-32 object-cover rounded-xl shadow-[0_0_10px_Gold]"
              />
            ) : (
              <div className=" mx-auto w-fit object-cover rounded text-5xl text-Gold">
                <FaFileImage />
              </div>
            )}

            {Loading && (
              <div className="flex justify-center mb-4">
                <span className="loading loading-infinity loading-md text-Gold"></span>
              </div>
            )}
            <label className="block text-gray-300 mb-2">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full p-3 rounded"
              onChange={handleImageChange}
              required={!photoLink}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 rounded"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded"
              placeholder="Enter your password"
              minLength="6"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Role</label>
            <select name="role" className="w-full p-3 rounded" required>
              <option value="" disabled selected>
                Select your role
              </option>
              <option value="Player">Player</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-Gold text-Muted py-3 rounded-lg font-Second hover:bg-Muted hover:text-Gold transition-all focus:drop-shadow-[0_0_10px_Gold]"
          >
            Register Now
          </button>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-[100%] max-w-[1200px] h-fit register-img my-3 relative">
        <img
          src={img}
          alt=""
          className="w-full h-full object-fill rounded-xl shadow-lg"
        />

        {/* Login Link Section */}
        <div className="absolute w-[80%] mb-5 bottom-0 left-1/2 transform -translate-x-1/2 bg-Primary/60 backdrop-blur-md px-6 py-4 rounded-lg text-center shadow-[0_0_20px_Gold]">
          <p className="text-Light font-Main text-lg">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-Gold hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
