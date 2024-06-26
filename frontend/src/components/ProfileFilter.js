import FilterIcon from '@mui/icons-material/Filter';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const subjectsOptions = [
    'English',
    'Chinese',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography'
];

const educationLevels = [
    { value: 'Pri', label: 'Primary' },
    { value: 'Sec', label: 'Secondary' },
    { value: 'Tertiary', label: 'Tertiary' }
];

const marks = [
    { value: 1, label: '1' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
];


const ProfileFilter = ({ applyFilters }) => {
    const [open, setOpen] = useState(false);
    const [subjectsFilter, setSubjectsFilter] = useState([]);
    const [genderFilter, setGenderFilter] = useState('');
    const [educationLevelFilter, setEducationLevelFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [rateFilter, setRateFilter] = useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApplyFilters = async () => {
        const filters = {
            subjects: subjectsFilter.length > 0 ? subjectsFilter : null,
            gender: genderFilter || null,
            educationLevel: educationLevelFilter || null,
            location: locationFilter || null,
            rate: rateFilter !== 0 ? rateFilter : 100,
        };
        applyFilters(filters);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpen} startIcon={<FilterIcon />}>
                Filter
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Filter Profiles</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Subjects</InputLabel>
                                    <Select
                                        label="Subject"
                                         variant="outlined"
                                        fullWidth
                                        value={subjectsFilter}
                                        onChange={(e) => setSubjectsFilter(e.target.value)}
                                        multiple
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {subjectsOptions.map((subject) => (
                                            <MenuItem key={subject} value={subject}>
                                                {subject}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Location"
                                variant="outlined"
                                fullWidth
                                value={locationFilter}
                                onChange={(e) => setLocationFilter(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography id="discrete-slider-always" gutterBottom>
                                Rate: ${rateFilter}/hr
                            </Typography>
                            <Slider
                                value={rateFilter}
                                onChange={e => setRateFilter(e.target.value)}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                min={1}
                                max={100}
                                valueLabelDisplay="off"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                    label="Gender"
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Others">Others</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel>Education Level</InputLabel>
                                        <Select
                                            label="Education Level"
                                            variant="outlined"
                                            fullWidth
                                            value={educationLevelFilter}
                                            onChange={(e) => setEducationLevelFilter(e.target.value)}
                                        >
                                            {educationLevels.map((level) => (
                                                <MenuItem key={level.value} value={level.value}>
                                                    {level.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleApplyFilters} color="primary">Apply Filters</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProfileFilter;
