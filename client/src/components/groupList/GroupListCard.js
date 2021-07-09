import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./groupList.css";

export default function GroupListCard(props) {
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
          <Link
            to={"/group/" + props.groupDetail._id}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" color="primary">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
