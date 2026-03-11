import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { searchProducts } from "../services/productService";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const delayFn = setTimeout(() => {
        searchProducts(searchQuery.trim())
          .then(res => setSuggestions(res.data.slice(0, 5))) // Top 5 suggestions
          .catch(err => console.error(err));
      }, 300); // Debounce
      return () => clearTimeout(delayFn);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery(""); // clear after search
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          SOKA<span>Fashion</span>
        </Link>

        {/* Global Search Bar */}
        <form className="nav-search-form" onSubmit={handleSearch} ref={searchRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="nav-search-input"
          />
          <button type="submit" className="nav-search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions">
              {suggestions.map(item => (
                <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                </li>
              ))}
              <li className="view-all-search" onClick={handleSearch}>
                See all results for "{searchQuery}"
              </li>
            </ul>
          )}

          {showSuggestions && searchQuery.trim().length > 1 && suggestions.length === 0 && (
            <ul className="search-suggestions">
              <li style={{ padding: '10px 15px', color: '#6b7280' }}>No products found for "{searchQuery}"</li>
            </ul>
          )}
        </form>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/admin">Admin</Link>

          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-count">{cartItems.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
