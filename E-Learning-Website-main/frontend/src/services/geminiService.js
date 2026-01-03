/**
 * Gemini API Service
 * Handles integration with Google's Gemini API for chatbot
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Send message to Gemini API
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} Gemini's response
 */
export async function sendMessageToGemini(message, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      'Gemini API key not configured. Please set VITE_GEMINI_API_KEY in .env'
    );
  }

  try {
    // Build conversation context
    const systemPrompt =
      'You are a helpful learning assistant for an online learning platform. Help students with course-related questions, study tips, and learning strategies. Keep responses concise and helpful.';

    const contents = [
      ...(Array.isArray(conversationHistory) ? conversationHistory : []),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { role: 'user', parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: 0.7, topP: 0.95, topK: 40, maxOutputTokens: 512 },
      }),
    });

    if (!response.ok) {
      let errorMsg = 'Failed to get response from Gemini';
      try {
        const errJson = await response.json();
        errorMsg = errJson.error?.message || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ??
      'I apologize, I could not generate a response.';

    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * Format conversation for API
 * @param {Array} messages - Chat messages
 * @returns {Array} Formatted messages
 */
export function formatMessagesForAPI(messages) {
  return messages.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  }));
}
