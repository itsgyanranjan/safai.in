import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, MessageSquare, ChevronDown, RefreshCw } from 'lucide-react';
import { aiService } from '../../services/aiService';

export const SafaiAiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am SAFAI AI Assistant. I can help you report complaints, track your issues, find ward cleanliness scores, or check upcoming cleanup drives!",
      options: ["How do I report a complaint?", "What is the cleanliness score of Vijay Nagar?", "Upcoming cleanup drives"]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query || !query.strip ? !query.trim() : !query) return;

    // Append user message
    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.sendChatMessage(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.reply,
          options: response.options || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "I'm having trouble fetching live AI data. Please try again in a moment.",
          options: ["Try again", "Report Issue"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#22C55E] text-white font-bold shadow-2xl shadow-[#22C55E]/40 hover:bg-[#16A34A] hover:scale-105 transition-all group border-2 border-white/20"
        >
          <div className="p-1 rounded-full bg-white/20 group-hover:rotate-12 transition-transform">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm">SAFAI AI Assistant</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#0B0F14] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#111827] p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  SAFAI AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online | Municipal Intelligence
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0B0F14]/90">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#22C55E] text-white rounded-br-none shadow-md shadow-[#22C55E]/20'
                      : 'bg-[#111827] text-[#D1D5DB] border border-white/10 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Quick Option Chips */}
                {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleSend(opt)}
                        className="text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-1 rounded-full hover:bg-[#22C55E]/20 transition-all text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#9CA3AF] bg-[#111827] p-3 rounded-2xl border border-white/10 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#22C55E]" />
                <span>SAFAI AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#111827] border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SAFAI AI Assistant..."
              className="flex-1 bg-[#1A2332] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#22C55E] placeholder-[#9CA3AF]"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#22C55E] text-white hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
