import React, { useState, useEffect } from "react";
import { firestore } from "../base";
const dbUsers = firestore.collection("users");

const UsersForm = (props) => {
  const initialStateValues = {
    name: "",
    email: "",
    user: "",
    password: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditUser(values);
    setValues(initialStateValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getUserById = async (id) => {
    const doc = await dbUsers.doc(id).get();
    console.log(doc.data());
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getUserById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={handleInputChange}
            value={values.name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            className="form-control"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label>User: </label>
          <input
            type="text"
            placeholder="user"
            name="user"
            onChange={handleInputChange}
            value={values.user}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="text"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={values.password}
            className="form-control"
          />
        </div>
        <button className="btn btn-success">
          {props.currentId === "" ? "Save User" : "Update User"}
        </button>
      </form>
    </div>
  );
};

export default UsersForm;
