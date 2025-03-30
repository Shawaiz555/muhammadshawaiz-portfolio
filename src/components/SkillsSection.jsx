
import React, { useEffect, useRef } from 'react';
import { Code, Database, PaintBucket, Trophy, Layout, Server } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6 text-purple-600" />,
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
    icon: <Server className="h-6 w-6 text-purple-600" />,
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
    icon: <Code className="h-6 w-6 text-purple-600" />,
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Jest & Testing", level: 75 },
      { name: "CI/CD", level: 70 },
    ]
  }
];

const SkillBar = ({ name, level }) => {
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
            }, 200);
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
  }, [level]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-navy-700 font-medium">{name}</span>
        <span className="text-navy-600">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full w-0 opacity-0 transition-all duration-1000 ease-out"
        ></div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-navy-700 max-w-2xl mx-auto text-lg">
            I've spent years honing my skills in modern web technologies.
            Here's an overview of my technical expertise.
          </p>
        </div>
        
        {/* Tech Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {[
            { label: "Years Experience", value: "6+", icon: <Trophy className="h-5 w-5 text-purple-600" /> },
            { label: "Projects Completed", value: "80+", icon: <Layout className="h-5 w-5 text-purple-600" /> },
            { label: "Technologies", value: "15+", icon: <Code className="h-5 w-5 text-purple-600" /> },
            { label: "Satisfied Clients", value: "40+", icon: <PaintBucket className="h-5 w-5 text-purple-600" /> },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 text-center card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">{stat.value}</h3>
              <p className="text-navy-600">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Skills Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="p-2 bg-purple-50 rounded-lg mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900">{category.category}</h3>
              </div>
              
              {category.skills.map((skill, idx) => (
                <SkillBar key={idx} name={skill.name} level={skill.level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
