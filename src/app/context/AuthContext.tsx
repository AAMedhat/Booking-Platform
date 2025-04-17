'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  name?: string;
  email: string;
};

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<{success: boolean, exists: boolean}>;
  logout: () => void;
  checkUserExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data store - in a real app, this would be your database
const USERS_STORAGE_KEY = 'egypt-travel-users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }
  }, []);

  // Load users from localStorage
  const getUsers = (): Record<string, {name: string, password: string}> => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    let users: Record<string, {name: string, password: string}> = {};
    
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Failed to parse users data', error);
      }
    }
    
    // Ensure admin account always exists
    if (!users.hasOwnProperty('admin@example.com')) {
      users['admin@example.com'] = {
        name: 'Administrator',
        password: '1234'
      };
      // Save users with admin account
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    
    return users;
  };

  // Save users to localStorage
  const saveUsers = (users: Record<string, {name: string, password: string}>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Check if a user with the given email exists
  const checkUserExists = async (email: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const users = getUsers();
    return !!users[email];
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    
    if (users[email] && users[email].password === password) {
      const userData: User = {
        name: users[email].name,
        email
      };
      
      // Store logged in user
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      
      setUser(userData);
      setIsLoggedIn(true);
      return true;
    }
    
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<{success: boolean, exists: boolean}> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = getUsers();
    
    // Check if user already exists
    if (users[email]) {
      return { success: false, exists: true };
    }
    
    // Add new user
    users[email] = { name, password };
    saveUsers(users);
    
    // Auto-login after successful signup
    const userData: User = {
      name,
      email
    };
    
    // Store logged in user
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    
    setUser(userData);
    setIsLoggedIn(true);
    
    return { success: true, exists: false };
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setIsLoggedIn(false);
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout, checkUserExists }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 