import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Shield, Ban, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const AdminCustomers = () => {
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
    // Mock user data for the visual UI until backend supports returning all users
    const [customers, setCustomers] = useState([
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Customer', registered: '2026-03-20', status: 'Active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', registered: '2026-01-15', status: 'Active' },
        { id: '3', name: 'Mark Wilson', email: 'mark@test.com', role: 'Customer', registered: '2026-02-10', status: 'Suspended' },
        { id: '4', name: 'Techmire Solutions', email: 'dev@techmire.com', role: 'Superuser', registered: '2025-11-01', status: 'Active' },
    ]);
    const [search, setSearch] = useState('');

    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(search.toLowerCase()) || 
        customer.email.toLowerCase().includes(search.toLowerCase())
    );

    const getRoleBadge = (role) => {
        let color = '#fff';
        let bg = 'rgba(255,255,255,0.1)';
        if (role === 'Admin' || role === 'Superuser') {
            color = '#d4af37';
            bg = 'rgba(212, 175, 55, 0.15)';
        }
        return <span style={{ padding: '0.2rem 0.5rem', borderRadius: '1rem', background: bg, color: color, fontSize: '0.8rem', fontWeight: 'bold' }}>{role}</span>;
    };

    return (
        <div className="fade-in" style={{ padding: '8rem 2rem 4rem', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users style={{ color: '#d4af37' }} /> Customer Management
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage user accounts, roles, and administrative permissions</p>
                </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
                <div style={{ display: 'flex', marginBottom: '1.5rem', background: 'var(--bg-dark)', padding: '0.5rem 1rem', borderRadius: '0.5rem', alignItems: 'center' }}>
                    <Search size={20} style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }} />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
                    />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Name</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Email</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Role</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Registered</th>
                                <th style={{ padding: '1rem', color: '#d4af37' }}>Status</th>
                                <th style={{ padding: '1rem', color: '#d4af37', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? filteredCustomers.map(customer => (
                                <tr key={customer.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: customer.status === 'Suspended' ? 0.5 : 1 }}>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{customer.name}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{customer.email}</td>
                                    <td style={{ padding: '1rem' }}>{getRoleBadge(customer.role)}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{customer.registered}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{ color: customer.status === 'Active' ? '#4caf50' : '#f44336' }}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                        <button className="icon-btn-premium" title="Edit Permissions" style={{ background: 'transparent', border: 'none' }}>
                                            <Edit3 size={18} style={{ color: '#d4af37' }} />
                                        </button>
                                        <button className="icon-btn-premium" title={customer.status === 'Active' ? 'Suspend User' : 'Restore User'} style={{ background: 'transparent', border: 'none' }}>
                                            {customer.status === 'Active' ? <Ban size={18} style={{ color: '#f44336' }} /> : <Shield size={18} style={{ color: '#4caf50' }} />}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        No customers found matching your search.
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

export default AdminCustomers;
