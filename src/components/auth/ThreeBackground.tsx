import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ============ EMOTIONAL SUNRISE SUN ============
    const sunGroup = new THREE.Group();
    
    // Main sun body - warm golden
    const sunGeometry = new THREE.CircleGeometry(2.5, 64);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb347,
      transparent: true,
      opacity: 0.9,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-6, 6, -15);
    sunGroup.add(sun);
    
    // Sun glow layers
    for (let i = 1; i <= 4; i++) {
      const glowGeometry = new THREE.CircleGeometry(2.5 + i * 0.8, 64);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.08 - i * 0.01, 0.9, 0.6),
        transparent: true,
        opacity: 0.15 - i * 0.03,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(sun.position);
      glow.position.z -= 0.1 * i;
      sunGroup.add(glow);
    }
    
    // Sun rays radiating outward
    for (let i = 0; i < 12; i++) {
      const rayLength = 4 + Math.random() * 3;
      const rayGeometry = new THREE.PlaneGeometry(0.15, rayLength);
      const rayMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const ray = new THREE.Mesh(rayGeometry, rayMaterial);
      ray.position.copy(sun.position);
      ray.position.z -= 0.5;
      ray.rotation.z = (i / 12) * Math.PI * 2;
      ray.userData = { baseRotation: ray.rotation.z, index: i };
      sunGroup.add(ray);
    }
    scene.add(sunGroup);

    // ============ ROLLING HILLS (FARMLAND) ============
    const hillsGroup = new THREE.Group();
    const hillColors = [0x2d5a3d, 0x3d6b4a, 0x4a7c57, 0x5a8d64];
    for (let layer = 0; layer < 4; layer++) {
      const hillCurve = new THREE.Shape();
      hillCurve.moveTo(-20, -8);
      for (let x = -20; x <= 20; x += 2) {
        const y = -3 - layer * 0.8 + 
          Math.sin(x * 0.3 + layer * 2) * 1.2 + 
          Math.sin(x * 0.15 + layer) * 0.8;
        hillCurve.lineTo(x, y);
      }
      hillCurve.lineTo(20, -10);
      hillCurve.lineTo(-20, -10);
      
      const hillGeometry = new THREE.ShapeGeometry(hillCurve);
      const hillMaterial = new THREE.MeshBasicMaterial({
        color: hillColors[layer],
        transparent: true,
        opacity: 0.9 - layer * 0.1,
      });
      const hill = new THREE.Mesh(hillGeometry, hillMaterial);
      hill.position.z = -10 - layer * 2;
      hillsGroup.add(hill);
    }
    scene.add(hillsGroup);

    // ============ GROWING CROPS (Wheat Field) ============
    const cropsGroup = new THREE.Group();
    const cropCount = 150;
    
    for (let i = 0; i < cropCount; i++) {
      const cropHeight = 1.5 + Math.random() * 1.2;
      const stalkGeometry = new THREE.CylinderGeometry(0.015, 0.025, cropHeight, 6);
      const stalkMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.22 + Math.random() * 0.05, 0.5, 0.35),
        transparent: true,
        opacity: 0.85,
      });
      const stalk = new THREE.Mesh(stalkGeometry, stalkMaterial);
      
      const row = Math.floor(i / 15);
      const col = i % 15;
      stalk.position.x = (col - 7) * 1.2 + (Math.random() - 0.5) * 0.3;
      stalk.position.z = (row - 5) * 1.5 - 3 + (Math.random() - 0.5) * 0.3;
      stalk.position.y = -4 + cropHeight / 2;
      stalk.rotation.x = (Math.random() - 0.5) * 0.15;
      stalk.rotation.z = (Math.random() - 0.5) * 0.15;
      
      stalk.userData = {
        originalRotX: stalk.rotation.x,
        originalRotZ: stalk.rotation.z,
        swaySpeed: 0.8 + Math.random() * 0.4,
        swayOffset: Math.random() * Math.PI * 2,
      };
      cropsGroup.add(stalk);
      
      const grainGeometry = new THREE.SphereGeometry(0.06, 8, 8);
      grainGeometry.scale(1, 2.5, 1);
      const grainMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.12 + Math.random() * 0.03, 0.8, 0.55),
        transparent: true,
        opacity: 0.9,
      });
      const grain = new THREE.Mesh(grainGeometry, grainMaterial);
      grain.position.copy(stalk.position);
      grain.position.y += cropHeight / 2 + 0.08;
      grain.userData = stalk.userData;
      cropsGroup.add(grain);
    }
    scene.add(cropsGroup);

    // ============ FLYING BIRDS ============
    const birdsGroup = new THREE.Group();
    const birds: THREE.Group[] = [];
    
    for (let i = 0; i < 8; i++) {
      const bird = new THREE.Group();
      const bodyGeometry = new THREE.SphereGeometry(0.08, 8, 8);
      bodyGeometry.scale(1.5, 1, 1);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x2c2c2c, transparent: true, opacity: 0.7 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bird.add(body);
      
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.quadraticCurveTo(0.15, 0.08, 0.3, 0);
      wingShape.quadraticCurveTo(0.15, -0.03, 0, 0);
      
      const wingGeometry = new THREE.ShapeGeometry(wingShape);
      const wingMaterial = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
      
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.set(-0.05, 0, 0);
      leftWing.rotation.y = Math.PI / 2;
      bird.add(leftWing);
      
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial.clone());
      rightWing.position.set(0.05, 0, 0);
      rightWing.rotation.y = -Math.PI / 2;
      bird.add(rightWing);
      
      bird.position.set(-8 + i * 1.2 + Math.sin(i) * 2, 5 + Math.cos(i * 0.5) * 1.5, -8 - i * 0.5);
      bird.userData = {
        originalX: bird.position.x,
        originalY: bird.position.y,
        flySpeed: 0.3 + Math.random() * 0.2,
        wingSpeed: 8 + Math.random() * 4,
        flapOffset: Math.random() * Math.PI * 2,
        leftWing,
        rightWing,
      };
      
      birds.push(bird);
      birdsGroup.add(bird);
    }
    scene.add(birdsGroup);

    // ============ FLOATING SEEDS (Hope) ============
    const seedsGeometry = new THREE.BufferGeometry();
    const seedsCount = 200;
    const seedPositions = new Float32Array(seedsCount * 3);
    const seedColors = new Float32Array(seedsCount * 3);

    for (let i = 0; i < seedsCount; i++) {
      const i3 = i * 3;
      seedPositions[i3] = (Math.random() - 0.5) * 20;
      seedPositions[i3 + 1] = Math.random() * 12 - 2;
      seedPositions[i3 + 2] = (Math.random() - 0.5) * 10;

      const isGolden = Math.random() > 0.3;
      const hue = isGolden ? 0.1 + Math.random() * 0.05 : 0;
      const sat = isGolden ? 0.7 : 0;
      const light = isGolden ? 0.6 : 0.95;
      const color = new THREE.Color().setHSL(hue, sat, light);
      seedColors[i3] = color.r;
      seedColors[i3 + 1] = color.g;
      seedColors[i3 + 2] = color.b;
    }

    seedsGeometry.setAttribute('position', new THREE.BufferAttribute(seedPositions, 3));
    seedsGeometry.setAttribute('color', new THREE.BufferAttribute(seedColors, 3));

    const seedsMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const seeds = new THREE.Points(seedsGeometry, seedsMaterial);
    scene.add(seeds);

    // ============ FIREFLIES (Magic) ============
    const firefliesGeometry = new THREE.BufferGeometry();
    const firefliesCount = 50;
    const fireflyPositions = new Float32Array(firefliesCount * 3);

    for (let i = 0; i < firefliesCount; i++) {
      const i3 = i * 3;
      fireflyPositions[i3] = (Math.random() - 0.5) * 18;
      fireflyPositions[i3 + 1] = Math.random() * 6 - 2;
      fireflyPositions[i3 + 2] = (Math.random() - 0.5) * 8;
    }

    firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));

    const firefliesMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xffee88,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
    scene.add(fireflies);

    // ============ GENTLE RAIN (Nurturing) ============
    const raindrops: THREE.Mesh[] = [];
    
    for (let i = 0; i < 80; i++) {
      const dropGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 4);
      const dropMaterial = new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.25 });
      const drop = new THREE.Mesh(dropGeometry, dropMaterial);
      drop.position.set((Math.random() - 0.5) * 25, Math.random() * 15, (Math.random() - 0.5) * 10);
      drop.userData = { speed: 0.1 + Math.random() * 0.15, originalX: drop.position.x };
      raindrops.push(drop);
      scene.add(drop);
    }

    // Camera position
    camera.position.z = 14;
    camera.position.y = 1;

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetMouseX - mouseX) * 0.02;
      mouseY += (targetMouseY - mouseY) * 0.02;

      // Sun pulsing
      const sunPulse = 1 + Math.sin(elapsed * 0.5) * 0.05;
      sun.scale.setScalar(sunPulse);
      
      sunGroup.children.forEach((child) => {
        if (child.userData.baseRotation !== undefined) {
          child.rotation.z = child.userData.baseRotation + elapsed * 0.1;
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = 0.05 + Math.sin(elapsed * 2 + child.userData.index) * 0.03;
        }
      });

      // Crops swaying
      cropsGroup.children.forEach((child) => {
        if (child.userData.swaySpeed) {
          const windStrength = 0.08 + Math.sin(elapsed * 0.3) * 0.04;
          const sway = Math.sin(elapsed * child.userData.swaySpeed + child.userData.swayOffset) * windStrength;
          child.rotation.x = child.userData.originalRotX + sway;
          child.rotation.z = child.userData.originalRotZ + sway * 0.6;
        }
      });

      // Birds flying
      birds.forEach((bird, i) => {
        bird.position.x += bird.userData.flySpeed * 0.02;
        bird.position.y = bird.userData.originalY + Math.sin(elapsed * 0.5 + i) * 0.3;
        if (bird.position.x > 15) bird.position.x = -15;
        
        const flapAngle = Math.sin(elapsed * bird.userData.wingSpeed + bird.userData.flapOffset) * 0.4;
        bird.userData.leftWing.rotation.x = flapAngle;
        bird.userData.rightWing.rotation.x = -flapAngle;
      });

      // Seeds floating
      const seedPos = seedsGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < seedsCount; i++) {
        const i3 = i * 3;
        seedPos[i3 + 1] += 0.008;
        seedPos[i3] += Math.sin(elapsed * 0.5 + i * 0.1) * 0.003;
        if (seedPos[i3 + 1] > 10) {
          seedPos[i3 + 1] = -2;
          seedPos[i3] = (Math.random() - 0.5) * 20;
        }
      }
      seedsGeometry.attributes.position.needsUpdate = true;

      // Fireflies
      firefliesMaterial.opacity = 0.5 + Math.sin(elapsed * 3) * 0.3;
      const fireflyPos = firefliesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < firefliesCount; i++) {
        const i3 = i * 3;
        fireflyPos[i3] += Math.sin(elapsed + i) * 0.005;
        fireflyPos[i3 + 1] += Math.cos(elapsed * 0.7 + i) * 0.003;
      }
      firefliesGeometry.attributes.position.needsUpdate = true;

      // Rain
      const rainOpacity = 0.15 + Math.sin(elapsed * 0.2) * 0.1;
      raindrops.forEach((drop) => {
        drop.position.y -= drop.userData.speed;
        drop.position.x = drop.userData.originalX + Math.sin(elapsed * 2) * 0.1;
        if (drop.position.y < -5) drop.position.y = 12;
        (drop.material as THREE.MeshBasicMaterial).opacity = rainOpacity;
      });

      // Camera
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.015;
      camera.position.y += (mouseY * 0.8 + 1 - camera.position.y) * 0.015;
      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ 
        background: 'linear-gradient(180deg, #ff9966 0%, #ffb347 15%, #87ceeb 35%, #98d8c8 55%, #7eb77f 75%, #5a8c5a 100%)'
      }}
    />
  );
};

export default ThreeBackground;
