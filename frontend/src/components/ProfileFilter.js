import FilterIcon from '@mui/icons-material/Filter';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
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
    const [rateFilter, setRateFilter] = useState('');
    const [value, setValue] = useState(50); // Default value for the slider


    const handleApplyFilters = () => {
        applyFilters({
            subjects: subjectsFilter,
            gender: genderFilter,
            educationLevel: educationLevelFilter,
            location: locationFilter,
            rate: rateFilter,
        });
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setRateFilter(newValue); // Update rateFilter state with the slider value
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
                            <InputLabel id="subjects-label">Subjects</InputLabel>
                            <Select
                                labelId="subjects-label"
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
                                Rate: ${value}/hr
                            </Typography>
                            <Slider
                                value={value}
                                onChange={handleSliderChange}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                min={1}
                                max={100}
                                valueLabelDisplay="off"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                label="Gender"
                                variant="outlined"
                                fullWidth
                                value={genderFilter}
                                onChange={(e) => setGenderFilter(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                        <InputLabel id="education-label">Education Level</InputLabel>
                            <Select
                                labelId="education-label"
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
