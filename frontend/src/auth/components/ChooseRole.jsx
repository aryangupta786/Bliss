import React from "react";
import { useNavigate } from "react-router-dom";
//import "./ChooseRole.css";

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <h1>Welcome to Social Media App!</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
};

export default ChooseRole;
