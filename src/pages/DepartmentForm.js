import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as controllers from "../controllers/controllers";

const Departments = () => {
  const { id } = useParams();
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      if (id) {
        const data = controllers.getById("departments", id);
        setName(data.name);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const department = { name: name };
    if (!id) {
      await controllers.post("departments", department);
    } else {
      await controllers.putById("departments", id, department);
    }
    toast.success(
      id ? "department updated succesfully" : "department added succesfully",
      {
        position: "top-left",
        autoClose: 2300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="col-md-10 offset-md-1">
      <div className="card rounded-0 p-4 bg-light">
        <div className="card-body">
          <h3>{id ? "Update Department" : "Add Department"}</h3>
          <ToastContainer></ToastContainer>
          <form onSubmit={handleSubmit}>
            <h6>Name:</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Write a name for the Department"
              defaultValue={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="d-grid my-2">
              <button className="btn btn-primary" type="submit">
                {id ? "Update Department" : "Add Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Departments;
