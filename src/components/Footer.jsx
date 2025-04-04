
import React from 'react';
import { Code, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-gradient-to-r from-gray-700 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-mono-600" />
              <span className="text-xl font-bold">DevPortfolio</span>
            </div>
            <p className="text-mono-400 mb-4">
              Building elegant web solutions with cutting-edge technologies.
            </p>
            <div className="flex space-x-4">
              {['github', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-mono-400 hover:text-white transition-colors"
                >
                  <img 
                    src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/${social}.svg`}
                    alt={social}
                    className="w-5 h-5 filter invert opacity-75 hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-mono-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#skills" className="text-mono-400 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-mono-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#experience" className="text-mono-400 hover:text-white transition-colors">Experience</a></li>
              <li><a href="#contact" className="text-mono-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-mono-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-mono-400 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-mono-400 hover:text-white transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="text-mono-400 hover:text-white transition-colors">Code Reviews</a></li>
              <li><a href="#" className="text-mono-400 hover:text-white transition-colors">Consulting</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-mono-400">
              <li>San Francisco, California</li>
              <li>alex@example.com</li>
              <li>+1 (234) 567-890</li>
            </ul>
            
            <button 
              onClick={scrollToTop}
              className="mt-6 flex items-center space-x-2 bg-mono-800 hover:bg-mono-700 transition-colors px-4 py-2 rounded-md"
            >
              <span>Back to top</span>
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-mono-800 text-center">
          <p className="text-mono-400 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> by Alex Johnson &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
