import "server-only";

import { StreamClient } from "@stream-io/node-sdk";

export const streamVideo = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEYS!,
  process.env.STREAN_VIDEO_SECRET_KEY!
);
