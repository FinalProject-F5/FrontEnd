import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const decodedUser = jwtDecode(user.token);
        setUser(decodedUser);
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};