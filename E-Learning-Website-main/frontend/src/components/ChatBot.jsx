/**
 * ChatBot Component
 * Floating AI chatbot using Google Gemini API
 * Helps students with course-related doubts
 */

import { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini, formatMessagesForAPI } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! I\'m your learning assistant. Ask me anything about your courses, study tips, or learning strategies!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasGeminiKey = !!import.meta.env.VITE_GEMINI_API_KEY;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Prevent send if not configured
    if (!hasGeminiKey) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'bot',
          text:
            'Chatbot setup required: add VITE_GEMINI_API_KEY to .env.local, then restart the dev server.',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get response from Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const historyForAPI = formatMessagesForAPI(messages);
      const response = await sendMessageToGemini(inputValue, historyForAPI);

      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get bot response:', error);

      const errorMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: error.message.includes('API key')
          ? 'Sorry, the chatbot is not configured. Please add your Gemini API key.'
          : 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col h-96 md:h-[500px]">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Learning Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {/* Setup notice when API key is missing */}
          {!hasGeminiKey && (
            <div className="bg-red-50 text-red-700 px-4 py-3 text-sm border-b border-red-200">
              Chatbot not configured. Add your Gemini API key in .env.local as VITE_GEMINI_API_KEY, then restart the dev server.
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
                  <Spinner size="sm" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSendMessage}
            className="border-t p-4 flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={hasGeminiKey ? 'Type your question...' : 'Add Gemini API key to enable chatbot'}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading || !hasGeminiKey}
            />
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={isLoading || !inputValue.trim() || !hasGeminiKey}
            >
              Send
            </Button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors z-40 text-2xl"
        title="Ask AI Assistant"
      >
        💬
      </button>
    </>
  );
}
