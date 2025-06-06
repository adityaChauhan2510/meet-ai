import { db } from "@/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgents] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgents;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;
      const { auth } = ctx;

      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();

      return createdAgent;
    }),
});
