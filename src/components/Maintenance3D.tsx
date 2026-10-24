"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  Cpu,
  RefreshCw,
  Clock,
  Sparkles,
  Server,
  Database,
  Lock,
  ChevronRight,
  Radio,
  CheckCircle2,
} from "lucide-react";
import * as THREE from "three";

interface Maintenance3DProps {
  initialMessage?: string;
  initialEstimatedTime?: string;
}

export function Maintenance3D({
  initialMessage = "We are currently performing scheduled core upgrades to bring you enhanced performance and new features. DevSuite Hub will be back online shortly.",
  initialEstimatedTime = "Under 1 Hour",
}: Maintenance3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [message] = useState(initialMessage);
  const [estimatedTime] = useState(initialEstimatedTime);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  // System diagnostic progress animation
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Three.js 3D Scene Setup
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d16, 0.025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Group for 3D Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Glowing Icosahedron (The Reactor Core)
    const innerGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. Middle Wireframe Octahedron
    const midGeo = new THREE.OctahedronGeometry(5.2, 0);
    const midMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const midCore = new THREE.Mesh(midGeo, midMat);
    coreGroup.add(midCore);

    // 3. Floating Orbital Torus Rings
    const ring1Geo = new THREE.TorusGeometry(7.2, 0.06, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(8.5, 0.05, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(9.8, 0.04, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 2.5;
    coreGroup.add(ring3);

    // 4. Floating Cyber Particle Field (1000 Stars/Embers)
    const particleCount = 1000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xf59e0b); // Amber
    const color2 = new THREE.Color(0x38bdf8); // Cyan
    const color3 = new THREE.Color(0x10b981); // Emerald

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const mixedColor =
        i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const amberPoint = new THREE.PointLight(0xf59e0b, 3, 50);
    amberPoint.position.set(10, 10, 10);
    scene.add(amberPoint);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 3, 50);
    cyanPoint.position.set(-10, -10, 10);
    scene.add(cyanPoint);

    // Mouse Interaction for 3D Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;
      mouseX = (event.clientX - halfX) / halfX;
      mouseY = (event.clientY - halfY) / halfY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera tilt towards mouse
      targetX = mouseX * 2.5;
      targetY = -mouseY * 2.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Core rotations
      innerCore.rotation.x += 0.3 * delta;
      innerCore.rotation.y += 0.45 * delta;

      midCore.rotation.x -= 0.2 * delta;
      midCore.rotation.z += 0.35 * delta;

      ring1.rotation.z += 0.4 * delta;
      ring2.rotation.x += 0.35 * delta;
      ring3.rotation.y += 0.3 * delta;

      // Pulse core scale
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreGroup.scale.set(scale, scale, scale);

      // Rotate particle field slowly
      particles.rotation.y = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Periodic automatic polling to detect when admin turns site back ON
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const res = await fetch("/api/maintenance", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.isMaintenance === false) {
            router.push("/");
            router.refresh();
          }
        }
      } catch {}
    };

    const interval = setInterval(checkLiveStatus, 5000);
    return () => clearInterval(interval);
  }, [router]);

  // Manual Check Button
  const handleCheckStatus = async () => {
    setIsChecking(true);
    setCheckResult(null);
    try {
      const res = await fetch("/api/maintenance", { cache: "no-store" });
      const data = await res.json();
      if (data.isMaintenance === false) {
        setCheckResult("System is back online! Redirecting...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      } else {
        setCheckResult("Maintenance is still active. Please check back in a few minutes.");
      }
    } catch {
      setCheckResult("Unable to reach server. Please retry.");
    } finally {
      setIsChecking(false);
    }
  };

  const diagnosticItems = [
    { label: "Core Database Cluster", status: "Optimized", progress: "100%", icon: Database },
    { label: "Security & Encryption Keys", status: "Secured", progress: "100%", icon: Lock },
    { label: "API Gateways & Cloud Sync", status: "Upgrading", progress: "88%", icon: Server },
    { label: "Microservices & UI Engine", status: "Synchronizing", progress: "92%", icon: Cpu },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#070b13] text-white flex flex-col items-center justify-center overflow-hidden select-none font-sans">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-85"
      />

      {/* Cybernetic Ambient Glow Background Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-[128px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none animate-pulse" />

      {/* Foreground Content Card */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-10 my-auto">
        <div className="relative backdrop-blur-2xl bg-slate-900/75 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_0_80px_rgba(245,158,11,0.18)] hover:border-amber-500/30 transition-all duration-500">
          
          {/* Header Status Pill */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Under Maintenance Mode
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>ETA: <strong className="text-amber-300 font-medium">{estimatedTime}</strong></span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-400">
            System Upgrades in Progress
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {message}
          </p>

          {/* Live Diagnostic Pulse Cards */}
          <div className="mt-8 space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              Live System Status
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {diagnosticItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive = step === idx;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                      isActive
                        ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        : "bg-slate-950/40 border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isActive ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-slate-400"}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-200">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-amber-300 font-medium">
                      {item.progress}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleCheckStatus}
              disabled={isChecking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
              {isChecking ? "Checking Status..." : "Check System Status"}
            </button>

            <span className="text-xs text-slate-400 text-center sm:text-right">
              Auto-refreshes every 5 seconds
            </span>
          </div>

          {/* Status Message Feedback */}
          {checkResult && (
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-center text-amber-200 animate-fadeIn">
              {checkResult}
            </div>
          )}
        </div>

        {/* Footer & Owner Portal Access */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500 px-2">
          <span>&copy; {new Date().getFullYear()} DevSuite Hub • Powered by UV Tech</span>
          
          <Link
            href="/admin12"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>Owner Portal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
