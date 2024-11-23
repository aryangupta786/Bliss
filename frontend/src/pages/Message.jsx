import React, { useState } from 'react';
import { Search, Plus, Video, Phone, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import Nav from '../Nav'; // Corrected the relative path assuming Nav is in the same folder

const Message = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');

  const contacts = [
    { 
      id: 1, 
      name: 'John Doe', 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg', 
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      unread: 2
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg', 
      lastMessage: 'See you later!',
      time: '9:45 AM',
      unread: 0
    },
  ];

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const updatedMessages = { ...messages };
    const messageArray = updatedMessages[selectedChat.id] || [];
    messageArray.push({
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString()
    });

    updatedMessages[selectedChat.id] = messageArray;

    setMessages(updatedMessages);
    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Nav className="w-full z-50 bg-gray-800 text-white" />

      <div className="flex-grow border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-hidden">
       {/* Splitting into subcomponents would improve readability and reusability */}
        <div className="flex justify-between items-center border-b dark:border-gray-700 p-3">
          <h2 className="text-xl font-bold dark:text-white">Chats</h2>
          <button className="text-blue-500 hover:bg-blue-100 p-2 rounded-full">
            <Plus />
          </button>
        </div>

        <div className="p-3">
          <div className="flex items-center bg-white dark:bg-gray-700 rounded-full px-3 py-2">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Search messages" 
              className="w-full bg-transparent dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              onClick={() => setSelectedChat(contact)}
              className={`flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer 
                ${selectedChat?.id === contact.id ? 'bg-blue-50 dark:bg-gray-700' : ''}`}
            >
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-semibold dark:text-white">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">{contact.lastMessage}</p>
                {contact.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-grow flex flex-col p-3">
        {selectedChat ? (
          <>
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <img 
                  src={selectedChat.avatar} 
                  alt={selectedChat.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <h2 className="font-semibold dark:text-white">{selectedChat.name}</h2>
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Video />
                </button>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Phone />
                </button>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <MoreVertical />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {messages[selectedChat.id]?.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex mb-4 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'me' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white dark:bg-gray-700 text-black'
                    }`}
                  >
                    {msg.text}
                    <div className="text-xs text-right mt-1 opacity-70">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              )) || <p className="text-gray-500 dark:text-gray-400">No messages yet</p>}
            </div>

            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Paperclip />
                </button>
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                  <Smile />
                </button>
                <input 
                  type="text" 
                  placeholder="Type a message" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-grow bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 dark:text-white focus:outline-none"
                />
                <button 
                  onClick={sendMessage}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                >
                  <Send />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center p-4">
            <h2 className="text-2xl font-semibold dark:text-white">
              Select a chat to start messaging
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;