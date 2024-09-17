// const { VertexAI } = require('@google-cloud/vertexai');

// const vertex_ai = new VertexAI({project: 'burnished-mark-434605-s1', location: 'us-central1'});
// const model = 'gemini-1.5-flash-001';

// // Instantiate the models
// const generativeModel = vertex_ai.preview.getGenerativeModel({
//   model: model,
//   generationConfig: {
//     'maxOutputTokens': 8192,
//     'temperature': 1,
//     'topP': 0.95,
//   },
//   safetySettings: [
//     {
//         'category': 'HARM_CATEGORY_HATE_SPEECH',
//         'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
//     },
//     {
//         'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
//         'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
//     },
//     {
//         'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//         'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
//     },
//     {
//         'category': 'HARM_CATEGORY_HARASSMENT',
//         'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
//     }
//   ],
// });


// const chat = generativeModel.startChat({});

// async function sendMessage(message) {
//   const streamResult = await chat.sendMessageStream(message);
//   const response = JSON.stringify((await streamResult.response).candidates[0].content.parts[0]) + '\\n';
//   return response;
// }
// // Define the chat endpoint that uses the AI generation function
// exports.chatFn = async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: 'Prompt is required' });
//   }

//   try {
//     const aiResponse = await sendMessage(prompt);
//     res.json({ aiResponse });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Failed to get response from AI', error });
//   }
// };
const { VertexAI } = require('@google-cloud/vertexai');
const { GoogleAuth } = require('google-auth-library');
const createChatModel = require('../Model/chatMd');
const path = require('path');

// Service account key file path
const keyFilePath = path.join('burnished-mark-434605-s1-92ec081dba93.json');

// Google Auth initialization
const auth = new GoogleAuth({
  keyFilename: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

// Initialize Vertex AI client
const initializeVertexAI = async () => {
  const client = new VertexAI({
    authClient: await auth.getClient(),
    project: 'burnished-mark-434605-s1', // Replace with your GCP project ID
    location: 'us-central1', // Adjust the region if needed
  });
  return client;
};

exports.generateChatCompletion = async (req, res, next) => {
  const { email, message } = req.body;
  const User = createChatModel(req.globalDB);

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not registered or token malfunctioned' });
    }

    // Retrieve chat history from user data
    const chats = user.chats.map(({ role, content }) => `${role}: ${content}`).join('\n');

    // Add the user's new message to the conversation
    const userMessage = `user: ${message}`;
    const fullPrompt = `${chats}\n${userMessage}`;

    user.chats.push({ role: 'user', content: message });

    // Initialize Vertex AI client
    const vertexAI = await initializeVertexAI();

    // Call Vertex AI's generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001', // Specify the Vertex AI model ID
    });

    // Send the chat history (with the new user message) to Vertex AI
    const response = await generativeModel.generateContent(fullPrompt);

    // Extract the AI response
    const aiResponse = {
      content: response.response.candidates[0].content.parts[0].text,
      role: 'model',
    };

    // Add the AI's response to the user's chat history
    user.chats.push(aiResponse);

    // Save the updated user data
    await user.save();

    // Send the updated chat history back to the user
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error('Error generating content:', error);
    return res.status(500).json({ message: 'Failed to get response from AI', error });
  }
};


exports.sendChatsToUser = async (req, res, next) => {
  const User = createChatModel(req.globalDB);
  const { email } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).send('User not registered or token malfunctioned');
    }
    return res.status(200).json({ message: 'OK', chats: user.chats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};

exports.deleteChats = async (req, res, next) => {
  const User = createChatModel(req.globalDB);
  const { email } = req.body;
// console.log(email)
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).send('User not registered or token malfunctioned');
    }

    // Clear chat history
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: 'Chats cleared successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'ERROR', cause: error.message });
  }
};
