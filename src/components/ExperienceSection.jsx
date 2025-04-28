
import React, { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const experiences = [
  
  {
    id: 1,
    title: "Frontend Developer",
    company: "Arid Agricultural University",
    location: "Pakistan, Gujrat",
    period: "2023 - 2024",
    type: "work",
    description: "Built responsive web applications and websites for clients across various industries. Developed a component library that reduced development time by 30%. Collaborated with design team to implement pixel-perfect UIs.",
    skills: ["React", "JavaScript", "HTML/CSS"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Freelancing",
    location: "Pakistan, Gujrat",
    period: "2024 - 2025",
    type: "work",
    description: "Developed and maintained multiple client projects using the MERN stack. Created a real-time dashboard that processed over 10,000 data points per minute. Implemented authentication systems using JWT and OAuth for various client applications.",
    skills: ["React", "Express", "MongoDB", "Node.js", "Redux"]
  },
  {
    id: 3,
    title: "Bachelor's in Computer Science",
    company: "Arid Agricultural University",
    location: "Pakistan, Gujrat",
    period: "2020 - 2024",
    type: "education",
    description: "Graduated with honors. Participated in multiple hackathons and coding competitions. Academic focus on software development and computer networks.",
    skills: ["Data Structures", "Networking", "Database Systems", "C#", "C++", "React", "NextJs"]
  }
];

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const timelineItems = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    timelineItems.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      timelineItems.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="experience" className="py-20 bg-white relative" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-mono-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center mb-4">
            <Award className="h-6 w-6 text-mono-800 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-mono-900">
              My <span className="text-gradient">Experience</span>
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-mono-800 to-mono-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-mono-700 max-w-2xl mx-auto text-lg">
            My professional journey and educational background that have shaped my expertise.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-mono-800 via-mono-500 to-mono-900 transform md:translate-x-px rounded-full"></div>

          {/* Timeline Entries */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="timeline-item flex flex-col md:flex-row items-start relative mb-16 opacity-0 transition-opacity duration-700 ease-out"
                ref={el => timelineItems.current[index] = el}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-mono-800 to-mono-600 shadow-lg transform -translate-x-1/2 flex items-center justify-center z-20 timeline-dot">
                  {exp.type === 'work' ? (
                    <Briefcase className="h-5 w-5 text-white" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Timeline Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'
                  }`}>
                  <div className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl gradient-border transform hover:translate-y-[-5px] ${exp.type === 'work' ? 'border-l-4 border-mono-800' : 'border-l-4 border-mono-600'
                    }`}>
                    <div className="flex flex-col mb-4">
                      <h3 className="text-xl font-bold text-mono-900">{exp.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-mono-600 font-medium">{exp.company}</span>
                        <span className="flex items-center text-sm text-mono-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center">
                      <MapPin className="h-4 w-4 text-mono-500 mr-1" />
                      <div className="text-mono-500 text-sm">{exp.location}</div>
                    </div>

                    <p className="text-mono-700 mb-4 leading-relaxed">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-mono-100 text-mono-700 rounded-full hover:bg-mono-200 transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
