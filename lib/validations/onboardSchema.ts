import { z } from "zod";

export const onboardSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters long"),
  role: z.enum(["STUDENT", "INSTRUCTOR"], {
    errorMap: () => ({
      message: "Role Selection is required",
    }),
  }),
});
