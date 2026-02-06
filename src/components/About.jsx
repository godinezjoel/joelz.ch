import React, { useRef, useEffect, useState } from 'react';
import {
    Code2, Mountain, Gamepad2, Dumbbell, Palette, Terminal, Layout, Server, Database, Wrench, Cloud
} from 'lucide-react';
import profileImg from '../assets/profile.png';

const About = () => {
    // New Tech Categories
    const techCategories = [
        {
            title: "Languages",
            icon: <Code2 size={32} />,
            description: "Core programming languages I speak.",
            animation: "animate-float-slow",
            techs: ["JavaScript", "TypeScript", "Java", "Python", "C#", "R"]
        },
        {
            title: "Frontend",
            icon: <Layout size={32} />,
            description: "Building beautiful user interfaces.",
            animation: "animate-float-medium",
            techs: ["CSS", "HTML", "React", "Angular", ".NET MAUI", "Tailwind"]
        },
        {
            title: "Backend & Cloud",
            icon: <Cloud size={32} />,
            description: "Powering applications from the server.",
            animation: "animate-float-fast",
            techs: ["Node.js", "Spring Boot", "AWS", "Azure", "MySQL", "Docker"]
        },
        {
            title: "Tools & Creative",
            icon: <Wrench size={32} />,
            description: "The tools I use to bring ideas to life.",
            animation: "animate-float-slow",
            techs: ["Git", "GitHub", "Figma", "Canva", "Unity"]
        }
    ];

    // Journey Data
    const history = [
        { year: '2008', title: 'The Begining', desc: 'My birth 🎉' },
        { year: '2021', title: 'The Spark', desc: 'Built my first custom PC in 7th grade, sparking my passion for hardware and software.' },
        { year: '2022', title: 'Exploration', desc: 'Attended many Trial days at various companies to explore the world of IT.' },
        { year: '2023', title: 'First Big Project', desc: 'Developed a 3D shooter game in Unity for my 9th-grade final project.' },
        { year: '2024', title: 'Swiss Post', desc: 'Started my apprenticeship as an Software Engineer at Swiss Post.' },
        { year: '2026', title: 'Second Year', desc: 'In my second year at Swiss Post. Working on a productive team. Working with Angular.' }
    ];

    const timelineRef = useRef(null);
    const itemRefs = useRef([]);
    const skierTrackRef = useRef(null);
    const [maxVisibleIndex, setMaxVisibleIndex] = useState(-1);

    // Cache metrics to avoid getBoundingClientRect in scroll loop
    const metrics = useRef({
        timelineTop: 0,
        timelineHeight: 0,
        itemOffsets: []
    });

    const measure = () => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        metrics.current.timelineTop = rect.top + scrollTop;
        metrics.current.timelineHeight = rect.height;
        metrics.current.itemOffsets = itemRefs.current.map(el => el ? el.offsetTop : 0);
    };

    useEffect(() => {
        // Initial measure
        measure();
        // Give time for layout to settle
        setTimeout(measure, 100);

        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const { timelineTop, timelineHeight, itemOffsets } = metrics.current;
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const viewHeight = window.innerHeight;
                    const startOffset = viewHeight * 0.8;

                    // Current top of timeline relative to viewport
                    const currentTimelineTop = timelineTop - scrollTop;

                    let progress = 0;
                    if (currentTimelineTop < startOffset) {
                        progress = startOffset - currentTimelineTop;
                    }

                    if (progress > timelineHeight) progress = timelineHeight;
                    if (progress < 0) progress = 0;

                    if (skierTrackRef.current) {
                        skierTrackRef.current.style.height = `${progress}px`;
                    }

                    // Determine which items are visible
                    let newMaxIndex = -1;
                    for (let i = 0; i < itemOffsets.length; i++) {
                        if (progress > itemOffsets[i] - 50) {
                            newMaxIndex = i;
                        } else {
                            break;
                        }
                    }

                    setMaxVisibleIndex(prev => (prev !== newMaxIndex ? newMaxIndex : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };

        const onResize = () => {
            measure();
            // Force scroll update
            onScroll();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        // Initial trigger
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const styles = {
        section: { padding: '6rem 0' },
        containerSpacer: { marginBottom: '8rem' },

        profileCard: {
            display: 'grid',
            gridTemplateColumns: 'minmax(250px, 1fr) 2fr',
            gap: '3rem',
            alignItems: 'center',
            padding: '3rem',
        },
        profileImage: {
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'transform 0.5s ease',
        },
        introText: {
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
        },
        interests: {
            display: 'flex',
            gap: '2rem',
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--divider-color)',
        },
        interestItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
        },

        techCardTitle: {
            fontSize: '1.4rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
        },
        techCardDesc: {
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
        },
        tagContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
        },

        timelineContainer: {
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
        },
        timelineTrack: {
            position: 'absolute', left: '20px', top: '0', bottom: '0', width: '4px',
            background: 'var(--divider-color)', borderRadius: '2px',
        },
        timelineItem: {
            position: 'relative', paddingLeft: '80px', marginBottom: '4rem',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        },
        timelineDot: {
            position: 'absolute', left: '18px', top: '6px', width: '8px', height: '8px',
            background: 'var(--text-secondary)', borderRadius: '50%',
        }
    };

    return (
        <section id="about" style={styles.section}>
            <div className="container">

                {/* PART 1: About Me Profile */}
                <div style={styles.containerSpacer} className="fade-in-left">
                    <h2 className="section-title">About Me</h2>

                    <div className="glass-card profile-card">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="profile-image-wrapper">
                                <img src={profileImg} alt="Profile" className="profile-image" />
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                Hi, I'm Joel.
                            </h3>
                            <p style={styles.introText}>
                                I'm a 17-year-old half Swiss, half Guatemalan developer based in Münsingen (3110), Switzerland.
                                Currently in my second year as an Software Engineer apprentice at Swiss Post, I love designing unique user experiences.
                            </p>
                            <p style={styles.introText}>
                                When I'm not coding, you'll find me at the gym, hanging out with friends, gaming, or traveling.
                                I'm also passionate about streetwear fashion and anime. I believe AI is the future and I'm excited to be part of it.
                            </p>

                            <div className="profile-interests">
                                <div style={styles.interestItem}>
                                    <Code2 size={24} color="#38bdf8" />
                                    <span>Coding</span>
                                </div>
                                <div style={styles.interestItem}>
                                    <Mountain size={24} color="#38bdf8" />
                                    <span>Skiing</span>
                                </div>
                                <div style={styles.interestItem}>
                                    <Dumbbell size={24} color="#38bdf8" />
                                    <span>Gym</span>
                                </div>
                                <div style={styles.interestItem}>
                                    <Gamepad2 size={24} color="#38bdf8" />
                                    <span>Gaming</span>
                                </div>
                                <div style={styles.interestItem}>
                                    <Palette size={24} color="#38bdf8" />
                                    <span>Design</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PART 2: Tech Stack Grid */}
                <div style={styles.containerSpacer} className="fade-in-right">
                    <h2 className="section-title">Tech Stack</h2>

                    <div className="tech-card-container">
                        {techCategories.map((cat, index) => (
                            <div key={index} className={`glass-card tech-card-item ${cat.animation}`}>
                                <div className="tech-category-icon">
                                    {cat.icon}
                                </div>
                                <h3 style={styles.techCardTitle}>{cat.title}</h3>
                                <p style={styles.techCardDesc}>{cat.description}</p>
                                <div style={styles.tagContainer}>
                                    {cat.techs.map((tech, i) => (
                                        <span key={i} className="glass-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PART 3: Journey Timeline */}
                <div style={styles.timelineContainer} className="fade-in-up">
                    <h2 className="section-title">My Journey</h2>

                    <div className="timeline-wrapper" ref={timelineRef} style={{ position: 'relative', paddingBottom: '2rem' }}>
                        <div style={styles.timelineTrack}></div>
                        <div ref={skierTrackRef} style={{
                            position: 'absolute',
                            left: '20px',
                            top: '0',
                            width: '4px',
                            background: 'var(--accent-color)',
                            borderRadius: '2px',
                            height: '0px',
                            transition: 'height 0.1s linear',
                            boxShadow: '0 0 10px var(--accent-color)'
                        }}></div>

                        {history.map((item, index) => {
                            const isVisible = index <= maxVisibleIndex;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.timelineItem,
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                                    }}
                                    ref={el => itemRefs.current[index] = el}
                                >
                                    <div style={{
                                        ...styles.timelineDot,
                                        background: isVisible ? 'var(--accent-color)' : 'var(--text-secondary)',
                                        boxShadow: isVisible ? '0 0 10px var(--accent-color)' : 'none',
                                        transition: 'all 0.3s'
                                    }}></div>

                                    <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-color)' }}>
                                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '0.9rem' }}>{item.year}</span>
                                        <h4 style={{ margin: '0.5rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
