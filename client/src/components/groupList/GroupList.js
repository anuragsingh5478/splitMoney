import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import "./groupList.css";
import { Link } from "react-router-dom";

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

const GroupListCard = (props) => {
  return (
    <div className="group-list-card">
      <div className="group-list-card-info">
        Group Name:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.name}
        </span>
      </div>
      <div className="group-list-card-info">
        Created At:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.date.substr(0, 10)}
        </span>
      </div>
      <div className="group-list-card-info">
        Group Members:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.members.length}
        </span>
      </div>
      <div className="group-list-card-info">
        Status:
        <span className="group-list-card-info-value" style={{ color: "green" }}>
          {props.groupDetail.status}
        </span>
      </div>
      <div className="group-list-card-action-button">
        <div>
          <a
            href={"/group/" + props.groupDetail._id}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              View
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function GroupList() {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    // Todo: Update base url
    const baseUrl = "http://localhost:5000";
    // Todo: Update token retrival method
    const token = getToken();
    axios
      .get(baseUrl + "/api/group/all", {
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
