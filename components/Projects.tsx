'use client';

import { useState } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Anime Hub',
      description: 'Built a streaming site for anime with live chat. Pretty fun project',
      image: '🎬',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'Socket.io'],
      category: 'fullstack',
      gradient: 'from-anime-pink to-anime-purple',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Task Board',
      description: 'Todo app but actually useful. Drag stuff around, works with teams',
      image: '📝',
      tags: ['React', 'Node.js', 'MongoDB', 'Redux'],
      category: 'fullstack',
      gradient: 'from-anime-blue to-anime-mint',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Shop Dashboard',
      description: 'Admin panel for online stores. Charts and numbers everywhere',
      image: '📊',
      tags: ['Vue.js', 'Chart.js', 'REST API'],
      category: 'frontend',
      gradient: 'from-anime-purple to-anime-lavender',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Weather Thing',
      description: 'Checks the weather. Has some nice animations I guess',
      image: '🌤️',
      tags: ['React', 'API Integration', 'CSS'],
      category: 'frontend',
      gradient: 'from-anime-blue to-anime-purple',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Chat API',
      description: 'Backend for messaging app. Real-time stuff with WebSockets',
      image: '💬',
      tags: ['Node.js', 'Express', 'Socket.io', 'JWT'],
      category: 'backend',
      gradient: 'from-anime-peach to-anime-pink',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      title: 'Site Builder',
      description: 'Makes portfolio sites. Choose a template, done',
      image: '🎨',
      tags: ['Next.js', 'TypeScript', 'Tailwind'],
      category: 'fullstack',
      gradient: 'from-anime-mint to-anime-blue',
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Projects
          </h2>
          <p className="text-anime-lavender/80 text-lg max-w-2xl mx-auto">
            Stuff I&apos;ve built. Some turned out pretty decent ☕
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-anime-pink to-anime-purple text-white shadow-lg shadow-anime-pink/30 scale-105'
                  : 'bg-comfy-dark border border-anime-lavender/20 text-anime-lavender/70 hover:border-anime-pink hover:text-anime-pink'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full p-6 bg-comfy-dark rounded-2xl border border-anime-lavender/10 hover:border-anime-pink/50 transition-all duration-300 card-hover">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-anime-pink transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-anime-lavender/70 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-anime-purple/10 border border-anime-purple/30 rounded-full text-xs text-anime-purple font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-anime-lavender/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-comfy-darker rounded-lg text-anime-lavender/70 hover:text-anime-blue hover:bg-anime-blue/10 transition-all duration-300 text-sm"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-anime-pink to-anime-purple rounded-lg text-white hover:shadow-lg hover:shadow-anime-pink/30 transition-all duration-300 text-sm"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles className="text-anime-pink glow-pink" size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

