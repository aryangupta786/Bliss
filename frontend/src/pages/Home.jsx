import React, { useState } from 'react';
import Nav from '../Nav';

const dummyPosts = [
  {
    id: 1,
    username: 'techie_traveler',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    media: 'https://picsum.photos/600/400?random=1',
    caption: 'Exploring the latest tech in beautiful landscapes! 🌄🚀',
    likes: 1245,
    comments: 78,
    timestamp: '2024-02-15T14:30:00Z',
    mediaType: 'IMAGE'
  },
  {
    id: 2,
    username: 'foodie_adventures',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    media: 'https://picsum.photos/600/400?random=2',
    caption: 'Street food tour in Tokyo! 🍣🥢 Every bite is an adventure!',
    likes: 2567,
    comments: 156,
    timestamp: '2024-02-14T10:15:00Z',
    mediaType: 'IMAGE'
  },
  {
    id: 3,
    username: 'fitness_guru',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    media: 'https://picsum.photos/600/400?random=3',
    caption: 'Morning workout routine that keeps me motivated! 💪🏋️‍♂️',
    likes: 3890,
    comments: 245,
    timestamp: '2024-02-13T08:45:00Z',
    mediaType: 'IMAGE'
  }
];

const Home = () => {
  const [posts] = useState(dummyPosts);

  return (
    <div className="flex">
      <Nav className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white" />
      <div className="ml-64 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Social Media Feed</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center p-4 border-b">
                <img 
                  src={post.profilePic} 
                  alt={`${post.username} profile`} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span className="font-semibold">{post.username}</span>
              </div>
              <div className="p-4">
                <img
                  src={post.media}
                  alt={post.caption}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span>❤️ {post.likes.toLocaleString()}</span>
                    <span>💬 {post.comments.toLocaleString()}</span>
                  </div>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;