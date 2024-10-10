import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters long"),

  description: z
    .string()
    .min(3, "Description must be at least 15 characters")
    .max(500, "Description must be at most 500 characters long"),

  category: z
    .string()
    .min(3, "Category must be at least 10 characters")
    .max(50, "Category must be at most 20 characters long"),

  welcomeMessage: z
    .string()
    .min(3, "Welcome Message must be at least 10 characters")
    .max(50, "Welcome Message must be at most 50 characters long"),

  courseThumbnail: z
    .instanceof(File, { message: "Course Thumbnail must be a file" })
    .nullable()
    .refine((file) => file !== null, {
      message: "Course Thumbnail is required",
    }),
  pricing: z.number().min(0, "Pricing must be a positive number"),
});
