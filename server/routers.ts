import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createBooking, getAllBookings } from "./db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sendBookingConfirmationEmail, sendAdminNotificationEmail } from "./email";

// Validation schema for booking form
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters").max(20),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  message: z.string().max(5000, "Message must be less than 5000 characters").optional(),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bookings: router({
    /**
     * Submit a new booking consultation request.
     * Public endpoint - no authentication required.
     */
    submit: publicProcedure
      .input(bookingSchema)
      .mutation(async ({ input }) => {
        try {
          const booking = await createBooking({
            name: input.name,
            email: input.email,
            phone: input.phone,
            preferredDate: input.preferredDate,
            message: input.message || null,
            status: "pending",
          });

          if (!booking) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to create booking",
            });
          }

          // Send confirmation email to client
          await sendBookingConfirmationEmail(
            input.name,
            input.email,
            booking.id,
            input.preferredDate
          );

          // Send admin notification
          await sendAdminNotificationEmail(
            input.name,
            input.email,
            input.phone,
            input.preferredDate,
            input.message || "",
            booking.id
          );

          return {
            success: true,
            bookingId: booking.id,
            message: "Booking submitted successfully! We'll contact you soon.",
          };
        } catch (error) {
          console.error("Booking submission error:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit booking. Please try again.",
          });
        }
      }),

    /**
     * Get all bookings (admin only).
     */
    list: publicProcedure.query(async () => {
      try {
        return await getAllBookings();
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch bookings",
        });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
