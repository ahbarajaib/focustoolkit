import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (user: any, token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const [storedUser, storedToken] = await Promise.all([
                AsyncStorage.getItem('user'),
                AsyncStorage.getItem('token')
            ]);

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error('Error loading auth data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (user: any, token: string) => {
        try {
            await Promise.all([
                AsyncStorage.setItem('user', JSON.stringify(user)),
                AsyncStorage.setItem('token', token)

            ]);
            setUser(user);
            setToken(token);

        } catch (error) {
            console.error('Error saving auth data', error);
        }
    };

    const logout = async () => {

        try {
            await Promise.all([
                AsyncStorage.removeItem('user'),
                AsyncStorage.removeItem('token')
            ])
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error('Error removing auth data:', error)
        }

    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};