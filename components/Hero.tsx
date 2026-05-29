'use client';

import { useEffect, useState, useMemo } from 'react';
import { Github, Linkedin, Mail, Coffee } from 'lucide-react';
import DiscordProfile from './DiscordProfile';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = useMemo(() => [
    'Full Stack Developer',
    'Anime and Kpop',
    'K-Drama Lover',
    'UI/UX Enthusiast',
  ], []);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="container mx-auto max-w-6xl z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-anime-purple/20 border border-anime-purple/30 text-anime-purple text-sm font-medium glow-purple">
                <Coffee size={16} />
                Available for work
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold">
              <span className="block text-white mb-2">
                Hello, I&apos;m a{' '}
                <span className="gradient-text-animated inline-block relative">
                  Developer
                  <span className="absolute inset-0 gradient-text-animated blur-xl opacity-50"></span>
                </span>
              </span>
            </h1>

            <div className="h-16 flex items-center">
              <span className="text-2xl md:text-3xl text-anime-blue font-medium">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="text-lg text-anime-lavender/80 max-w-xl leading-relaxed">
              I&apos;m a student who loves exploring technology and software development.
              I&apos;m currently diving into various programming languages and frameworks.
              While I&apos;m still at the start of my journey, I&apos;m super eager to keep learning, building, and leveling up my skills
            </p>

            <div className="flex gap-4 pt-4">
              <a
                href="#about"
                className="px-8 py-3 bg-gradient-to-r from-anime-pink to-anime-purple rounded-full font-semibold text-white hover:scale-105 hover:glow-pink transition-all duration-300 shadow-lg shadow-anime-pink/30"
              >
                About Me
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-anime-blue rounded-full font-semibold text-anime-blue hover:bg-anime-blue hover:text-comfy-darker hover:scale-105 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Kiy0w0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-comfy-dark border border-anime-lavender/20 hover:border-anime-pink hover:text-anime-pink hover:scale-110 transition-all duration-300 glow"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-comfy-dark border border-anime-lavender/20 hover:border-anime-blue hover:text-anime-blue hover:scale-110 transition-all duration-300 glow"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:networkmizu@gmail.com"
                className="p-3 rounded-full bg-comfy-dark border border-anime-lavender/20 hover:border-anime-purple hover:text-anime-purple hover:scale-110 transition-all duration-300 glow"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="relative hidden md:block">
            <DiscordProfile userId="586802340607164417" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="w-6 h-10 rounded-full border-2 border-anime-purple/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-anime-purple rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

