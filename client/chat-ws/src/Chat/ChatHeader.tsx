import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';

import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  online?: boolean;
  status?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({ name, avatar, online, status, onBack, showBackButton }: ChatHeaderProps) {
  return (
    <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-border bg-background">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <Button variant="ghost" size="icon" className="rounded-full md:hidden" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
          )}
        </div>
        <div>
          <h3 className="text-sm">{name}</h3>
          <p className="text-xs text-muted-foreground">{online ? status || 'в сети' : 'не в сети'}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
