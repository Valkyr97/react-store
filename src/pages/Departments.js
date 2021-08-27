import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as controllers from "../controllers/controllers";

function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await controllers.getAll("departments");
      setDepartments(data);
    })();
  }, [departments]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col" colSpan="2">
              <Link to="/departmentForm">
                <i className="bi bi-plus-circle h4"></i>{" "}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map(({ id, name }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>
                <Link to={`/departmentForm/${id}`}>
                  <i className="bi bi-pencil-square h5"></i>
                </Link>
              </td>
              <td
                onClick={async () => {
                  if (
                    window.confirm(
                      `Are you sure that you want to delete ${name} category`
                    )
                  ) {
                    await controllers.delById("departments", id);
                  }
                }}
              >
                <button className="btn btn-link">
                  <i className="bi bi-trash h5"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;
