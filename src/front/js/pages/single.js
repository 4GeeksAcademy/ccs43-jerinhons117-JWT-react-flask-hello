import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { SingUp } from "../component/signup.js";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return (
    <React.Fragment>
      <div className="text-center vh-100 m-0 p-0">
        <SingUp />
      </div>
    </React.Fragment>
  );
};