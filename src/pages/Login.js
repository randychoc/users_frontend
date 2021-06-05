import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { auth } from "../base";
import { AuthContext } from "../Auth.js";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container px-5 py-5 mt-5">
      <h1 className="text-center">Log In</h1>
      <form onSubmit={handleLogin} className="px-5 py-2">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      {/* <a href="/signup">
        <button className="btn btn-warning ml-2">Sign Up</button>
      </a> */}
    </div>
  );
};

export default withRouter(Login);
