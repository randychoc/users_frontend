import React from "react";
import { auth } from "../base";
import "../styles/Users.css";
import Users from "../components/Users";

const Home = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-light bg-light">
        <div className="ml-5 py-2">
          <img
            src="https://blautech.us/wp-content/uploads/2018/11/logo-00.png"
            alt="Blautech Logo"
            width="110"
            height="40"
          />
        </div>
        <form className="form-inline mr-3 py-2">
          <button className="btn btn-dark" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </form>
      </nav>

      <div className="mt-5 pt-3">
        <Users />
      </div>
    </div>
  );
};

export default Home;
