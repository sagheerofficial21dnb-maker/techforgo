import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const AnimatedCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Refs for tracking position and animation frame
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const followerRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);
  const particleIdRef = useRef<number>(0);
  const lastParticleTime = useRef<number>(0);

  const dotElRef = useRef<HTMLDivElement | null>(null);
  const ringElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (typeof window === 'undefined') return;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Position inner dot immediately for snappy responsiveness
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Spawn subtle tech particle every 60ms when moving
      const now = performance.now();
      if (now - lastParticleTime.current > 60) {
        lastParticleTime.current = now;
        const particleColors = ['#DC2626', '#EF4444', '#B91C1C', '#F59E0B'];
        const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          color: randomColor,
        };
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect hover on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-hover]'
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for the outer trailing ring (lerp)
    const animate = () => {
      const targetX = cursorRef.current.x;
      const targetY = cursorRef.current.y;

      // Linear interpolation for smooth trailing physics
      followerRef.current.x += (targetX - followerRef.current.x) * 0.18;
      followerRef.current.y += (targetY - followerRef.current.y) * 0.18;

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      {/* 1. Sparkle / trailing tech particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full transition-opacity duration-500 ease-out animate-ping"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: 'translate(-50%, -50%)',
            opacity: 0.5,
          }}
        />
      ))}

      {/* 2. Outer Trailing Ring */}
      <div
        ref={ringElRef}
        className="absolute top-0 left-0 -ml-4 -mt-4 transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out will-change-transform"
        style={{
          width: isHovering ? '44px' : isClicking ? '26px' : '34px',
          height: isHovering ? '44px' : isClicking ? '26px' : '34px',
          marginLeft: isHovering ? '-22px' : isClicking ? '-13px' : '-17px',
          marginTop: isHovering ? '-22px' : isClicking ? '-13px' : '-17px',
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isHovering
              ? 'border-2 border-[#DC2626] bg-[#DC2626]/20 shadow-[0_0_16px_rgba(220,38,38,0.5)] scale-110'
              : isClicking
              ? 'border-2 border-[#991B1B] bg-[#991B1B]/30 shadow-[0_0_10px_rgba(153,27,27,0.5)] scale-90'
              : 'border-[1.5px] border-[#DC2626]/80 bg-[#DC2626]/10 shadow-[0_0_8px_rgba(220,38,38,0.25)]'
          }`}
        />
      </div>

      {/* 3. Snappy Inner Tech Dot */}
      <div
        ref={dotElRef}
        className="absolute top-0 left-0 -ml-1 -mt-1 will-change-transform"
      >
        <div
          className={`w-2 h-2 rounded-full transition-transform duration-150 ${
            isHovering
              ? 'bg-[#DC2626] scale-150 shadow-[0_0_8px_#DC2626]'
              : isClicking
              ? 'bg-[#991B1B] scale-75'
              : 'bg-[#1A1A1A] border border-[#DC2626]'
          }`}
        />
      </div>
    </div>
  );
};
