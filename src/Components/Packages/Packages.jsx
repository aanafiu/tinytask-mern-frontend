import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import CurrentUser from "../../Hooks/CurrentUser";
import Loading from "../Loading/Loading";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext); // userDetails.role expected
  const { userCurrentData, loading, setLoading, refetch } = CurrentUser(
    userDetails?.email
  );
  const user = userCurrentData || {};
  const { username, photoURL, email, role, coin, package: userPackage } = user;
  console.log(user);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(
          "https://tinytask-backend.vercel.app/admin?object=packages"
        );
        const data = await response.json();
        setPackages(data.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handlePurchase = async (pkg) => {

    if (!userCurrentData) {
      return Swal.fire({icon: "Warning",
          title: "Please login first!",
          color: "#e8c42d",
          background: "#14141a",
          confirmButtonColor: "#e8c42d",
          confirmButtonText: "&#x2715;",
          iconColor: "#e8c42d",})
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
          })
    }

    if (user?.role?.toLowerCase() !== "seller") {
      return Swal.fire({icon: "error",
          title: "Only sellers can purchase!",
          color: "#e8c42d",
          background: "#14141a",
          confirmButtonColor: "#e8c42d",
          confirmButtonText: "&#x2715;",
          iconColor: "#e8c42d",})
          .then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard");
            }
          })

    }

    try {
      const res = await fetch(
        "https://tinytask-backend.vercel.app/seller/dashboard-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyerId: email,
            packageId: pkg._id,
            packageName: pkg.package_name,
            packageCredit: pkg.package_credit,
            timestamp: new Date(),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Request sent successfully!",
          text: "Go To Dashboard",
          color: "#e8c42d",
          background: "#14141a",
          confirmButtonColor: "#e8c42d",
          confirmButtonText: "&#x2715;",
          iconColor: "#e8c42d",
        }
        ).then((res) => {
          if (res.isConfirmed) {
            navigate("/dashboard");
          }
        });
      } else {
        Swal.fire("Failed to send request", data.message || "", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error occurred while sending request", "", "error");
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full py-16 bg-gradient-to-tr from-Pinkish to-Gold px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-Secondary font-Main">
          Our Pricing
        </h2>
        <p className="text-Muted mt-2 max-w-md font-Second mx-auto">
          Choose the plan that fits your goals best — each one includes
          exclusive features for Buyers.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full mx-auto h-fit">
        {packages.map((pkg, idx) => {
          const isMiddle = idx === 1;
          return (
            <div
              key={idx}
              className={`relative bg-gradient-to-b from-Pinkish to-Gold rounded-2xl shadow-xl p-8 w-full max-w-lg max-h-lg text-center border-2 border-transparent transition-transform duration-300 hover:scale-105 hover:border-Pinkish ease-in-out group`}
            >
              {/* Popular badge */}
              {isMiddle && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-Gold text-Muted text-sm font-bold px-3 py-2 rounded-full shadow">
                  POPULAR
                </div>
              )}

              <h3
                className={`text-xl font-bold font-Main uppercase text-Secondary mb-4`}
              >
                {pkg.package_name} Package
              </h3>

              <p className={`text-4xl font-bold mb-2 text-Secondary`}>
                ${pkg.package_price}.00
              </p>

              <p className="text-Muted mb-4 font-Second">
                {idx === 0
                  ? "Best for individuals"
                  : idx === 1
                  ? "Most popular choice"
                  : "Ideal for experienced buyers"}
              </p>

              <ul className="text-Secondary font-Main space-y-2 my-6 text-base">
                <li>{pkg.package_credit} Credits</li>
                <li>Lifetime Access</li>
                <li>Unlimited Question Reviews</li>
              </ul>

              <button
                onClick={() => (idx !== 0 ? handlePurchase(pkg) : null)}
                className={`w-full py-2 rounded font-semibold font-Second text-Secondary bg-gradient-to-br from-Muted/30 to-Primary/30 transition group-hover:text-Gold group-hover:bg-Secondary`}
              >
                {idx === 0 ? "Free" : "Purchase Now"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Packages;
