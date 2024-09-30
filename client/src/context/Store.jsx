import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const StoreContext = createContext();

const Store = ({ children }) => {
    const url = 'http://localhost:5000';
    const [user, setUser] = useState(null);

    const signUp = async (signupData) => {
        try {
            const response = await axios.post(`${url}/api/auth/signup`, signupData, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
                toast.success('Signup successful!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Signup failed');
        }
    };

    const login = async (loginData) => {
        try {
            const response = await axios.post(`${url}/api/auth/login`, loginData, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
                toast.success('Login successful!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(`${url}/api/auth/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                setUser(null);
                toast.success('Logout successful!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    const authCheck = async () => {
        try {
            const response = await axios.get(`${url}/api/auth/authcheck`, { withCredentials: true });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        }
    };

    const value = {
        url,
        user,
        setUser,
        signUp,
        login,
        logout,
        authCheck
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
