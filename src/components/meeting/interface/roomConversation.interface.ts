interface RoomContent {
  user: string;
  content: string;
  timestamp: Date;
}

interface RoomData {
  [contentId: string]: RoomContent[];
}

export interface RoomConversations {
  [room: string]: RoomData;
}
