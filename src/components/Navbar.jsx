
import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Twitter, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/90 shadow-md backdrop-blur-sm' : 'py-5 bg-transparent'
      }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-mono-800" />
          <span className="text-xl font-bold text-mono-900">DevPortfolio</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-mono-700 hover:text-mono-900 font-medium transition-colors">About</a>
          <a href="#skills" className="text-mono-700 hover:text-mono-900 font-medium transition-colors">Skills</a>
          <a href="#projects" className="text-mono-700 hover:text-mono-900 font-medium transition-colors">Projects</a>
          <a href="#experience" className="text-mono-700 hover:text-mono-900 font-medium transition-colors">Experience</a>
          <a href="#contact" className="text-mono-700 hover:text-mono-900 font-medium transition-colors">Contact</a>

          <div className="flex items-center space-x-4 pl-4 border-l border-mono-200">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-mono-600 hover:text-mono-900 transition-colors">
              <Github className="h-5 w-5" />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-mono-600 hover:text-mono-900 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-mono-800" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
        }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a href="#about" className="text-mono-700 hover:text-mono-900 font-medium py-2 transition-colors" onClick={toggleMenu}>About</a>
          <a href="#skills" className="text-mono-700 hover:text-mono-900 font-medium py-2 transition-colors" onClick={toggleMenu}>Skills</a>
          <a href="#projects" className="text-mono-700 hover:text-mono-900 font-medium py-2 transition-colors" onClick={toggleMenu}>Projects</a>
          <a href="#experience" className="text-mono-700 hover:text-mono-900 font-medium py-2 transition-colors" onClick={toggleMenu}>Experience</a>
          <a href="#contact" className="text-mono-700 hover:text-mono-900 font-medium py-2 transition-colors" onClick={toggleMenu}>Contact</a>

          <div className="flex items-center space-x-4 py-2 border-t border-mono-200">
            <a href="https://github.com/Shawaiz555" target="_blank" rel="noopener noreferrer" className="text-mono-600 hover:text-mono-900 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-shawaiz-b52483280/" target="_blank" rel="noopener noreferrer" className="text-mono-600 hover:text-mono-900 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
