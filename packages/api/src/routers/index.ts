import { protectedProcedure, publicProcedure, router } from "../index";
import { appointmentRouter } from "./appointment";
import { serviceRouter } from "./service";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => "OK"),
  privateData: protectedProcedure.query(({ ctx }) => ({
    message: "This is private",
    user: ctx.session.user,
  })),
  service: serviceRouter,
  appointment: appointmentRouter,
});
export type AppRouter = typeof appRouter;
