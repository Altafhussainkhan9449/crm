// ============================================================
// AuthContext - Manages authentication state across the app
// ============================================================
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    /**
     * Log in with any email/password (no real validation).
     * Stores a mock user object and marks session as authenticated.
     */
    const login = (email, password) => {
        const mockUser = {
            id: 'u1',
            name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
            email,
            role: 'Sales Manager',
            avatar: email.slice(0, 2).toUpperCase(),
        };
        setUser(mockUser);
        setIsAuthenticated(true);
    };

    /**
     * Log out — clears user state. Navigation is handled by the component.
     */
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for consuming auth context
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
