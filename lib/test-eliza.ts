import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function testElizaAPI() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_DEFAULT_MODEL || 'gpt-4',
        messages: [
          {
            role: 'user',
            content: 'Analyze this code for security vulnerabilities: console.log("Hello World")'
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.ELIZA_OS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('ELIZA API Response:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error testing ELIZA API:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

testElizaAPI(); 