import { z } from 'zod';
import { filterContent } from '../utils/contentFilter';

/**
 * Zod schemas for runtime validation of the chat messages.
 * Ensures data integrity and content safety before reaching the core system.
 */

export const CourseTypeSchema = z.enum(['Spanish', 'French', 'Japanese', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Korean']);

// Custom Zod refinement to check for educational appropriateness
const SafeStringSchema = z.string().min(1, "Message cannot be empty").max(500, "Message is too long").superRefine((val, ctx) => {
    const filterResult = filterContent(val);
    if (!filterResult.isSafe) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Inappropriate content detected: ${filterResult.flaggedWords.join(', ')}`,
            fatal: true,
        });
    }
});

export const CreateMessageSchema = z.object({
    content: SafeStringSchema,
    courseId: CourseTypeSchema,
    authorId: z.string().min(1, "Invalid author ID"), // simplified from uuid to allow mock data
});

// Infer the TypeScript type directly from the Zod Schema to guarantee they stay in sync
export type CreateMessageFormData = z.infer<typeof CreateMessageSchema>;
