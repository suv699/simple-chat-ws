import { Avatar, AvatarFallback, AvatarImage } from './../components/ui/avatar';

interface MessageProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
  avatar?: string;
  senderName?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export function ChatMessage({ content, timestamp, isOwn = false, avatar, senderName, status }: MessageProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={avatar} alt={senderName} />
          <AvatarFallback>{senderName?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        </div>
        <div className="flex items-center gap-1 mt-1 px-2">
          <span className="text-xs text-muted-foreground">{timestamp}</span>
          {isOwn && status && (
            <span className="text-xs text-muted-foreground">
              {status === 'read' && '✓✓'}
              {status === 'delivered' && '✓✓'}
              {status === 'sent' && '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
