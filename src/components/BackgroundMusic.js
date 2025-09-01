"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isVisible, setIsVisible] = useState(true); // Always show controls
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set audio properties for infinite loop and auto-play
    audio.loop = true;
    audio.volume = volume;
    audio.muted = true; // Start muted to avoid browser blocking
    audio.autoplay = true;
    audio.preload = "auto";

    // Super aggressive auto-play strategy
    const forceAutoPlay = async () => {
      try {
        console.log("🎵 Attempting to start music...");
        
        // Reset audio to ensure fresh start
        audio.currentTime = 0;
        audio.volume = volume;
        
        // Start muted (most likely to work)
        audio.muted = true;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsVisible(true);
          console.log("🔇 Audio auto-playing muted (will unmute on any interaction)");
          
          // Try to unmute immediately
          setTimeout(() => {
            if (audio && !audio.paused) {
              audio.muted = false;
              console.log("� Auto-unmuted after 100ms");
            }
          }, 100);
          
          // Auto-unmute on ANY user interaction
          const autoUnmute = () => {
            if (audio && !audio.paused && audio.muted) {
              audio.muted = false;
              console.log("🔊 Audio unmuted after user interaction");
              // Remove all listeners after successful unmute
              document.removeEventListener('click', autoUnmute);
              document.removeEventListener('touchstart', autoUnmute);
              document.removeEventListener('keydown', autoUnmute);
              document.removeEventListener('scroll', autoUnmute);
              document.removeEventListener('mousemove', autoUnmute);
              window.removeEventListener('focus', autoUnmute);
            }
          };
          
          // Listen for various user interactions to unmute
          document.addEventListener('click', autoUnmute, { passive: true });
          document.addEventListener('touchstart', autoUnmute, { passive: true });
          document.addEventListener('keydown', autoUnmute, { passive: true });
          document.addEventListener('scroll', autoUnmute, { passive: true });
          document.addEventListener('mousemove', autoUnmute, { passive: true });
          window.addEventListener('focus', autoUnmute, { passive: true });
          
          return;
        }
        
      } catch (error) {
        console.log("❌ Auto-play failed:", error);
        setIsVisible(true);
        
        // Force play on ANY user interaction
        const forcePlay = async () => {
          try {
            audio.muted = false;
            audio.volume = volume;
            audio.currentTime = 0;
            await audio.play();
            setIsPlaying(true);
            console.log("🎵 Audio started after user interaction");
            
            // Remove listeners after successful play
            document.removeEventListener('click', forcePlay);
            document.removeEventListener('touchstart', forcePlay);
            document.removeEventListener('keydown', forcePlay);
            document.removeEventListener('scroll', forcePlay);
            
          } catch (forceError) {
            console.log("❌ Force play failed:", forceError);
          }
        };
        
        // Listen for any interaction to force play
        document.addEventListener('click', forcePlay, { once: true, passive: true });
        document.addEventListener('touchstart', forcePlay, { once: true, passive: true });
        document.addEventListener('keydown', forcePlay, { once: true, passive: true });
        document.addEventListener('scroll', forcePlay, { once: true, passive: true });
      }
    };

    // Try multiple times with delays
    const attemptPlay = () => {
      forceAutoPlay();
      
      // Retry after 1 second
      setTimeout(() => {
        if (audio.paused) {
          console.log("🔄 Retrying auto-play...");
          forceAutoPlay();
        }
      }, 1000);
      
      // Final retry after 3 seconds
      setTimeout(() => {
        if (audio.paused) {
          console.log("🔄 Final auto-play attempt...");
          forceAutoPlay();
        }
      }, 3000);
    };

    // Start immediately and also when audio loads
    attemptPlay();
    audio.addEventListener('canplaythrough', attemptPlay);
    audio.addEventListener('loadeddata', attemptPlay);

    return () => {
      audio.removeEventListener('canplaythrough', attemptPlay);
      audio.removeEventListener('loadeddata', attemptPlay);
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
      {/* Hidden audio element with aggressive auto-play attributes */}
      <audio
        ref={audioRef}
        preload="auto"
        autoPlay
        loop
        muted={false}
        controls={false}
        style={{ display: 'none' }}
        onLoadStart={() => console.log('🎵 Audio loading started...')}
        onCanPlay={() => console.log('✅ Audio can play - bgm.mp3 loaded successfully')}
        onError={(e) => console.error('❌ Audio error:', e.target.error)}
        onLoadedData={() => console.log('📀 Audio data loaded')}
        onPlay={() => console.log('▶️ Audio started playing')}
        onPause={() => console.log('⏸️ Audio paused')}
      >
        <source src="/bgm.mp3" type="audio/mpeg" />
        <source src="/bgm.ogg" type="audio/ogg" />
        <source src="/bgm.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Music Control - Bottom Left */}
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
      }`}>
        <div className={`backdrop-blur-md rounded-xl p-4 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-gray-800/90 border-gray-600/50 shadow-2xl shadow-gray-900/50' 
            : 'bg-white/90 border-sky-200/50 shadow-2xl shadow-sky-200/50'
        }`}>
          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDarkMode
                  ? 'bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/40'
                  : 'bg-pink-500 hover:bg-pink-400 text-white shadow-lg shadow-pink-500/40'
              } hover:scale-110 active:scale-95 group`}
              title={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Music Info & Volume Control */}
            <div className="flex flex-col gap-2">
              {/* Music Title */}
              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                🎵 Background Music
              </div>
              
              {/* Volume Control */}
              <div className="flex items-center gap-2">
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
                  className={`w-24 h-2 rounded-lg appearance-none cursor-pointer ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume * 100}%, ${isDarkMode ? '#4b5563' : '#d1d5db'} ${volume * 100}%, ${isDarkMode ? '#4b5563' : '#d1d5db'} 100%)`
                  }}
                />
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Music Note Animation */}
            {isPlaying && (
              <div className="flex items-center gap-1 ml-2">
                <div className={`w-1 h-6 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
                <div className={`w-1 h-4 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
                <div className={`w-1 h-7 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
                <div className={`w-1 h-3 rounded-full animate-pulse ${isDarkMode ? 'bg-pink-400' : 'bg-pink-500'}`} style={{ animationDelay: '600ms', animationDuration: '1s' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
