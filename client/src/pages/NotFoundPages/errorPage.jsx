import React from "react";
import { Link } from "react-router-dom";
import "./style/notFoundPage.scss";

const ErrorPage = () => {
  return (
    <div className="Not-Found-page">
      <h2>Error!</h2>
      <p>
        Go to the <Link to="/">HomePage</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
