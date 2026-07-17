import React, { useState } from 'react'; 
import api from '../../apis/api'; 

const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleformData = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // This now properly stops the form from reloading the page
    console.log("Submitting:", admin);

    try {
        const response = await api.post('/admin/login', admin);
        console.log("Login successful:", response);
        if(response.status === 200) {
            // Store the token in localStorage or a state management solution
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('adminName', admin.email); // Store admin email or name for display
            // Redirect to the admin dashboard or another page
            window.location.href = '/admin/dashboard'; // Adjust this path as needed
        }
    } catch(err) {
        console.error("Login Error:", err);
        // TODO: Consider adding a state variable to show an error message on the UI
    }
  };

  return (
    <section className='adminLogin w-screen h-screen bg-black flex items-center justify-center'>
      <div className="w-[400px] min-h-[400px] py-8 rounded-3xl bg-green-300/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-5">
        <h1 className='text-3xl font-bold text-white'>Admin Login</h1>
        
        {/* FIXED: Removed action="post", added onSubmit, and added Tailwind layout classes */}
        <form onSubmit={handleSubmit} method='post' className="w-full flex flex-col items-center gap-5">
          <input 
            type="email" 
            name="email" 
            placeholder='Email' 
            className='w-[80%] h-10 rounded-lg bg-black/20 border border-white/20 text-white px-3' 
            onChange={handleformData} 
            value={admin.email} 
            required // Optional: Native browser validation
         />
        <input 
            type="password" 
            name="password" 
            placeholder='Password' 
            className='w-[80%] h-10 rounded-lg bg-black/20 border border-white/20 text-white px-3' 
            onChange={handleformData} 
            value={admin.password} 
            required // Optional: Native browser validation
          />
          
          {/* FIXED: Removed onClick, changed to type="submit" */}
          <button 
            type="submit"
            className='w-[80%] h-10 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition-all duration-300' 
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;