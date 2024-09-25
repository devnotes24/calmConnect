import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
// import { updateProfile } from '../services/apiProfile'; // Hypothetical API call
import SimpleBackDrop from '../components/SimpleBackDrop';
import toast from 'react-hot-toast';
import { userUpdate } from '../services/apiRegister';

function ProfilePage() {
  const [isUpdateFormOpen , setIsUpdateFormOpen] = useState(false);
  // const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const formRef = useRef(null); // Create a ref for the form
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setIsLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // Fetch and set initial profile data here
    // This is just a placeholder
    // setProfileData(fetchedProfileData);
  }, []);

  // Validation functions
  function isAlphaOnly(str) {
    return /^[A-Za-z ]+$/.test(str);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submit behavior

    // Collect form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Basic validation
    if (!name || !lastName || !email) {
      setError('All fields are required.');
      return;
    }

    if (!isAlphaOnly(name)) {
      setError('First name should not contain numbers.');
      return;
    }

    if (!isAlphaOnly(lastName)) {
      setError('Last name should not contain numbers.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address.');
      return;
    }

    if (password && !isValidPassword(password)) {
      setError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords did not match.');
      return;
    }

    // Log or handle form data
    const data = { name, lastName, email, password };


    try {
      setIsLoading(true);
      const response = await userUpdate(data); // Await the update function
      // console.log(response);
      if (response.data.success) {
        localStorage.removeItem('user');
        localStorage.setItem('user' , JSON.stringify(response.data.user))
        toast.success('Profile updated successfully');
        // navigate('/profile'); // Navigate if update is successful
      } else {
        toast.error('Profile update failed');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Profile update failed');
    } finally {
      setIsLoading(false);
    }

    // Clear the error if form is valid
    setError(null);
    

    // Reset the form after submission
    if (formRef.current) {
      formRef.current.reset();
    }
    setIsUpdateFormOpen(false);
  }

  return (
    <>
      <SimpleBackDrop loading={loading} />
      {!isUpdateFormOpen && <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        p: 3,
        gap : 2
      }}>
        <Typography sx={{color : "#81A263" , fontSize : {xs : "24px" , sm : "28px" , md : "32px" , lg : "38px" , fontWeight : 800}}}>Welcome to Calm Connect </Typography>
        {/* <Typography sx={{fontSize : {xs : "18px" , sm : "20px" , md : "22px" , lg : "26px" , fontWeight : 800}}}> Personal Information </Typography> */}
        <Typography sx={{fontSize : {xs : "14px" , sm : "16px" , md : "18px" , lg : "22px" , fontWeight : 800}}}>  {user.name + " " + user.lastName} </Typography>
        <Typography sx={{fontSize : {xs : "14px" , sm : "16px" , md : "18px" , lg : "22px" , fontWeight : 800}}}>{user.email} </Typography>
        <Button variant='contained' onClick={()=>setIsUpdateFormOpen(true)} sx={{bgcolor : theme.palette.mode==="dark" ? 'primary' : "#81A263" }}>Update Profile</Button>
      </Box>}
      {isUpdateFormOpen && <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          py: 4,
        }}
      >
        <Container maxWidth="xs">
          <Box
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            //   backgroundColor: isDarkMode ? '#333' : '#fff',
            //   boxShadow: isDarkMode ? '0px 4px 8px rgba(0, 0, 0, 0.5)' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src="reshot-icon-chatbot-VX95LGW4QJ.svg" alt="Logo" width="70px" />
            </Box>

            <Typography
              variant="h5"
              component="h1"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: isDarkMode ? '#fff' : '#333',
                textAlign: 'center',
              }}
            >
              Update Your Profile
            </Typography>

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mb: 2, textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}

            <Box
              component="form"
              ref={formRef} // Attach the ref to the form
              onSubmit={handleFormSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
              noValidate
              autoComplete="off"
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  size="small"
                  label="First Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  defaultValue={user.name}
                  sx={{ flex: '3 1 0%' }}
                  inputProps={{ pattern: "[A-Za-z ]*", title: "First Name should not contain numbers" }}
                />
                <TextField
                  size="small"
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  margin="normal"
                  required
                  defaultValue={user.lastName}
                  fullWidth
                  sx={{ flex: '2 1 0%' }}
                  inputProps={{ pattern: "[A-Za-z ]*", title: "Last Name should not contain numbers" }}
                />
              </Box>
              <TextField
                size="small"
                label="Email Address"
                name="email"
                variant="outlined"
                type="email"
                margin="normal"
                defaultValue={user.email}
                required
                fullWidth
              />
              <TextField
                size="small"
                label="New Password (Leave empty to keep current)"
                name="password"
                variant="outlined"
                type="password"
                margin="normal"
                fullWidth
              />
              <TextField
                size="small"
                label="Re-enter Password"
                name="confirmPassword"
                variant="outlined"
                type="password"
                margin="normal"
                fullWidth
              />
              <Box sx={{width : "100%", display : "flex" , gap : 2}}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{bgcolor : theme.palette.mode==="dark" ? 'primary' : "#81A263" , mt: 2, mb: 2 }}
              >
                Update Profile
              </Button>
              <Button
                onClick={() => setIsUpdateFormOpen(false)}
                variant="outlined"
                color="primary"
                sx={{color : theme.palette.mode==="dark" ? 'primary' : "#81A263" , mt: 2, mb: 2 }}
                fullWidth
              >
                Close
              </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>}
    </>
  );
}

export default ProfilePage;
