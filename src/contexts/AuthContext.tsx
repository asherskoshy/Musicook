import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple user type - just basic info
type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

// What our auth context provides
type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook to use auth anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component that wraps the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is saved in browser when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('musicook_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Simple login function
  const login = (email: string, password: string): boolean => {
    // Basic validation
    if (!email || !password) {
      return false;
    }

    // Create a fake user (in real app, this would call your backend)
    const newUser: User = {
      id: '1',
      name: email.split('@')[0], // Use part before @ as name
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=7c3aed&color=fff`
    };
    
    // Save user to state and browser storage
    setUser(newUser);
    localStorage.setItem('musicook_user', JSON.stringify(newUser));
    return true;
  };

  // Simple signup function
  const signup = (name: string, email: string, password: string): boolean => {
    // Basic validation
    if (!name || !email || !password) {
      return false;
    }

    // Create a fake user (in real app, this would call your backend)
    const newUser: User = {
      id: Date.now().toString(), // Simple ID using timestamp
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=7c3aed&color=fff`
    };
    
    // Save user to state and browser storage
    setUser(newUser);
    localStorage.setItem('musicook_user', JSON.stringify(newUser));
    return true;
  };

  // Simple logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('musicook_user');
  };

  // What we provide to the rest of the app
  const value: AuthContextType = {
    user,
    isLoggedIn: !!user, // Convert user to boolean (true if user exists)
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};