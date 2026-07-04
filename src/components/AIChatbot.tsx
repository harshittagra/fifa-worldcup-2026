'use client';

import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: inputValue }] });
    setInputValue('');
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-accent-magenta to-accent-gold shadow-2xl glow-magenta text-white ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] flex flex-col glass-strong rounded-2xl overflow-hidden border-gradient shadow-2xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-bg-secondary/80 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-accent-gold/20 rounded-full">
                  <Bot className="w-5 h-5 text-accent-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">FIFA AI Expert</h3>
                  <p className="text-[10px] text-accent-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-text-secondary text-sm mt-10">
                  <Bot className="w-10 h-10 mx-auto mb-3 opacity-50" />
                  <p>Ask me anything about the World Cup, team histories, or match predictions!</p>
                </div>
              )}
              
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                      m.role === 'user' 
                        ? 'bg-accent-cyan text-bg-primary font-medium' 
                        : 'bg-white/10 text-white border border-white/5 whitespace-pre-wrap'
                    }`}
                  >
                    {m.parts.map(p => p.type === 'text' ? p.text : '').join('')}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl p-3 text-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-bg-secondary/80 border-t border-white/10">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about a team or match..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-gold transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 bg-accent-gold text-bg-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
