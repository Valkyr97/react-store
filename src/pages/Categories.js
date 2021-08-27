import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as controllers from "../controllers/controllers";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await controllers.getAll("categories");
      setCategories(data);
    })();
  }, [categories]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th>Department</th>
            <th scope="col" colSpan="2">
              <Link to="/categoryForm">
                <i className="bi bi-plus-circle h4"></i>{" "}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id, name, department }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{department}</td>
              <td>
                <Link to={`/categoryForm/${id}`}>
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
                    await controllers.delById("categories", id);
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

export default Categories;
