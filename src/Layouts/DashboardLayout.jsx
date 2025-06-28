import { useContext, useEffect, useState } from "react";
import StudentProfile from "../Components/Profiles/StudentProfile";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import CurrentUser from "../Hooks/CurrentUser";
import SellerProfile from "../Components/Profiles/SellerProfile";
import Loading from "../Components/Loading/Loading";
import ToggleProfile from "../Components/ToggleProfile.jsx/ToggleProfile";

const DashboardLayout = () => {
  const { userDetails } = useContext(AuthContext);
  const { userCurrentData, loading } = CurrentUser(userDetails?.email);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userCurrentData?.role) {
      setRole(userCurrentData?.role);
    }
  }, [userCurrentData]); // Reacts to the entire user data update

  if (loading || !userCurrentData) {
    return <Loading />;
  }

  return (
    <div>
      {role.toLowerCase() === "player" ? (
        <StudentProfile role={role} setRole={setRole} />
      ) : (
        <SellerProfile role={role} setRole={setRole} />
      )}
      {/* You can still keep ToggleProfile here if you want */}
      {/* <ToggleProfile onRoleChange={setRole} /> */}
    </div>
  );
};

export default DashboardLayout;
