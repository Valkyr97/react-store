import { Switch, Route } from "react-router-dom";

import stock from "./pages/Stock";
import ProductForm from './pages/ProductForm'

import Categories from './pages/Categories'
import CategoryForm from './pages/CategoryForm'

import Departments from './pages/Departments'
import DepartmentForm from './pages/DepartmentForm'

import Navbar from "./components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import "react-toastify/dist/ReactToastify.min.css"
import "./App.css";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={stock} exact />
          <Route path="/productForm" component={ProductForm} exact />
          <Route path="/productForm/:id" component={ProductForm} />

          <Route path="/categories" component={Categories} />
          <Route path="/categoryForm" component={CategoryForm} exact />
          <Route path="/categoryForm/:id" component={CategoryForm} />

          <Route path="/departments" component={Departments} />
          <Route path="/departmentForm" component={DepartmentForm} exact />
          <Route path="/departmentForm/:id" component={DepartmentForm} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
