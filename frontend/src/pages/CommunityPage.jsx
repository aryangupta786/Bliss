import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Hash, Star, Moon, Sun } from 'lucide-react';
import Nav from '../Nav.jsx'; // Ensure this path is correct

// Mock data - in a real application, this would come from an API or database
const communityGroups = [
  {
    id: 1,
    name: "Web Developers",
    description: "A group for web development enthusiasts",
    memberCount: 1245,
    topics: ["React", "JavaScript", "CSS"],
    featured: true
  },
  {
    id: 2,
    name: "Data Science Collective",
    description: "Exploring data, machine learning, and AI",
    memberCount: 876,
    topics: ["Python", "Machine Learning", "Statistics"],
    featured: false
  },
  {
    id: 3,
    name: "Design Thinking",
    description: "Collaborative space for UX/UI designers",
    memberCount: 534,
    topics: ["UX", "UI", "Design Trends"],
    featured: true
  }
];

const CommunityPage = () => {
  // State for theme and filters
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  // Theme toggle effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDarkMode);
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Filter groups based on search and active filter
  const filteredGroups = communityGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'featured' && group.featured);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex">
      {/* Fixed Navigation Bar */}
      <Nav className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white" />

      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Community Groups</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect, collaborate, and grow together</p>
        </header>

        <div className="mb-6 flex space-x-4">
          {/* Search Input */}
          <input 
            type="text" 
            placeholder="Search groups..." 
            className="flex-grow p-2 border rounded-md 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-100 
              border-gray-300 dark:border-gray-600 
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-md flex items-center 
                ${activeFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
              `}
            >
              <Users className="mr-2" size={20} /> All Groups
            </button>
            <button 
              onClick={() => setActiveFilter('featured')}
              className={`px-4 py-2 rounded-md flex items-center 
                ${activeFilter === 'featured' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
              `}
            >
              <Star className="mr-2" size={20} /> Featured
            </button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => (
            <div 
              key={group.id} 
              className="border rounded-lg p-6 
                bg-white dark:bg-gray-800 
                border-gray-200 dark:border-gray-700 
                hover:shadow-md dark:hover:shadow-xl 
                transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {group.name}
                </h2>
                {group.featured && (
                  <Star className="text-yellow-500 dark:text-yellow-400" size={24} />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{group.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Users size={20} />
                  <span>{group.memberCount} Members</span>
                </div>
                
                <div className="flex space-x-2">
                  {group.topics.slice(0, 3).map(topic => (
                    <span 
                      key={topic} 
                      className="bg-gray-100 dark:bg-gray-700 
                        text-gray-700 dark:text-gray-300 
                        px-[0.5rem] py-[0.15rem] rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full mt-[1rem] 
                bg-blue-500 text-white 
                py-[0.5rem] rounded-md 
                hover:bg-blue600 
                dark:bg-blue600 dark:hover:bg-blue500 
                transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-[3rem] text-gray500 dark:text-gray400">
            <MessageCircle className="mx-auto mb-[1rem]" size={48} />
            <p>No groups found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;