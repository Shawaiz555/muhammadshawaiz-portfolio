
import React, { useEffect, useRef, useState } from 'react';
import { Code, Database, PaintBucket, Trophy, Layout, Server, Zap, Star, CheckCircle } from 'lucide-react';
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

const SkillBubble = ({ name, level, delay, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bubbleRef = useRef(null);
  
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
    
    if (bubbleRef.current) {
      observer.observe(bubbleRef.current);
    }
    
    return () => {
      if (bubbleRef.current) {
        observer.unobserve(bubbleRef.current);
      }
    };
  }, []);
  
  const size = 40 + (level / 2); // Size based on skill level
  
  return (
    <div 
      ref={bubbleRef}
      className={`absolute transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        transitionDelay: `${delay * 100}ms`,
        transform: isVisible ? `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) scale(1)` : 'scale(0)',
        animation: isVisible ? `float 4s ease-in-out infinite ${delay * 0.1}s` : 'none'
      }}
    >
      <div 
        className={`w-full h-full rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-lg cursor-pointer group relative`}
      >
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-mono-900 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-xs font-bold">{level}%</span>
        </div>
        <div className="tooltip opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-mono-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity duration-300">
          {name}
        </div>
      </div>
    </div>
  );
};

const SkillCategory = ({ category, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const categoryRef = useRef(null);
  
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
    
    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }
    
    return () => {
      if (categoryRef.current) {
        observer.unobserve(categoryRef.current);
      }
    };
  }, []);

  // Generate random positions for bubbles
  const bubblePositions = category.skills.map(() => ({
    top: Math.random() * 70 + 15,
    left: Math.random() * 70 + 15,
  }));
  
  return (
    <div 
      ref={categoryRef}
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ animationDelay: `${index * 300}ms` }}
    >
      <div className="flex items-center mb-6 space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} transform transition-all duration-300 hover:scale-110 hover:rotate-3`}>
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-mono-900">{category.category}</h3>
      </div>
      
      <div className="relative h-60 bg-mono-100 rounded-lg p-4 overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-mono-200 rounded-full opacity-20 -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-mono-200 rounded-full opacity-20 translate-x-10 translate-y-10"></div>
        
        {/* Skill bubbles */}
        {category.skills.map((skill, i) => (
          <SkillBubble 
            key={i}
            name={skill.name}
            level={skill.level}
            delay={i}
            color={category.color}
            style={{
              top: `${bubblePositions[i].top}%`,
              left: `${bubblePositions[i].left}%`,
            }}
          />
        ))}
        
        {/* Skill list */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {category.skills.map((skill, i) => (
              <div key={i} className="flex items-center text-sm">
                <CheckCircle className="h-3 w-3 mr-1 text-mono-500" />
                <span className="text-mono-700">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
      className={`relative overflow-hidden rounded-xl p-6 border border-mono-200 shadow-sm bg-white transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mono-900 to-mono-600"></div>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 relative mb-4">
          <div className="absolute inset-0 rounded-full bg-mono-100 animate-pulse-slow"></div>
          <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-3xl font-bold text-mono-900 mb-1">
          {count}{value.includes('+') ? '+' : ''}
        </h3>
        <p className="text-mono-600">{title}</p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-mono-100"></div>
      <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-mono-100"></div>
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
            { title: "Years Experience", value: "6+", icon: <Trophy className="h-5 w-5 text-mono-800" /> },
            { title: "Projects Completed", value: "80+", icon: <Layout className="h-5 w-5 text-mono-800" /> },
            { title: "Technologies", value: "15+", icon: <Code className="h-5 w-5 text-mono-800" /> },
            { title: "Satisfied Clients", value: "40+", icon: <Star className="h-5 w-5 text-mono-800" /> },
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
        
        {/* Skills Categories */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <SkillCategory key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
