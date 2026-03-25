import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const AdminAnalytics = () => {
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
    // Static dashboard data for visual completion
    const stats = [
        { label: 'Total Revenue', value: '£12,450', change: '+15.3%', positive: true, icon: <DollarSign size={24} style={{ color: '#d4af37' }} /> },
        { label: 'Active Customers', value: '1,244', change: '+5.2%', positive: true, icon: <Users size={24} style={{ color: '#3b82f6' }} /> },
        { label: 'Total Orders', value: '842', change: '-2.1%', positive: false, icon: <ShoppingBag size={24} style={{ color: '#ec4899' }} /> },
        { label: 'Conversion Rate', value: '3.4%', change: '+0.8%', positive: true, icon: <TrendingUp size={24} style={{ color: '#10b981' }} /> },
    ];

    const recentSales = [
        { product: 'Tate & Lyle Sugar', amount: '£4.50', status: 'Completed', time: '2 mins ago' },
        { product: 'McVitie\'s Digestives', amount: '£2.80', status: 'Completed', time: '15 mins ago' },
        { product: 'Yorkshire Tea Bags', amount: '£6.20', status: 'Pending', time: '1 hour ago' },
        { product: 'Walkers Crisps Multipack', amount: '£3.50', status: 'Completed', time: '3 hours ago' },
    ];

    return (
        <div className="fade-in" style={{ padding: '8rem 2rem 4rem', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp style={{ color: '#d4af37' }} /> Analytics Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Key performance metrics for your marketplace</p>
                </div>
                <div style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid #d4af37', color: '#d4af37', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    LAST 30 DAYS
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--bg-dark)', padding: '0.8rem', borderRadius: '0.5rem' }}>
                                {stat.icon}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: stat.positive ? '#10b981' : '#f44336', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <h2 style={{ fontSize: '2rem', margin: '0 0 0.2rem 0', fontWeight: 'bold' }}>{stat.value}</h2>
                            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                {/* Visual Chart Placeholder Area */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Recent Transactions</h3>
                    <div>
                        {recentSales.map((sale, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: i === recentSales.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.3rem 0' }}>{sale.product}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{sale.time}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold', color: '#d4af37' }}>{sale.amount}</div>
                                    <div style={{ fontSize: '0.8rem', color: sale.status === 'Completed' ? '#4caf50' : '#ff9800' }}>{sale.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
