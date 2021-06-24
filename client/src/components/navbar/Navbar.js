import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./navbar.css";
export default function Navbar({ logout }) {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">SplitMoney</Link>
        <Button
          onClick={() => logout()}
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
