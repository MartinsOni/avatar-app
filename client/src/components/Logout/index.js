import { useEffect } from "react";
import axios from "../../utility/axiosInstance";

export default function Logout() {
  const logout = async () => {
    await axios.get("/api/user/logout");
    alert("You are logged out")
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="register">
      <h1>Logout</h1>
    </div>
  );
}
