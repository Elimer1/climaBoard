import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("explorerName");
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleLogOut}>Log Out </button>
    </div>
  );
};

export default LogoutBtn;
