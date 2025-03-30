
import React, { useEffect, useRef } from 'react';
import { Code, Database, PaintBucket, Trophy, Layout, Server, Zap, Star } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6 text-mono-800" />,
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
    icon: <Server className="h-6 w-6 text-mono-800" />,
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
    icon: <Code className="h-6 w-6 text-mono-800" />,
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Jest & Testing", level: 75 },
      { name: "CI/CD", level: 70 },
    ]
  }
];

const SkillBar = ({ name, level, index }) => {
  const progressRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (progressRef.current) {
                progressRef.current.style.width = `${level}%`;
                progressRef.current.classList.add('opacity-100');
              }
            }, 300 + (index * 100));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (progressRef.current) {
      observer.observe(progressRef.current);
    }
    
    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [level, index]);
  
  return (
    <div className="mb-4 transform transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between mb-1">
        <span className="text-mono-700 font-medium flex items-center">
          <Star className="h-3 w-3 mr-1 text-mono-500" />
          {name}
        </span>
        <span className="text-mono-600 font-bold">{level}%</span>
      </div>
      <div className="h-2.5 bg-mono-200 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-mono-900 to-mono-600 rounded-full w-0 opacity-0 transition-all duration-1000 ease-out"
          style={{ 
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1) inset' 
          }}
        ></div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = document.querySelectorAll('.skill-item');
    childElements.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      childElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-mono-900 relative inline-block">
            My <span className="text-gradient">Skills</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-mono-800 to-mono-500 transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-mono-800 to-mono-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-mono-700 max-w-2xl mx-auto text-lg">
            I've spent years honing my skills in modern web technologies.
            Here's an overview of my technical expertise.
          </p>
        </div>
        
        {/* Tech Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {[
            { label: "Years Experience", value: "6+", icon: <Trophy className="h-5 w-5 text-mono-800" /> },
            { label: "Projects Completed", value: "80+", icon: <Layout className="h-5 w-5 text-mono-800" /> },
            { label: "Technologies", value: "15+", icon: <Code className="h-5 w-5 text-mono-800" /> },
            { label: "Satisfied Clients", value: "40+", icon: <PaintBucket className="h-5 w-5 text-mono-800" /> },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="skill-item bg-white rounded-xl shadow-md p-6 text-center opacity-0 gradient-border transform hover:translate-y-[-5px] transition-all duration-300"
              style={{ 
                animationDelay: `${index * 150}ms`, 
                animationFillMode: 'forwards'
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-mono-200 to-mono-100 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 bg-white rounded-full m-1 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-mono-900 mb-2">{stat.value}</h3>
              <p className="text-mono-600">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Skills Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <div 
              key={index} 
              className="skill-item bg-white rounded-xl shadow-md p-6 opacity-0 gradient-border transform transition-all duration-300 hover:shadow-xl"
              style={{ 
                animationDelay: `${index * 200 + 600}ms`, 
                animationFillMode: 'forwards' 
              }}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-mono-100 rounded-lg mr-4 transform transition-all duration-300 hover:rotate-12">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-mono-900">{category.category}</h3>
              </div>
              
              {category.skills.map((skill, idx) => (
                <SkillBar key={idx} name={skill.name} level={skill.level} index={idx} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
