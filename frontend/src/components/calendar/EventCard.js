import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const EventCard = ({ event, onEventAdded }) => {
    const { getToken, getUser } = useAuth();

    const handleDelete = async () => {
        try {
            await axios.post(`/api/profile/deleteEvent/${getUser()}`, event, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            onEventAdded();
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    }

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6">{event.title}</Typography>
                    <IconButton onClick={handleDelete}>
                            <CloseIcon />
                        </IconButton>
                </Box>
                <Typography color = "textSecondary">{event.startTime} - {event.endTime}</Typography>
                <Typography color="textSecondary">{event.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
