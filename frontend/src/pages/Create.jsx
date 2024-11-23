import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, ImagePlus } from 'lucide-react';
import Nav from '../Nav.jsx'; // Ensure this path is correct

const Create = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);

  // Image drop handling
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    setSelectedImage(Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
  }, []);

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  // Remove image
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Add tags
  const addTag = (e) => {
    if (e.key === 'Enter' && tags.trim()) {
      if (!tagList.includes(tags.trim())) {
        setTagList([...tagList, tags.trim()]);
        setTags('');
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTagList(tagList.filter(tag => tag !== tagToRemove));
  };

  // Submit post
  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      image: selectedImage,
      caption,
      location,
      tags: tagList
    };
    console.log('Post Data:', postData);
    // Add your post submission logic here
  };

  return (
    <div className="flex">
      {/* Fixed Navigation Bar */}
      <Nav className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg" />

      {/* Main Content Area */}
        <div className="flex-auto ml-10 gap-4 p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white overflow-hidden mt-[5rem]">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>
        
        {/* Image Upload Section */}
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600'}`}
        >
          <input {...getInputProps()} />
          {selectedImage ? (
            <div className="relative">
              <img 
                src={selectedImage.preview} 
                alt="Preview" 
                className="max-h-64 mx-auto object-cover rounded-lg"
              />
              <button 
                onClick={removeImage} 
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <ImagePlus size={50} className="text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                Drag 'n' drop an image, or click to select
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Max file size: 5MB (JPEG, PNG, GIF)
              </p>
            </div>
          )}
        </div>

        {/* Caption Input */}
        <div className="mt-4">
          <textarea 
            placeholder="Write a caption..." 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded-lg 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        {/* Location Input */}
        <div className="mt-4">
          <input 
            type="text" 
            placeholder="Add location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags Input */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tagList.map(tag => (
              <span 
                key={tag} 
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full flex items-center"
              >
                #{tag}
                <button 
                  onClick={() => removeTag(tag)} 
                  className="ml-2 text-red-500 dark:text-red-400"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Add tags (Press Enter)" 
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyDown={addTag}
            className="w-full p-2 border rounded-lg 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              border-gray-300 dark:border-gray-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Create Post
        </button>

        {/* AI Generation Button */}
        <button className='px-4 py-2 rounded-full flex items-center gap-2 text-slate-500 shadow-lg transition-all hover:shadow-md hover:text-violet-500 mt-[1rem] mb-[1rem]'>
          Generate by AI
        </button>
      </div>
    </div>
  );
};

export default Create;