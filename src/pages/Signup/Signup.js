import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const [mess, setMess] = useState({
        status: '',
        mess: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const postForm = async () => {
        let headersList = {
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "email": `${form.email}`,
            "password": `${form.password}`
        });

        let reqOptions = {
            url: "http://localhost:8000/api/user",
            method: "POST",
            headers: headersList,
            data: bodyContent,
        }

        return await axios.request(reqOptions);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        postForm()
            .then(res => {

                setMess({
                    status: 'success',
                    mess: 'Đăng nhập thành công! Đang chuyển hướng đến log in ...',
                });
                setLoading(false);
                setTimeout(() => navigate('/'), 1000);
            })
            .catch(err => {
                setLoading(false);
                setMess({
                    status: 'error',
                    mess: err.message,
                });
            });
    };

    return loading ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress/>
        </Box>
    ) : (

            <ThemeProvider theme={theme}>
                <Grid bgcolor='black'>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" color='white' >
                                Sign up
                            </Typography>
                            <Paper elevation={3} sx={{padding: 2, marginTop: 10}}>
                                {mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
                                {mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="new-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                                label="I want to receive inspiration, marketing promotions and updates via email."
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                    >
                                        Sign Up
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                                Already have an account? Sign in
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                        <Copyright sx={{mt: 5}}/>
                    </Container>
                </Grid>
            </ThemeProvider>

    );
}