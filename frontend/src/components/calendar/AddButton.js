import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const AddButton = ({ onEventAdded }) => {
    const { getToken, getUser } = useAuth();
    const [open, setOpen] = useState(false);
    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[startTime, setStartTime] = useState('');
    const[endTime, setEndTime] = useState('');
    const[date, setDate] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const username = getUser();
            const formattedDate = date.toISOString(); // Ensure date is in ISO format
            const eventData = {
                title: title,
                description: description,
                date: formattedDate,
                startTime: startTime,
                endTime: endTime
            };
            await axios.post(`/api/profile/createEvent/${username}`, eventData, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            });
            handleClose();
            onEventAdded();
        } catch (err) {
            console.error('Error creating event:', err);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Add Event
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <h2 id="modal-modal-title">Enter Event Details</h2>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Container components={['DatePicker']}>
                            <DatePicker label="Date" 
                            value={date}
                            onChange={(e) => setDate(e)}/>
                        </Container>
                    </LocalizationProvider>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    <TextField
                        label="Start Time"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}/>
                    <TextField
                        label="End Time"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}/>
                    {/* Add more TextField components for additional fields */}
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AddButton;