import React, { useEffect, useState } from "react";
import { firestore } from "../base";
import UsersForm from "./UsersForm";
const dbUsers = firestore.collection("users");

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditUser = async (userObj) => {
    try {
      if (currentId === "") {
        console.log(userObj);
        await dbUsers.doc().set(userObj);
      } else {
        await dbUsers.doc(currentId).update(userObj);
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = () => {
    dbUsers.onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
        //console.log(docs);
      });
      setUsuarios(docs);
    });
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      console.log(id);
      await dbUsers.doc(id).delete();
      console.log("User Deleted :(");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Users CRUD</h1>
      <UsersForm {...{ addOrEditUser, currentId, usuarios }} />
      <br />
      <br />
      <div className="table-responsive-sm">
        <h2 className="text-center">List of Users</h2>
        <table className="table table-sm table-bordered text-center table-hover">
          <caption>List of Users</caption>
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">User</th>
              <th scope="col">Password</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.user}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => setCurrentId(user.id)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
    </div>
  );
};

export default Users;
