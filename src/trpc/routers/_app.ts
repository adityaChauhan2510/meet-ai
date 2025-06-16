import { createTRPCRouter } from "../init";
import { meetingsRouter } from "@/modules/meetings/server/procedures";
import { agentsRouter } from "@/modules/agents/server/procedures";
import { PremiumRouter } from "@/modules/premium/server/procedures";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingsRouter,
  premium: PremiumRouter,
});

export type AppRouter = typeof appRouter;
