import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Button } from '@mui/material';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

const subjects = [
    'English',
    'Chinese',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
];

const ProfileEdit = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [subject, setSubject] = useState([]);
    const [educationLevel, setEducationLevel] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data:');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={gender}
                                    label="Gender"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Others'}>Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel>Subjects</InputLabel>
                                <Select
                                    multiple
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                >
                                    {subjects.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box>
                            <FormControl fullWidth>
                                <InputLabel>Education Level</InputLabel>
                                <Select
                                    value={educationLevel}
                                    label="Education Level"
                                    onChange={(e) => setEducationLevel(e.target.value)}
                                >
                                    <MenuItem value={'Pri'}>Primary</MenuItem>
                                    <MenuItem value={'Sec'}>Secondary</MenuItem>
                                    <MenuItem value={'Tertiary'}>Tertiary</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="description"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </form>
    );
};

export default ProfileEdit;