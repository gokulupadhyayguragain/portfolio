"use client";
import { useEffect, useRef } from "react";

export default function GalaxyBlackHole({ isDarkMode = false }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    let THREE, renderer, scene, camera, stars = [], mouse = { x: 0, y: 0 };
    let animationId, clock;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Color schemes based on mode
    const colors = isDarkMode ? {
      primary: "#1e40af",    // Deep blue
      secondary: "#3b82f6",  // Blue
      accent: "#60a5fa",     // Light blue
      glow: "#dbeafe"        // Very light blue
    } : {
      primary: "#ec4899",    // Pink
      secondary: "#f472b6",  // Light pink
      accent: "#fbbf24",     // Gold
      glow: "#fde2e7"        // Very light pink
    };

    async function loadThreeJS() {
      const threeModule = await import('three');
      return threeModule;
    }

    async function init() {
      THREE = await loadThreeJS();
      
      clock = new THREE.Clock();
      
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        alpha: true,
        antialias: false, // Disabled for better performance
        powerPreference: "high-performance"
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped for performance
      
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
      camera.position.z = 50;
      
      // Enhanced lighting system
      const ambientLight = new THREE.AmbientLight(colors.glow, 0.4);
      scene.add(ambientLight);
      
      const pointLight = new THREE.PointLight(colors.accent, 2, 1000);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);

      // Create optimized galaxy with fewer stars for better performance
      createGalaxyStars();
      
      // Create central black hole
      const blackHoleGeometry = new THREE.SphereGeometry(2, 32, 32);
      const blackHoleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        transparent: true,
        opacity: 0.8
      });
      const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
      scene.add(blackHole);
      
      // Create accretion disk
      const diskGeometry = new THREE.RingGeometry(3, 8, 64);
      const diskMaterial = new THREE.MeshBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
      scene.add(accretionDisk);
      
      animate();
    }

    function createGalaxyStars() {
      const starCount = 3000; // Optimized star count for better performance
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors_array = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // 360° spherical distribution for full galaxy coverage
        const radius = Math.pow(Math.random(), 0.6) * 120; // Larger radius for bigger galaxy
        const theta = Math.random() * Math.PI * 2; // Full 360° horizontal rotation
        const phi = (Math.random() - 0.5) * Math.PI; // Full 180° vertical coverage (-90° to +90°)
        
        // Convert spherical to cartesian coordinates for 3D distribution
        positions[i3] = radius * Math.cos(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi);
        positions[i3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
        
        // Enhanced color variety with smooth gradients
        const colorVariant = Math.random();
        const distanceFactor = radius / 120; // Color variation based on distance
        
        if (colorVariant < 0.35) {
          // Pink/Rose galaxy arms
          const color = new THREE.Color(colors.primary);
          color.multiplyScalar(0.8 + Math.random() * 0.4);
          colors_array[i3] = color.r;
          colors_array[i3 + 1] = color.g;
          colors_array[i3 + 2] = color.b;
        } else if (colorVariant < 0.65) {
          // Blue/Cyan outer regions
          const color = new THREE.Color(colors.secondary);
          color.multiplyScalar(0.7 + Math.random() * 0.5);
          colors_array[i3] = color.r;
          colors_array[i3 + 1] = color.g;
          colors_array[i3 + 2] = color.b;
        } else {
          // White/Silver core stars
          const intensity = 0.6 + Math.random() * 0.4 + (1 - distanceFactor) * 0.3;
          colors_array[i3] = intensity;
          colors_array[i3 + 1] = intensity;
          colors_array[i3 + 2] = intensity;
        }
        
        // Varied star sizes with distance-based scaling
        const baseSize = 0.5 + Math.random() * 2;
        const distanceScale = 1 - (distanceFactor * 0.6); // Closer stars appear larger
        sizes[i] = baseSize * distanceScale;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      // Enhanced circular texture for perfect star shapes
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      // Create smooth radial gradient for star glow
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.5)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      
      const circleTexture = new THREE.CanvasTexture(canvas);
      
      // Enhanced material with size attenuation
      const material = new THREE.PointsMaterial({
        size: 1.2,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        map: circleTexture,
        alphaTest: 0.01,
        blending: THREE.AdditiveBlending // Additive blending for glow effect
      });
      
      const galaxyStars = new THREE.Points(geometry, material);
      scene.add(galaxyStars);
      
      // Store reference for 360° rotation animation
      galaxyStars.userData = { isGalaxy: true };
      stars.push(galaxyStars);
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      
      if (!scene || !camera || !renderer) return;
      
      const time = clock.getElapsedTime();
      
      // Optimized galaxy rotation with significantly increased mouse sensitivity
      scene.children.forEach(child => {
        if (child.userData && child.userData.isGalaxy) {
          // Dramatically increased mouse sensitivity for better control
          const rotationSpeed = 0.001;
          const mouseInfluence = 0.008; // Increased from 0.002 to 0.008 (4x sensitivity)
          
          child.rotation.x += rotationSpeed + (mouse.y * mouseInfluence);
          child.rotation.y += rotationSpeed + (mouse.x * mouseInfluence);
          child.rotation.z += rotationSpeed * 0.5 + (mouse.x * mouseInfluence * 0.3);
          
          // Enhanced pulsing effect
          const pulseScale = 1 + Math.sin(time * 0.3) * 0.02;
          child.scale.setScalar(pulseScale);
        }
      });
      
      renderer.render(scene, camera);
    }

    // Optimized star burst effect
    function addStarBurst(x, y) {
      if (!THREE || stars.length > 50) return; // Limit active stars
      
      const starCount = 8; // Reduced from 15
      for (let i = 0; i < starCount; i++) {
        const angle = (i / starCount) * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        
        // Create small circular dot for burst
        const dotGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
          color: colors.accent,
          transparent: true,
          opacity: 0.8
        });
        
        const star = new THREE.Mesh(dotGeometry, material);
        star.position.x = Math.cos(angle) * radius;
        star.position.y = Math.sin(angle) * radius;
        star.position.z = (Math.random() - 0.5) * 10;
        
        star.userData = { 
          angle: angle, 
          radius: radius,
          baseRadius: radius,
          rotationSpeed: 0.002 + Math.random() * 0.004,
          verticalSpeed: (Math.random() - 0.5) * 0.02,
          pulseOffset: Math.random() * Math.PI * 2,
          orbitTilt: (Math.random() - 0.5) * 0.3
        };
        
        scene.add(star);
        stars.push(star);
        
        // Remove after some time
        setTimeout(() => {
          scene.remove(star);
          const index = stars.indexOf(star);
          if (index > -1) stars.splice(index, 1);
        }, 15000);
      }
    }
    
    function handlePointer(e) {
      // Significantly increased mouse sensitivity mapping
      mouse.x = (e.clientX / width - 0.5) * 2; // Increased range from -1 to 1
      mouse.y = (0.5 - e.clientY / height) * 2; // Increased range from -1 to 1
    }
    
    function handleClick(e) {
      addStarBurst(e.clientX, e.clientY);
    }
    
    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }
    
    window.addEventListener("mousemove", handlePointer);
    window.addEventListener("touchmove", (e) => {
      if (e.touches[0]) handlePointer(e.touches[0]);
    });
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("touchstart", (e) => {
      if (e.touches[0]) addStarBurst(e.touches[0].clientX, e.touches[0].clientY);
    });
    window.addEventListener("resize", handleResize);
    
    init();
    
    return () => {
      cancelAnimationFrame(animationId);
      renderer && renderer.dispose();
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("touchmove", handlePointer);
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("touchstart", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDarkMode]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-auto z-0 backdrop-blur-3xl" />;
}
