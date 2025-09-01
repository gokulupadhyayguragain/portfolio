"use client";

import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`py-12 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-sky-50 border-t border-sky-200'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-pink-300' : 'text-pink-600'}`}>
              Gokul Upadhyay Guragain
            </h3>
            <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Passionate Full-Stack Developer and AI enthusiast with expertise in cloud technologies, 
              modern web development, and machine learning. Currently pursuing AI Fellowship at Fusemachines 
              and contributing to open-source projects.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/gokulupadhyayguragain"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                } shadow-sm`}
              >
                <span className="text-lg">🐙</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/gokulupadhyayguragain/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                } shadow-sm`}
              >
                <span className="text-lg">💼</span>
              </a>
              <a 
                href="https://www.credly.com/users/gokulupadhyayguragain/badges"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800'
                } shadow-sm`}
              >
                <span className="text-lg">🏆</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'About Me', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Certifications', href: '#certifications' },
                { name: 'Gallery', href: '#gallery' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isDark 
                        ? 'text-gray-400 hover:text-pink-300' 
                        : 'text-gray-600 hover:text-pink-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.linkedin.com/in/gokulupadhyayguragain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    isDark 
                      ? 'text-gray-400 hover:text-pink-300' 
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  <span>💼</span> LinkedIn: gokulupadhyayguragain
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/gokulupadhyayguragain"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    isDark 
                      ? 'text-gray-400 hover:text-pink-300' 
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  <span>💻</span> GitHub: gokulupadhyayguragain
                </a>
              </li>
              <li>
                <a 
                  href="mailto:gokul@addtocloud.tech"
                  className={`text-sm transition-colors flex items-center gap-2 ${
                    isDark 
                      ? 'text-gray-400 hover:text-pink-300' 
                      : 'text-gray-600 hover:text-pink-600'
                  }`}
                >
                  <span>📧</span> gokul@addtocloud.tech
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Gokul Upadhyay Guragain. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Built with ❤️ using Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
