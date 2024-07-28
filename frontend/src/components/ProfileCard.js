import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as React from 'react';
import { Link } from 'react-router-dom';
import defaultProfilePic from '../assets/default-profile-pic.png';

const ProfileCard = ({ profile }) => {
    return (
        <Card className="profilecardcontainer">
            <CardActionArea component={Link} to={`/profile/${profile.username}`}> 
          <MDBContainer>
            <br />
            <br />
            <MDBRow>
              <MDBCol sm={12}>
                <div className="container">
                  <img
                    src={profile.profilePicture || defaultProfilePic} 
                    style={{ width: 150, height: 150 }}
                  />
                  <br />
                </div>
              </MDBCol>

              <MDBCol>
                <div className="container">
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