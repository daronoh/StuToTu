import React, { useState } from 'react';
import { Box, Button, Card, Chip, Grid, Rating, Stack, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const LeaveReview = () => {
    const location = useLocation();
    const { ReviewForProfile } = location.state || {};
    console.log(ReviewForProfile);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { getToken, getUser } = useAuth();

    // State to track selected chips
    const [selectedChips, setSelectedChips] = useState([]);

    // Function to handle chip selection
    const handleChipClick = (tagName) => {
        // Check if the tagName is already in selectedChips
        if (selectedChips.includes(tagName)) {
            // Remove the tagName from selectedChips
            setSelectedChips(selectedChips.filter(name => name !== tagName));
        } else {
            // Add the tagName to selectedChips
            setSelectedChips([...selectedChips, tagName]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/profile/review', 
                JSON.stringify({reviewFor: ReviewForProfile.username, reviewFrom: getUser(), content: review, rating: rating, tags: selectedChips}),
                {
                    headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`},
                withCredentials: true
                }
            );
            setSubmitted(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Leave a Review for {ReviewForProfile.username}
            </Typography>
            {!submitted ? (
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Stack direction="row" sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {ReviewForProfile.tags.length > 0 && ReviewForProfile.role === 'TUTOR' ? (
                                    ReviewForProfile.tags.filter(tag => tag.inProfile).map((tag) => (
                                        <Chip
                                            label={tag.name}
                                            color="primary"
                                            variant={selectedChips.includes(tag.name) ? 'filled' : 'outlined'}
                                            onClick={() => handleChipClick(tag.name)}
                                            sx={{ marginTop: '5px', cursor: 'pointer' }}
                                        />
                                    ))
                                    ) : (
                                        <Typography variant="body1"></Typography>
                                    )}
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Your Review"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Typography variant="h6" align="center">
                    Thank you for your review!
                </Typography>
            )}
        </Card>
    );
};

export default LeaveReview;