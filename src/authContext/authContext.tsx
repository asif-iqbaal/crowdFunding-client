import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
//import Cookies from 'js-cookie';
// Define the type for the authentication context state
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: {
    username:string,
    id:string;
  }
  name:string;
  setDarkMode: () => void;
  isDark: boolean;
  setLightMode: () => void;
}

// Create a default context with placeholders
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ( {children} ) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const[isDark,setIsDark] = useState<boolean>(false);
  const [user,setUser] =  useState<{ username: string; id: string }>({ username: '', id: '' });
  const [name,setName] = useState("");
  useEffect(() => {  
      const getCookies = async () => {
        const token =  sessionStorage.getItem('token');
        if(token){
          setIsAuthenticated(true);
          const payload = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          setUser(decodedPayload);
          setName(decodedPayload.user.username);
        }
      }
      const DarkMode = () => {
        const Dark = sessionStorage.getItem('dark');
        if(Dark){
          setIsDark(true);
        }
      }
    getCookies();
    DarkMode();
  }, []);
  const setDarkMode = () => setIsDark(true);
  const setLightMode = () => setIsDark(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    sessionStorage.removeItem('token');
    setUser({ username: '', id: '' });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, name, isDark , setDarkMode, setLightMode }}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook for using the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
