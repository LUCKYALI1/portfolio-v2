import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocation, Routes, Route, Outlet } from 'react-router-dom'; 

// Components
import Navbar from './components/Navbar/Navbar';
import Landingpage from './components/LandingPage/Landingpage';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import SkillsAndAchievements from './components/Skills/SkillsAndAchievements';
import Blogs from './components/Blogs/Blogs';
import Footer from './components/Footer';
import LeetCode from './components/LeetCode/LeetCode';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import { CursorProvider } from './context/CursorContext'; 
import AdminLogin from './components/Admin/AdminLogin';
// import Dashboard from './components/Admin/Dashboard';


// Asset
import bgMusic from './assets/Song For Denise (Maxi Version).mp3';
import Dashboard from './components/Admin/Dashboard';

// --- 1. SHARED LAYOUT (Navbar & Footer persist) ---
const SharedLayout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet renders the child route's element (Home or LeetCode) */}
      <Outlet />
      <Footer />
    </>
  );
};

// --- 2. HOME PAGE (Main Sections) ---
const Home = () => {
  return (
    <main className="flex flex-col">
      <Landingpage />
      <About />
      <Projects />
      <SkillsAndAchievements />
      {/* You can optionally add <LeetCode /> here too if you want it on Home */}
      <Blogs />
    </main>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  const handleStartMusic = () => {
    if (audioRef.current) {
        audioRef.current.currentTime = 13; 
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='w-full relative  min-h-screen text-white'>
      <CursorProvider>
        <CustomCursor />
        
            <Routes location={location} key={location.pathname}>
                
                {/* Parent Route uses SharedLayout */}
                <Route path="/" element={<SharedLayout />}>
                    
                    {/* Index Route = Home Page */}
                    <Route path='/' index element={<Home />} />
                    
                    {/* Separate LeetCode Page (/leetcode) */}
                    <Route path="/leetcode" element={<LeetCode />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/skills" element={<SkillsAndAchievements />} />
      


                </Route>
                <Route path="/admin" element={<SharedLayout />}>
                    <Route index element={<AdminLogin />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>

            </Routes>

      </CursorProvider>
    </div>
  );
}

export default App;