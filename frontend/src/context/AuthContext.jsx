import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken]     = useState(localStorage.getItem('token'));
    const [client, setClient]   = useState(
        JSON.parse(localStorage.getItem('client') || 'null')
    );
    const [loading, setLoading] = useState(true);

    // Sincroniza token/client con localStorage
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('client', JSON.stringify(client));
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('client');
            setClient(null);
        }
    }, [token, client]);

    // Al montar: valida el token contra /api/auth/me
    useEffect(() => {
        async function verify() {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error();
                const { client: backendClient } = await res.json();
                // refresca los datos del cliente con lo que responde el backend
                setClient(backendClient);
            } catch {
                // token inválido o usuario ya no existe → desloguea
                setToken(null);
            } finally {
                setLoading(false);
            }
        }
        verify();
    }, [token]);

    const login = (newToken, newClient) => {
        setToken(newToken);
        setClient(newClient);
    };

    const logout = () => {
        setToken(null);
    };

    // Mientras valida el token, no renderiza nada
    if (loading) return null;

    return (
        <AuthContext.Provider value={{ token, client, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
