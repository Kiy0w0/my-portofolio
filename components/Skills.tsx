'use client';

import { useState } from 'react';
import { Code2, Database, Palette, Terminal, Globe, Cpu } from 'lucide-react';

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend',
      color: 'anime-pink',
      skills: [
        { name: 'React', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'TypeScript', level: 75 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Vue.js', level: 65 },
      ],
    },
    {
      icon: Terminal,
      title: 'Backend',
      color: 'anime-blue',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 75 },
        { name: 'Python', level: 60 },
        { name: 'REST API', level: 85 },
        { name: 'GraphQL', level: 55 },
      ],
    },
    {
      icon: Database,
      title: 'Database',
      color: 'anime-purple',
      skills: [
        { name: 'MongoDB', level: 82 },
        { name: 'PostgreSQL', level: 78 },
        { name: 'Redis', level: 70 },
        { name: 'Firebase', level: 85 },
        { name: 'Supabase', level: 80 },
      ],
    },
    {
      icon: Cpu,
      title: 'DevOps',
      color: 'anime-mint',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'Vercel', level: 88 },
        { name: 'GitHub Actions', level: 72 },
        { name: 'AWS', level: 65 },
      ],
    },
    {
      icon: Palette,
      title: 'Design',
      color: 'anime-peach',
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'Responsive Design', level: 92 },
        { name: 'Animation', level: 78 },
        { name: 'Adobe XD', level: 70 },
      ],
    },
    {
      icon: Globe,
      title: 'Other',
      color: 'anime-lavender',
      skills: [
        { name: 'Agile/Scrum', level: 80 },
        { name: 'Testing', level: 75 },
        { name: 'Problem Solving', level: 95 },
        { name: 'Team Work', level: 90 },
        { name: 'Coffee Making', level: 100 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Skills & Expertise
          </h2>
          <p className="text-anime-lavender/80 text-lg max-w-2xl mx-auto">
            Tech stack I&apos;m comfortable with (still learning more)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                className="relative group"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="h-full p-6 bg-comfy-dark rounded-2xl border border-anime-lavender/10 hover:border-anime-pink/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 bg-${category.color}/10 rounded-xl border border-${category.color}/30`}
                    >
                      <Icon
                        className={`text-${category.color} glow`}
                        size={28}
                      />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        onMouseEnter={() =>
                          setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                        }
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-anime-lavender/80 text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-anime-lavender/60 text-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-comfy-darker rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-${category.color} to-anime-purple rounded-full transition-all duration-1000 ease-out ${
                              hoveredSkill === `${categoryIndex}-${skillIndex}`
                                ? 'glow'
                                : ''
                            }`}
                            style={{
                              width: `${skill.level}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${category.color}/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-anime-pink/10 via-anime-purple/10 to-anime-blue/10 rounded-2xl border border-anime-lavender/20">
            <p className="text-anime-lavender/80 text-lg">
              💡 <span className="font-semibold text-white">Random:</span> Still learning 
              new stuff every day. That&apos;s what makes this fun 😄
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

