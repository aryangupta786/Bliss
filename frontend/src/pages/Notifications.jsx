import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  MessageCircle, 
  Users, 
  Heart, 
  Star, 
  Moon, 
  Sun, 
  Trash2 
} from 'lucide-react';
import Nav from '../Nav.jsx'; // Ensure this path is correct

// Mock notification data
const initialNotifications = [
  {
    id: 1,
    type: 'message',
    icon: <MessageCircle />,
    title: 'New Message',
    description: 'John sent you a message in Web Developers group',
    timestamp: '5 min ago',
    read: false
  },
  {
    id: 2,
    type: 'group',
    icon: <Users />,
    title: 'Group Invitation',
    description: 'Design Thinking community invited you to join',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 3,
    type: 'like',
    icon: <Heart />,
    title: 'Post Liked',
    description: 'Sarah liked your recent post',
    timestamp: 'Yesterday',
    read: true
  },
  {
    id: 4,
    type: 'achievement',
    icon: <Star />,
    title: 'New Achievement',
    description: 'You reached 100 contributions milestone',
    timestamp: '3 days ago',
    read: true
  }
];

const Notifications = () => {
  // State management
  const [notifications, setNotifications] = useState(initialNotifications);
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('all');

  // Theme toggle effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
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

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    return filter === 'all' || notification.type === filter;
  });

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Delete a specific notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Notification type filters
  const notificationFilters = [
    { key: 'all', label: 'All', icon: <Bell /> },
    { key: 'message', label: 'Messages', icon: <MessageCircle /> },
    { key: 'group', label: 'Groups', icon: <Users /> },
    { key: 'like', label: 'Likes', icon: <Heart /> },
    { key: 'achievement', label: 'Achievements', icon: <Star /> }
  ];

  return (
    <div className="flex">
      {/* Fixed Navigation Bar */}
      <Nav className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white" />

      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>

        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
          >
            Mark All as Read
          </button>
        </header>

        {/* Filters */}
        <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
          {notificationFilters.map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md 
                transition-colors text-sm
                ${filter === filterOption.key 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}
              `}
            >
              {React.cloneElement(filterOption.icon, { size: 16 })}
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Bell className="mx-auto mb-4" size={48} />
              <p>No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`
                  flex items-start p-4 rounded-lg 
                  ${notification.read 
                    ? 'bg-gray-100 dark:bg-gray-800' 
                    : 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500'}
                  transition-all
                `}
              >
                {/* Notification Icon */}
                <div className="mr-4 text-blue-500 dark:text-blue-400">
                  {React.cloneElement(notification.icon, { size: 24 })}
                </div>

                {/* Notification Content */}
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {notification.description}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                    {notification.timestamp}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button 
                      onClick={() => {
                        const updatedNotifications = notifications.map(n => 
                          n.id === notification.id ? { ...n, read: true } : n
                        );
                        setNotifications(updatedNotifications);
                      }}
                      className="text-green-500 hover:bg-green-100 dark:hover:bg-green-900 p-2 rounded-full"
                    >
                      <Check size={20} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 p-2 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;