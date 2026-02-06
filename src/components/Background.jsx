import React, { useEffect, useRef, useMemo } from 'react';

// Pixel Art SVGs

const PixelMoon = ({ isDark }) => (
    <svg viewBox="0 0 24 24" shapeRendering="crispEdges" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }}>
        {/* Full Moon Shape */}
        <path fill="#f8fafc" d="M 8 2 H 16 V 4 H 20 V 8 H 22 V 16 H 20 V 20 H 16 V 22 H 8 V 20 H 4 V 16 H 2 V 8 H 4 V 4 H 8 V 2 Z" />
        {/* Craters */}
        <rect x="15" y="7" width="2" height="2" fill="#cbd5e1" />
        <rect x="9" y="14" width="2" height="2" fill="#cbd5e1" />
        <rect x="16" y="13" width="3" height="2" fill="#cbd5e1" />
    </svg>
);

const PixelSun = () => (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" shapeRendering="crispEdges" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))' }}>
            <path fill="#fbbf24" d="M 8 2 H 16 V 4 H 20 V 8 H 22 V 16 H 20 V 20 H 16 V 22 H 8 V 20 H 4 V 16 H 2 V 8 H 4 V 4 H 8 V 2 Z" />
            <rect x="11" y="0" width="2" height="1" fill="#fbbf24" />
            <rect x="11" y="23" width="2" height="1" fill="#fbbf24" />
            <rect x="0" y="11" width="1" height="2" fill="#fbbf24" />
            <rect x="23" y="11" width="1" height="2" fill="#fbbf24" />
        </svg>
    </div>
);

