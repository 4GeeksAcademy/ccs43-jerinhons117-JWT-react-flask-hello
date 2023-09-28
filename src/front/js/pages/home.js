import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { SingUp } from "../component/signup.js";
import { Login } from "../component/login.js";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex justify-content-center align-item-center">
			<Login/>
		</div>
	);
};
