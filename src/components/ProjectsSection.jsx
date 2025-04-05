
import React, { useState } from 'react';
import { Github, ExternalLink, Code, Layout, Server, Search } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with the MERN stack featuring product search, filtering, cart functionality, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Real-time Chat Application",
    description: "A real-time messaging platform with features like user authentication, private messaging, group chats, and file sharing built with Socket.io and the MERN stack.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with drag-and-drop functionality, team collaboration features, and progress tracking.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Next.js", "Tailwind CSS", "React Query", "MongoDB"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "A modern content publishing platform with rich text editing, categories, and social sharing features, using Next.js for server-side rendering.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    tags: ["Next.js", "Sanity.io", "Tailwind CSS"],
    category: "frontend",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 5,
    title: "Social Network",
    description: "A social media platform with features like news feed, user profiles, friend requests, and real-time notifications.",
    image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    tags: ["React", "Node.js", "GraphQL", "MongoDB", "Express"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://demo.com",
  },
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterButtons = [
    { label: 'All', value: 'all', icon: <Search className="h-4 w-4 mr-2" /> },
    { label: 'Frontend', value: 'frontend', icon: <Layout className="h-4 w-4 mr-2" /> },
    { label: 'Backend', value: 'backend', icon: <Server className="h-4 w-4 mr-2" /> },
    { label: 'Full Stack', value: 'fullstack', icon: <Code className="h-4 w-4 mr-2" /> },
  ];
  
  const filteredProjects = projects.filter(project => {
    // Apply category filter
    const categoryMatch = filter === 'all' || project.category === filter;
    
    // Apply search filter if search query exists
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-900">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-black mx-auto mb-6 rounded-full"></div>
          <p className="text-navy-700 max-w-2xl mx-auto text-lg">
            Browse through my recent work showcasing my expertise in building modern web applications.
          </p>
        </div>
        
        {/* Filter and Search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {filterButtons.map(button => (
                <button
                  key={button.value}
                  onClick={() => setFilter(button.value)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all ${
                    filter === button.value
                      ? 'bg-gradient-to-r from-gray-700 to-black text-white'
                      : 'bg-white text-navy-700 hover:bg-purple-50'
                  } shadow-sm`}
                >
                  {button.icon}
                  {button.label}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-900 mb-2">{project.title}</h3>
                  <p className="text-navy-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-5 mt-5">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs px-5 py-2 bg-gradient-to-r from-gray-700 to-black text-white rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-navy-800 hover:text-purple-600 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-1" />
                      <span>Code</span>
                    </a>
                    
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-navy-800 hover:text-purple-600 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 mr-1" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-navy-600 text-lg">No projects found matching your criteria.</p>
              <button 
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
