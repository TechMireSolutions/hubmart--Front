import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';
import '../styles/index.css';

const AdminOrders = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/admin/login');
            } else if (!user.is_staff && !user.is_superuser) {
                navigate('/');
            }
        }
    }, [user, loading, navigate]);
    // Mock data for demonstration until backend is connected
    const [orders, setOrders] = useState([
        { id: 'ORD-9821', customer: 'John Doe', total: '£45.99', status: 'Pending', date: '2026-03-25' },
        { id: 'ORD-9820', customer: 'Sarah Smith', total: '£12.50', status: 'Completed', date: '2026-03-24' },
        { id: 'ORD-9819', customer: 'Michael Brown', total: '£89.99', status: 'Completed', date: '2026-03-23' },
        { id: 'ORD-9818', customer: 'Emma Wilson', total: '£24.00', status: 'Cancelled', date: '2026-03-22' },
    ]);
    const [search, setSearch] = useState('');

    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(search.toLowerCase()) || 
        order.customer.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch(status) {
            case 'Completed': return <CheckCircle size={16} style={{ color: '#4caf50' }} />;
            case 'Pending': return <Clock size={16} style={{ color: '#ff9800' }} />;
            case 'Cancelled': return <XCircle size={16} style={{ color: '#f44336' }} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="fade-in" style={{ padding: '8rem 2rem 4rem', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Package style={{ color: '#d4af37' }} /> Order Management
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>View and manage customer orders</p>
                </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', marginBottom: '1.5rem', background: 'var(--bg-dark)', padding: '0.5rem 1rem', borderRadius: '0.5rem', alignItems: 'center' }}>
                    <Search size={20} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID or Customer..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                    />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Order ID</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Customer</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Date</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Status</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Total</th>
                                <th style={{ padding: '1rem', color: '#d4af37', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? filteredOrders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.id}</td>
                                    <td style={{ padding: '1rem' }}>{order.customer}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{order.date}</td>
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {getStatusIcon(order.status)}
                                        {order.status}
                                    </td>
                                    <td style={{ padding: '1rem' }}>{order.total}</td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                                        <button className="btn-primary" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #d4af37', color: '#d4af37' }}>
                                            View <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
