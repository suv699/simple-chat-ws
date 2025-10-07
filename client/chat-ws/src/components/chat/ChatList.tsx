import { Search } from 'lucide-react';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Input } from '../components/ui/input';

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  online?: boolean;
}

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, activeChat, onSelectChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-background md:border-r border-border">
      {/* Header */}
      <div className="p-4 md:border-b border-border">
        <h2 className="mb-4">Сообщения</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Поиск чатов..." className="pl-10 bg-input-background border-transparent" />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full p-3 rounded-lg flex items-start gap-3 hover:bg-accent transition-colors ${
                activeChat === chat.id ? 'bg-accent' : ''
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  {chat.unread && chat.unread > 0 && (
                    <span className="ml-2 flex-shrink-0 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
