import { Avatar, Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import defaultProfilePic from '../../assets/default-profile-pic.png';
import useAuth from "../../hooks/useAuth";

const FriendCard = ({ profile }) => {
    const { getToken, getUser } = useAuth();

    const handleRemoveFriend = async () => {
        try {
            await axios.post(`/api/friends/remove`, 
                JSON.stringify({ requesterUsername: getUser(), receiverUsername: profile.username }), 
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
                    withCredentials: true
                });
            window.location.reload();
        } catch (error) {
            console.log('Error removing friend: ', error);
        }
      }
  
    return (
      <Card style={{ marginBottom: '10px' }}>
          <CardContent>
          <CardActionArea 
            component={Link} 
            to={`/ChatRoom`}
            state={{ otherProfile: profile }}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <Typography variant="h5" component="h2">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography color="textSecondary">
                  Username: {profile.username}
                </Typography>
                <Typography color="textSecondary">
                  Email: {profile.email}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Avatar
                  src={profile.profilePicture || defaultProfilePic} 
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
            </Grid>
            </CardActionArea>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/ReviewForm`}
              state={{ ReviewForProfile: profile }}
              style={{ marginRight: '10px', marginTop: '10px'}}
            >
              Review
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveFriend}
                style={{ marginTop: '10px' }}
            >
                Remove Friend
            </Button>
            </Box>
          </CardContent>
        
        
      </Card>
    );
  };
  
  export default FriendCard;