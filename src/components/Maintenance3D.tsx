"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

interface Maintenance3DProps {
  initialMessage?: string;
  initialTickerText?: string;
  initialEstimatedTime?: string;
}

export function Maintenance3D(props?: Maintenance3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [headline, setHeadline] = React.useState(
    props?.initialMessage || "This site is under maintenance. Soon back."
  );
  const [tickerText, setTickerText] = React.useState(
    props?.initialTickerText ||
      "⚡ THIS SITE IS UNDER MAINTENANCE • SOON BACK ✦ UPGRADING SYSTEM CORE ✦"
  );

  // Three.js 3D Interactive Scene
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060911, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 13;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Central 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Rotating Icosahedron (Inner Core)
    const innerGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      emissive: 0xd97706,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Middle Cyber Octahedron
    const midGeo = new THREE.OctahedronGeometry(4.2, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const midCore = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midCore);

    // 3. Orbital Energy Torus Rings
    const ring1Geo = new THREE.TorusGeometry(5.8, 0.05, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.85 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(6.9, 0.045, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(7.8, 0.035, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.6 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 2.3;
    coreGroup.add(ring3);

    // 4. Starfield & Floating Glowing Embers (1200 Particles)
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorAmber = new THREE.Color(0xf59e0b);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorEmerald = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      const c = i % 3 === 0 ? colorAmber : i % 3 === 1 ? colorCyan : colorEmerald;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 4, 40);
    amberLight.position.set(8, 8, 8);
    scene.add(amberLight);

    const cyanLight = new THREE.PointLight(0x0284c7, 3, 40);
    cyanLight.position.set(-8, -8, 8);
    scene.add(cyanLight);

    // Interactive Mouse Tracking Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Camera parallax
      targetX = mouseX * 2.2;
      targetY = -mouseY * 2.2;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Rotations
      innerCore.rotation.x += 0.45 * delta;
      innerCore.rotation.y += 0.6 * delta;

      midCore.rotation.x -= 0.3 * delta;
      midCore.rotation.z += 0.4 * delta;

      ring1.rotation.z += 0.5 * delta;
      ring2.rotation.x += 0.45 * delta;
      ring3.rotation.y += 0.4 * delta;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(time * 2.2) * 0.06;
      coreGroup.scale.set(pulse, pulse, pulse);

      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Background check: as soon as the site is turned ON, redirect user back to live website
  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch("/api/maintenance", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.isMaintenance === false) {
            router.push("/");
            router.refresh();
          } else {
            if (data.message) {
              setHeadline(data.message);
            }
            if (data.tickerText) {
              setTickerText(data.tickerText);
            }
          }
        }
      } catch {}
    };

    const interval = setInterval(checkLive, 3000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="relative min-h-screen w-full bg-[#050811] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Layer (Full Screen, fully visible and centered) */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Cybernetic Ambient Light Flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header Space */}
      <div className="relative z-10 w-full pt-8 px-6 flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-amber-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
            System Maintenance
          </span>
        </div>
      </div>

      {/* Center Spacer allowing full 3D object visibility */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Area: The User's requested Running / Ticker Line */}
      <div className="relative z-10 w-full pb-10 space-y-6">
        
        {/* Clean Center Typography */}
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.35)] leading-tight">
            {headline}
          </h1>
        </div>

        {/* Continuous Running Marquee / Ticker Line */}
        <div className="w-full overflow-hidden border-y border-amber-500/25 bg-slate-950/70 backdrop-blur-md py-3 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest text-amber-300 uppercase px-6 font-semibold"
              >
                <span>{tickerText}</span>
                <span className="text-cyan-400">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation Style */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
