import React, { useState, useEffect } from 'react';
import { 
  Edit, 
  Settings, 
  Grid, 
  Image as ImageIcon, 
  Heart, 
  MessageCircle, 
  Camera 
} from 'lucide-react';
import Nav from '../Nav'; // Ensure this path is correct

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    username: 'jane_doe',
    bio: 'Adventurer | Photographer | Coffee Lover ☕',
    followers: 1245,
    following: 567,
    posts: 132,
    profilePicture: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/800/300'
  });

  const [posts, setPosts] = useState([
    { id: 1, image: '/api/placeholder/300/300', likes: 234, comments: 45 },
    { id: 2, image: '/api/placeholder/300/300', likes: 189, comments: 22 },
  ]);

  const [viewMode, setViewMode] = useState('grid');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({ name: '', username: '', bio: '' });

  useEffect(() => {
    setEditProfile({
      name: user.name,
      username: user.username,
      bio: user.bio
    });
  }, [user]);

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfileSubmit = () => {
    setUser(prev => ({ ...prev, ...editProfile }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex bg-white dark:bg-gray-900 min-h-screen">
      {/* Fixed Navigation Bar */}
      <Nav className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white" />

      {/* Main Content Area */}
      <div className="flex-grow ml-64 p-6">
        {/* Cover Image Section */}
        <div className="relative h-64 w-full">
          <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <button className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <Camera size={20} />
          </button>
        </div>

        {/* Profile Info Section */}
        <div className="relative -mt-16">
          <div className="relative w-32 h-32 mx-auto">
            <img 
              src={user.profilePicture} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover" 
            />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="profilePicture" 
              onChange={handleProfilePictureUpload}
            />
            <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer">
              <Camera size={16} />
            </label>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
            <p className="mt-2 max-w-md mx-auto">{user.bio}</p>
          </div>

          {/* Stats and Actions */}
          <div className="flex justify-center mt-4 space-x-6">
            <div className="text-center">
              <span className="font-bold block">{user.posts}</span>
              <span className="text-gray-600 dark:text-gray-300">Posts</span>
            </div>
            <div className="text-center">
              <span className="font-bold block">{user.followers}</span>
              <span className="text-gray-600 dark:text-gray-300">Followers</span>
            </div>
            <div className="text-center">
              <span className="font-bold block">{user.following}</span>
              <span className="text-gray-600 dark:text-gray-300">Following</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-4 space-x-4">
            <button onClick={() => setIsEditModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <Edit size={16} className="mr-2" /> Edit Profile
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg flex items-center">
              <Settings size={16} className="mr-2" /> Settings
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex justify-center mt-8 border-b dark:border-gray-700">
            <button onClick={() => setViewMode('grid')} className={`px-4 py-2 ${viewMode === 'grid' ? 'border-b-2 border-blue-500' : ''}`}>
              <Grid size={20} />
            </button>
            <button onClick={() => setViewMode('list')} className={`px-4 py-2 ${viewMode === 'list' ? 'border-b-2 border-blue-500' : ''}`}>
              <ImageIcon size={20} />
            </button>
          </div>

          {/* Posts Section */}
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-4 mt-4`}>
            {posts.map(post => (
              <div key={post.id} className="relative group overflow-hidden rounded-lg">
                <img src={post.image} alt={`Post ${post.id}`} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center text-white">
                    <Heart size={20} className="mr-2" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center text-white">
                    <MessageCircle size={20} className="mr-2" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-[1.5rem] max-w-md w-full">
              <h2 className="text-xl font-bold mb-[1rem]">Edit Profile</h2>
              <div className="space-y-[1rem]">
                <input 
                  type="text"
                  placeholder="Name"
                  value={editProfile.name}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-[0.5rem] border rounded-lg dark:bg-gray700 dark:border-gray600"
                />
                <input 
                  type="text"
                  placeholder="Username"
                  value={editProfile.username}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-[0.5rem] border rounded-lg dark:bg-gray700 dark:border-gray600"
                />
                <textarea 
                  placeholder="Bio"
                  value={editProfile.bio}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-[0.5rem] border rounded-lg dark:bg-gray700 dark:border-gray600"
                  rows={4}
                />
                <div className="flex justify-end space-x-[1rem]">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-[1rem] py-[0.5rem] bg-gray200 dark:bg-gray700 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={handleEditProfileSubmit} className="px-[1rem] py-[0.5rem] bg-blue500 text-white rounded-lg">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;