import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ViewProduct from "./pages/ViewProduct";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <ShoppingCartProvider>
      <SkeletonTheme baseColor="#F7F7F7" highlightColor="#eaeaea">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/collections/:collectionName"
              element={<Collection />}
            />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search/:prdName" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </SkeletonTheme>
    </ShoppingCartProvider>
  );
}

export default App;
