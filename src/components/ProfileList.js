import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function ProfileList() {

    const theme = createTheme();
    const navigate = useNavigate();

    const [profileList, setProfileList] = useState([])

    axios.get(`https://express-t4.onrender.com/api/users`)
        .then(res => {
            setProfileList(res.data)
        })

    const [searchInput, setSearchInput] = useState("");

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const profileListFiltered = profileList.filter((record) => {
        if (searchInput.length > 0) {
            return record.name.toLowerCase().includes(searchInput.toLowerCase());
        }
        else {
            return record;
        }
    })

    const cardOnClickHandler = (element) => {
        navigate('/profileDetails/' + element.profile._id, { state: element.profile })
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper sx={{ mx: { xs: 3, md: 5 }, my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 } }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                        <Typography component="h1" variant="h4" align="center">
                            Pet Medical Records
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="search"
                            autoFocus
                            sx={{ width: { xs: '100%', md: '80%' } }}
                            onChange={handleSearchChange}
                            value={searchInput}
                            label="Search First Name or Last name"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    {profileListFiltered.map(function (profile, index) {
                        return (
                            <Grid item xs={12} sm={4}>
                                <Card>
                                    <CardActionArea onClick={() => cardOnClickHandler({ profile })}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={profile.picture}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {profile.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {profile.address}
                                            </Typography>
                                            <hr />
                                            <Typography variant="body1" color='red'>
                                                {profile.greeting}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </ThemeProvider>
    )
}
