import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-pic.png';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { username } = useParams(); // Access the username parameter from the route
    const { auth , getToken } = useAuth(); 
    const [profileData, setProfileData] = useState(null); // State to store profile data
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = getToken(); 
                const response = await axios.get(`/api/profiles/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username, auth.token]); // Fetch profile data when username changes

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!profileData) {
        return <div>Profile not found or error fetching data.</div>;
    }

    return (
        <div>
            <h2>Profile Page</h2>
            <img src={profileData.profilePicture || defaultProfilePic} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h3>Username: {profileData.username || 'Username'}</h3>
            <p>Description: {profileData.description || 'Description'}</p>
            {/* Display other profile information as needed */}
        </div>
    );
};

export default Profile;