
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
    <footer className="w-full overflow-hidden bg-gradient-to-r from-gray-700 to-black text-white py-12">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-mono-600" />
              <span className="text-xl font-bold">DevPortfolio</span>
            </div>
            <p className="text-mono-400 mb-4">
              Building elegant web solutions with cutting-edge technologies.
            </p>
            <div className="flex space-x-7">
              <a

                href="https://github.com/Shawaiz555"
                className="text-mono-400 hover:text-white transition-colors"
                target='_black'
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg`}
                  alt={"github"}
                  className="w-5 h-5 filter invert opacity-75 hover:opacity-100"
                />
              </a>
              <a

                href="https://www.linkedin.com/in/muhammad-shawaiz-b52483280/"
                className="text-mono-400 hover:text-white transition-colors"
                target='_black'
              >
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg`}
                  alt={"linkedin"}
                  className="w-5 h-5 filter invert opacity-75 hover:opacity-100"
                />
              </a>
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
              <li>Gujrat, Pakistan</li>
              <li>shawaizbutt555@gmail.com</li>
              <li>+92 3433326500</li>
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
      </div>
    </footer>
  );
};

export default Footer;
