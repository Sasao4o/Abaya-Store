import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ViewProducts from "./pages/ViewProducts";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<div>HOME</div>} />
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/updateproduct/:id" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
