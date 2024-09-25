import { Container, Typography, Box, Paper, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useRef, useEffect, useCallback } from 'react';
import { askQuestion, deleteChat, getChat } from '../services/chatAPi';
import CustomButton from './CustomButton';
import toast from 'react-hot-toast';
import { useGlobalState } from '../context/useGlobalState';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        padding: theme.spacing(2),
    },
    messagesContainer: {
        flex: 1,
        overflowY: 'auto',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: theme.spacing(1),
    },
    question: {
        alignSelf: 'flex-end',
        color: theme.palette.mode === 'dark' ? theme.palette.info.light : theme.palette.info.dark,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        maxWidth: '60%',
        wordBreak: 'break-word',
        margin: theme.spacing(1, 0),
    },
    answer: {
        alignSelf: 'flex-start',
        color: theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        maxWidth: '60%',
        wordBreak: 'break-word',
        margin: theme.spacing(1, 0),
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

const Chat = () => {
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const {isAuthenticated} = useGlobalState()

    const user = JSON.parse(localStorage.getItem('user'));
    const [messages, setMessages] = useState([]);
    const classes = useStyles();
    const messagesContainerRef = useRef(null);
    
    const userRef = useRef(user);
    useEffect(function(){
        async function getUserChat() {
            if(userRef.current){
            const response = await getChat(userRef.current.email)
            setMessages(response.data.chats)
            console.log("tjgagda" , response.data.chats);
            }
        }
        getUserChat();
    },[])

    const [inputValue, setInputValue] = useState('');
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSend = async () => {
        if(!inputValue) return
        setLoading(true);
        try {
            const response = await askQuestion(user.email, inputValue);
            if (response.data.chats) {
                setMessages(response.data.chats);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setInputValue('');
        }
    };
    const handleDelete = async () => {
        if(messages.length===0) return
        setDeleting(true);
        try {
            const response = await deleteChat(user.email);
            console.log(response);
            if (response.status===200) {
                setMessages([])
                toast.success("Chat cleared");
            }else{
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");

        } finally {
            setDeleting(false);
        }
    };

    const scrollToBottom = useCallback(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const formatResponse = (response) => {
        const parts = response.split('\n').filter(part => part.trim() !== '');
        return parts.map((part, index) => {
            if (part.startsWith('*')) {
                return (
                    <Typography key={index} variant="body1" style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                        {part.replace('*', '')} {/* Remove the bullet point for display */}
                    </Typography>
                );
            }
            return (
                <Typography key={index} variant="body1" paragraph>
                    {part}
                </Typography>
            );
        });
    };

    return (
        <Container className={classes.container}>
            
            <Paper className={classes.messagesContainer} ref={messagesContainerRef}>
                {!isAuthenticated && <Typography sx={{textAlign : "center"}}>Login to the Account</Typography>}
                {messages?.map((msg, index) => (
                    <Box key={index} className={classes.message}>
                        {msg.role === "user" && (
                            <Typography className={classes.question}>{msg.content}</Typography>
                        )}
                        {msg.role === "model" && (
                            <Box className={classes.answer}>
                                {formatResponse(msg.content)}
                            </Box>
                        )}
                    </Box>
                ))}
            </Paper>
            <Box className={classes.inputContainer}>
                <TextField
                    variant="outlined"
                    placeholder="Type your question here"
                    value={inputValue}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                    disabled={loading || !isAuthenticated}
                    multiline
                    minRows={1}
                    maxRows={4}
                />
                <CustomButton label="Send" purpose="send" variant="contained" color="success" onClick={handleSend} type='submit' isLoading={loading} disabled={!inputValue} />
            </Box>
            <Box sx={{display : "flex" , justifyContent : "center"}}>
            <CustomButton label="Delete Chat" purpose="delete" variant="contained" color="success" onClick={handleDelete} type='submit' isLoading={deleting} disabled={messages.length===0}/>

            </Box>
        </Container>
    );
};

export default Chat;




// import { Container, Typography, Box, Paper, Button, TextField } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { useState, useRef, useEffect } from 'react';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         height: '80vh',
//         padding: theme.spacing(2),
//     },
//     messagesContainer: {
//         flex: 1,
//         overflowY: 'auto',
//         marginBottom: theme.spacing(2),
//         padding: theme.spacing(1),
//     },
//     message: {
//         display: 'flex',
//         flexDirection: 'column',
//         marginBottom: theme.spacing(1),
//     },
//     question: {
//         alignSelf: 'flex-end',
//         backgroundColor: theme.palette.info.light,
//         padding: theme.spacing(1),
//         borderRadius: theme.shape.borderRadius,
//         maxWidth: '60%',
//         wordBreak: 'break-word',
//         margin: theme.spacing(1, 0),
//     },
//     answer: {
//         alignSelf: 'flex-start',
//         backgroundColor: theme.palette.success.light,
//         padding: theme.spacing(1),
//         borderRadius: theme.shape.borderRadius,
//         maxWidth: '60%',
//         wordBreak: 'break-word',
//         margin: theme.spacing(1, 0),
//     },
//     inputContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: theme.spacing(1),
//         padding: theme.spacing(1),
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// const Chat = () => {
//     const classes = useStyles();
//     const [inputValue, setInputValue] = useState('');
//     const messagesEndRef = useRef(null);

//     // Static data
//     const messages = [
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//     ];

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleSend = () => {
//         // Add functionality to handle sending the message
//         console.log('Message sent:', inputValue);
//         setInputValue('');
//     };

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages]); // Ensure it scrolls to the bottom when messages change

//     return (
//         <Container className={classes.container}>
//             <Paper className={classes.messagesContainer}>
//                 {messages.map((msg, index) => (
//                     <Box key={index} className={classes.message}>
//                         {msg.question && (
//                             <Typography className={classes.question}>{msg.question}</Typography>
//                         )}
//                         {msg.answer && (
//                             <Typography className={classes.answer}>{msg.answer}</Typography>
//                         )}
//                     </Box>
//                 ))}
//                 <div ref={messagesEndRef} /> {/* This div helps in scrolling to the bottom */}
//             </Paper>
//             <Box className={classes.inputContainer}>
//                 <TextField
//                     variant="outlined"
//                     placeholder="Type your question here"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     size="small"
//                     fullWidth
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSend}
//                 >
//                     Send
//                 </Button>
//             </Box>
//         </Container>
//     );
// };

// export default Chat;
  




// import { Container, Typography, Box, Paper, Button, TextField } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import { useState } from 'react';

// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         height: '80vh',
//         padding: theme.spacing(2),
//     },
//     messagesContainer: {
//         flex: 1,
//         overflowY: 'auto',
//         marginBottom: theme.spacing(2),
//         padding: theme.spacing(1),
//     },
//     message: {
//         display: 'flex',
//         flexDirection: 'column',
//         marginBottom: theme.spacing(1),
//     },
//     question: {
//         alignSelf: 'flex-end',
//         backgroundColor: theme.palette.info.light,
//         padding: theme.spacing(1),
//         borderRadius: theme.shape.borderRadius,
//         maxWidth: '60%',
//         wordBreak: 'break-word',
//         margin: theme.spacing(1, 0),
//     },
//     answer: {
//         alignSelf: 'flex-start',
//         backgroundColor: theme.palette.success.light,
//         padding: theme.spacing(1),
//         borderRadius: theme.shape.borderRadius,
//         maxWidth: '60%',
//         wordBreak: 'break-word',
//         margin: theme.spacing(1, 0),
//     },
//     inputContainer: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: theme.spacing(1),
//         padding: theme.spacing(1),
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

// const Chat = () => {
//     const classes = useStyles();
    
//     // Static data
//     const messages = [
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//         { question: "What is the capital of France?", answer: "The capital of France is Paris." },
//         { question: "How tall is Mount Everest?", answer: "Mount Everest is approximately 8,848 meters tall." },
//         { question: "Who wrote 'To Kill a Mockingbird'?", answer: "'To Kill a Mockingbird' was written by Harper Lee." },
//     ];


//     const [inputValue, setInputValue] = useState('');

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleSend = () => {
//         // Add functionality to handle sending the message
//         console.log('Message sent:', inputValue);
//         setInputValue('');
//     };
//     return (
//         <Container className={classes.container}>
//             <Paper className={classes.messagesContainer} sx={{overflowY : 'scroll'}}>
//                 {messages.map((msg, index) => (
//                     <Box key={index} className={classes.message}>
//                         {msg.question && (
//                             <Typography className={classes.question}>{msg.question}</Typography>
//                         )}
//                         {msg.answer && (
//                             <Typography className={classes.answer}>{msg.answer}</Typography>
//                         )}
//                     </Box>
//                 ))}
//             </Paper>
//             <Box className={classes.inputContainer}>
//                 <TextField
//                     variant="outlined"
//                     placeholder="Type your question here"
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     className={classes.inputField}
//                     size="small"
//                     fullWidth
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSend}
//                     className={classes.sendButton}
//                 >
//                     Send
//                 </Button>
//             </Box>
//         </Container>
//     );
// };

// export default Chat;
