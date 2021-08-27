import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as controllers from "../controllers/controllers";

const ProductsForm = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [cost, setCost] = useState();
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    (async () => {
      const deps = await controllers.getAll("departments");
      setDepartments(deps);
      if (id) {
        const data = await controllers.getById("products", id);
        setName(data.name);
        setCost(data.cost);
        setDepartment(data.department);
        setCategory(data.category);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const categories = await controllers.getAll(
        `categories?department=${department}`
      );
      setCategories(categories);
    })();
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name: name,
      cost: cost,
      department: department,
      category: category,
    };
    if (!id) {
      await controllers.post("products", product);
    } else {
      await controllers.putById("products", id, product);
    }
    toast.success(
      id ? "product updated succesfully" : "product added succesfully",
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
          <h3>{id ? "Update Product" : "Add Product"}</h3>
          <ToastContainer></ToastContainer>
          <form onSubmit={handleSubmit}>
            {/* Name Section */}
            <div className="col-md-12 row my-2">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name:
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a name for the product"
                  id="name"
                  defaultValue={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Cost Section */}
            <div className="col-md-12 row my-2">
              <label htmlFor="price" className="col-sm-2 col-form-label">
                Price:
              </label>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Select a price for the product"
                  id="price"
                  defaultValue={cost}
                  required
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                />
              </div>
            </div>

            <h6 className="text-center">
              Select a Department and a Category for the product
            </h6>

            {/* Department Section */}
            <div className="col-md-12 row">
              <div className="col">
                <label htmlFor="department">Department:</label>
                <select
                  className="form-select my-2"
                  id="department"
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
              </div>

              {/* Category Section */}
              <div className="col">
                <label htmlFor="category">Category:</label>
                <select
                  className="form-select my-2"
                  id="category"
                  disabled={!department} // No permite seleccionar una categoria a no ser que exista un departamento seleccionado
                  value={category || ""}
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={""} disabled>
                    Category
                  </option>
                  {categories.map(({ name, id }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-grid my-2">
              <button className="btn btn-primary" type="submit">
                {id ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsForm;
