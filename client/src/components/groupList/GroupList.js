import React, { useState, useEffect } from "react";
import axios from "axios";
import "./groupList.css";
import GroupListCard from "./GroupListCard";

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export default function GroupList() {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const baseUrl = "https://split-money-5478.herokuapp.com/";
    const token = getToken();
    axios
      .get(baseUrl + "api/group/all", {
        headers: { token: token },
      })
      .then((res) => {
        setGroupList(res.data.groupsDetail);
      })
      .catch((err) => console.log(err));
  }, []);

  const showGroupDetailCard = () => {
    // Todo: handle if group list is empty
    return groupList.map((groupDetail) => (
      <GroupListCard groupDetail={groupDetail} key={groupDetail._id} />
    ));
  };
  return (
    <div>
      {/* Group List */}
      {/* all the information */}
      {showGroupDetailCard()}
    </div>
  );
}
