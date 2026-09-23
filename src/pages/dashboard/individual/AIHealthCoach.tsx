import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Lightbulb, RefreshCw, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { aiService, type AIMessage } from '@/services/aiService';
import { generateId } from '@/utils/helpers';
import { toast } from 'sonner';

const AI_CHAT_STORAGE_KEY = 'lifestylebio_member_ai_chat';

const AIHealthCoach: React.FC = () => {
  const { user } = useAuth();
  const defaultWelcome: AIMessage = {
    id: 'welcome',
    role: 'assistant',
    content: `Hello ${user?.firstName || 'there'}! I'm your AI Health Coach. I'm here to provide personalized guidance based on your health data. Ask me anything about nutrition, fitness, sleep, mental wellness, or preventive health. How can I help you today?`,
    timestamp: new Date().toISOString(),
  };

  const [messages, setMessages] = useState<AIMessage[]>(() => {
    try {
      const saved = localStorage.getItem(AI_CHAT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [defaultWelcome];
    } catch {
      return [defaultWelcome];
    }
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prompts = aiService.getQuickPrompts();

  useEffect(() => {
    localStorage.setItem(AI_CHAT_STORAGE_KEY, JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: AIMessage = { id: generateId(), role: 'user', content: text.trim(), timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const response = await aiService.generateResponse(text);
    const aiMsg: AIMessage = { id: generateId(), role: 'assistant', content: response, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    toast.info('Message deleted.');
  };

  const handleNewChat = () => {
    const resetMsg: AIMessage = {
      id: generateId(),
      role: 'assistant',
      content: 'Starting a new session. How can I help you today?',
      timestamp: new Date().toISOString(),
    };
    setMessages([resetMsg]);
    toast.success('Chat history cleared.');
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-brand rounded-xl flex items-center justify-center">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">AI Health Coach</h2>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online · Personalized to your profile
            </div>
          </div>
        </div>
        <button onClick={handleNewChat} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <RefreshCw size={14} /> New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-y-auto p-5 space-y-4 scrollbar-hide">
        <AnimatePresence>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 group items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative ${
                msg.role === 'user'
                  ? 'bg-emerald-500 text-white rounded-tr-sm'
                  : 'bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100'
              }`}>
                {msg.content}
              </div>
              {messages.length > 1 && (
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-opacity mt-1"
                  title="Delete message"
                >
                  <Trash2 size={13} />
                </button>
              )}
              {msg.role === 'user' && (
                <div className="w-8 h-8 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={16} className="text-sky-600" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100">
                <div className="flex gap-1">
                  {[0,1,2].map(i => <motion.div key={i} className="w-2 h-2 bg-gray-400 rounded-full" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} />)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
        {prompts.slice(0, 4).map(prompt => (
          <button key={prompt} onClick={() => sendMessage(prompt)} className="flex items-center gap-1.5 flex-shrink-0 text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
            <Lightbulb size={11} /> {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask your AI Health Coach anything..."
          className="flex-1 input-field"
          disabled={isTyping}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIHealthCoach;
