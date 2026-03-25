import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const res = await api.get('/users/profiles/me/');
                    setUser(res.data);
                } catch (err) {
                    console.error("Auth initialization failed", err);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/users/auth/login/', { email, password });
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            
            const userRes = await api.get('/users/profiles/me/');
            setUser(userRes.data);
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, message: err?.response?.data?.detail || 'Invalid credentials' };
        }
    };

    const register = async (userData) => {
        try {
            await api.post('/users/auth/register/', userData);
            return await login(userData.email, userData.password);
        } catch (err) {
            console.error("Register Error:", err);
            const msg = err?.response?.data;
            let errorMsg = 'Registration failed';
            if (msg && typeof msg === 'object') {
                errorMsg = Object.values(msg)[0]?.[0] || errorMsg;
            }
            return { success: false, message: errorMsg };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
