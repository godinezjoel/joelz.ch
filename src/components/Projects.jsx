import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "Portfolio Website",
            description: "You're looking at it! A modern, responsive portfolio built with React and Vite to showcase my journey and skills.",
            tags: ["React", "Vite", "Design"],
            link: "#"
        },
        {
            title: "Bazario",
            description: "Its an Web Shop, which was entirely made out of just Javascript, HTML and CSS (No Frameworks). It was a project for our apprenticeship, made with my friends.",
            tags: ["React", "Vite", "Design"],
            link: "https://bazario.oulei.ch/"
        },
        {
            title: "Ghost Shooter (Unity)",
            description: "A 3D shooter game developed in Unity/C#. Features 3 custom maps, character designs, and a tutorial level. My 9th-grade final project.",
            tags: ["Unity", "C#", "3D Design"],
            link: "https://joelgod1.itch.io/ghostshooterproject"
        },
    ];

    const styles = {
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
        },
        tags: {
            display: 'flex',
            gap: '0.8rem',
            marginTop: 'auto',
            flexWrap: 'wrap',
        },
        tag: {
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            color: 'var(--accent-color)',
        }
    };

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} styles={styles} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, styles }) => {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card reveal-up"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h3>{project.title}</h3>
                <ExternalLink
                    size={20}
                    className="external-link"
                    color="var(--accent-color)"
                />
            </div>

            <p>{project.description}</p>
            <div style={styles.tags}>
                {project.tags.map(tag => (
                    <span key={tag} style={styles.tag} className="glass-tag">#{tag}</span>
                ))}
            </div>
        </a>
    );
};

export default Projects;
