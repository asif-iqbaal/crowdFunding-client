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
}

// Create a default context with placeholders
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ( {children} ) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user,setUser] =  useState<{ username: string; id: string }>({ username: '', id: '' });
  useEffect(() => {  
      const getCookies = async () => {
        const token =  sessionStorage.getItem('token');
        if(token){
          setIsAuthenticated(true);
          const payload = token.split('.')[1];
          const decodedPayload = JSON.parse(atob(payload));
          setUser(decodedPayload);
        }
      }
    getCookies();
  }, []);
 
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    sessionStorage.removeItem('token');
    setUser({ username: '', id: '' });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
