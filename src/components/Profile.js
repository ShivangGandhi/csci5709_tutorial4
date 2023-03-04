import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';


export default function Profile() {

    const theme = createTheme();
    const location = useLocation();

    const [profile, setProfile] = useState([])

    axios.get(`https://express-t4.onrender.com/api/users/` + location.state._id)
        .then(res => {
            setProfile(res.data)
        })

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        width: '50%',
        height: '50%'
    });

    const tags = location.state.tags

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} sx={{ margin: 'auto' }}>
                        <Img alt="complex" src={profile.picture} sx={{ borderRadius: '50%', border: '5px solid black' }} />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ margin: 'auto' }}>
                        <Paper sx={{ p: { xs: 2 } }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <Typography variant="h4" sx={{ fontSize: { xs: 32, md: 50 } }}>
                                        {profile.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {profile.email}
                                    </Typography>
                                    <Typography variant="body2">
                                        {profile.phone}
                                    </Typography>
                                    <Typography variant="body2">
                                        Age: {profile.age}
                                    </Typography>
                                    <Typography variant="body2">
                                        Eye Color: {profile.eyeColor}
                                    </Typography>
                                    <Typography variant="body2">
                                        Gender: {profile.gender}
                                    </Typography>
                                    <Typography variant="body2">
                                        Favorite Fruit: {profile.favoriteFruit}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                                    {profile.isActive ?
                                        (<Typography variant="body3" sx={{ color: 'green', fontWeight: 'bold' }}>
                                            Active
                                        </Typography>) : (
                                            <Typography variant="body3" sx={{ color: 'red', fontWeight: 'bold' }}>
                                                Inactive
                                            </Typography>
                                        )}
                                    <br />
                                    <Typography variant="body3">
                                        GUID: {profile.guid}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontSize: { xs: 32, md: 50 } }}>
                                        {profile.balance}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid >
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                        <Paper sx={{ p: { xs: 2 } }}>
                            <Typography variant="h6">
                                <strong>Company:</strong> {profile.company}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Address:</strong> {profile.address}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Registered:</strong> {profile.registered}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Latitude:</strong> {profile.latitude}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Longitude:</strong> {profile.longitude}
                            </Typography>
                            <Typography variant="h6">
                                <strong>About:</strong><br /> {profile.about}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                        <Paper sx={{ p: { xs: 2 } }}>
                            <Typography variant="h6">
                                <strong>Tags:</strong>
                            </Typography>
                            <br />
                            <Grid container spacing={3}>
                                {tags.map(function (tag, index) {
                                    return (
                                        <Grid item xs={12} sm={3}>
                                            <Paper sx={{ p: { xs: 2 } }}>
                                                {tag}
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <br />
                            <Typography variant="h6">
                                <strong>Friends:</strong>
                            </Typography>
                            <br />
                            <Grid container spacing={3}>
                                {location.state.friends.map(function (friend, index) {
                                    return (
                                        <Grid item xs={12} sm={12 / location.state.friends.length}>
                                            <Paper sx={{ p: { xs: 2 } }}>
                                                {friend.name}
                                            </Paper>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Paper>
                        <br />
                        <Paper sx={{ p: { xs: 2 } }}>
                            <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
                                {location.state.greeting}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider >
    )
}
