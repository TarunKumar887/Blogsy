import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const { navigate } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/register', formData);
      if (res.data.success) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required
          className="w-full mb-4 p-3 border rounded-md"/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} require className="w-full mb-4 p-3 border rounded-md"/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} require className="w-full mb-4 p-3 border rounded-md" />
        <button  type="submit"  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90" >
          Register
        </button>
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-primary cursor-pointer" >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;