import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import SupportWidget from './components/SupportWidget';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import AdminProducts from './pages/AdminProducts';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <CartProvider>
            <div className="app">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<Success />} />
                  <Route path="/checkout/cancel" element={<Cancel />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/profile" element={<div className="container" style={{ padding: '5rem' }}><h2>Profile Page Coming Soon</h2><Link to="/" className="btn-primary" style={{ marginTop: '2rem' }}>Back Home</Link></div>} />
                </Routes>
              </main>

              <SupportWidget />

              <footer style={{ background: '#0f172a', color: 'white', padding: '5rem 0 2rem', marginTop: '6rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '4rem' }}>
                  {/* OUR GOAL */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Our Goal</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6' }}>
                      HubMart brings the world's flavors to Orpington, ensuring quality and authenticity in every product.
                    </p>
                  </div>

                  {/* HOURS */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Hours</h4>
                    <div style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.8' }}>
                      <p>Mon - Thu: 9 AM - 8 PM</p>
                      <p>Fri - Sun: 9 AM - 9 PM</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <a href="https://www.instagram.com/HUBMARTUK" style={{ color: 'white', opacity: 0.6 }}><Instagram size={20} /></a>
                      <a href="https://www.facebook.com/HUBMARTUK" style={{ color: 'white', opacity: 0.6 }}><Facebook size={20} /></a>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Location</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6', display: 'flex', gap: '0.75rem' }}>
                      <MapPin size={20} style={{ flexShrink: 0, color: '#d4af37' }} />
                      <span>172 Petts Wood Road, BR5-1LG, Orpington, UNITED KINGDOM</span>
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div>
                    <h4 style={{ color: '#d4af37', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Contact</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <a href="tel:+447377399511" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Phone size={18} style={{ color: '#d4af37' }} /> +44 7377 399511
                      </a>
                      <a href="mailto:info@hubmart.uk" style={{ color: 'white', opacity: 0.8, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Mail size={18} style={{ color: '#d4af37' }} /> info@hubmart.uk
                      </a>
                    </div>
                    <a href="https://wa.me/447377399511" target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.75rem', 
                      background: '#00D95F', 
                      color: 'white', 
                      padding: '0.75rem 1.5rem', 
                      borderRadius: '8px', 
                      textDecoration: 'none',
                      fontWeight: '600',
                      width: 'fit-content',
                      transition: '0.3s'
                    }}>
                      <MessageCircle size={22} fill="white" /> CONTACT US
                    </a>
                  </div>
                </div>
                
                <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ opacity: 0.5, fontSize: '0.85rem', letterSpacing: '1px' }}>
                        © 2026 | HubMart |
                    </p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
