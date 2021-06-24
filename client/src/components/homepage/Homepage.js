import React from "react";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import "./homepage.css";

import GroupList from "../groupList/GroupList";
export default function Homepage() {
  return (
    <div className="container ">
      {/* create new group */}

      <div className="create-new-group-button">
        <a
          className="create-new-group-button-link"
          href="/create-new-group"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<CreateIcon />}
          >
            Create New Group
          </Button>
        </a>
      </div>

      {/* group list */}
      <div className="text-center h3">Group List</div>
      <GroupList />
    </div>
  );
}
