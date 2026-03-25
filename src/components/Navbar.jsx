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
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsSearchOpen(false);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <nav className="navbar luxury-nav">
            <div className="container nav-content">
                <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
                    Hub<span>Mart</span>.uk
                </Link>

                <div className={`nav-main ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    <div className="nav-links-wrapper">
                        <Link to="/" className="nav-link-premium" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                        <div className="nav-link-premium has-dropdown">
                            CATEGORIES <ChevronDown size={14} className="hidden-mobile" />
                            <div className="dropdown-menu">
                                <Link to="/products?cat=grocery" onClick={() => setIsMobileMenuOpen(false)}>GROCERY</Link>
                                <Link to="/products?cat=biscuits" onClick={() => setIsMobileMenuOpen(false)}>BISCUITS</Link>
                                <Link to="/products?cat=crisps" onClick={() => setIsMobileMenuOpen(false)}>CRISPS</Link>
                                <Link to="/products?cat=drinks" onClick={() => setIsMobileMenuOpen(false)}>DRINKS</Link>
                                <Link to="/products?cat=gum-care" onClick={() => setIsMobileMenuOpen(false)}>GUM CARE</Link>
                                <Link to="/products?cat=medicine" onClick={() => setIsMobileMenuOpen(false)}>MEDICINE</Link>
                                <Link to="/products?cat=sweets" onClick={() => setIsMobileMenuOpen(false)}>SWEETS</Link>
                                <Link to="/products?cat=vegetable" onClick={() => setIsMobileMenuOpen(false)}>VEGETABLE</Link>
                            </div>
                        </div>
                        <Link to="/contact" className="nav-link-premium" onClick={() => setIsMobileMenuOpen(false)}>CONTACT US</Link>
                        <Link to="/about-us" className="nav-link-premium" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
                        {user && (user.is_staff || user.is_superuser) && <Link to="/admin/dashboard" className="nav-link-premium" style={{ color: '#d4af37' }} onClick={() => setIsMobileMenuOpen(false)}>ADMIN</Link>}
                        
                        {/* Mobile specific profile link since it's hidden in actions wrapper */}
                        {user && (
                            <Link to="/profile" className="nav-link-premium visible-mobile" onClick={() => setIsMobileMenuOpen(false)}>
                                MY PROFILE
                            </Link>
                        )}
                        {user && (
                            <button 
                                onClick={() => { logout(); navigate('/'); setIsMobileMenuOpen(false); }} 
                                className="nav-link-premium visible-mobile"
                                style={{ textAlign: 'left', width: '100%', border: 'none', background: 'none' }}
                            >
                                SIGN OUT
                            </button>
                        )}
                    </div>

                    <div className="nav-actions-premium">
                        <div className="action-buttons">
                            <button className="icon-btn-premium theme-toggle" onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }} title="Toggle Theme">
                                {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            <div className={`search-container-premium ${isSearchOpen ? 'active' : ''}`}>
                                <form onSubmit={handleSearch}>
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus={isSearchOpen}
                                    />
                                </form>
                                <button className="icon-btn-premium search-trigger" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <Search size={20} />
                                </button>
                            </div>

                            <Link to="/cart" className="icon-btn-premium cart-trigger" onClick={() => setIsMobileMenuOpen(false)}>
                                <ShoppingCart size={22} />
                                {items.length > 0 && <span className="cart-badge-luxury">{items.length}</span>}
                            </Link>
                        </div>

                        {user ? (
                            <div className="user-control-premium hidden-mobile">
                                <Link to="/profile" className="user-name">
                                    <div className="user-avatar-wrapper">
                                        <User size={20} />
                                        <span className="active-dot"></span>
                                    </div>
                                    {user.first_name || 'Account'}
                                </Link>
                                <button onClick={() => { logout(); navigate('/'); }} className="logout-trigger">
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-signin-luxury" onClick={() => setIsMobileMenuOpen(false)}>SIGN IN</Link>
                        )}
                    </div>
                </div>
                
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
