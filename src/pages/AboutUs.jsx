import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-page fade-in">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="about-hero-content"
                    >
                        <h1 className="luxury-title">About <span>Us</span></h1>
                        <h2 className="luxury-subtitle">Your Gateway to Global Groceries</h2>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section container">
                <div className="story-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="story-text"
                    >
                        <p>
                            HubMart began as a humble venture, driven by a vision to provide authentic international groceries to the local community. Recognizing a gap in the market for diverse grocery options, our founder sought out quality products from around the world. With painstaking effort, HubMart opened its doors, quickly becoming a beacon for culinary enthusiasts and home cooks alike.
                        </p>
                        <p>
                            We have proudly served a diverse clientele, from families seeking familiar national products to adventurous cooks exploring new cuisines. Our customers come from various backgrounds, united by their love for authentic, quality ingredients. HubMart has established itself as a trusted resource for anyone looking to elevate their culinary creations with genuine international flavors.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="story-image"
                    >
                        <img src="/about-hero.png" alt="Rustic wooden shelves with spices" className="premium-img" />
                        <div className="img-overlay-accent"></div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us">
                <div className="container">
                    <div className="section-header centered">
                        <span className="badge">Why Choose HubMart?</span>
                        <p className="intro-text">Exceptional selection of international groceries. Experience quality ingredients that inspire culinary creativity.</p>
                    </div>

                    <div className="why-grid">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="why-card glass"
                        >
                            <div className="why-icon"><Globe size={32} /></div>
                            <h3>Diverse Product Range</h3>
                            <p>Explore a vast array of products from around the world. Whether it's Indian spices or European delicacies, we have it all.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="why-card glass"
                        >
                            <div className="why-icon"><Sparkles size={32} /></div>
                            <h3>Authentic Ingredients</h3>
                            <p>We source genuine products to ensure your recipes taste as they should. Taste the authenticity in every bite.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="why-card glass"
                        >
                            <div className="why-icon"><Heart size={32} /></div>
                            <h3>Unmatched Customer Service</h3>
                            <p>Our dedicated team is here to assist you. Enjoy a shopping experience that feels personal and caring.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section container">
                <div className="cta-card glass">
                    <h2>Ready to elevate your cooking?</h2>
                    <p>Join thousands of home cooks who trust HubMart for their artisanal ingredients.</p>
                    <div className="cta-btns">
                        <button className="btn-primary">Shop Now</button>
                        <button className="btn-outline">Contact Us</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