const PixelCloud = ({ size = 1, opacity = 1 }) => (
    <svg viewBox="0 0 32 16" shapeRendering="crispEdges" style={{ width: 64 * size, height: 32 * size, opacity, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
        <path fill="#ffffff" d="
      M 8 8 H 4 V 6 H 8 V 4 H 14 V 2 H 22 V 4 H 26 V 6 H 28 V 8 H 30 V 14 H 2 V 8 Z
    " />
    </svg>
);



const Background = ({ theme }) => {
    const canvasRef = useRef(null);
    const themeRef = useRef(theme);
    // Dark mode colors matching user theme but adapted for layers
    // Layer 1 (Back/Sky), Layer 2 (Mid/Castle), Layer 3 (Fore)
    const isDark = theme === 'dark';

    // Theme Colors
    const colors = {
        sky: isDark ? ['#0f172a', '#1e293b'] : ['#7dd3fc', '#f0f9ff'],
        layer1: isDark ? "#334155" : "#93c5fd", // Distant
        layer2: isDark ? "#1e293b" : "#60a5fa", // Mid (Castle sits here)
        layer3: isDark ? "#0f172a" : "#3b82f6", // Fore (Darkest/Closest? Actually closest usually darkest in silhouette)
        // Adjusting light mode to be distinct:
        // Light Mode: Back (Lightest) -> Fore (Darker Blue) looks better for silhouette contrast
        star: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0)",
    };

    // Override light mode colors for a better "Blue Theme" look
    if (!isDark) {
        colors.layer1 = "#bae6fd"; // Light blue
        colors.layer2 = "#7dd3fc"; // Medium blue
        colors.layer3 = "#38bdf8"; // Signature blue
    }

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;

        let animationFrameId;
        let particles = [];
        const pixelScale = 4;

        const resizeCanvas = () => {
            canvas.width = Math.ceil(window.innerWidth / pixelScale);
            canvas.height = Math.ceil(window.innerHeight / pixelScale);
            ctx.imageSmoothingEnabled = false;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            if (isDark) {
                const starCount = Math.floor((canvas.width * canvas.height) / 500); // Dense stars
                for (let i = 0; i < starCount; i++) {
                    particles.push({
                        x: Math.floor(Math.random() * canvas.width),
                        y: Math.floor(Math.random() * canvas.height * 0.6),
                        size: Math.random() > 0.8 ? 2 : 1,
                        opacity: Math.random(),
                        twinkleSpeed: Math.random() * 0.03 + 0.005,
                    });
                }
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            particles.forEach((p) => {
                p.opacity += p.twinkleSpeed;
                if (p.opacity > 1 || p.opacity < 0.2) p.twinkleSpeed *= -1;
                ctx.globalAlpha = p.opacity;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        // Debounced Resize
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        resizeCanvas();

        if (isDark) {
            draw();
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, [isDark]);

    // GENERATE ROLLING HILLS (Sine Wave based)
    const totalWidth = 2000;
    const blockSize = 12; // "Little squares"

    const generateRollingHills = (baseHeight, amplitude, frequency, phase) => {
        const segments = [];
        for (let x = 0; x < totalWidth; x += blockSize) {
            // Sine wave for rolling effect
            const sineY = Math.sin((x / totalWidth) * Math.PI * frequency + phase) * amplitude;
            // Add some small noise for "pixel" roughness
            const noise = (Math.random() * 10) - 5;

            let h = baseHeight + sineY + noise;
            // Snap to grid
            h = Math.round(h / 5) * 5;

            segments.push({ w: blockSize, h: h, x });
        }
        return segments;
    };

    // Layer 1: Back (Silhouette of large mountains)
    const backSegments = useMemo(() => generateRollingHills(180, 50, 4, 0), []);
    // Layer 2: Mid 
    const midSegments = useMemo(() => generateRollingHills(120, 30, 3, 2), []); // Phase offset
    // Layer 3: Fore 
    const foreSegments = useMemo(() => generateRollingHills(60, 20, 2, 4), []);

    const generatePath = (segments) => {
        let d = `M0,320 `; // Start bottom left; 320 is SVG height
        segments.forEach(seg => {
            const y = 320 - seg.h;
            d += `V${y} H${seg.x + seg.w} `;
        });
        d += `V320 Z`;
        return d;
    };

    const backPath = useMemo(() => generatePath(backSegments), [backSegments]);
    const midPath = useMemo(() => generatePath(midSegments), [midSegments]);
    const forePath = useMemo(() => generatePath(foreSegments), [foreSegments]);



    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden',
            background: `linear-gradient(to bottom, ${colors.sky[0]}, ${colors.sky[1]})`,
            transition: 'background 1s ease'
        }}>

            {/* Celestial Bodies */}
            <div style={{
                position: 'absolute', top: '5%', right: '15%', width: '100px', height: '100px',
                transition: 'all 1s ease',
                transform: isDark ? 'translateY(0)' : 'translateY(20px)',
            }}>
                {isDark ? <PixelMoon /> : <PixelSun />}
            </div>

            {/* Clouds (Light Mode Only) */}
            {!isDark && (
                <>
                    <div style={{ position: 'absolute', top: '10%', left: '-10%', animation: 'moveCloud 60s linear infinite', zIndex: 0 }}>
                        <PixelCloud size={1.5} opacity={0.9} />
                    </div>
                    <div style={{ position: 'absolute', top: '20%', left: '-10%', animation: 'moveCloud 45s linear infinite', animationDelay: '-20s', zIndex: 0 }}>
                        <PixelCloud size={1.2} opacity={0.8} />
                    </div>
                    <div style={{ position: 'absolute', top: '15%', left: '-10%', animation: 'moveCloud 55s linear infinite', animationDelay: '-5s', zIndex: 0 }}>
                        <PixelCloud size={0.8} opacity={0.7} />
                    </div>
                    <div style={{ position: 'absolute', top: '25%', left: '-10%', animation: 'moveCloud 50s linear infinite', animationDelay: '-30s', zIndex: 0 }}>
                        <PixelCloud size={2} opacity={0.6} />
                    </div>
                </>
            )}

            {/* Star Canvas */}
            <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', imageRendering: 'pixelated' }} />

            {/* Landscape */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '320px', overflow: 'hidden' }}>

                {/* Layer 1: Background Hills */}
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="crispEdges"
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
                    <path fill={colors.layer1} d={backPath} style={{ transition: 'fill 1s ease' }} />
                </svg>

                {/* Layer 2: Mid Hills */}
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="crispEdges"
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
                    <path fill={colors.layer2} d={midPath} style={{ transition: 'fill 1s ease' }} />
                </svg>

                {/* Layer 3: Foreground Hills */}
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none" shapeRendering="crispEdges"
                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 3 }}>
                    <path fill={colors.layer3} d={forePath} style={{ transition: 'fill 1s ease' }} />
                </svg>

            </div>
        </div>
    );
};

export default Background;
