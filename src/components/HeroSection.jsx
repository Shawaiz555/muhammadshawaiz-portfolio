
import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    'MERN Stack Developer',
    'Next.js Expert',
    'UI/UX Designer',
    'Full Stack Engineer'
  ];

  useEffect(() => {
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      const shouldDelete = isDeleting;
      
      setTypedText(current => 
        shouldDelete 
          ? currentPhrase.substring(0, current.length - 1) 
          : currentPhrase.substring(0, current.length + 1)
      );
      
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((current) => (current + 1) % phrases.length);
      }
    };
    
    const timer = setTimeout(type, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-mono-50 to-mono-100 z-0" />
      <div className="absolute inset-0 opacity-20 bg-dots-pattern z-0" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 animate-fade-in-up">
            <h4 className="text-mono-700 font-semibold mb-2">Hello, I'm</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mono-900 mb-4">
              Alex Johnson
            </h1>
            <div className="h-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-mono-700 text-lg mt-6 mb-8 max-w-xl">
              I create exceptional digital experiences with modern technologies. 
              Specializing in building robust web applications with React, Node.js, 
              Express, MongoDB, and Next.js.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary flex items-center">
                Hire Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#" className="btn-secondary flex items-center">
                Download CV
                <Download className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-mono-600 to-mono-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
              <div className="bg-white p-2 rounded-2xl shadow-xl relative z-10 gradient-border">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961&ixlib=rb-4.0.3"
                  alt="Alex Johnson - Web Developer"
                  className="rounded-xl"
                  width={500}
                  height={500}
                />
              </div>
              {/* Tech Icons Decorations */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3 rounded-xl shadow-lg animate-bounce-light gradient-border">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width={40} height={40} alt="React" />
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-3 rounded-xl shadow-lg animate-bounce-light gradient-border" style={{ animationDelay: "0.5s" }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width={40} height={40} alt="Node.js" />
              </div>
              <div className="absolute top-1/2 -right-6 bg-white p-3 rounded-xl shadow-lg animate-bounce-light gradient-border" style={{ animationDelay: "1s" }}>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width={40} height={40} alt="MongoDB" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
