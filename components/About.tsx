'use client';

import { useState } from 'react';

import GitHubHeatmap from './GitHubHeatmap';
import GitHubRepos from './GitHubRepos';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      title: 'Languages',
      description: 'Dart, C++, Go, Rust, JavaScript, TypeScript, PHP, Python, HTML5, CSS3.',
      color: 'anime-pink',
    },
    {
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
      title: 'Frameworks & Libs',
      description: 'Flutter, React, Next.js, Vue, Laravel, Tailwind, Node.js, Express, Prisma.',
      color: 'anime-purple',
    },
    {
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      title: 'Tools',
      description: 'VS Code, Git, GitHub, Docker, Linux, Figma, Postman, Firebase, Supabase, Vercel.',
      color: 'anime-blue',
    },
    {
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      title: 'Databases',
      description: 'MongoDB, MySQL, PostgreSQL, Redis, SQLite.',
      color: 'anime-peach',
    },
  ];

  return (
    <section id="about" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-anime-lavender/80 text-lg max-w-2xl mx-auto">
            Just a dev who likes building cool stuff and watching anime
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-anime-pink via-anime-purple to-anime-blue rounded-3xl blur opacity-25"></div>
              <div className="relative bg-comfy-dark p-8 rounded-3xl border border-anime-lavender/10">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  About Me ✨
                </h3>
                <p className="text-anime-lavender/80 leading-relaxed mb-4">
                  Hey! I&apos;m a developer who really enjoys building stuff on the web.
                  Started coding a few years back and honestly can&apos;t imagine doing
                  anything else now.
                </p>
                <p className="text-anime-lavender/80 leading-relaxed">
                  Also when iam coding, i always scroll fesnuk ahh.. (yeah, I&apos;m that person) ☕
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`h-full p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${hoveredCard === index
                      ? `bg-${feature.color}/10 border-${feature.color} scale-105 shadow-xl`
                      : 'bg-comfy-dark/50 border-anime-lavender/10'
                      }`}
                  >
                    <img
                      src={feature.iconUrl}
                      alt={feature.title}
                      className={`mb-4 w-10 h-10 transition-all duration-300 ${hoveredCard === index
                        ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'opacity-50 grayscale'
                        }`}
                    />
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-anime-lavender/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16">
          <GitHubRepos username="Kiy0w0" />
        </div>

        <div className="mt-16">
          <GitHubHeatmap username="Kiy0w0" />
        </div>
      </div>
    </section>
  );
}

