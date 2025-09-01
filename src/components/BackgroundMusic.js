"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties for infinite loop
    audio.loop = true;
    audio.volume = volume;
    audio.autoplay = true;

    // Preload the audio
    audio.load();

    // Auto-play function with multiple attempt strategies
    const attemptAutoPlay = async () => {
      try {
        // First attempt: Direct play
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          console.log("✅ Background music started automatically");
        }
      } catch (error) {
        console.log("🔇 Auto-play blocked by browser, showing controls");
        setIsVisible(true);
        
        // Retry on next user interaction
        const retryPlay = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            setIsVisible(false);
            console.log("✅ Background music started after user interaction");
            
            // Remove listeners after successful play
            document.removeEventListener('click', retryPlay);
            document.removeEventListener('touchstart', retryPlay);
            document.removeEventListener('keydown', retryPlay);
          } catch (retryError) {
            console.log("❌ Still unable to play audio:", retryError);
          }
        };

        // Add event listeners for various user interactions
        document.addEventListener('click', retryPlay, { once: true });
        document.addEventListener('touchstart', retryPlay, { once: true });
        document.addEventListener('keydown', retryPlay, { once: true });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(attemptAutoPlay, 500);

    // Handle audio events
    const handleCanPlay = () => {
      console.log("🎵 Audio loaded and ready to play");
    };

    const handleError = (e) => {
      console.error("❌ Audio loading error:", e);
      setIsVisible(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        setIsVisible(false);
      }
    } catch (error) {
      console.log("Audio control error:", error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/bgm/background-music.mp3" type="audio/mpeg" />
        <source src="/bgm/background-music.ogg" type="audio/ogg" />
        <source src="/bgm/background-music.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Music Control - Only show if needed */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible || isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
      }`}>
        <div className={`backdrop-blur-md rounded-full p-3 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/80 border-gray-600/50 shadow-lg shadow-gray-900/50' 
            : 'bg-white/80 border-sky-200/50 shadow-lg shadow-sky-200/50'
        }`}>
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/30'
              } hover:scale-110 active:scale-95`}
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className={`flex items-center gap-2 transition-all duration-300 ${
              isPlaying ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0 overflow-hidden'
            }`}>
              <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={`w-20 h-1 rounded-lg appearance-none cursor-pointer ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume * 100}%, ${isDarkMode ? '#4b5563' : '#d1d5db'} ${volume * 100}%, ${isDarkMode ? '#4b5563' : '#d1d5db'} 100%)`
                }}
              />
            </div>

            {/* Music Note Animation */}
            {isPlaying && (
              <div className="flex items-center gap-1">
                <div className={`w-1 h-4 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-1 h-3 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-1 h-5 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
