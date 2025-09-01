"use client";
import { useTheme } from "../contexts/ThemeContext";
import Image from "next/image";

export default function Gallery() {
  const { isDarkMode } = useTheme();

  // Gallery images - ALL your unique photos (no cert placeholders!)
  const galleryImages = [
    {
      src: "/images/gallery/professional-photo-1.jpg",
      alt: "Professional Portrait 1",
      title: "Professional Portrait",
      category: "Professional"
    },
    {
      src: "/images/gallery/professional-photo-2.jpg",
      alt: "Professional Portrait 2", 
      title: "Office Environment",
      category: "Professional"
    },
    {
      src: "/images/gallery/professional-photo-3.jpg",
      alt: "Professional Portrait 3",
      title: "Business Meeting",
      category: "Professional"
    },
    {
      src: "/images/gallery/professional-photo-4.jpg",
      alt: "Professional Portrait 4",
      title: "Team Collaboration",
      category: "Professional"
    },
    {
      src: "/images/gallery/conference-event-photo.jpeg",
      alt: "Conference Event",
      title: "Tech Conference",
      category: "Achievements"
    },
    {
      src: "/images/gallery/aws-certificate.png",
      alt: "AWS Certificate",
      title: "AWS Certification",
      category: "Achievements"
    },
    {
      src: "/profile-pic.jpeg",
      alt: "Main Profile Picture",
      title: "Portfolio Profile",
      category: "Personal"
    }
    // To add more photos:
    // 1. Add images to /public/images/gallery/
    // 2. Add new entries here following the same format
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
          📸 Gallery
        </h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Photos, projects, and achievements
        </p>
      </div>

      {galleryImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              className={`group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                isDarkMode
                  ? 'bg-slate-800/60 border border-pink-400/20'
                  : 'bg-white border border-pink-100'
              }`}
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay content */}
                <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mb-1 ${
                    isDarkMode ? 'bg-pink-900/60 text-pink-300' : 'bg-pink-600/80 text-white'
                  }`}>
                    {image.category}
                  </span>
                  <h3 className="font-semibold text-sm leading-tight">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center p-12 rounded-xl border-2 border-dashed ${
          isDarkMode 
            ? 'border-pink-400/30 bg-slate-800/30 text-gray-300' 
            : 'border-pink-200 bg-pink-50/50 text-gray-600'
        }`}>
          <div className="space-y-4">
            <div className="text-6xl">📷</div>
            <h3 className="text-xl font-semibold">No Images Yet</h3>
            <p className="text-sm">Add your photos to the public directory to see them here!</p>
            <div className="text-xs opacity-75">
              Supported formats: JPG, PNG, WebP, GIF
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
