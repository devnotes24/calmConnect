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


const { GoogleAuth } = require('google-auth-library');
const { VertexAI } = require('@google-cloud/vertexai');
const path = require('path');

// Path to your service account key file
const keyFilePath = path.join(__dirname, 'burnished-mark-434605-s1-92ec081dba93.json');

// Initialize Google Auth Library with the service account key
const auth = new GoogleAuth({
  keyFilename: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Required scopes
});

// Function to generate text from a prompt using Vertex AI
async function generateFromTextInput(prompt) {
  const vertexAI = new VertexAI({
    authClient: await auth.getClient(),
    project: 'burnished-mark-434605-s1', // Replace with your project ID
    location: 'us-central1',
  });

  const generativeModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.5-flash-001',
  });

  try {
    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = await resp.response;
    return contentResponse;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}

// Define the chat endpoint that uses the AI generation function
exports.chatFn = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const aiResponse = await generateFromTextInput(prompt);
    res.json({ aiResponse });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to get response from AI', error });
  }
};
