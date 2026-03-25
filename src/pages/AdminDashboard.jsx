import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Users, Settings, ShoppingBag, TrendingUp, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Optionally protect this route (if not admin, redirect)
    React.useEffect(() => {
        if (!user) {
            navigate('/admin/login');
        } else if (!user.is_staff && !user.is_superuser) {
            navigate('/'); 
        }
    }, [user, navigate]);

    return (
        <div className="admin-dashboard fade-in" style={{ padding: '8rem 2rem 4rem', minHeight: '80vh' }}>
            <div className="container">
                <div className="admin-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <ShieldCheck size={48} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Control Panel</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.first_name || 'Admin'}!</p>
                </div>

                <div className="admin-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    <Link to="/admin/products" className="glass hover-glow" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none', color: 'var(--text-primary)', borderRadius: '1rem', transition: 'all 0.3s ease' }}>
                        <Package size={40} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Manage Products</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Add, edit, or remove products from the catalog</p>
                    </Link>

                    <Link to="/admin/orders" className="glass hover-glow" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none', color: 'var(--text-primary)', borderRadius: '1rem', transition: 'all 0.3s ease' }}>
                        <ShoppingBag size={40} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Orders</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>View and manage customer orders</p>
                    </Link>

                    <Link to="/admin/customers" className="glass hover-glow" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none', color: 'var(--text-primary)', borderRadius: '1rem', transition: 'all 0.3s ease' }}>
                        <Users size={40} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Customers</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Manage user accounts & permissions</p>
                    </Link>

                    <Link to="/admin/analytics" className="glass hover-glow" style={{ padding: '2rem', textAlign: 'center', textDecoration: 'none', color: 'var(--text-primary)', borderRadius: '1rem', transition: 'all 0.3s ease' }}>
                        <TrendingUp size={40} style={{ color: '#d4af37', marginBottom: '1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>Analytics</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>View sales and performance metrics</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
