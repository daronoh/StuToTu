import React, { useState } from 'react';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done'; // Import DoneIcon from Material-UI icons
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const FriendButton = ({ requestData }) => {
    const [success, setSuccess] = useState(false);
    const { getToken } = useAuth();

    const handleAddFriend = () => {
        console.log(`requesterUsername: ${requestData.requester}`)
        console.log(`receiverUsername: ${requestData.receiver}`)
        axios.post('/api/friends/send', {
            requesterUsername: requestData.requester, 
            receiverUsername: requestData.receiver
        }, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        })
        .then(response => {
            console.log('Friend request sent successfully:', response.data);
            setSuccess(true);
        })
        .catch(error => {
            console.error('Error sending friend request:', error);
        });
    };

    return (
        <>
            {success ? (
                <DoneIcon style={{ color: 'green', top: 200, right: 100, position: 'absolute'}} /> // Display tick icon on success
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ top: 200, right: 100, position: 'absolute' }}
                    onClick={handleAddFriend}
                >
                    Add as friend
                </Button>
            )}
        </>
    );
};

export default FriendButton;