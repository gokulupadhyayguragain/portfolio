"use client";
import Image from "next/image";

export default function AnimeAvatar({ className = "", size = 128 }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Profile Picture */}
      <div className="w-full h-full rounded-full shadow-2xl border-4 border-white relative overflow-hidden bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400">
        <Image
          src="/profile-pic.jpeg"
          alt="Gokul Upadhyay Guragain"
          fill
          className="object-cover rounded-full"
          priority
        />
        {/* Anime-style overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full"></div>
        
        {/* Online status indicator */}
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white flex items-center justify-center">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Sparkle effect */}
        <div className="absolute top-1 right-3 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
        <div className="absolute top-3 left-2 w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
      </div>
      
      {/* Floating elements around avatar */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center border-2 border-white animate-float shadow-lg">
        <span className="text-xs">✨</span>
      </div>
      
      <div className="absolute -bottom-1 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-lg">
        <span className="text-xs">🌸</span>
      </div>
    </div>
  );
}
