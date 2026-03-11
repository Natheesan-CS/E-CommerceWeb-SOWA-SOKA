import { useState, useEffect } from 'react';
import './HeroCarousel.css';

function HeroCarousel({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play interval
    useEffect(() => {
        if (!slides || slides.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [slides]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    if (!slides || slides.length === 0) return null;

    return (
        <div className="carousel-container">
            <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="carousel-slide"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${slide.imageUrl})`
                        }}
                    >
                        <div className="carousel-content page-transition">
                            <h1>{slide.title}</h1>
                            <p>{slide.description || slide.subtitle}</p>
                            <a href={slide.buttonLink} className="carousel-btn">
                                {slide.buttonText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <>
                    <button className="carousel-arrow left" onClick={prevSlide}>
                        &#10094;
                    </button>
                    <button className="carousel-arrow right" onClick={nextSlide}>
                        &#10095;
                    </button>
                </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="carousel-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HeroCarousel;
