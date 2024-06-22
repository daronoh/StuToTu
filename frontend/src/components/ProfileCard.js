import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import defaultProfilePic from '../assets/default-profile-pic.png';

const ProfileCard = ({ profile }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            sx={{ height: 140 }}
            image={profile.profilePicture || defaultProfilePic}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {profile.firstName} {profile.lastName} ({profile.username})
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {profile.description}
            </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
    );
  }
  
  export default ProfileCard;