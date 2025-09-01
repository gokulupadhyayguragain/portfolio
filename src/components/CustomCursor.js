"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.onclick || 
        target.style.cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]');
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor ball - faster and more responsive */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-75 ease-out ${
          isPointer ? 'scale-150' : 'scale-100'
        } ${isClicking ? 'scale-75' : ''}`}
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
        }}
      >
        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-100 ${
          isPointer 
            ? 'bg-pink-400/30 border-pink-400 shadow-lg shadow-pink-400/60' 
            : 'bg-blue-400/30 border-blue-400 shadow-lg shadow-blue-400/60'
        }`} />
      </div>

      {/* Fast trailing ball with highlight */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-150 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`,
        }}
      >
        <div className={`w-6 h-6 rounded-full transition-all duration-150 ${
          isPointer 
            ? 'bg-pink-400/20 border-2 border-pink-400/50 shadow-md shadow-pink-400/40' 
            : 'bg-blue-400/20 border-2 border-blue-400/50 shadow-md shadow-blue-400/40'
        }`} />
      </div>

      {/* Medium trailing ball */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9997] transition-all duration-250 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
        }}
      >
        <div className={`w-8 h-8 rounded-full transition-all duration-250 ${
          isPointer 
            ? 'bg-pink-400/15 border border-pink-400/30' 
            : 'bg-blue-400/15 border border-blue-400/30'
        }`} />
      </div>

      {/* Glow effect - slower for smooth trail */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9996] transition-all duration-400 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
        }}
      >
        <div className={`w-10 h-10 rounded-full transition-all duration-400 ${
          isPointer 
            ? 'bg-pink-400/8 border border-pink-400/20' 
            : 'bg-blue-400/8 border border-blue-400/20'
        }`} />
      </div>

      {/* Click ripple effect - enhanced */}
      {isClicking && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9995] animate-ping"
          style={{
            transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
          }}
        >
          <div className="w-8 h-8 rounded-full bg-pink-400/40 border-2 border-pink-400/60 shadow-lg shadow-pink-400/50" />
        </div>
      )}
    </>
  );
}
