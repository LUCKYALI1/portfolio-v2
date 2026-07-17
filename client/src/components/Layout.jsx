import React from 'react'
import About from './About/About'
import Projects from './Projects/Projects'
import SkillsAndAchievements from './Skills/SkillsAndAchievements'
import Blogs from './Blogs/Blogs'
import Footer from './Footer'

const Layout = () => {
  return (
    // 1. relative: Ensures the div grows to fit About + Projects
    // 2. mt-[100dvh]: Pushes this entire block down by one full screen height
    // 3. z-10: Ensures it slides OVER the fixed landing page
    <div className='relative w-full h-auto bg-[#0b1509]/60 backdrop-blur-xl text-white pb-40 z-10'>
        <About />
        <Projects />
        <SkillsAndAchievements />
        <Blogs />
        <Footer />
    </div>
  )
}

export default Layout