import { useState } from 'react';

import { Smile, Paperclip, Mic, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-3 md:p-4 border-t border-border bg-background">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex gap-1 md:gap-2">
          <Button type="button" variant="ghost" size="icon" className="rounded-full flex-shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="rounded-full flex-shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
        </div>

        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Написать сообщение..."
          className="min-h-[44px] max-h-32 resize-none bg-input-background border-transparent"
          rows={1}
        />

        {message.trim() ? (
          <Button type="submit" size="icon" className="rounded-full flex-shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="icon" className="rounded-full flex-shrink-0">
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </form>
    </div>
  );
}
