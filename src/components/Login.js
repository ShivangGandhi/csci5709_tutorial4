import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import workImg from "../assets/work.jpg";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const theme = createTheme();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const loginData = {
            username: data.username,
            password: data.password
        }

        const response = await axios.post(`https://express-t4.onrender.com/api/login`, loginData)

        if (response.data.includes('Login success') === true) {
            navigate('/profileList')
        }
    }

    const styles = {
        textfield: {
            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                    borderColor: "purple"
                }
            },
            "& .MuiFormLabel-root.Mui-focused": {
                color: '#FF725E'
            }
        }
    }

    const Img = styled("img")({
        margin: "auto",
        display: "block",
        width: "100%",
        height: "100%",
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container alignContent={'center'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100vw',
                    height: '100vh',
                }}>
                <Paper sx={{ my: { xs: 3, md: 6 }, mx: { xs: 3 }, p: { xs: 2, md: 3 }, width: { md: '70%' }, height: { md: '80%' }, boxShadow: 0 }}>
                    <Grid container spacing={1} sx={{ height: '100%' }}>
                        <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
                            <Img alt="complex" src={workImg} />
                        </Grid>
                        <Grid item xs={12} sm={6}
                            sx={{
                                margin: "auto",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}>
                            <Typography component="h1" variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'purple' }}>
                                Login
                            </Typography>
                            <br />
                            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: { md: '70%' } }}>
                                <React.Fragment>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="username"
                                                autoComplete="username"
                                                id="username"
                                                sx={styles.textfield}
                                                fullWidth
                                                label="Username"
                                                {...register("username", {
                                                    required: "Please enter your username",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                        message: "Invalid Username"
                                                    }
                                                })}
                                                error={Boolean(errors.username)}
                                                helperText={errors.username?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                                sx={styles.textfield}
                                                fullWidth
                                                label="Password"
                                                {...register("password", {
                                                    required: "Please enter a password",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must have at least 8 characters"
                                                    }
                                                })}
                                                error={Boolean(errors.password)}
                                                helperText={errors.password?.message}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="large"
                                        color="secondary"
                                        variant="outlined"
                                        sx={{ mt: 3, mb: 2, color: '#FF725E', ':hover': { bgcolor: 'purple', color: 'white' } }}
                                    >
                                        Login
                                    </Button>
                                </React.Fragment>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider >
    )
}
