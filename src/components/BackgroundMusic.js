"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set basic properties
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";

    // Simple direct approach - try to play immediately with sound
    const startMusic = async () => {
      try {
        console.log("🎵 Attempting to play music...");
        audio.muted = false;
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
        console.log("✅ Music playing with sound!");
      } catch (error) {
        console.log("🔇 Browser blocked audio, waiting for user interaction...");
        setIsPlaying(false);
      }
    };

    // Try to start music immediately
    startMusic();

    // Also try when audio can play
    audio.addEventListener('canplaythrough', startMusic);

    return () => {
      audio.removeEventListener('canplaythrough', startMusic);
    };
  }, [volume]);

  // Simple play/pause toggle
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        console.log("⏸️ Music paused");
      } else {
        audio.muted = false;
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
        console.log("▶️ Music playing");
      }
    } catch (error) {
      console.error("❌ Audio control failed:", error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Auto-start on any user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        try {
          audio.muted = false;
          audio.volume = volume;
          await audio.play();
          setIsPlaying(true);
          console.log("🎵 Music started after user interaction!");
        } catch (e) {
          console.log("Failed to start on interaction:", e);
        }
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isPlaying, volume]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
        onPlay={() => console.log('▶️ Audio playing')}
        onPause={() => console.log('⏸️ Audio paused')}
        onError={(e) => console.error('❌ Audio error:', e.target.error)}
      >
        <source src="/bgm.mp3" type="audio/mpeg" />
        Your browser does not support audio.
      </audio>

      {/* Music Control Panel */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className={`backdrop-blur-sm rounded-lg p-3 border transition-all ${
          isDarkMode 
            ? 'bg-gray-900/70 border-pink-500/30' 
            : 'bg-white/70 border-pink-300'
        } shadow-lg`}>
          
          <div className="flex items-center gap-3">
            {/* Big Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg hover:scale-105 transition-all"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Volume Slider */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 accent-pink-500"
              />
            </div>
          </div>

          {/* Status */}
          <div className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isPlaying ? '♪ Playing' : 'Click to start music'}
          </div>
        </div>
      </div>
    </>
  );
}
