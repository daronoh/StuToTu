import { Avatar, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import defaultProfilePic from '../../assets/default-profile-pic.png';
import axios from "../../api/axios";
import { Link } from "react-router-dom";

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
          <CardActionArea component={Link} to={`/ChatRoom/${profile.username}`}> 
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
                <Typography color="textSecondary">
                  Location: {profile.location}
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
            <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleRemoveFriend}
                        style={{ marginTop: '10px' }}
                    >
                        Remove Friend
            </Button>
          </CardContent>
        
        
      </Card>
    );
  };
  
  export default FriendCard;