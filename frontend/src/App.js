import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from "./components/Login";
import Missing from './components/Missing';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import RegisterStudent from './components/RegisterStudent';
import RegisterTutor from './components/RegisterTutor';
import RequireAuth from './components/RequireAuth';
import Search from './components/Search';
import Unauthorized from './components/Unauthorized';
import Calendar from './components/calendar/Calendar';
import EventCard from './components/calendar/EventCard';
import ChatRoom from './components/chat/ChatRoom';
import ReviewForm from './components/review/ReviewForm';
import useAuth from './hooks/useAuth';

function App() {

  const { getToken } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={getToken() ? <Navigate to="/Home" /> : <Navigate to="/Login" />} />
        <Route path="Login" element={getToken() ? <Navigate to="/Home" /> : <Login />} />
        <Route path = "RegisterTutor" element={<RegisterTutor />} />
        <Route path = "RegisterStudent" element={<RegisterStudent />} />
        <Route path = "Unauthorized" element={<Unauthorized />} />
        {}
        <Route element={<RequireAuth allowedRole={["TUTOR", "STUDENT"]} />}>
        <Route path = "Home" element={<Home />} />
        <Route path = "ChatRoom/:otherUser" element={<ChatRoom />} />
        <Route path = "Search" element={<Search />} />
        <Route path = "Profile" element={<Profile />} />
        <Route path = "Profile/:username" element={<Profile />} />
        <Route path = "Profile/Edit" element={<ProfileEdit />} />
        <Route path = "ReviewForm" element={<ReviewForm />} />
        <Route path = "Calendar" element={<Calendar />} />
        <Route path = "EventCard" element={<EventCard />} />
        </Route>
        {}
        <Route path = "*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
