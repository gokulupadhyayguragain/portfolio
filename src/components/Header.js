"use client";
import AnimeAvatar from "./AnimeAvatar";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center py-12 relative">
      {/* Anime Profile Picture - Made Even Bigger */}
      <div className="mb-8 animate-scale-in">
        <AnimeAvatar size={220} className="animate-glow hover-lift" />
      </div>

      <div className="text-center space-y-4 animate-fade-in-up stagger-2">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-lg text-gradient">
          Gokul Upadhyay Guragain
        </h1>
        <p className="text-xl text-pink-500 font-medium animate-fade-in-up stagger-3">DevOps Engineer | Cloud Architect | Open Source Contributor</p>
        <p className="text-pink-400 animate-fade-in-up stagger-4">gokul@addtocloud.tech</p>
        
        {/* Bio */}
        <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed mt-6 animate-fade-in-up stagger-5">
          Passionate DevOps engineer specializing in cloud infrastructure, automation, and scalable solutions. 
          AWS certified professional and GitHub Developer Program Member with expertise in multi-cloud environments.
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap animate-fade-in-up stagger-6">
          <a 
            href="https://github.com/gokulupadhyayguragain" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 btn-enhanced nav-item shadow-lg hover:shadow-xl"
          >
            <span>💻</span> GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/gokulupadhyayguragain/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 btn-enhanced nav-item shadow-lg hover:shadow-xl"
          >
            <span>💼</span> LinkedIn
          </a>
          <a 
            href="https://www.credly.com/users/gokulupadhyayguragain/badges" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-500 btn-enhanced nav-item shadow-lg hover:shadow-xl"
          >
            <span>🏆</span> Credly
          </a>
          <a 
            href="https://addtocloud.tech/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>☁️</span> AddToCloud
          </a>
        </div>
        
        <p className="text-sm text-pink-300 mt-3 flex items-center justify-center gap-1">
          <span>📍</span> Kathmandu, Nepal
        </p>
      </div>
    </header>
  );
}
