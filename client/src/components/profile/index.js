import { useEffect, useState } from "react";
import axios from "./../../utility/axiosInstance";

export default function Profile() {
  //state
  const [profileInfo, setProfileInfo] = useState(null);
  //methods
  const getProfileInfo = async () => {
    try {
      const res = await axios.get("/api/user/profile");
      setProfileInfo(res.data.profile);
    } catch (error) {
      console.error("An error happened", error);
      alert("Error occur, please login")
    }
  };
  useEffect(() => {
    getProfileInfo();
  }, []);
  //ui elements
  return (
    <div className="register">
      <h1>Profile</h1>
      {profileInfo != null ? (
        <>
          <h2>
            {profileInfo.firstName} {profileInfo.lastName}
          </h2>
          <h3>{profileInfo.userName}</h3>
          <img
            src={profileInfo.avatar}
            alt=""
            style={{ width: "30vw"}}
          ></img>
        </>
      ) : (
        <p style={{ textDecoration: "underline", fontSize: "25px" }}>
          No user found
        </p>
      )}
    </div>
  );
}
