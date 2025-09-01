"use client";

import { useTheme } from '../contexts/ThemeContext';
import Image from 'next/image';

const Certifications = () => {
  const { isDark } = useTheme();

  const certifications = [
    {
      id: 1,
      title: "Microsoft Azure Administrator Associate",
      issuer: "Microsoft",
      badge: "https://images.credly.com/size/340x340/images/336eebfc-0ac3-4553-9a67-b402f491f185/azure-administrator-associate-600x600.png",
      description: "Azure infrastructure management and administration",
      verifyLink: "https://www.credly.com/users/gokulupadhyayguragain/badges",
      issued: "2024"
    },
    {
      id: 2,
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      badge: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
      description: "Foundational knowledge of cloud services and Azure",
      verifyLink: "https://www.credly.com/users/gokulupadhyayguragain/badges",
      issued: "2023"
    },
    {
      id: 3,
      title: "Microsoft Fabric Analytics Engineer Associate",
      issuer: "Microsoft",
      badge: "https://images.credly.com/size/340x340/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/image.png",
      description: "Data fabric and analytics engineering with Microsoft Fabric",
      verifyLink: "https://www.credly.com/users/gokulupadhyayguragain/badges",
      issued: "2024"
    },
    {
      id: 4,
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
      description: "Design and deploy scalable AWS architectures",
      verifyLink: "https://www.credly.com/users/gokulupadhyayguragain/badges",
      issued: "2024"
    }
  ];

  return (
    <section className={`py-12 ${isDark ? 'bg-gray-900' : 'bg-sky-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className={`text-5xl font-bold mb-4 animate-fade-in bg-gradient-to-r ${
            isDark 
              ? 'from-pink-300 via-purple-300 to-pink-300 text-transparent bg-clip-text' 
              : 'from-pink-600 via-purple-600 to-pink-600 text-transparent bg-clip-text'
          }`}>
            Professional Certifications
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full animate-pulse ${
            isDark ? 'bg-gradient-to-r from-pink-400 to-purple-400' : 'bg-gradient-to-r from-pink-500 to-purple-500'
          }`}></div>
          <p className={`mt-4 text-lg animate-fade-in-delay ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Industry-recognized credentials across multiple cloud platforms and technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`p-6 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border animate-fade-in ${
                isDark
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-pink-500/20 hover:border-pink-400/40 shadow-pink-500/10'
                  : 'bg-gradient-to-br from-white to-pink-50 border-pink-200 hover:border-pink-400 shadow-pink-200/20'
              } shadow-lg animate-float`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative group">
                    <Image 
                      src={cert.badge} 
                      alt={`${cert.title} Badge`}
                      width={120}
                      height={120}
                      className="rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                      isDark ? 'bg-pink-400' : 'bg-pink-500'
                    }`}></div>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                  isDark ? 'text-white hover:text-pink-200' : 'text-gray-900 hover:text-pink-700'
                }`}>
                  {cert.title}
                </h3>
                <p className={`text-sm mb-2 font-medium ${
                  isDark ? 'text-pink-200' : 'text-pink-700'
                }`}>
                  {cert.issuer}
                </p>
                {cert.issued && (
                  <p className={`text-xs mb-2 font-medium ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Issued: {cert.issued}
                  </p>
                )}
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  {cert.description}
                </p>
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isDark
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg hover:shadow-pink-500/25'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-pink-500/25'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🏆</span>
                    Verify Badge
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
