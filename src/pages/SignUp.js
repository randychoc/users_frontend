import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { auth } from "../base";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target;
      try {
        await auth.createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="container px-5 py-5 mt-5">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={handleSignUp} className="px-5 py-2">
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
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
