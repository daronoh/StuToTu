import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import defaultProfilePic from '../assets/default-profile-pic.png';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const ProfileCard = ({ profile }) => {
    return (
        <Card class="profilecardcontainer">
            <CardActionArea> 
          <MDBContainer>
            <br />
            <br />
            <MDBRow>
              <MDBCol sm={12} md={4}>
                <div class="container">
                  <img
                    src={profile.profilePicture || defaultProfilePic} 
                    style={{ width: 150, height: 150 }}
                  />
                  <br />
                </div>
              </MDBCol>

              <MDBCol>
                <div class="container">
                  <h2>{profile.firstName && profile.lastName ? profile.firstName + ' ' + profile.lastName : 'no name'}</h2>
                  <h5>{profile.username}</h5>
                  <p>{profile.subjects && profile.subjects.length > 0 ? profile.subjects.join(', ') : 'No subjects'}</p>
                  <p>{profile.educationLevel || 'no education level'}</p>
                </div>

                <hr />

                <MDBContainer>
                  <MDBRow>
                    <MDBCol>
                        {profile.description || 'no description'}
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
                <br />
                <br />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          </CardActionArea>   
    </Card>
    );
  }
  
  export default ProfileCard;