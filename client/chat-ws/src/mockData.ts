import type { Message } from './App';

// Mock данные для демонстрации
export const mockChats = [
  {
    id: '1',
    name: 'Анна Смирнова',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lastMessage: 'Отлично, встретимся завтра!',
    timestamp: '14:32',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Дмитрий Петров',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lastMessage: 'Проект почти готов',
    timestamp: '12:15',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Елена Иванова',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lastMessage: 'Спасибо за помощь!',
    timestamp: 'Вчера',
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Команда разработки',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    lastMessage: 'Встреча перенесена на 15:00',
    timestamp: 'Вчера',
    unread: 5,
    online: true,
  },
  {
    id: '5',
    name: 'Максим Козлов',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    lastMessage: 'Можешь посмотреть код?',
    timestamp: 'Пн',
    unread: 0,
    online: false,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Привет! Как дела с проектом?',
    timestamp: '14:20',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    senderName: 'Анна Смирнова',
  },
  {
    id: '2',
    content: 'Привет! Все хорошо, почти закончил основной функционал',
    timestamp: '14:22',
    isOwn: true,
    status: 'read' as const,
  },
  {
    id: '3',
    content: 'Отлично! А когда планируешь закончить?',
    timestamp: '14:25',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    senderName: 'Анна Смирнова',
  },
  {
    id: '4',
    content: 'Думаю к завтрашнему дню все будет готово. Хочешь посмотреть текущую версию?',
    timestamp: '14:27',
    isOwn: true,
    status: 'read' as const,
  },
  {
    id: '5',
    content: 'Да, конечно! Давай завтра встретимся и обсудим',
    timestamp: '14:30',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    senderName: 'Анна Смирнова',
  },
  {
    id: '6',
    content: 'Отлично, встретимся завтра!',
    timestamp: '14:32',
    isOwn: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    senderName: 'Анна Смирнова',
  },
];
