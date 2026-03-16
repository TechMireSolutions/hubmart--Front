import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Send } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        alert("Thank you! Your message has been sent to HubMart support.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="container">
                <header className="contact-header">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        CONNECT WITH US
                    </motion.h2>
                </header>

                <div className="contact-grid">
                    {/* Left Side: Contact Information */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="contact-info"
                    >
                        <div className="info-item">
                            <h4>ADDRESS</h4>
                            <p>172 PETTS WOOD ROAD , ORPINGTON ,BR5 1LG, UNITED KINGDOM</p>
                            <div className="contact-divider"></div>
                        </div>

                        <div className="info-item">
                            <h4>PHONE</h4>
                            <p><a href="tel:07377399511">07377399511</a></p>
                            <div className="contact-divider"></div>
                        </div>

                        <div className="info-item">
                            <h4>EMAIL</h4>
                            <p><a href="mailto:info@hubmart.uk">info@hubmart.uk</a></p>
                            <div className="contact-divider"></div>
                        </div>

                        <div className="social-links">
                            <a href="https://facebook.com/HUBMARTUK" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Facebook size={24} />
                            </a>
                            <a href="https://instagram.com/HUBMARTUK" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Instagram size={24} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name <span>*</span></label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label>Email <span>*</span></label>
                                <input 
                                    type="email" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required 
                                />
                            </div>

                            <div className="form-group">
                                <label>Message <span>*</span></label>
                                <textarea 
                                    rows="6" 
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn-premium">
                                SEND MESSAGE
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
