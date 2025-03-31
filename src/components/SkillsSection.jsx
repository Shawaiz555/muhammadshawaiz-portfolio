
import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, Trophy, Layout, Server, Zap, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

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

// Skill Bar component for showing skill level in a circular fashion
const SkillCircle = ({ name, level, color, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);
  
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
    
    if (circleRef.current) {
      observer.observe(circleRef.current);
    }
    
    return () => {
      if (circleRef.current) {
        observer.unobserve(circleRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(level);
      }, delay * 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);
  
  // Calculate the circumference of the circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div 
      ref={circleRef}
      className={`relative flex flex-col items-center transition-all duration-700 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
      }`}
      style={{ transitionDelay: `${delay * 50}ms` }}
    >
      <div className="relative">
        <svg width="100" height="100" className="transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#skillGradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ transitionDelay: `${delay * 100}ms` }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="text-mono-900" stopColor="currentColor" />
              <stop offset="100%" className="text-mono-600" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-mono-900">{progress}%</span>
        </div>
      </div>
      <h4 className="mt-3 text-mono-800 font-semibold">{name}</h4>
    </div>
  );
};

// Expertise Card Component with count-up animation
const ExpertiseCard = ({ title, value, icon, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
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
  
  useEffect(() => {
    if (isVisible) {
      const endValue = parseInt(value);
      const duration = 1500;
      const stepTime = 15;
      const steps = duration / stepTime;
      const increment = endValue / steps;
      let currentCount = 0;
      
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentCount));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);
  
  return (
    <div 
      ref={cardRef} 
      className={`relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        className={`h-full p-6 group hover:bg-mono-900 transition-colors duration-300 ease-in-out`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mono-900 to-mono-600"></div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 relative mb-4">
            <div className="absolute inset-0 rounded-full bg-mono-100 group-hover:bg-mono-700 transition-colors duration-300"></div>
            <div className="absolute inset-1 rounded-full bg-white group-hover:bg-mono-800 transition-colors duration-300 flex items-center justify-center">
              <div className="text-mono-800 group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
            </div>
          </div>
          <h3 className="text-3xl font-bold text-mono-900 mb-1 group-hover:text-white transition-colors duration-300">
            {count}{value.includes('+') ? '+' : ''}
          </h3>
          <p className="text-mono-600 group-hover:text-mono-200 transition-colors duration-300">{title}</p>
        </div>
      </div>
    </div>
  );
};

// 3D perspective card component for skill categories
const SkillCategoryCard = ({ category, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  
  return (
    <div 
      ref={cardRef}
      className={`relative h-[400px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-20"
      }`}
      style={{ 
        transitionDelay: `${index * 200}ms`,
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg) scale3d(1.02, 1.02, 1.02)`
          : `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`,
        transition: 'all 0.4s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Background with Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}
        style={{
          transform: isHovered 
            ? `translateZ(-40px) translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`
            : 'translateZ(0) translateX(0) translateY(0)',
          transition: 'all 0.4s ease-out'
        }}
      />
      
      {/* Card Content */}
      <div className="relative z-10 h-full p-6 flex flex-col text-white">
        <div 
          className="mb-6 flex items-center"
          style={{
            transform: isHovered ? `translateZ(40px)` : 'translateZ(0)',
            transition: 'all 0.4s ease-out'
          }}
        >
          <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm mr-4">
            {category.icon}
          </div>
          <h3 className="text-2xl font-bold">{category.category}</h3>
        </div>
        
        <div 
          className="flex-grow grid grid-cols-2 gap-4 items-center"
          style={{
            transform: isHovered ? `translateZ(30px)` : 'translateZ(0)',
            transition: 'all 0.4s ease-out'
          }}
        >
          {category.skills.map((skill, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
        
        {/* Card Footer */}
        <div 
          className="mt-auto pt-4 flex justify-between items-center border-t border-white/20"
          style={{
            transform: isHovered ? `translateZ(50px)` : 'translateZ(0)',
            transition: 'all 0.4s ease-out'
          }}
        >
          <span className="text-sm opacity-70">{category.skills.length} skills</span>
          <div className="flex items-center space-x-1 text-sm font-medium hover:underline cursor-pointer group">
            <span>Explore</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div 
        className="absolute top-5 right-5 h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm"
        style={{
          transform: isHovered 
            ? `translateZ(10px) translateX(${mousePosition.x * 15}px) translateY(${mousePosition.y * 15}px)`
            : 'translateZ(0) translateX(0) translateY(0)',
          transition: 'all 0.4s ease-out'
        }}
      />
      <div 
        className="absolute bottom-10 left-10 h-16 w-16 rounded-full bg-white/5 backdrop-blur-sm"
        style={{
          transform: isHovered 
            ? `translateZ(20px) translateX(${mousePosition.x * 25}px) translateY(${mousePosition.y * 25}px)`
            : 'translateZ(0) translateX(0) translateY(0)',
          transition: 'all 0.4s ease-out'
        }}
      />
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

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
  
  // Generate skill items for the circular progress display
  const topSkills = [
    { name: "React.js", level: 95, color: "from-mono-900 to-mono-700" },
    { name: "Next.js", level: 90, color: "from-mono-800 to-mono-600" },
    { name: "Node.js", level: 90, color: "from-mono-700 to-mono-500" },
    { name: "JavaScript", level: 95, color: "from-mono-900 to-mono-700" },
    { name: "TypeScript", level: 85, color: "from-mono-800 to-mono-600" },
    { name: "MongoDB", level: 85, color: "from-mono-700 to-mono-500" },
  ];
  
  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      
      {/* Animated Shapes */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-mono-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-8 h-8 bg-mono-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-5 h-5 bg-mono-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-mono-900">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-mono-800 to-mono-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-mono-700 max-w-2xl mx-auto text-lg">
            I've spent years honing my skills in modern web technologies.
            Here's an overview of my technical expertise.
          </p>
        </div>
        
        {/* Expertise Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { title: "Years Experience", value: "6+", icon: <Trophy className="h-5 w-5" /> },
            { title: "Projects Completed", value: "80+", icon: <Layout className="h-5 w-5" /> },
            { title: "Technologies", value: "15+", icon: <Code className="h-5 w-5" /> },
            { title: "Satisfied Clients", value: "40+", icon: <Star className="h-5 w-5" /> },
          ].map((item, idx) => (
            <ExpertiseCard 
              key={idx} 
              title={item.title} 
              value={item.value} 
              icon={item.icon} 
              index={idx} 
            />
          ))}
        </div>
        
        {/* Skills Circles - Top Skills */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-mono-900 mb-2">Top Skills</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-mono-800 to-mono-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-10">
            {topSkills.map((skill, index) => (
              <SkillCircle 
                key={index}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={index}
              />
            ))}
          </div>
        </div>
        
        {/* Skills Categories - 3D Cards */}
        <div className="mb-10">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-mono-900 mb-2">Skill Categories</h3>
            <div className="w-16 h-1 bg-gradient-to-r from-mono-800 to-mono-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <SkillCategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
