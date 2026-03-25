import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import SupportWidget from './components/SupportWidget';
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const Success = React.lazy(() => import('./pages/Success'));
const Cancel = React.lazy(() => import('./pages/Cancel'));
const AdminProducts = React.lazy(() => import('./pages/AdminProducts'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const AdminOrders = React.lazy(() => import('./pages/AdminOrders'));
const AdminCustomers = React.lazy(() => import('./pages/AdminCustomers'));
const AdminAnalytics = React.lazy(() => import('./pages/AdminAnalytics'));
const Shipping = React.lazy(() => import('./pages/Shipping'));
const Returns = React.lazy(() => import('./pages/Returns'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Terms = React.lazy(() => import('./pages/Terms'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Profile = React.lazy(() => import('./pages/Profile'));
import './styles/index.css';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SocketProvider>
            <div className={`app ${theme}`}>
              <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
              <main>
                <React.Suspense fallback={<div className="loader" style={{ padding: '8rem', textAlign: 'center' }}>Initializing...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/success" element={<Success />} />
                    <Route path="/checkout/cancel" element={<Cancel />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/customers" element={<AdminCustomers />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </React.Suspense>
              </main>

              <SupportWidget />

              <footer className="footer-premium">
                <div className="container footer-grid">
                  {/* OUR GOAL */}
                  <div className="footer-col">
                    <h4>Our Goal</h4>
                    <p>
                      HubMart brings the world's flavors to Orpington, ensuring quality and authenticity in every product.
                    </p>
                  </div>

                  {/* HOURS */}
                  <div className="footer-col">
                    <h4>Hours</h4>
                    <div className="footer-info">
                      <p>Mon - Thu: 9 AM - 8 PM</p>
                      <p>Fri - Sun: 9 AM - 9 PM</p>
                    </div>
                    <div className="footer-socials">
                      <a href="https://www.instagram.com/HUBMARTUK" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                      <a href="https://www.facebook.com/HUBMARTUK" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="footer-col">
                    <h4>Location</h4>
                    <p className="footer-info flex-gap">
                      <MapPin size={20} className="accent-icon" />
                      <span>172 Petts Wood Road, BR5-1LG, Orpington, UNITED KINGDOM</span>
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div className="footer-col">
                    <h4>Contact</h4>
                    <div className="footer-contact-links">
                      <a href="tel:+447377399511">
                        <Phone size={18} className="accent-icon" /> +44 7377 399511
                      </a>
                      <a href="mailto:info@hubmart.uk">
                        <Mail size={18} className="accent-icon" /> info@hubmart.uk
                      </a>
                    </div>
                    <a href="https://wa.me/447377399511" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                      <MessageCircle size={22} fill="white" /> CONTACT US
                    </a>
                  </div>
                </div>

                <div className="footer-bottom">
                  <p>
                    © 2026 | HubMart | Developed by Techmire Solutions
                  </p>
                </div>
              </footer>
            </div>
                </SocketProvider>
              </CartProvider>
            </AuthProvider>
          </Router>
  );
};

export default App;
