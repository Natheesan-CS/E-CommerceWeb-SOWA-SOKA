import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMainCategories, getHeroSection, getNewArrivals, getPromoBanners, getCustomerReviews } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import HeroCarousel from "../components/HeroCarousel";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const [newArrivals, setNewArrivals] = useState([]);
  const [promos, setPromos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all home page data concurrently
    Promise.all([
      getMainCategories(),
      getHeroSection(),
      getNewArrivals(),
      getPromoBanners(),
      getCustomerReviews()
    ]).then(([catRes, heroRes, arrivalsRes, promosRes, reviewsRes]) => {
      setCategories(catRes.data);
      setHeroData(heroRes.data);
      setNewArrivals(arrivalsRes.data);
      setPromos(promosRes.data);
      setReviews(reviewsRes.data);
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching home page data", err);
      setLoading(false);
    });
  }, []);

  // Prepare slides for the carousel (Hero + Promos)
  const carouselSlides = [];
  if (heroData) carouselSlides.push(heroData);
  // Also add promos to the hero carousel for a dynamic experience
  if (promos && promos.length > 0) {
    promos.forEach(p => carouselSlides.push(p));
  }

  return (
    <div className="home page-transition">
      {/* Hero Carousel Section */}
      {carouselSlides.length > 0 && (
        <HeroCarousel slides={carouselSlides} />
      )}

      {/* Categories Section */}
      <section id="categories" className="categories-section">
        <h2>Shop by Category</h2>
        {loading ? (
          <div className="skeleton-grid">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="category-grid">
            {categories.map((cat) => (
              <Link to={`/category/${cat.name}`} key={cat.id} className="category-card" style={{ backgroundImage: `url(${cat.imageUrl})` }}>
                <div className="category-overlay">
                  <h3>{cat.name}'s Collection</h3>
                  <p>{cat.description}</p>
                  <span className="shop-link">Shop Collection →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="new-arrivals-section">
          <h2>New Arrivals</h2>
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="reviews-section">
          <h2>What Our Customers Say</h2>
          <div className="reviews-container">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-stars">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="review-text">"{review.reviewText}"</p>
                <p className="review-author">- {review.customerName}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
