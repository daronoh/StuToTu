import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import FriendCard from './Friends/FriendCard';
import FriendRequestCard from './Friends/FriendRequestCard';

const Home = () => {
    const { getToken, getUser } = useAuth();
    const [pendingRequests, setPendingRequests] = useState([]);
    const [Friends, setFriends] = useState([]);

    useEffect(() => {
        fetchPendingRequests(getUser());
        fetchFriends(getUser());
    }, []);

    const fetchPendingRequests = async (username) => {
        try {
        const response = await axios.get(`/api/friends/pending/${username}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        setPendingRequests(response.data);
        } catch (error) {
        console.error('Error fetching pending requests:', error);
        }
    };

    const fetchFriends = async (username) => {
        try {
        const response = await axios.get(`/api/friends/${username}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        setFriends(response.data);
        } catch (error) {
        console.error('Error fetching pending requests:', error);
        }
    };

    return (
        <div>
            <div style={{ marginTop: '4rem'}}>
                <h2 style={{textAlign: 'center'}}>Pending Friend Requests</h2>
                {pendingRequests.length > 0 ? (
                    <Grid sx={{ minWidth: '500px', width: '80%', maxWidth: '800px', margin: '0 auto' }}>
                        {pendingRequests.slice(0, 6).map((result) => (
                            <Grid item key={result.id} xs={12}>
                                <FriendRequestCard profile={result} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p style={{textAlign: 'center'}}> empty </p>
                )}
            </div>
            <div style={{ marginTop: '4rem'}}>
                <h2 style={{textAlign: 'center'}}>Friends</h2>
                {Friends.length > 0 ? (
                    <Grid sx={{ minWidth: '500px', width: '80%', maxWidth: '800px', margin: '0 auto' }}>
                        {Friends.slice(0, 6).map((result) => (
                            <Grid item key={result.id} xs={12}>
                                <FriendCard profile={result} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p style={{textAlign: 'center'}}> empty </p>
                )}
            </div>
        </div>
    );
};

export default Home;