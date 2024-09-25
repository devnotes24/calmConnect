import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

// Styles for the component
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    
    maxWidth: 345,
    margin: 'auto',
    overflow: 'hidden',
    borderRadius : "40px",
     // Ensure this line is not overridden
    
  },
  media: {
    borderRadius : "40px",
    height: 200,
    '&:hover': {
      transform: 'scale(1.1)', // Ensure this line is not overridden
    },
    transition: 'transform 0.7s ease out'
  },
  cardContent: {
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    fontStyle: 'italic',
  },
}));


const developers = [
  {
    name: 'Gnaneshwari S',
    // role: 'MongoDB',
    description: 'Handles database design, management, and ensures efficient data storage and retrieval.',
    image: 'https://imgs.search.brave.com/5fXtQwuEwt7V7wnlj5vjKOx_S5k-A_6xW92yh3VfJSs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL2xvZ28tbW9u/Z29kYi1wbmctaHVu/ZHJlZHMtb2YtcG9w/dWxhci1tb25nb2Ri/LWFydGljbGVzLTQw/MC5wbmc', // Replace with actual image URL
  },
  {
    name: 'Anushree N',
    // role: 'Node.js and Express',
    description: 'Develops and maintains server-side logic and APIs, ensuring smooth backend operations.',
    image: 'https://imgs.search.brave.com/G-J8S0WWh4YkZBvTeqObEeNIXUoGmmimp0pgDEy--8k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zZWVr/bG9nby5jb20vaW1h/Z2VzL04vbm9kZS1u/b2RlLWpzLWxvZ28t/ODFBNENDMTZEMi1z/ZWVrbG9nby5jb20u/cG5n', // Replace with actual image URL
  },
  {
    name: 'Janardhan S',
    // role: 'React',
    description: 'Responsible for developing the user interface and ensuring a smooth user experience.',
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWEO9Kft29bTZKzP8EyXSaVIVmJnqpMcyGmg&s"
   },
];

const DevelopersInfo = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography
        variant="h4"
        sx={{ fontSize: { sx: '24px', sm: '32px', mb: '80px', lg: '48px' } , color : '#81A263', fontWeight : 900}}
        gutterBottom
        align="center"
      >
        Developers
      </Typography>
      <Grid container spacing={4} sx={{ mt: 5 }}>
        {developers.map((dev, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}  sx={{borderRadius : "40px"}}>
              <CardMedia
                component="img"
                className={classes.media}
                image={dev.image}
                alt={dev.name}
                sx={{p: 2}}
                
              />
              <CardContent className={classes.cardContent}>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, fontSize: { sx: '16px', sm: '18px', md: '20px', lg: '24px'} , color : green[700], fontWeight : 700}}
                  className={classes.name}
                >
                  {dev.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, fontSize: { sx: '16px', sm: '18px', md: '20px', lg: '24px' } }}
                  color="textSecondary"
                >
                  {dev.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 2, fontSize: { sx: '13px', sm: '16px', md: '18px' } }}
                  className={classes.description}
                >
                  {dev.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DevelopersInfo;