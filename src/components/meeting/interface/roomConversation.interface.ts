interface RoomContent {
  user: string;
  script: string;
  timestamp: Date;
}

interface RoomData {
  [_id: string]: RoomContent[];
}

export interface RoomConversations {
  [room: string]: RoomData;
}
