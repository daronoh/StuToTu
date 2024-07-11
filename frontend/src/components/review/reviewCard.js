import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from 'react';

const ReviewCard = ({ review }) => {
    return (
        <Card className="profilecardcontainer">
          <MDBContainer>
            <br />
            <br />
            <MDBRow>
              <MDBCol>
                <div className="container">
                  <h2>Review From: {review.reviewFrom}</h2>
                  <h2>Rating: {review.rating}/5.0</h2>
                </div>

                <hr />

                <MDBContainer>
                  <MDBRow>
                    <MDBCol>
                        {review.content || 'no content'}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                <br />
                <br />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
    </Card>
    );
  }
  
  export default ReviewCard;