import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, Menu, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme, currentTheme }) => {
    const { user, logout } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar luxury-nav">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    Hub<span>Mart</span>.uk
                </Link>

                <div className="nav-main">
                    <div className="nav-links-wrapper">
                        <Link to="/" className="nav-link-premium">HOME</Link>
                        <div className="nav-link-premium has-dropdown">
                            CATEGORIES <ChevronDown size={14} />
                            <div className="dropdown-menu">
                                <Link to="/products?cat=grocery">GROCERY</Link>
                                <Link to="/products?cat=biscuits">BISCUITS</Link>
                                <Link to="/products?cat=crisps">CRISPS</Link>
                                <Link to="/products?cat=drinks">DRINKS</Link>
                                <Link to="/products?cat=gum-care">GUM CARE</Link>
                                <Link to="/products?cat=medicine">MEDICINE</Link>
                                <Link to="/products?cat=sweets">SWEETS</Link>
                                <Link to="/products?cat=vegetable">VEGETABLE</Link>
                            </div>
                        </div>
                        <Link to="/contact" className="nav-link-premium">CONTACT US</Link>
                        <Link to="/about-us" className="nav-link-premium">ABOUT US</Link>
                    </div>

                    <div className="nav-actions-premium">
                        <button className="icon-btn-premium theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                            {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button className="icon-btn-premium search-trigger"><Search size={20} /></button>

                        <Link to="/cart" className="icon-btn-premium cart-trigger">
                            <ShoppingCart size={22} />
                            {items.length > 0 && <span className="cart-badge-luxury">{items.length}</span>}
                        </Link>

                        {user ? (
                            <div className="user-control-premium">
                                <Link to="/profile" className="user-name">
                                    <User size={20} /> {user.first_name || 'Account'}
                                </Link>
                                <button onClick={() => { logout(); navigate('/'); }} className="logout-trigger">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-signin-luxury">SIGN IN</Link>
                        )}

                        <button className="mobile-toggle"><Menu size={24} /></button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
