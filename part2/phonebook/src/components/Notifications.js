import React from "react";

const Notifications = ({ message }) => {
  const error = {
    color: "red",
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "red",
    padding: 10,
    marginBottom: 10
  };

  const success = {
    color: "green",
    background: "lightgrey",
    borderStyle: "solid",
    borderColor: "green",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  if (message === null) {
    return null;
  } else if (message.type === "error") {
    return <div style={error}>{message.msg}</div>;
  } else if (message.type === "success") {
    return <div style={success}>{message.msg}</div>;
  }
};

export default Notifications;
