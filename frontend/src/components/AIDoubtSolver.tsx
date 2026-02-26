import { useState, useRef, useEffect } from 'react';
import { useAIDoubtSolver } from '../hooks/useAIDoubtSolver';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Trash2, Bot, User, Sparkles } from 'lucide-react';

const suggestedQuestions = [
  "What are Newton's Laws of Motion?",
  "Explain photosynthesis",
  "What is Ohm's Law?",
  "How to solve quadratic equations?",
  "What is DNA replication?",
  "Explain Le Chatelier's Principle",
  "What is the photoelectric effect?",
  "How to prepare for board exams?",
];

function formatMessage(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-foreground mt-2 first:mt-0">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="ml-4 list-disc">{formatInline(line.slice(2))}</li>;
    }
    if (line.trim() === '') {
      return <br key={i} />;
    }
    return <p key={i}>{formatInline(line)}</p>;
  });
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function AIDoubtSolver() {
  const { messages, isTyping, sendQuestion, clearHistory } = useAIDoubtSolver();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendQuestion(input.trim());
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (q: string) => {
    sendQuestion(q);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-bold text-2xl text-foreground">🤖 AI Doubt Solver</h2>
          <Badge variant="outline" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            NCERT Expert
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Clear
        </Button>
      </div>

      {/* Suggested Questions */}
      <div className="flex gap-2 flex-wrap">
        {suggestedQuestions.slice(0, 4).map(q => (
          <button
            key={q}
            onClick={() => handleSuggestion(q)}
            className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-accent/20 transition-all text-muted-foreground hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <Card className="premium-card">
        <CardContent className="p-0">
          <div
            ref={scrollRef}
            className="h-[420px] overflow-y-auto p-4 space-y-4 scrollbar-thin"
          >
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'ai'
                      ? 'bg-primary/20'
                      : 'bg-muted'
                  }`}
                >
                  {msg.sender === 'ai'
                    ? <Bot className="w-4 h-4" style={{ color: 'oklch(0.65 0.17 55)' }} />
                    : <User className="w-4 h-4 text-muted-foreground" />
                  }
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'rounded-tr-sm text-white'
                      : 'rounded-tl-sm bg-muted text-foreground'
                  }`}
                  style={msg.sender === 'user'
                    ? { background: 'linear-gradient(135deg, oklch(0.55 0.17 45), oklch(0.65 0.17 55))' }
                    : {}
                  }
                >
                  {msg.sender === 'ai' && msg.subject && (
                    <Badge className="mb-2 text-xs" style={{ background: 'oklch(0.65 0.17 55)' }}>
                      📚 {msg.subject}
                    </Badge>
                  )}
                  <div className="space-y-0.5">
                    {formatMessage(msg.text)}
                  </div>
                  <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 flex-shrink-0">
                  <Bot className="w-4 h-4" style={{ color: 'oklch(0.65 0.17 55)' }} />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Ask any NCERT question... (e.g. What is Newton's 2nd law?)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              style={{ background: 'oklch(0.65 0.17 55)' }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* More suggestions */}
      <Card className="premium-card bg-muted/30">
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground mb-2 font-medium">More questions to try:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestedQuestions.slice(4).map(q => (
              <button
                key={q}
                onClick={() => handleSuggestion(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-accent/20 transition-all text-muted-foreground hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        🤖 AI-assisted answers based on NCERT curriculum. Always verify with your textbook.
      </p>
    </div>
  );
}
