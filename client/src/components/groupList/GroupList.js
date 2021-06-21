import React from "react";
import "./groupList.css";
const data = {
  msg: "success",
  groupDetails: [
    {
      groupId: "id-1",
      groupName: "Group A",
      createdAt: "20 July 2021",
      members: ["Anurag", "Golu", "anubhav", "molu"],
    },
    {
      groupId: "id-2",
      groupName: "Group B",
      createdAt: "21 July 2021",
      members: ["Mummy", "papa", "golu"],
    },
    {
      groupId: "id-3",
      groupName: "Group C",
      createdAt: "22 July 2021",
      members: ["Anurag", "Golu", "anubhav", "molu"],
    },
    {
      groupId: "id-4",
      groupName: "Group D",
      createdAt: "23 July 2021",
      members: ["Mummy", "papa", "golu"],
    },
  ],
};
const GroupListCard = (props) => {
  return (
    <div className="group-list-card">
      <div className="group-list-card-info">
        Group Name:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.groupName}
        </span>
      </div>
      <div className="group-list-card-info">
        Created At:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.createdAt}
        </span>
      </div>
      <div className="group-list-card-info">
        Group Members:{" "}
        <span className="group-list-card-info-value">
          {props.groupDetail.members.length}
        </span>
      </div>
      <div className="group-list-card-action-button">
        <div>
          <button className="btn btn-info">View</button>
        </div>
        <div>
          <button className="btn btn-info">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default function GroupList() {
  const showGroupDetailCard = () => {
    return data.groupDetails.map((groupDetail) => (
      <GroupListCard groupDetail={groupDetail} key={groupDetail.groupId} />
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
