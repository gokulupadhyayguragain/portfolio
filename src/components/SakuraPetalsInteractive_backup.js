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
        antialias: true 
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
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
      const starCount = 1500; // Reduced from 3500 for better performance
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors_array = new Float32Array(starCount * 3);
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Create spiral galaxy arms
        const armAngle = (i / starCount) * Math.PI * 4;
        const armRadius = 20 + (i / starCount) * 80;
        const armOffset = Math.sin(armAngle * 3) * 10;
        
        positions[i3] = Math.cos(armAngle) * (armRadius + armOffset) + (Math.random() - 0.5) * 20;
        positions[i3 + 1] = (Math.random() - 0.5) * 20;
        positions[i3 + 2] = Math.sin(armAngle) * (armRadius + armOffset) + (Math.random() - 0.5) * 20;
        
        // Assign colors based on position
        const color = new THREE.Color(colors.primary);
        if (Math.random() > 0.7) {
          color.setHex(parseInt(colors.accent.slice(1), 16));
        }
        
        colors_array[i3] = color.r;
        colors_array[i3 + 1] = color.g;
        colors_array[i3 + 2] = color.b;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));
      
      // Use simpler material for better performance
      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });
      
      const galaxyStars = new THREE.Points(geometry, material);
      scene.add(galaxyStars);
      
      // Store reference for animation
      galaxyStars.userData = { isGalaxy: true };
      stars.push(galaxyStars);
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      
      if (!scene || !camera || !renderer) return;
      
      const elapsedTime = clock.getDelta();
      
      // Rotate galaxy and accretion disk
      scene.children.forEach(child => {
        if (child.userData && child.userData.isGalaxy) {
          child.rotation.y += 0.001;
        }
        if (child.geometry && child.geometry.type === 'RingGeometry') {
          child.rotation.z += 0.005;
        }
      });
      
      // Update individual stars with reduced complexity
      stars.forEach((starGroup, index) => {
        if (starGroup.userData && starGroup.userData.isGalaxy) return;
        
        if (starGroup.userData) {
          const userData = starGroup.userData;
          userData.angle += userData.rotationSpeed;
          
          // Simplified movement calculation
          starGroup.position.x = Math.cos(userData.angle) * userData.radius;
          starGroup.position.z = Math.sin(userData.angle) * userData.radius;
          starGroup.position.y += userData.verticalSpeed;
          
          // Simple pulsing effect
          const pulse = Math.sin(Date.now() * 0.001 + userData.pulseOffset) * 0.5 + 0.5;
          starGroup.scale.setScalar(0.5 + pulse * 0.5);
        }
      });
      
      // Camera slight movement based on mouse (reduced effect)
      if (camera) {
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);
      }
      
      renderer.render(scene, camera);
    }

    // Optimized star burst effect
    function addStarBurst(x, y) {
      if (!THREE || stars.length > 50) return; // Limit active stars
      
      const starCount = 8; // Reduced from 15
      for (let i = 0; i < starCount; i++) {
        const angle = (i / starCount) * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
          color: colors.accent,
          transparent: true,
          opacity: 0.8
        });
        
        const star = new THREE.Mesh(geometry, material);
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
      mouse.x = (e.clientX / width - 0.5);
      mouse.y = (0.5 - e.clientY / height);
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
  
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-auto z-0" />;
}
