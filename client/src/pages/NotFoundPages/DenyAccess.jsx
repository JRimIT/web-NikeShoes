import React from "react";
import { Link } from "react-router-dom";
import "./style/notFoundPage.scss";

const DenyAccess = () => {
  return (
    <div className="Not-Found-page">
      <h2>Not authorization!</h2>
      <p>
        Go to the <Link to="/">HomePage</Link>
      </p>
    </div>
  );
};

export default DenyAccess;
