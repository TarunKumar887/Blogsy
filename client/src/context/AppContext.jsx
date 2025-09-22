import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; 

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null); 
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
     
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.id) {
          setUserId(decodedToken.id);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  const value = { 
    axios, 
    navigate, 
    token, setToken, 
    role, setRole,
    userId, 
    blogs, setBlogs, 
    input, setInput,
    fetchBlogs 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};