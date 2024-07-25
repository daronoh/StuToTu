import { Box, Grid, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import EventCard from './EventCard';

const Calendar = () => {
    const { getToken, getUser } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents(getUser(), selectedDate);
    }, [selectedDate]);

    const fetchEvents = async (username, selectedDate) => {
        try {
            const formattedDate = selectedDate.toISOString();
            console.log(formattedDate);
            const response = await axios.get(`/api/profile/events/${username}`, {
                params: {date: formattedDate},
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            console.log(response.data);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%', mx: 'auto', mt: 5 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Select a Date
                </Typography>
                <StaticDatePicker
                    orientation="landscape"
                    openTo="day"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Typography variant="h6" align="center" gutterBottom sx={{ mt: 4 }}>
                    Events on {selectedDate ? selectedDate.format('YYYY-MM-DD') : 'Selected Date'}
                </Typography>
                {selectedDate && (
                    <Grid container spacing={2}>
                        {events
                            .map(event => (
                                <Grid item key={event.id} xs={12}>
                                    <EventCard event={event} />
                                </Grid>
                            ))}
                    </Grid>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default Calendar;