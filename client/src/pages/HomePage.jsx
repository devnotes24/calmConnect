// src/HomePage.js
import { Typography, Box, Grid, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '2rem',
    },
    image: {
        width: '100%',
        maxWidth: '600px',
        borderRadius: '8px',
        marginBottom: '2rem',
        [theme.breakpoints.up('md')]: {
            marginBottom: 0,
        },
    },
    description: {
        maxWidth: '800px',
        margin: '0 auto',
        fontSize: '1.1rem',
    },
    gridContainer: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'center',
        },
    },
    gridItem: {
        [theme.breakpoints.up('md')]: {
            padding: '1rem',
        },
    },
}));

function HomePage() {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
      <>
        <Grid container className={classes.gridContainer} sx={{marginBottom : 2 , minHeight : "70vh" , mb : 5,animation: `${fadeIn} 1.5s ease-in-out`}}>
            <Grid item xs={12} md={6} className={classes.gridItem} >
                <img 
                    src="mind-Photoroom.png" 
                    alt="Calm Connect" 
                    className={classes.image} 
                />
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem} sx={{ display : "flex" , flexDirection : "column" ,alignItems : "center"}}>
                <Box sx={{p : 3}}>
                    <Typography variant="h2" component="h1" gutterBottom sx={{fontSize : {xs : "32px" , sm : "38px" , md : "42px" , lg : "48px"} , textAlign : "center" , color : "#81A263" , fontWeight : 800, mb : 4}}>
                        Welcome to Calm Connect
                    </Typography>
                    <Typography variant="h6" className={classes.description} sx={{fontSize : {xs : "22px" , sm : "26px" , md : "28px", lg : "32px"} , textAlign : "center"}}>
                        Your personal assistant for mental wellness. Connect with our AI chatbot to find support, learn coping strategies, and get the help you need in a safe and secure environment.
                    </Typography>
                </Box>
                <Box sx={{display : "flex" , gap : 4 , mt : 2 }}>
                  <Button variant='contained' color='success' size='large' onClick={() => navigate('/chat')} >Chat Now  <img width={"30px"} height={"30px"} src="reshot-icon-chatbot-VX95LGW4QJ.svg"/></Button>
                  <Button variant='outlined' color='success' size='large' onClick={() => navigate('/signIn')}>Sign In</Button>
                </Box>
            </Grid>
        </Grid>
        <Typography sx={{mb : 4,animation: `${fadeIn} 1.5s ease-in-out`,textAlign : "center",fontWeight : 900, color : "#81A263" , fontSize : { xs : "20px" , sm : "22px" , md: "24px" , lg : "28px" , xl : "32px"}}}>Your mind is the center of your wellbeing</Typography>
        </>
    );
}

export default HomePage;
