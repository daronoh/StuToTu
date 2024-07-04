import { AttachMoney, Email, LocalLibrary, LocationOn, Person, School } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-pic.png';
import useAuth from '../hooks/useAuth';
import AddAsFriendButton from './Friends/AddAsFriendButton';

const Profile = () => {
    const { username } = useParams(); // Access the username parameter from the route
    const { getToken, getUser, logout, getRole } = useAuth(); 
    const [profileData, setProfileData] = useState(null); // State to store profile data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [isFriend, setIsFriend] = useState(false); // state to manage whether the profile is a friend of the user
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
                if (response.data.friends && response.data.friends.some(friend => friend.username === getUser())) {
                    setIsFriend(true);
                }
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
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!profileData) {
        return <div>Profile not found or error fetching data.</div>;
    }

    return (
        <div className='body-content'>
            {getRole() !== profileData.role && !isFriend ? (
                <AddAsFriendButton requestData={{requester: getUser(), receiver: profileData.username}}/>
            ) : getUser() !== profileData.username ? (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ top: 200, right: 60, position: 'absolute' }}
                    disabled={true}
                >Added as Friend</Button>
            ) : (<></>)}

            <Grid container spacing={2} mb={8} justifyContent="center">
                <Grid item xs={12} mb={2} textAlign="center">
                    <img 
                        src={profileData.profilePicture || defaultProfilePic} 
                        alt="Profile" 
                        style={{ width: '150px', height: '150px', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }} 
                    />
                    <Typography variant="h3" gutterBottom>
                        {profileData.username}
                    </Typography>
                </Grid>

                <Grid item xs={10} md={15}>
                    <Grid container spacing={5}>
                        {profileData.role === 'TUTOR' ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Person />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Name:</Typography>
                                                <Typography variant="h6">
                                                    {profileData.firstName && profileData.lastName ? profileData.firstName + ' ' + profileData.lastName : ''}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Email />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Email:</Typography>
                                                <Typography variant="h6">{profileData.email}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Person />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Gender:</Typography>
                                                <Typography variant="h6">{profileData.gender}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <School />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Education Level:</Typography>
                                                <Typography variant="h6">{profileData.educationLevel}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <LocalLibrary />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Subjects:</Typography>
                                                <Typography variant="h6">
                                                    {profileData.subjects && profileData.subjects.length > 0 ? profileData.subjects.join(', ') : 'No subjects'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <LocationOn />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Location:</Typography>
                                                <Typography variant="h6">{profileData.location}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <AttachMoney />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Rate:</Typography>
                                                <Typography variant="h6">{profileData.rate}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item> 
                                                <Typography variant="body1">Description:</Typography>
                                                <Typography variant="h6">{profileData.description}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Person />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Name:</Typography>
                                                <Typography variant="h6">
                                                    {profileData.firstName && profileData.lastName ? profileData.firstName + ' ' + profileData.lastName : ''}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Person />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Gender:</Typography>
                                                <Typography variant="h6">{profileData.gender}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Email />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1">Email:</Typography>
                                                <Typography variant="h6">{profileData.email}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                    <Box mb={2}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Typography variant="body1">Description:</Typography>
                                                <Typography variant="h6">{profileData.description}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <Typography variant="h6">Tags:</Typography>
                                <Box display="flex" alignItems="center" mt={1} flexWrap="wrap">
                                    {profileData.tags && profileData.tags.map((tag, index) => (
                                        <Chip label={tag} variant="outlined" color="primary"
                                            key={index}
                                            style={{ margin: '5px' }}
                                        />
                                    ))}
                                    </Box>
                                </Box>
                            </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
