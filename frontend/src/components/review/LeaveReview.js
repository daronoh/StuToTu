import React, { useState } from 'react';
import { Box, Button, Card, Grid, Rating, TextField, Typography } from '@mui/material';

const LeaveReview = ({ReviewForProfile}) => { // the ReviewForProfile needs to keep track of the other user's profile cause we can get our own username but not the person we are leaving the review for otherwise, but i dont know how to pass the profile into this component when we're routing
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log('Rating:', rating);
        console.log('Review:', review);
        setSubmitted(true);
    };

    return (
        <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Leave a Review
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