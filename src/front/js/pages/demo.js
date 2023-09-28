import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token == undefined) {
      navigate("/");
    }
  }, []);

  const handleLogOut = () => {
    actions.LogOut();
    navigate("/");
  };

  console.log(store.informationUser);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <h1 className="text-center">
          <strong>Usted esta logeado</strong>
        </h1>
        <br />
      </div>
      <div className="close d-flex justify-content-center">
        <button type="button" className="btn btn-danger" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </React.Fragment>
  );
};
