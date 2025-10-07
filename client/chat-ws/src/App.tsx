import { useState } from 'react';
import { mockChats, mockMessages } from './mockData';
import { useIsMobile } from './components/ui/use-mobile';
import { ChatHeader, ChatInput, ChatList, ChatMessage } from './chat';
import { ScrollArea } from './components/ui/scroll-area';

type Statuses = 'sent' | 'read';
export type Message = {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status?: Statuses;
  avatar?: string;
  senderName?: string;
};

export default function App() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const isMobile = useIsMobile();

  const activeChatData = mockChats.find((chat) => chat.id === activeChat);

  const handleSelectChat = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setShowChatOnMobile(true);
    }
  };

  const handleBackToList = () => {
    setShowChatOnMobile(false);
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      timestamp: new Date().toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isOwn: true,
      status: 'sent' as const,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="size-full flex bg-background">
      {/* Sidebar with chat list - показываем на десктопе всегда, на мобиле только когда !showChatOnMobile */}
      <div className={`w-full md:w-80 md:flex-shrink-0 ${isMobile && showChatOnMobile ? 'hidden' : 'block'}`}>
        <ChatList chats={mockChats} activeChat={activeChat} onSelectChat={handleSelectChat} />
      </div>

      {/* Main chat area - показываем на десктопе всегда, на мобиле только когда showChatOnMobile */}
      <div className={`flex-1 flex-col ${isMobile && !showChatOnMobile ? 'hidden' : 'flex'}`}>
        {activeChatData ? (
          <>
            <ChatHeader
              name={activeChatData.name}
              avatar={activeChatData.avatar}
              online={activeChatData.online}
              showBackButton={isMobile}
              onBack={handleBackToList}
            />

            <ScrollArea className="flex-1 p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                {messages.map((message) => (
                  <ChatMessage key={message.id} {...message} />
                ))}
              </div>
            </ScrollArea>

            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <h3>Выберите чат</h3>
              <p className="text-sm mt-2">Выберите чат из списка слева, чтобы начать общение</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
