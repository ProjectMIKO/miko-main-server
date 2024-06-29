interface RoomContent {
  user: string;
  script: string;
  timestamp: Date;
}

interface RoomData {
  [contentId: string]: RoomContent[];
}

export interface RoomConversations {
  [room: string]: RoomData;
}
