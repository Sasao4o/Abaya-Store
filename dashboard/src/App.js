import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";
import ViewCollections from "./pages/ViewCollections";
import AddCollection from "./pages/AddCollection";
import ViewOrders from "./pages/ViewOrders";
import AddDiscount from "./pages/AddDiscount";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

function App() {
  const { userData } = useContext(UserContext);
  return (
    <div className="App">
      <Router basename="/dashboard">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              userData.isAuthenticated ? <Home /> : <Navigate to="/signin" />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/products"
            element={
              userData.isAuthenticated ? (
                <ViewProducts />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/addproduct"
            element={
              userData.isAuthenticated ? (
                <AddProduct />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/collections"
            element={
              userData.isAuthenticated ? (
                <ViewCollections />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/orders"
            element={
              userData.isAuthenticated ? (
                <ViewOrders />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/adddiscount"
            element={
              userData.isAuthenticated ? (
                <AddDiscount />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/collections/addcollection"
            element={
              userData.isAuthenticated ? (
                <AddCollection />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
