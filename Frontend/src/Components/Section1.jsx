import React, { useRef, useState, useEffect } from "react";
import "../index.css";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SplitText from "../Corporates/SplitText";
import MagneticButton from "./ui/MagneticButton";

const Section1 = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    setMousePosition({ x, y });
  };

  // Satellite Elements Data - Pushed out further to prevent overlap
  const satellites = [
    { id: 1, label: "Verified", x: -35, y: -25, size: "lg", color: "bg-cyan-400" },
    { id: 2, label: "Fast", x: 40, y: -20, size: "md", color: "bg-purple-400" },
    { id: 3, label: "Secure", x: -30, y: 35, size: "sm", color: "bg-pink-400" },
    { id: 4, label: "Global", x: 45, y: 25, size: "md", color: "bg-emerald-400" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] w-[95%] mx-auto mt-6 rounded-[3rem] flex flex-col justify-center items-center overflow-hidden bg-[#050505]/80 backdrop-blur-sm shadow-[0_0_50px_-10px_rgba(120,119,198,0.3)] border border-white/5"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-pink-600 rounded-full blur-[100px]" />
      </div>

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * window.innerWidth + window.innerWidth / 2}px ${mousePosition.y * window.innerHeight + window.innerHeight / 2}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Floating Satellites */}
      {satellites.map((sat) => (
        <motion.div
          key={sat.id}
          className={`absolute rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl z-10 
              ${sat.size === 'lg' ? 'w-24 h-24 text-sm' : sat.size === 'md' ? 'w-16 h-16 text-xs' : 'w-12 h-12 text-[10px]'}
              text-white font-bold tracking-wider`}
          style={{
            background: "rgba(255,255,255,0.03)",
            top: `${50 + sat.y}%`,
            left: `${50 + sat.x}%`,
          }}
          animate={{
            x: mousePosition.x * sat.x * 2, // Parallax effect
            y: mousePosition.y * sat.y * 2,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 200 }}
        >
          <div className={`absolute w-2 h-2 rounded-full ${sat.color} top-2 right-2 shadow-[0_0_10px_currentColor]`} />
          {sat.label}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 text-center max-w-5xl px-4 flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-gray-300 text-xs font-medium tracking-wide">LIVE COLLABORATION HUB</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 relative group">
          <SplitText text="CONNECT" className="block text-white" delay={0} />

          <span className="relative block">
            {/* Glitch/Glow Aura */}
            <span className="absolute -inset-1 blur-xl opacity-30 bg-gradient-to-r from-purple-600 to-cyan-600 group-hover:opacity-60 transition-opacity duration-500"></span>
            <span className="relative block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
              <SplitText text="INNOVATE" className="inline-block" delay={200} />
            </span>
          </span>

          <SplitText text="SCALE UP" className="block text-white" delay={400} />
        </h1>

        <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
          The neural network for startups and enterprises.
          Where ambition meets opportunity in real-time.
        </p>

        <div className="flex gap-6 relative z-30">
          <MagneticButton
            id="btn1"
            style={{
              padding: '16px 32px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: '0 0 30px rgba(255,255,255,0.3)',
              border: 'none'
            }}
          >
            Start Building
          </MagneticButton>
          <MagneticButton id="btn2"
            style={{
              padding: '16px 32px',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              boxShadow: '0 0 30px rgba(255,255,255,0.3)',
              border: 'none'
            }}
          >
            Watch Demo
          </MagneticButton>
        </div>
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
    </section>
  );
};

export default Section1;
