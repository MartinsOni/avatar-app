import { useEffect, useState } from "react";
import axios from "../../utility/axiosInstance";
import "./style.css";

export default function AllUser() {
  //state
  const [allUser, setAllUser] = useState(null);
  //methods
  const getAllUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setAllUser(res.data);
      console.log(res.data.createList);
    } catch (error) {
      console.error("An error happened", error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="register">
      <h1>All Users</h1>
      <div className="all-list">
        {allUser &&
          allUser.createList.map((users, index) => {
            const { userName, firstName, lastName, _id, avatar } = users;
            const date = users.dates.registered;
            return (
              <div key={index} className="each-user">
                <p><b>➡ Users ID: </b> {_id}</p>
                <p><b>➡ Created Date: </b>{date}</p>
                <p><b>➡ UsersName: </b> {userName}</p>
                <h3>
                ➡ Name: {firstName} {lastName}
                </h3>
                <img src={avatar} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
