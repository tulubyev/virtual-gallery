// src/types/socket-events.ts
import { Server, Socket } from 'socket.io';

// Типы данных для событий навигации
export interface NavigationData {
  userId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  targetRoom?: string;
  targetGallery?: string;
}

// Типы данных для взаимодействия с экспонатами
export interface ArtworkInteractionData {
  userId: string;
  artworkId: string;
  interactionType: 'view' | 'like' | 'comment' | 'share' | 'zoom' | 'rotate';
  timestamp: Date;
  metadata?: Record<string, any>;
}

// Типы данных для обновления позиции пользователя
export interface UserPositionUpdate {
  userId: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  roomId: string;
}

// Типы данных для чата в галерее
export interface GalleryChatMessage {
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  roomId: string;
}

// Определение событий, которые может отправлять сервер
export interface ServerToClientEvents {
  // События для навигации
  userNavigate: (data: NavigationData) => void;
  userPositionUpdate: (data: UserPositionUpdate) => void;
  
  // События для взаимодействия с экспонатами
  artworkInteractionBroadcast: (data: ArtworkInteractionData) => void;
  
  // События для чата
  newChatMessage: (data: GalleryChatMessage) => void;
  
  // События для обновления состояния
  galleryUpdate: (data: any) => void;
  artworkUpdate: (data: any) => void;
  
  // События для IoT обратной связи
  iotFeedback: (data: any) => void;
}

// Определение событий, которые может отправлять клиент
export interface ClientToServerEvents {
  // События для навигации
  navigate: (data: NavigationData) => void;
  
  // События для взаимодействия с экспонатами
  artworkInteraction: (data: ArtworkInteractionData) => void;
  
  // События для чата
  sendChatMessage: (data: GalleryChatMessage) => void;
  
  // События для обновления позиции
  updatePosition: (data: UserPositionUpdate) => void;
  
  // События для IoT обратной связи
  sendIoTData: (data: any) => void;
}

// Определение внутренних событий сервера
export interface InterServerEvents {
  ping: () => void;
}

// Определение данных сокета
export interface SocketData {
  userId: string;
  username: string;
  role: string;
  lastSeen: Date;
}

// Типизированный сокет для использования в приложении
export type TypedSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// Типизированный сервер для использования в приложении
export type TypedServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;