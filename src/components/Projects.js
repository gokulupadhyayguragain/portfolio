"use client";
import { useTheme } from "../contexts/ThemeContext";
import ProjectImage from "./ProjectImage";

const projects = [
  {
    name: "AddToCloud",
    type: "Business Project",
    tech: "Next.js, Cloudflare Pages, Resend API, Workers",
    description: "Professional cloud solutions platform with email services, portfolio hosting, and domain management.",
    github: "https://github.com/gokulupadhyayguragain/portfolio",
    website: "https://addtocloud.tech",
    status: "Active",
    featured: true,
    highlights: ["Cloud Solutions", "Email Services", "Professional Platform"]
  },
  {
    name: "Hyprland Dotfiles",
    type: "Open Source",
    tech: "Shell Script, Hyprland, Waybar",
    description: "Productivity-focused window manager setup for Linux.",
    github: "https://github.com/gokulupadhyayguragain/hyprland",
    status: "Completed",
    featured: true,
    highlights: ["Window Manager", "Productivity", "Open Source"]
  },
  {
    name: "LMS AGM Solutions",
    type: "College Project",
    tech: "ASP.NET, C#, SQL Server",
    description: "Learning Management System with user authentication and dashboards.",
    github: "https://github.com/gokulupadhyayguragain/lms-agm-solutions",
    status: "Completed",
    featured: false,
    highlights: ["Database Design", "Authentication", "ASP.NET"]
  },
  {
    name: "Voting Management System",
    type: "College Project",
    tech: "C Programming",
    description: "Terminal-based voting system with security features.",
    github: "https://github.com/gokulupadhyayguragain/voting-management-system",
    status: "Completed",
    featured: false,
    highlights: ["C Programming", "Security"]
  },
  {
    name: "Food Ordering System",
    type: "College Project",
    tech: "Java, Swing GUI",
    description: "Desktop application for food ordering with inventory management.",
    github: "https://github.com/gokulupadhyayguragain/uni-food-ordering-system",
    status: "Completed",
    featured: false,
    highlights: ["Java OOP", "Desktop App"]
  },
  {
    name: "Health Wellness Site",
    type: "College Project",
    tech: "HTML, CSS, JavaScript",
    description: "Responsive website for health and wellness information.",
    github: "https://github.com/gokulupadhyayguragain/health-wellness-site",
    status: "Completed",
    featured: false,
    highlights: ["Web Development", "Responsive Design"]
  },
  {
    name: "Test Paper Management",
    type: "College Project",
    tech: "Python",
    description: "Command-line application for managing test papers.",
    github: "https://github.com/gokulupadhyayguragain/test-paper-management-system",
    status: "Completed",
    featured: false,
    highlights: ["Python", "Data Management"]
  }
];

export default function Projects() {
  const { isDarkMode } = useTheme();
  const featuredProjects = projects.filter(proj => proj.featured);
  const otherProjects = projects.filter(proj => !proj.featured);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
          🚀 Projects Portfolio
        </h2>
      </div>
      
      <div className="space-y-6">
        <h3 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          ✨ Featured Projects
        </h3>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map((proj, idx) => (
            <div key={idx} className={`group rounded-2xl p-8 shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/80 border-pink-400/30 backdrop-blur-sm' 
                : 'bg-gradient-to-br from-white to-pink-50 border-pink-200'
            }`}>
              <div className="space-y-4">
                {/* Project Image */}
                <ProjectImage projectName={proj.name} className="mb-4" />
                
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-xl transition-colors ${
                    isDarkMode 
                      ? 'text-gray-100 group-hover:text-pink-400' 
                      : 'text-gray-800 group-hover:text-pink-600'
                  }`}>
                    {proj.name}
                  </h4>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    proj.status === 'Active' 
                      ? isDarkMode ? 'bg-blue-900/60 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : isDarkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                  isDarkMode ? 'bg-pink-900/60 text-pink-300' : 'bg-pink-100 text-pink-700'
                }`}>
                  {proj.type}
                </span>
                
                <div className="space-y-2">
                  <p className={`font-semibold text-sm ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                    Technologies:
                  </p>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {proj.tech}
                  </p>
                </div>
                
                <p className={`leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {proj.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {proj.highlights.map((highlight, i) => (
                    <span key={i} className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-pink-900/40 to-rose-900/40 text-pink-300' 
                        : 'bg-gradient-to-r from-pink-200 to-rose-200 text-pink-800'
                    }`}>
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                      isDarkMode 
                        ? 'bg-gray-700/60 text-white hover:bg-gray-600/80' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <span>💻</span> GitHub
                  </a>
                  {proj.website && (
                    <a 
                      href={proj.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
                        isDarkMode 
                          ? 'bg-pink-700/60 text-white hover:bg-pink-600/80' 
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      <span>🌐</span> Visit Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          📂 Other Projects
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((proj, idx) => (
            <div key={idx} className={`group rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              isDarkMode 
                ? 'bg-slate-800/60 border-pink-400/20 backdrop-blur-sm' 
                : 'bg-white border-pink-100'
            }`}>
              <div className="space-y-3">
                {/* Project Image */}
                <ProjectImage projectName={proj.name} className="mb-3 h-24" />
                
                <div className="flex justify-between items-start">
                  <h4 className={`font-bold text-lg transition-colors ${
                    isDarkMode 
                      ? 'text-gray-100 group-hover:text-pink-400' 
                      : 'text-gray-800 group-hover:text-pink-600'
                  }`}>
                    {proj.name}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isDarkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  isDarkMode ? 'bg-pink-900/40 text-pink-300' : 'bg-pink-50 text-pink-600'
                }`}>
                  {proj.type}
                </span>
                
                <p className={`text-xs font-medium ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                  {proj.tech}
                </p>
                
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {proj.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {proj.highlights.slice(0, 2).map((highlight, i) => (
                    <span key={i} className={`px-2 py-1 text-xs rounded ${
                      isDarkMode ? 'bg-pink-900/40 text-pink-300' : 'bg-pink-100 text-pink-700'
                    }`}>
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <a 
                    href={proj.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 px-3 py-1 rounded transition-colors text-xs ${
                      isDarkMode 
                        ? 'bg-gray-700/60 text-white hover:bg-gray-600/80' 
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    <span>💻</span> Code
                  </a>
                  {proj.website && (
                    <a 
                      href={proj.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 px-3 py-1 rounded transition-colors text-xs ${
                        isDarkMode 
                          ? 'bg-pink-700/60 text-white hover:bg-pink-600/80' 
                          : 'bg-pink-600 text-white hover:bg-pink-700'
                      }`}
                    >
                      <span>🌐</span> Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <div className={`inline-block p-6 rounded-2xl shadow-xl ${
          isDarkMode 
            ? 'bg-gradient-to-r from-pink-900/60 to-rose-900/80 text-white backdrop-blur-sm' 
            : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
        }`}>
          <h3 className="text-xl font-bold mb-2">🌟 Explore More Projects</h3>
          <p className="mb-4 opacity-90">Check out my GitHub for more projects and contributions!</p>
          <a 
            href="https://github.com/gokulupadhyayguragain" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "bg-slate-800/60 text-blue-300 hover:bg-slate-700/80 border border-slate-600/40"
                : "bg-white text-pink-600 hover:bg-pink-50"
            }`}
          >
            <span>💻</span> Visit GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
