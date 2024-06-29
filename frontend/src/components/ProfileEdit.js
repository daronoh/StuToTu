import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Slider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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

const marks = [
    { value: 1, label: '1' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];



const ProfileEdit = () => {
    const navigate = useNavigate();
    const { username } = useParams(); // Access the username parameter from the route
    const { getToken, logout } = useAuth(); 

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [gender, setGender] = useState('');
    const [subject, setSubject] = useState([]);
    const [educationLevel, setEducationLevel] = useState('');
    const [description, setDescription] = useState('');
    const [rate, setRate] = useState(0);
    const [location, setLocation] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = getToken();
                const response = await axios.get(`/api/profile/${username}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true
                });
    
                const profileData = response.data;
                setFirstName(profileData.firstName || '');
                setLastName(profileData.lastName || '');
                setEmail(profileData.email || '');
                setGender(profileData.gender || '');
                setSubject(profileData.subjects || []);
                setEducationLevel(profileData.educationLevel || '');
                setDescription(profileData.description || '');
                setRate(profileData.rate || 0);
                setLocation(profileData.location || '');
            } catch (error) {
                if (error.response?.status === 401) {
                    logout();
                    navigate('/login');
                }
                setErrMsg('Failed to load profile data');
            }
        };
    
        fetchProfileData();
    }, [username, getToken]);

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);
        setIsValidEmail(value.includes('@')); // Check if "@" is included in the email
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail) {
            setErrMsg('Please enter a valid email address.');
            return;
        }

        try {
            const token = getToken(); 
            await axios.put(`/api/profile/edit/${username}`, 
                JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    gender: gender,
                    subjects: subject, // assuming subject is an array
                    educationLevel: educationLevel,
                    description: description,
                    rate: rate,
                    location: location
                }),
                {
                    headers: {'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`},
                    withCredentials: true
                });
            navigate(`/profile/${username}`);
        } catch (err) {
            setErrMsg('Failed to update');
        }
    }

    return (
        <div style={{marginTop: 70}}>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="First Name"
                            className='textbox'
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
                            onChange={handleEmailChange}
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

                    <Grid item xs={6}>
                        <Paper variant="outlined" sx={{ p: 2}}>
                            <Typography id="discrete-slider-always" gutterBottom>
                                Rate: ${rate}/hr
                            </Typography>
                            <Slider
                                value={rate}
                                onChange={(e, newValue) => setRate(newValue)}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                min={1}
                                max={100}
                                valueLabelDisplay="off"
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="description (max 1000 characters)"
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            inputProps={{ maxLength: 1000 }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </Grid>

                </Grid>
            </Box>
        </form>
        </div>
    );
};

export default ProfileEdit;