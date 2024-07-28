import { Avatar, Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import defaultProfilePic from '../../assets/default-profile-pic.png';
import useAuth from "../../hooks/useAuth";

const FriendRequestCard = ({profile}) => {
    const { getUser, getToken, getRole } = useAuth();

    const handleAccept = async () => {
        try {
            await axios.post(`/api/friends/accept`, 
                JSON.stringify({requesterUsername: getUser(), receiverUsername: profile.username}), 
                {
                    headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`},
                    withCredentials: true
                });
            window.location.reload();
        } catch (error) {
        console.error('Error fetching pending requests:', error);
        }
    }; 

    const handleReject = async () => {
        try {
        await axios.post(`/api/friends/reject`, 
            JSON.stringify({requesterUsername: getUser(), receiverUsername: profile.username}), 
            {
                headers: {'Content-Type': 'application/json',
                          'Authorization': `Bearer ${getToken()}`},
                withCredentials: true
            });
            window.location.reload();
        } catch (error) {
        console.error('Error fetching pending requests:', error);
        }
    }; 

    return (
        <Card style={{ marginBottom: '10px' }}>
        
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={9}>
              <CardActionArea component={Link} to={`/profile/${profile.username}`}> 
                <Typography variant="h5" component="h2">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography color="textSecondary">
                  Username: {profile.username}
                </Typography>
                <Typography color="textSecondary">
                  Email: {profile.email}
                </Typography>
                </CardActionArea>
                {getRole() === 'TUTOR' && (
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    onClick={handleAccept}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '10px' }}
                >
                    Accept
                </Button>
                <Button
                    onClick={handleReject}
                    variant="contained"
                    color="secondary"
                >
                    Reject
                </Button>
                </Box>
            )}
              </Grid>
              <Grid item xs={3}>
                <Avatar
                  src={profile.profilePicture || defaultProfilePic} 
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
            </Grid>
          </CardContent>
      </Card>
      );
}

export default FriendRequestCard;
