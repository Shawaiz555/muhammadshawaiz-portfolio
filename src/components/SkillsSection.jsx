import React, { useEffect, useRef, useState } from 'react';
import { Code, Server, Layout, Trophy } from 'lucide-react';

// === Data ===
const skills = [
  {
    category: "Frontend",
    icon: <Layout className="h-6 w-6 text-white" />,
    color: "from-gray-700 to-black",
    skills: [
      { name: "React.js", level: 85 },
      { name: "Next.js", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 95 },
    ]
  },
  {
    category: "Backend",
    icon: <Server className="h-6 w-6 text-white" />,
    color: "from-gray-700 to-black",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 90 },
      { name: "RESTful APIs", level: 90 },
    ]
  },
  {
    category: "Tools & Other",
    icon: <Code className="h-6 w-6 text-white" />,
    color: "from-gray-700 to-black",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 60 },
    ]
  }
];

const expertiseData = [
  { title: "Projects Completed", value: "10+", icon: <Trophy /> },
  { title: "Years Experience", value: "2+", icon: <Trophy /> },
  { title: "Happy Clients", value: "20+", icon: <Trophy /> },
];

// === Components ===

const SkillCircle = ({ name, level, delay }) => {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setProgress(level), delay * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (circleRef.current) observer.observe(circleRef.current);
    return () => observer.disconnect();
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={circleRef}
      className="flex flex-col items-center transition-opacity duration-700 ease-out"
    >
      <div className="relative">
        <svg width="100" height="100" className="-rotate-90">
          <circle cx="50" cy="50" r={radius} stroke="#eee" strokeWidth="8" fill="none" />
          <circle
            cx="50" cy="50" r={radius}
            stroke="orange"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
          {progress}%
        </div>
      </div>
      <h4 className="mt-2 text-white font-semibold">{name}</h4>
    </div>
  );
};

const ExpertiseCard = ({ title, value, icon, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const target = parseInt(value);
          const step = target / 30;
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, 50);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white shadow-md rounded-xl p-6 text-center transition transform duration-500 hover:scale-105"
    >
      <div className="text-black mb-4 flex justify-center">{icon}</div>
      <h3 className="text-4xl font-bold mb-3">{count}{value.includes('+') ? '+' : ''}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

const SkillCategoryCard = ({ category, index }) => {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  const onMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-gradient-to-br ${category.color} hover:cursor-pointer text-white rounded-2xl shadow-xl p-6 transform transition duration-500`}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${mouse.y * 10}deg) rotateY(${mouse.x * -10}deg)`
          : 'rotateX(0) rotateY(0)',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/20 p-3 rounded-full">{category.icon}</div>
        <h2 className="text-2xl font-bold">{category.category}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {category.skills.map((skill, idx) => (
          <SkillCircle
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={idx + index}
          />
        ))}
      </div>
    </div>
  );
};

// === Main Component ===
export default function SkillsShowcase() {
  return (
    <div className="px-6 py-12 space-y-16 bg-gray-50 min-h-screen" id='skills'>
      <h1 className="text-4xl font-bold text-center text-gray-800">Skills & Expertise</h1>

      {/* Skill Categories */}
      <div className="grid md:grid-cols-3 gap-10">
        {skills.map((cat, idx) => (
          <SkillCategoryCard key={cat.category} category={cat} index={idx} />
        ))}
      </div>

      {/* Expertise Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {expertiseData.map((exp, idx) => (
          <ExpertiseCard key={exp.title} {...exp} index={idx} />
        ))}
      </div>
    </div>
  );
}
