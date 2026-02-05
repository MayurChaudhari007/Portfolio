// ------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import HomeSkills from "./HomeSkills";
import HomeAbout from "./HomeAbouts";
import HomeBlogs from "./HomeBlogs";
import HomeProjects from "./HomeProjects";

const Home = () => {
  return (
    <div className="relative isolate bg-white">
      {/* Hero Section */}
      <HomeAbout />
      {/* Skills Section */}
      <HomeSkills />
      
      

      {/* Featured Projects Section */}
      <HomeProjects />

      {/* --- Attractive Activity/Blog Section --- */}
      <HomeBlogs />
    </div>
  );
};

export default Home;
