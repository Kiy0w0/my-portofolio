'use client';

import { useState, useEffect } from 'react';
import { Home, User, Mail } from 'lucide-react';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-comfy-darker/80 backdrop-blur-lg shadow-lg shadow-anime-purple/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-display font-bold gradient-text">
            Mamagii OvO
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ id, icon: Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-2 transition-all duration-300 hover:text-anime-pink ${
                  activeSection === id
                    ? 'text-anime-pink glow-pink scale-110'
                    : 'text-anime-lavender/70'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>

          {/* Mobile navigation */}
          <div className="flex md:hidden gap-4">
            {navItems.map(({ id, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`transition-all duration-300 ${
                  activeSection === id
                    ? 'text-anime-pink glow-pink scale-110'
                    : 'text-anime-lavender/70'
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

