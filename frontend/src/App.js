import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryManagement from "./pages/CategoryManagement";
import CategoryPage from "./pages/CategoryPage";
import ProductListPage from "./pages/ProductListPage";
import HeroManagement from "./pages/HeroManagement";
import PromoManagement from "./pages/PromoManagement";
import ReviewManagement from "./pages/ReviewManagement";
import FooterManagement from "./pages/FooterManagement";
import ShopPage from "./pages/ShopPage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/hero" element={<HeroManagement />} />
        <Route path="/admin/promos" element={<PromoManagement />} />
        <Route path="/admin/reviews" element={<ReviewManagement />} />
        <Route path="/admin/footer" element={<FooterManagement />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:type" element={<ProductListPage />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
