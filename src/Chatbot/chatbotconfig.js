// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'SKILLS HUB Chatbot'
const user = JSON.parse(localStorage.getItem('user'))?.username || 'User'

const config = {
  initialMessages: [createChatBotMessage(`Hi ${user}, I'm SKILLS HUB Chatbot. How can I help you?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#1976d2',
    },
    chatButton: {
      backgroundColor: '#1976d2',
    },
  },
};

export default config;