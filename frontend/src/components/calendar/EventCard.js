import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const EventCard = ({ event }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography color = "textSecondary">{event.startTime} - {event.endTime}</Typography>
                <Typography color="textSecondary">{event.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
