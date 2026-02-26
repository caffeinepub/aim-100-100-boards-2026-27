import { useState, useCallback } from 'react';
import { faqData } from '../data/faqDatabase';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: number;
  subject?: string;
}

export function useAIDoubtSolver() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem('aim100-chat');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return [{
      id: '0',
      sender: 'ai',
      text: '👋 Hello! I\'m your AI Study Assistant for Boards 2026-27. Ask me anything about Physics, Chemistry, Maths, Biology, English, or any NCERT topic!',
      timestamp: Date.now(),
    }];
  });

  const [isTyping, setIsTyping] = useState(false);

  const findAnswer = (question: string): { answer: string; subject?: string } => {
    const q = question.toLowerCase();
    let bestMatch = { score: 0, answer: '', subject: '' };

    for (const entry of faqData) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (q.includes(keyword.toLowerCase())) score++;
      }
      if (score > bestMatch.score) {
        bestMatch = { score, answer: entry.answer, subject: entry.subject };
      }
    }

    if (bestMatch.score > 0) {
      return { answer: bestMatch.answer, subject: bestMatch.subject };
    }

    return {
      answer: `I don't have a specific answer for that question yet. Here are some tips:\n\n📖 **Try rephrasing** your question with specific terms like "Newton's law", "photosynthesis", "quadratic formula", etc.\n\n🔍 **Subject areas I cover:** Physics, Chemistry, Maths, Biology, English, History, Geography, Economics, Political Science.\n\n💡 **Pro tip:** Be specific! Instead of "explain chemistry", try "what is ionic bonding?" or "explain Le Chatelier's principle".`,
    };
  };

  const sendQuestion = useCallback((question: string) => {
    if (!question.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: question,
      timestamp: Date.now(),
    };

    setMessages(prev => {
      const updated = [...prev, userMsg];
      localStorage.setItem('aim100-chat', JSON.stringify(updated));
      return updated;
    });

    setIsTyping(true);

    setTimeout(() => {
      const { answer, subject } = findAnswer(question);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: answer,
        timestamp: Date.now(),
        subject,
      };
      setMessages(prev => {
        const updated = [...prev, aiMsg];
        localStorage.setItem('aim100-chat', JSON.stringify(updated));
        return updated;
      });
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  }, []);

  const clearHistory = useCallback(() => {
    const initial: Message[] = [{
      id: '0',
      sender: 'ai',
      text: '👋 Chat cleared! Ask me anything about your NCERT subjects.',
      timestamp: Date.now(),
    }];
    localStorage.setItem('aim100-chat', JSON.stringify(initial));
    setMessages(initial);
  }, []);

  return { messages, isTyping, sendQuestion, clearHistory };
}
