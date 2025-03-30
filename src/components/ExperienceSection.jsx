
import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2020 - Present",
    type: "work",
    description: "Lead developer for the company's flagship e-commerce platform, managing a team of 5 developers. Implemented microservices architecture using Node.js and MongoDB that improved scalability by 40%. Rebuilt frontend with Next.js and Tailwind CSS, increasing conversion rates by 25%.",
    skills: ["Next.js", "Node.js", "MongoDB", "AWS", "Docker", "CI/CD"]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "InnovateSoft",
    location: "Boston, MA",
    period: "2018 - 2020",
    type: "work",
    description: "Developed and maintained multiple client projects using the MERN stack. Created a real-time dashboard that processed over 10,000 data points per minute. Implemented authentication systems using JWT and OAuth for various client applications.",
    skills: ["React", "Express", "MongoDB", "Node.js", "Redux", "Socket.io"]
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "WebCreate Solutions",
    location: "Austin, TX",
    period: "2016 - 2018",
    type: "work",
    description: "Built responsive web applications and websites for clients across various industries. Developed a component library that reduced development time by 30%. Collaborated with design team to implement pixel-perfect UIs.",
    skills: ["React", "JavaScript", "HTML/CSS", "Sass", "Webpack"]
  },
  {
    id: 4,
    title: "Master's in Computer Science",
    company: "Tech University",
    location: "San Francisco, CA",
    period: "2014 - 2016",
    type: "education",
    description: "Specialized in Web Technologies and Distributed Systems. Thesis on scalable real-time web application architectures. GPA: 3.9/4.0",
    skills: ["Algorithms", "System Design", "Distributed Systems", "Web Architecture"]
  },
  {
    id: 5,
    title: "Bachelor's in Computer Engineering",
    company: "State University",
    location: "Chicago, IL",
    period: "2010 - 2014",
    type: "education",
    description: "Graduated with honors. Participated in multiple hackathons and coding competitions. Academic focus on software development and computer networks.",
    skills: ["Data Structures", "Networking", "Database Systems", "Java", "C++"]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">
            My <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-navy-700 max-w-2xl mx-auto text-lg">
            My professional journey and educational background that have shaped my expertise.
          </p>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-purple-200 transform md:translate-x-px"></div>
          
          {/* Timeline Entries */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`flex flex-col md:flex-row items-start relative mb-12 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md transform -translate-x-1/2 flex items-center justify-center">
                  {exp.type === 'work' ? (
                    <Briefcase className="h-4 w-4 text-white" />
                  ) : (
                    <GraduationCap className="h-4 w-4 text-white" />
                  )}
                </div>
                
                {/* Timeline Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'
                }`}>
                  <div className={`bg-white p-6 rounded-xl shadow-md ${
                    exp.type === 'work' ? 'border-l-4 border-purple-500' : 'border-l-4 border-indigo-500'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-navy-900">{exp.title}</h3>
                      <span className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-purple-600 font-medium">{exp.company}</div>
                      <div className="text-gray-500 text-sm">{exp.location}</div>
                    </div>
                    
                    <p className="text-navy-700 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
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
