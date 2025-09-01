"use client";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import Header from "../components/Header";
import GalaxyBlackHole from "../components/SakuraPetalsInteractive";
import ThemeToggle from "../components/ThemeToggle";
import Summary from "../components/Summary";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Achievements from "../components/Achievements";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import BackgroundMusic from "../components/BackgroundMusic";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const { isDarkMode } = useTheme();

  const sections = useMemo(() => [
    { id: "about", label: "About", icon: "🌸", component: <Summary /> },
    { id: "education", label: "Education", icon: "🎓", component: <Education /> },
    { id: "skills", label: "Skills", icon: "⚡", component: <Skills /> },
    { id: "experience", label: "Experience", icon: "💼", component: <Experience /> },
    { id: "projects", label: "Projects", icon: "🚀", component: <Projects /> },
    { id: "gallery", label: "Gallery", icon: "📸", component: <Gallery /> },
    { id: "certifications", label: "Certifications", icon: "🏆", component: <Certifications /> },
    { id: "achievements", label: "Achievements", icon: "✨", component: <Achievements /> },
    { id: "contact", label: "Contact", icon: "📧", component: <Contact /> },
  ], []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={`relative min-h-screen font-sans transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
        : 'bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50'
    }`}>
      {/* Custom Tracking Cursor */}
      <CustomCursor />
      
      {/* Background Music */}
      <BackgroundMusic />
      
      {/* 3D Galaxy Black Hole Background */}
      <GalaxyBlackHole isDarkMode={isDarkMode} />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Side Navigation with Glass Morphism */}
      <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-3 p-3 rounded-r-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-105 ${
              activeSection === section.id
                ? isDarkMode
                  ? "bg-blue-900/40 border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/25 translate-x-2 pr-6"
                  : "bg-blue-100/40 border-blue-300/50 text-blue-700 shadow-lg shadow-blue-300/25 translate-x-2 pr-6"
                : isDarkMode
                ? "bg-slate-800/30 border-slate-600/30 text-slate-300 hover:bg-slate-700/40 shadow-lg hover:translate-x-1 pr-3"
                : "bg-white/30 border-white/40 text-slate-700 hover:bg-white/40 shadow-lg hover:translate-x-1 pr-3"
            }`}
            title={section.label}
          >
            <span className="text-xl min-w-[24px] text-center">{section.icon}</span>
            <span className={`font-medium text-sm transition-all duration-300 overflow-hidden ${
              activeSection === section.id 
                ? "opacity-100 max-w-[100px]" 
                : "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[100px]"
            }`}>
              {section.label}
            </span>
          </button>
        ))}
        
        {/* Quick Contact Button */}
        <div className="pt-4 border-t border-opacity-30 border-current">
          <a 
            href="mailto:gokul@addtocloud.tech"
            className={`group flex items-center gap-3 p-3 rounded-r-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${
              isDarkMode
                ? "bg-emerald-900/40 border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/25"
                : "bg-emerald-100/40 border-emerald-300/50 text-emerald-700 shadow-lg shadow-emerald-300/25"
            }`}
            title="Contact Me"
          >
            <span className="text-xl min-w-[24px] text-center">📧</span>
            <span className="font-medium text-sm opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[100px] transition-all duration-300 overflow-hidden">
              Contact
            </span>
          </a>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 ml-16">
        <Header />
        
        {/* Single Page Sections with Glass Morphism */}
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-4">
          {sections.map((section, index) => (
            <section 
              key={section.id}
              id={section.id}
              className="min-h-screen flex items-center py-4"
            >
              <div className={`w-full backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-500 ${
                isDarkMode
                  ? "bg-slate-900/30 border-slate-600/40 shadow-2xl shadow-blue-900/30"
                  : "bg-white/30 border-white/40 shadow-2xl shadow-blue-200/30"
              }`}>
                {/* Section Header with Glass Effect */}
                <div className={`p-6 relative backdrop-blur-xl border-b transition-all duration-500 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-slate-600/40"
                    : "bg-gradient-to-r from-blue-100/40 to-indigo-100/40 border-white/30"
                }`}>
                  <div className={`absolute top-2 right-4 text-2xl transition-all duration-500 animate-bounce ${
                    isDarkMode ? "text-blue-300/80" : "text-blue-600/80"
                  }`}>🎀</div>
                  <div className={`absolute bottom-2 left-4 text-xl transition-all duration-500 animate-pulse ${
                    isDarkMode ? "text-blue-300/80" : "text-blue-600/80"
                  }`}>✨</div>
                  <h2 className={`text-3xl font-bold text-center transition-all duration-500 ${
                    isDarkMode ? "text-blue-300" : "text-blue-700"
                  }`}>
                    {section.icon} {section.label}
                  </h2>
                  {/* Section Number */}
                  <div className={`absolute top-2 left-4 text-sm transition-all duration-500 ${
                    isDarkMode ? "text-blue-400/60" : "text-blue-600/60"
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8">
                  {section.component}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Quick Links with Glass Morphism */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <a 
          href="#about" 
          className={`block w-12 h-12 rounded-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isDarkMode
              ? "bg-blue-900/40 border-blue-400/50 text-blue-300 shadow-lg shadow-blue-500/25 hover:shadow-xl"
              : "bg-blue-100/40 border-blue-300/50 text-blue-700 shadow-lg shadow-blue-300/25 hover:shadow-xl"
          }`}
          title="Back to Top"
        >
          ⬆️
        </a>
        <a 
          href="https://github.com/gokulupadhyayguragain" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`block w-12 h-12 rounded-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isDarkMode
              ? "bg-slate-800/40 border-slate-600/50 text-slate-300 shadow-lg shadow-slate-700/25 hover:shadow-xl"
              : "bg-gray-800/20 border-gray-600/30 text-gray-700 shadow-lg shadow-gray-600/25 hover:shadow-xl"
          }`}
          title="GitHub"
        >
          💻
        </a>
        <a 
          href="https://www.linkedin.com/in/gokulupadhyayguragain/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`block w-12 h-12 rounded-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isDarkMode
              ? "bg-blue-800/40 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-600/25 hover:shadow-xl"
              : "bg-blue-600/20 border-blue-500/30 text-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl"
          }`}
          title="LinkedIn"
        >
          💼
        </a>
      </div>
    </div>
  );
}
