import { AttachMoney, Close, Done, Email, LocalLibrary, LocationOn, Person, School, TagFaces } from '@mui/icons-material';
import { Box, Button, Card, Chip, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-pic.png';
import useAuth from '../hooks/useAuth';
import AddAsFriendButton from './Friends/AddAsFriendButton';
import ReviewCard from './review/ReviewCard';

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
                                                <Typography variant="h6">${profileData.rate}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box mb={2}>
                                        <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                        { profileData.tags.length > 0 ? (
                                                            profileData.tags
                                                                .filter(tag => tag.inProfile)
                                                                .map((tag) => (
                                                                    <Chip label={tag.name} color={tag.validated ? "success" : "error"} icon={tag.validated ? <Done/> : <Close/>} sx={{marginTop: '5px'}}/>
                                                                ))
                                                        ) : (
                                                            <Typography variant="body1">No tags</Typography>
                                                        )}
                                        </Stack>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item> 
                                                <Typography variant="body1">Description:</Typography>
                                                <Typography variant="h6">{profileData.description || 'No Description'}</Typography>
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
                                                <Typography variant="h6">{profileData.description || 'No Description'}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography variant="h6" align="center">reviews: {profileData.avgRating}/5.0</Typography>
                </Grid>
                {profileData.reviews && profileData.reviews.length > 0 ? (
                    profileData.reviews.map((result, index) => (
                        <Grid item xs={12} key={index}>
                            <ReviewCard review={result} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Typography variant="h6" align="center">
                                No Reviews
                            </Typography>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
        //the grid above will go through the profiledata and look at the list of reviews, and display them. similar to how our search shows the profiles.
    );
};

export default Profile;
