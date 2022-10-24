import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Create() {
    const [loading, setLoading] = useState(false);

    const [mess, setMess] = useState({
        status: '',
        mess: '',
    });

    const [form, setForm] = useState({
        backdrop_path: '',
        detail_image: '',
        original_language: '',
        original_title: '',
        overview: '',
        release_date: '',
        genre: '',
        popularity: '',
        markIMDB: '',
        videoLink: '',
        trailer: '',
    });

    const [genres, setGenres] = useState([])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let data= {
            backdrop_path: form.backdrop_path,
            detail_image: form.detail_image,
            original_language: form.original_language,
            original_title: form.original_title,
            overview: form.overview,
            release_date: form.release_date,
            genre: form.genre,
            popularity: form.popularity,
            markIMDB: form.markIMDB,
            videoLink: form.videoLink,
            trailer: form.trailer,
        }


        await axios.post('http://localhost:8000/api/movie', data)
            .then(res => {
                console.log(res.data)
                setLoading(false);
                setMess({
                    status: 'success',
                    mess: 'Tạo mới thành công! Về trang chủ...',
                });
                setTimeout(() => navigate('/home'), 1000);
            })
            .catch(err => {
                console.log(err.message);

            });
    }
    const handleBack = () => {
        setMess({
            status: 'navigate',
            mess: 'Đang chuyển hướng về trang chủ...',
        });
        setTimeout(() => navigate('/home'), 1500);
    };
    const getGenre = async () => {
        return axios.get('http://localhost:8000/api/genre')
    }
    const handleChange =  (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        getGenre().then(res => setGenres(res.data.genres)).catch(err => console.log(err.message))
    },[])
    console.log(form)

    return loading ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress />
        </Box>
    ) : (
        <>
            <Grid container item>
                <Grid item xs></Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} sx={{padding: 2, marginTop: 10}}>
                        {mess && mess.status === 'error' ? <Alert severity='error'>{mess.mess}</Alert> : ''}
                        {mess && mess.status === 'success' ? <Alert severity='success'>{mess.mess}</Alert> : ''}
                        {mess && mess.status === 'navigate' ? <Alert severity='info'>{mess.mess}</Alert> : ''}
                        <Box component='form' sx={{
                            '& .MuiTextField-root': {m: 1, width: '25ch'},
                        }} onSubmit={handleSubmit} >
                            <h2 style={{textAlign: 'center'}}>Create a new movie</h2>
                            <div style={{textAlign: 'center'}}>
                                <TextField
                                    label='Title'
                                    onChange={handleChange}
                                    required
                                    type='text'
                                    maxRows={6}
                                    value={form.original_title}
                                    name="original_title"
                                />
                                <TextField
                                    label='Language'
                                    onChange={handleChange}
                                    required
                                    type='text'
                                    maxRows={6}
                                    value={form.original_language}
                                    name="original_language"
                                />
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <FormControl
                                    fullWidth sx={{m: 1}}
                                    item xs={5}
                                >
                                    <InputLabel
                                        htmlFor="outlined-adornment-amount">Overview</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        label="Amount"
                                        name='overview'
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </div>

                            <div style={{textAlign: 'center'}}>
                                <TextField
                                    label='Popularity'
                                    onChange={handleChange}
                                    required
                                    maxRows={4}
                                    type='number'
                                    value={form.popularity}
                                    name= "popularity"
                                />
                                <TextField
                                    label='MarkIMDB'
                                    onChange={handleChange}
                                    required
                                    maxRows={4}
                                    type='number'
                                    value={form.markIMDB}
                                    name = "markIMDB"
                                />

                            </div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                <Select

                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Genre"
                                    name= "genre"
                                    onChange={(e) => {
                                        setForm({...form, [e.target.name]: e.target.value })
                                    }}
                                >
                                    {genres.map(genre =>

                                        <MenuItem key= {genre._id} value={genre._id}>{genre.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>


                            <div style={{textAlign: 'center'}}>

                                <Button variant="contained" component="label" style={{marginLeft: '20px'}}>
                                    Upload Video
                                    <input hidden accept="video/*" multiple type="file"/>
                                </Button>
                                <Button variant="contained" component="label" style={{marginLeft: '20px'}}>
                                    Upload Trailer
                                    <input hidden accept="video/*" multiple type="file"/>
                                </Button>
                            </div>

                            <div style={{textAlign: 'center'}}>
                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <label>BackDrop_Path</label>
                                    <input hidden accept="image/*" type="file"/>
                                    <PhotoCamera/>
                                </IconButton>

                                <IconButton color="primary" aria-label="upload picture" component="label">
                                    <label>Detail Image</label>
                                    <input hidden accept="image/*" type="file"/>
                                    <PhotoCamera/>
                                </IconButton>
                            </div>

                            <div style={{textAlign: 'center'}}>
                                <TextField
                                    id="date"
                                    onChange={handleChange}
                                    label="Date"
                                    type="date"
                                    defaultValue="2022-10-22"
                                    sx={{width: 220}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    name='release_date'
                                />
                            </div>

                            <div style={{textAlign: 'center'}}>
                                <Button variant='contained' color='success'
                                        sx={{marginTop: 5, alignItems: 'center'}} type='submit'
                                >
                                    Submit
                                </Button>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Button
                                    variant='outlined'
                                    color='success'
                                    sx={{marginTop: 1, alignItems: 'center'}}
                                    onClick={handleBack}>
                                    Cancel
                                </Button>
                            </div>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </>
    );
}


