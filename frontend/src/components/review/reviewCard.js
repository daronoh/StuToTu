import { Box, Card, CardActionArea, Typography } from '@mui/material';
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <Card className="profilecardcontainer">
            <CardActionArea>
                <MDBContainer>
                    <Box mt={2} mb={2}>
                        <MDBRow>
                            <MDBCol>
                                <Typography variant="h6">Review From: {review.reviewFrom}</Typography>
                                <Typography variant="h6">Rating: {review.rating}/5.0</Typography>
                            </MDBCol>
                        </MDBRow>

                        <hr />

                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <Typography variant="body1">
                                        {review.content || 'No content'}
                                    </Typography>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Box>
                </MDBContainer>
            </CardActionArea>
        </Card>
    );
};

export default ReviewCard;
