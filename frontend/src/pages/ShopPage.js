import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts, searchProducts, getMainCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import Breadcrumbs from "../components/Breadcrumbs";
import "./ShopPage.css";

function ShopPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    // If the user came from a category link like /shop?category=Men
    const initialCategory = queryParams.get("category") || "";

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortOption, setSortOption] = useState("newest"); // newest, price-asc, price-desc

    // Dynamic Filter Options
    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);
    const [maxPossiblePrice, setMaxPossiblePrice] = useState(1000);

    // 1. Fetch data
    useEffect(() => {
        setLoading(true);
        const fetchPromise = searchQuery ? searchProducts(searchQuery) : getAllProducts();

        Promise.all([fetchPromise, getMainCategories()])
            .then(([prodRes, catRes]) => {
                const products = prodRes.data;
                setAllProducts(products);
                setAvailableCategories(catRes.data.map(c => c.name));

                // Extract unique sizes, colors, and max price for the filter sidebar
                let sizes = new Set();
                let colors = new Set();
                let maxP = 0;

                products.forEach(p => {
                    if (p.sizes) p.sizes.split(",").map(s => s.trim()).forEach(s => sizes.add(s));
                    if (p.colors) p.colors.split(",").map(c => c.trim()).forEach(c => colors.add(c));
                    if (p.price > maxP) maxP = p.price;
                });

                setAvailableSizes(Array.from(sizes).filter(Boolean).sort());
                setAvailableColors(Array.from(colors).filter(Boolean).sort());
                const roundedMax = Math.ceil(maxP / 10) * 10 || 100;
                setMaxPossiblePrice(roundedMax);
                setPriceRange({ min: 0, max: roundedMax });

                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching shop data", err);
                setLoading(false);
            });
    }, [searchQuery]);

    // Update categories if URL changes
    useEffect(() => {
        if (initialCategory && !selectedCategories.includes(initialCategory)) {
            setSelectedCategories([initialCategory]);
        }
    }, [initialCategory]);

    // 2. Apply Filters (Client-side)
    const filteredProducts = useMemo(() => {
        let result = allProducts;

        // Category Filter
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Size Filter
        if (selectedSizes.length > 0) {
            result = result.filter(p => {
                if (!p.sizes) return false;
                const pSizes = p.sizes.split(",").map(s => s.trim());
                return selectedSizes.some(s => pSizes.includes(s));
            });
        }

        // Color Filter
        if (selectedColors.length > 0) {
            result = result.filter(p => {
                if (!p.colors) return false;
                const pColors = p.colors.split(",").map(c => c.trim().toLowerCase());
                return selectedColors.some(c => pColors.includes(c.toLowerCase()));
            });
        }

        // Price Filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Sorting
        if (sortOption === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === "newest") {
            result.sort((a, b) => b.id - a.id);
        }

        return result;
    }, [allProducts, selectedCategories, selectedSizes, selectedColors, priceRange, sortOption]);

    // Handlers
    const toggleFilter = (setter, stateList, value) => {
        if (stateList.includes(value)) {
            setter(stateList.filter(item => item !== value));
        } else {
            setter([...stateList, value]);
        }
    };

    return (
        <div className="shop-page-container page-transition">
            <Breadcrumbs />
            <div className="shop-header">
                <h2>{searchQuery ? `Search Results for "${searchQuery}"` : "All Products"}</h2>
                <div className="shop-controls">
                    <span className="result-count">{filteredProducts.length} Products Found</span>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
                        <option value="newest">Sort By: Newest</option>
                        <option value="price-asc">Sort By: Price (Low to High)</option>
                        <option value="price-desc">Sort By: Price (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className="shop-layout">
                {/* Sidebar Filters */}
                <aside className="shop-sidebar">
                    <div className="filter-group">
                        <h3>Categories</h3>
                        {availableCategories.map(cat => (
                            <label key={cat} className="filter-label">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleFilter(setSelectedCategories, selectedCategories, cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h3>Price Range</h3>
                        <div className="price-inputs">
                            <input
                                type="number"
                                value={priceRange.min}
                                min="0"
                                max={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            />
                            <span> - </span>
                            <input
                                type="number"
                                value={priceRange.max}
                                min={priceRange.min}
                                max={maxPossiblePrice}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max={maxPossiblePrice}
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            className="price-slider"
                        />
                    </div>

                    {availableSizes.length > 0 && (
                        <div className="filter-group">
                            <h3>Sizes</h3>
                            <div className="checkbox-grid">
                                {availableSizes.map(size => (
                                    <label key={size} className="filter-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedSizes.includes(size)}
                                            onChange={() => toggleFilter(setSelectedSizes, selectedSizes, size)}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {availableColors.length > 0 && (
                        <div className="filter-group">
                            <h3>Colors</h3>
                            <div className="color-options">
                                {availableColors.map(color => (
                                    <button
                                        key={color}
                                        className={`color-filter-btn ${selectedColors.includes(color) ? 'active' : ''}`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        onClick={() => toggleFilter(setSelectedColors, selectedColors, color)}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        className="clear-filters-btn"
                        onClick={() => {
                            setSelectedCategories([]);
                            setSelectedSizes([]);
                            setSelectedColors([]);
                            setPriceRange({ min: 0, max: maxPossiblePrice });
                        }}
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Main Product Grid */}
                <main className="shop-main">
                    {loading ? (
                        <div className="skeleton-grid">
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="no-results">
                            <h3>No products match your filters.</h3>
                            <p>Try adjusting your search criteria or clearing filters.</p>
                        </div>
                    ) : (
                        <div className="filtered-product-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ShopPage;
