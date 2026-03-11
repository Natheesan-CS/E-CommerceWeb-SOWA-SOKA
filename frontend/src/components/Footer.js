import { useState, useEffect } from "react";
import { getFooterSettings } from "../services/productService";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    const [footerData, setFooterData] = useState(null);

    useEffect(() => {
        getFooterSettings()
            .then(res => {
                if (res.data) setFooterData(res.data);
            })
            .catch(err => console.error("Error fetching footer data", err));
    }, []);

    if (!footerData) return null; // Don't render until loaded

    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>{footerData.aboutText}</p>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Information</h3>
                    <p><strong>Email:</strong> {footerData.contactEmail}</p>
                    <p><strong>Phone:</strong> {footerData.contactPhone}</p>
                    <p><strong>Address:</strong> {footerData.contactAddress}</p>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/admin">Admin Dashboard</Link></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Follow Us</h3>
                    <div className="social-links">
                        {footerData.facebookLink && (
                            <a href={footerData.facebookLink} target="_blank" rel="noreferrer" aria-label="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                        )}
                        {footerData.instagramLink && (
                            <a href={footerData.instagramLink} target="_blank" rel="noreferrer" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        )}
                        {footerData.twitterLink && (
                            <a href={footerData.twitterLink} target="_blank" rel="noreferrer" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} SOKA Fashion. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
