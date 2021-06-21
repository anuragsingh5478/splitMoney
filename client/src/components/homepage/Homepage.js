import React from "react";
import { Link } from "react-router-dom";

import GroupList from "../groupList/GroupList";
export default function Homepage() {
  return (
    <div className="container">
      {/* create new group */}
      <button className="btn btn-warning w-50 text-white">
        <Link to="/create-new-group">Create New Group</Link>
      </button>
      {/* group list */}
      <div>Group List</div>
      <GroupList />
    </div>
  );
}
