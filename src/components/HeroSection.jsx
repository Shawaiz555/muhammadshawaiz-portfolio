
import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    'MERN Stack Developer',
    'Front-end Expert',
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
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-mono-50 to-mono-100 z-0" />
      <div className="absolute inset-0 opacity-20 bg-dots-pattern z-0" />
      
      {/* Animated Shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-tr from-mono-200 to-mono-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tr from-mono-200 to-mono-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 animate-fade-in-up">
            <div className="inline-block relative mb-4">
              <span className="absolute -inset-1 bg-gradient-to-r from-mono-800 to-mono-600 blur rounded-lg opacity-75"></span>
              <h4 className="relative text-mono-700 font-semibold px-3 py-1 bg-white rounded-lg">Hello, I'm</h4>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mono-900 mb-4 tracking-tight">
              Muhammad Shawaiz
            </h1>
            <div className="h-12 overflow-hidden">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient">
                {typedText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-mono-700 text-lg mt-6 mb-8 max-w-xl leading-relaxed">
              I create exceptional digital experiences with modern technologies. 
              Specializing in building robust web applications with React, Node.js, 
              Express, MongoDB, and Next.js.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary flex items-center group transition-all duration-300">
                Hire Me
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="btn-secondary flex items-center group transition-all duration-300">
                Download CV
                <Download className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in">
            <div className="relative">
              <div className="relative z-10 p-2 rounded-2xl transform transition-all duration-500 hover:scale-[1.02]">
                <div className='flex justify-center'>
                <img
                  src="/profilePic.jpg"
                  alt="Muhammad Shawaiz - Web Developer"
                  className="rounded-3xl relative z-10 lg:w-3/5 lg:h-1/2"
                  width={500}
                  height={500}
                />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center">
        <span className="text-mono-600 mb-2 text-sm">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-mono-400 rounded-full flex justify-center">
          <div className="w-1.5 h-2.5 bg-mono-500 rounded-full mt-1 animate-slider"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
