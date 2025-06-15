import "server-only";
import { StreamChat } from "stream-chat";

export const streamChat = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEYS!,
  process.env.STREAM_CHAT_SECRET_KEY!
);
