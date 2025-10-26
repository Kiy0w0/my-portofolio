'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/kiy0w0',
      color: 'anime-lavender',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'anime-blue',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/kiy0w0',
      color: 'anime-pink',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:lostlunadev@gmail.com',
      color: 'anime-purple',
    },
  ];

  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="text-anime-lavender/80 text-lg max-w-2xl mx-auto">
            Have an interesting project or just want to chat? Contact me! ☕
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Contact Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-comfy-dark rounded-xl border border-anime-lavender/10 hover:border-anime-pink/50 transition-all duration-300">
                  <div className="p-3 bg-anime-pink/10 rounded-lg">
                    <Mail className="text-anime-pink" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:lostlunadev@gmail.com"
                      className="text-anime-lavender/70 hover:text-anime-pink transition-colors"
                    >
                      lostlunadev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-comfy-dark rounded-xl border border-anime-lavender/10 hover:border-anime-blue/50 transition-all duration-300">
                  <div className="p-3 bg-anime-blue/10 rounded-lg">
                    <MapPin className="text-anime-blue" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-anime-lavender/70">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Social Media
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-comfy-dark rounded-xl border border-anime-lavender/10 hover:border-anime-pink hover:scale-105 transition-all duration-300 group"
                    >
                      <Icon
                        className={`text-${social.color} group-hover:glow`}
                        size={24}
                      />
                      <span className="text-anime-lavender/70 group-hover:text-white transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="relative bg-comfy-dark p-8 rounded-2xl border border-anime-lavender/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-comfy-darker border border-anime-lavender/20 rounded-xl text-white placeholder-anime-lavender/40 focus:border-anime-pink focus:outline-none focus:ring-2 focus:ring-anime-pink/20 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-comfy-darker border border-anime-lavender/20 rounded-xl text-white placeholder-anime-lavender/40 focus:border-anime-blue focus:outline-none focus:ring-2 focus:ring-anime-blue/20 transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-comfy-darker border border-anime-lavender/20 rounded-xl text-white placeholder-anime-lavender/40 focus:border-anime-purple focus:outline-none focus:ring-2 focus:ring-anime-purple/20 transition-all resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-anime-pink to-anime-purple rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-anime-pink/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-anime-mint/10 border border-anime-mint/30 rounded-xl text-anime-mint text-center">
                    ✅ Message sent successfully! Thank you 😊
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-anime-lavender/10 text-center">
          <p className="text-anime-lavender/60 flex items-center justify-center gap-2">
            Made with <Heart className="text-anime-pink animate-pulse" size={16} /> by
            <span className="gradient-text font-semibold">Mamagii</span>
          </p>
          <p className="text-anime-lavender/40 text-sm mt-2">
            © 2025 All rights reserved. Powered Next.js and Tailwind CSS ☕
          </p>
        </div>
      </div>
    </section>
  );
}

