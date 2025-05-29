import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken]   = useState(localStorage.getItem('token'));
    const [client, setClient] = useState(
        JSON.parse(localStorage.getItem('client') || 'null')
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('client', JSON.stringify(client));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('client');
        }
    }, [token, client]);

    const login = (tok, cli) => {
        setToken(tok);
        setClient(cli);
    };
    const logout = () => {
        setToken(null);
        setClient(null);
    };

    return (
        <AuthContext.Provider value={{ token, client, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
