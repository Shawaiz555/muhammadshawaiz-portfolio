
import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, PaintBucket, Trophy, Layout, Server, Zap, Star, CheckCircle } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6 text-white" />,
    color: "from-mono-900 to-mono-700",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 90 },
    ]
  },
  {
    category: "Backend",
    icon: <Server className="h-6 w-6 text-white" />,
    color: "from-mono-800 to-mono-600",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ]
  },
  {
    category: "Tools & Other",
    icon: <Code className="h-6 w-6 text-white" />,
    color: "from-mono-700 to-mono-500",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Jest & Testing", level: 75 },
      { name: "CI/CD", level: 70 },
    ]
  }
];

const SkillCard = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl backdrop-blur-sm border border-mono-300 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ animationDelay: `${index * 150}ms`, transformStyle: 'preserve-3d' }}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${skill.color}`}></div>
      
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className={`p-3 rounded-lg mr-4 bg-gradient-to-br ${skill.color} transform transition-all duration-300 hover:scale-110 hover:rotate-6`}>
            {skill.icon}
          </div>
          <h3 className="text-xl font-bold text-mono-900">{skill.category}</h3>
        </div>
        
        <div className="space-y-5">
          {skill.skills.map((item, idx) => (
            <div 
              key={idx} 
              className="transform transition-all duration-300 hover:translate-x-2"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-mono-700 font-medium flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1 text-mono-500" />
                  {item.name}
                </span>
                <span className="text-mono-600 font-bold">{item.level}%</span>
              </div>
              <div className="h-2 bg-mono-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isVisible ? `${item.level}%` : '0%',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1) inset',
                    transitionDelay: `${idx * 100 + 300}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ stat, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Count up animation
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isVisible) {
      const value = parseInt(stat.value);
      const duration = 1500; // ms
      const interval = 20; // ms
      const step = value / (duration / interval);
      
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= value) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(Math.floor(current));
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, stat.value]);
  
  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg backdrop-blur-sm p-6 text-center relative overflow-hidden border border-mono-200 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-mono-100 to-transparent opacity-40"></div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-mono-300 to-mono-100 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-0 bg-white rounded-full m-1 flex items-center justify-center">
            {stat.icon}
          </div>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-mono-900 mb-2">
          {stat.suffix ? `${count}${stat.suffix}` : count}
        </h3>
        <p className="text-mono-600">{stat.label}</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-mono-100 opacity-30"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-mono-100 opacity-20"></div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Animated Shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-mono-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-mono-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-mono-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-mono-900">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-mono-800 to-mono-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-mono-700 max-w-2xl mx-auto text-lg">
            I've spent years honing my skills in modern web technologies.
            Here's an overview of my technical expertise.
          </p>
        </div>
        
        {/* Tech Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {[
            { label: "Years Experience", value: "6", suffix: "+", icon: <Trophy className="h-5 w-5 text-mono-800" /> },
            { label: "Projects Completed", value: "80", suffix: "+", icon: <Layout className="h-5 w-5 text-mono-800" /> },
            { label: "Technologies", value: "15", suffix: "+", icon: <Code className="h-5 w-5 text-mono-800" /> },
            { label: "Satisfied Clients", value: "40", suffix: "+", icon: <PaintBucket className="h-5 w-5 text-mono-800" /> },
          ].map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        
        {/* Skills Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <SkillCard key={index} skill={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
