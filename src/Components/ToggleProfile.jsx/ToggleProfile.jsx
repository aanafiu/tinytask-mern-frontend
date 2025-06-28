import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider/AuthProvider";
import CurrentUser from "../../Hooks/CurrentUser";
import Swal from "sweetalert2";

const ToggleProfile = ({ onRoleChange }) => {
  const { userDetails } = useContext(AuthContext);
  const { userCurrentData, refetch } = CurrentUser(userDetails?.email);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userCurrentData?.role) {
      setRole(userCurrentData.role);
    }
  }, [userCurrentData]);

  const handleToggleRole = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://tinytask-backend.vercel.app/toggle-role?email=${userCurrentData?.email}`
      );
      const updatedRole = response.data?.data?.role;

      setRole(updatedRole);
      if (onRoleChange) onRoleChange(updatedRole); // Notify parent

      Swal.fire({
        title: "Role changed to",
        text: ` ${updatedRole}`,
        icon: "info",
        color: "#e8c42d",
        background: "#14141a",
        confirmButtonColor: "#e8c42d",
        confirmButtonText: "&#x2715;",
        iconColor: "#e8c42d",
      });
    } catch (error) {
      console.error("Failed to toggle role", error);
      alert("Error changing role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleToggleRole}
        className="px-4 py-2 bg-Primary text-Pinkish border-2 border-Pinkish rounded hover:bg-Pinkish hover:text-Primary transition-colors duration-300"
        disabled={loading}
      >
        {loading ? "Switching..." : "Toggle Role"}
      </button>
    </div>
  );
};
export default ToggleProfile;
