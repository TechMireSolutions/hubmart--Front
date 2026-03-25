import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const AdminLogin = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    navigate('/admin/dashboard');
                } else {
                    setError(result.message || result.error);
                }
            } else {
                const result = await register({
                    email: formData.email,
                    password: formData.password,
                    username: formData.username,
                    first_name: formData.first_name || formData.username,
                    last_name: formData.last_name
                });
                if (result.success) {
                    navigate('/admin/dashboard');
                } else {
                    setError(result.message || result.error);
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page fade-in" style={{ background: 'var(--bg-darker)' }}>
            <div className="login-container glass admin-glass" style={{
                borderTop: '4px solid #d4af37',
                boxShadow: '0 8px 32px 0 rgba(212, 175, 55, 0.15)'
            }}>
                <div className="login-header" style={{ textAlign: 'center' }}>
                    <ShieldAlert size={48} style={{ color: '#d4af37', margin: '0 auto 1rem', display: 'block' }} />
                    <h1 style={{ color: '#d4af37' }}>{isLogin ? 'Admin Portal' : 'Admin Registration'}</h1>
                    <p>{isLogin ? 'Enter your credentials to access the admin dashboard' : 'Create an admin privileges account (Request Staff Access)'}</p>
                </div>

                {error && <div className="error-alert" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: '#ff4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #ff4444' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    {!isLogin && (
                        <div className="input-group">
                            <User size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <Mail size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn-primary login-btn" disabled={loading} style={{ background: 'linear-gradient(45deg, #b58c21, #d4af37)', color: 'black', border: 'none', fontWeight: 'bold' }}>
                        {loading ? 'Authenticating...' : (
                            <>{isLogin ? 'Secure Sign In' : 'Sign Up as Admin'} <ArrowRight size={20} /></>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {isLogin ? "Need admin privileges?" : "Already an admin?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn" style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: '600' }}>
                            {isLogin ? 'Request account' : 'Sign in instead'}
                        </button>
                    </p>
                </div>
            </div>
            
            <div className="login-bg-glow" style={{ background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)' }}></div>
        </div>
    );
};

export default AdminLogin;
