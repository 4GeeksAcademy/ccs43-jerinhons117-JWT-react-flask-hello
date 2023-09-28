import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = async (event) => {
    event.preventDefault();

    let isLogged = await actions.LoginUser(email, password);

    if (isLogged == true) {
      navigate("/demo");
    }
    return console.log("Datos incorrectos");
  };

  return (
    <React.Fragment>
      <div className="container-fluid aa">
        <div className="row vh-100 align-items-center aa d-flex justify-contect-center">
          <div className="col-8 m-auto">
            <h1 className="text-secondary d-flex justify-content-center">
              <strong>LOGIN</strong>
            </h1>
            <form
              className="form-floating w-40 m-5"
              onSubmit={handleLoginUser}
            >
              <div className="greeting mb-4">
                <h2>
                  <strong>Hello, friend!</strong>
                </h2>
              </div>
              <div className="form-floating mb-3 inputsDecoration">
                <input
                  type="email"
                  className="form-control styleInput"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <label htmlFor="floatingInput" className="styleLabel">
                  <i className="fa-solid fa-envelope-open"></i>E-mail
                </label>
              </div>
              <div className="form-floating inputsDecoration">
                <input
                  type="password"
                  className="form-control styleInput"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <label htmlFor="floatingPassword" className="styleLabel">
                  <i className="fa-solid fa-unlock-keyhole"></i>Password
                </label>
              </div>
              <div className="button mb-0 d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-5 buttonss ">
                  Go
                </button>
              </div>
            </form>
            <div className="goRegister d-flex justify-content-center">
              <Link to="/single" className="m-0 p-0">
                <p className="btn btn-danger" href="#" role="button">
                  register here
                </p>
              </Link>
            </div>
          </div>
          <div className="col-4 pageRight p-0">
            <div className="tilte m-5 mt-0">
              <h3 className="fs-1 text-black">Welcome</h3>
              <p className="text-black">
                to JerinhonSites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};