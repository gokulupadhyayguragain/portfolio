"use client";
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 p-4 rounded-2xl backdrop-blur-md border transition-all duration-500 transform hover:scale-110 hover:rotate-12 group ${
        isDarkMode 
          ? 'bg-blue-900/20 border-blue-400/30 text-blue-300 hover:bg-blue-800/30 shadow-lg shadow-blue-500/20' 
          : 'bg-white/20 border-blue-200/30 text-blue-600 hover:bg-white/30 shadow-lg shadow-blue-200/20'
      }`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Sun Icon */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
          </svg>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`}>
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
          </svg>
        </div>
        
        {/* Glowing effect */}
        <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-500 group-hover:blur-lg ${
          isDarkMode ? 'bg-blue-400/20' : 'bg-yellow-400/20'
        }`}></div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ${
              isDarkMode ? 'bg-blue-400' : 'bg-yellow-400'
            }`}
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 100}ms`,
              animation: 'float 2s ease-in-out infinite alternate'
            }}
          ></div>
        ))}
      </div>
    </button>
  );
}
