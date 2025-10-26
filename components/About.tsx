'use client';

import { useState } from 'react';
import { Heart, Code, Palette, Zap } from 'lucide-react';

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Code,
      title: 'Discord Bot Developer',
      description: 'Making bots for fun and profit also open for commission!',
      color: 'anime-pink',
    },
    {
      icon: Palette,
      title: 'UI/UX Enthusiast',
      description: 'I like to make UI/UX look cute, clean and beautiful',
      color: 'anime-purple',
    },
    {
      icon: Zap,
      title: 'Fun Fact!',
      description: 'I Hate Laravel 🙄',
      color: 'anime-blue',
    },
    {
      icon: Heart,
      title: 'Love Playing Games',
      description: 'Playing CS:2,War Thunder, Apex Legends, and more!',
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
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`h-full p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                      hoveredCard === index
                        ? `bg-${feature.color}/10 border-${feature.color} scale-105 shadow-xl`
                        : 'bg-comfy-dark/50 border-anime-lavender/10'
                    }`}
                  >
                    <Icon
                      className={`mb-4 transition-all duration-300 ${
                        hoveredCard === index
                          ? `text-${feature.color} glow scale-110`
                          : 'text-anime-lavender/60'
                      }`}
                      size={32}
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
      </div>
    </section>
  );
}

