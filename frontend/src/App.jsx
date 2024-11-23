import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Sections


// Page Components
import Nav from './Nav.jsx';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Create from './pages/Create';
import Message from './pages/Message';
import CommunityPage from './pages/CommunityPage';
import Analytics from './pages/Analytics';
import Profile from './pages/profile';
import Landing from './pages/Landing';
import ChooseRole from "./auth/components/ChooseRole";
import Login from "./auth/components/Login.jsx";
import Signup from "./auth/components/Signup";
import UserDashboard from "./auth/components/UserDashboard";
import AdminDashboard from "./auth/components/AdminDashboard.jsx";

// Additional Pages
const Members = () => <div className="p-8">Members Page</div>;

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden">
      {/* Landing Page Sections */}

      {/* Router for App Pages */}
      <div className="flex min-h-screen">


        <main className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/create" element={<Create />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/members" element={<Members />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/choose-role" element={<ChooseRole />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;