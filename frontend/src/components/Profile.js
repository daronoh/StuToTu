import { Box, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-pic.png';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { username } = useParams(); // Access the username parameter from the route
    const { getToken, getUser, logout } = useAuth(); 
    const [profileData, setProfileData] = useState(null); // State to store profile data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const authenticatedUsername = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = getToken(); 
                const authStr = 'Bearer '.concat(token);
                const response = await axios.get(`/api/profile/${username}`, {
                    headers: {'Authorization': authStr},
                    withCredentials: true
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
                console.error('Error fetching profile data:', error);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username, getToken]); // Fetch profile data when username changes

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!profileData) {
        return <div>Profile not found or error fetching data.</div>;
    }

    const isOwnProfile = authenticatedUsername === profileData.username;

    return (
        <div className='body-content'>
            {isOwnProfile && (
                <Button
                    component={Link}
                    to={`/profile/edit/${username}`}
                    variant="contained"
                    color="primary"
                    style={{top: 100, right: 100, position: 'absolute'}}
                >
                    Edit Profile
                </Button>
            )}

            <Grid container spacing={0} className='centered-container'>
                <Grid item xs={12}>
                    <Typography variant="h3">Profile Page</Typography>
                </Grid>
                <Grid item xs={12}>
                    <img 
                        src={profileData.profilePicture || defaultProfilePic} 
                        alt="Profile" 
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
                    />
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Username:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.username}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Username:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.email}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Name:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.firstName && profileData.lastName ? profileData.firstName + ' ' + profileData.lastName : ''}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Gender:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.gender}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Education Level:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.educationLevel}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Subjects:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.subjects && profileData.subjects.length > 0 ? profileData.subjects.join(', ') : 'No subjects'}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Location:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.location}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className='centered-box'>
                    <Typography variant="body1">Rate:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.rate}
                    </Box>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                    <Typography variant="body1">Description:</Typography>
                    <Box
                        alignItems="center"
                        gap={4}
                        p={2}
                        sx={{ border: '2px solid grey' }}
                        >
                        {profileData.description}
                    </Box>
                    </div>
                </Grid>

            </Grid>
            </div>
        );
    };

export default Profile;