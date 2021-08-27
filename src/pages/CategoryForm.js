import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as controllers from "../controllers/controllers";

const Categories = () => {
  const { id } = useParams();

  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    (async () => {
      const data = await controllers.getAll("departments");
      setDepartments(data);
      if (id) {
        const data = await controllers.getById("categories", id);
        setDepartment(data.department);
        setName(data.name);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = { name: name, department: department };
    if (!id) {
      await controllers.post("categories", category);
    } else {
      await controllers.putById("categories", id, category);
    }
    toast.success(
      id ? "category updated succesfully" : "category added succesfully",
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
          <h3>{id ? "Update Category" : "Add Category"}</h3>
          <ToastContainer></ToastContainer>
          <form onSubmit={handleSubmit}>
            <h6>Department</h6>
            <select
              className="form-select form-select-md my-2"
              placeholder="Department"
              value={department || ""}
              required
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option value={""} disabled>
                Department
              </option>
              {departments.map(({ name, id }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <h6>Name:</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Write a name for the Category"
              defaultValue={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className="d-grid my-2">
              <button className="btn btn-primary" type="submit">
                {id ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Categories;
