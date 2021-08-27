import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as controllers from "../controllers/controllers";

const Stock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await controllers.getAll("products");
      setProducts(data);
    })();
  }, [products]);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Cost</th>
            <th scope="col">Department</th>
            <th scope="col">Category</th>
            <th scope="col" colSpan="2">
              <Link to="/productForm">
                <i className="bi bi-plus-circle h4"></i>{" "}
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, cost, department, category }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{cost}</td>
              <td>{department}</td>
              <td>{category}</td>
              <td>
                <Link to={`/productForm/${id}`}>
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
                    await controllers.delById("products", id);
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
};

export default Stock;
