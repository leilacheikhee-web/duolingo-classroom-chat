import { ChatMessage, CourseType } from '../types/message';
import { ApiError } from '../errors/ChatErrors';

/**
 * Type guards allow TypeScript to refine types at runtime.
 */

// User-defined type guard to check if an object is a ChatMessage
export function isChatMessage(message: unknown): message is ChatMessage {
    return (
        typeof message === 'object' &&
        message !== null &&
        'id' in message &&
        typeof (message as ChatMessage).id === 'string' &&
        'content' in message &&
        typeof (message as ChatMessage).content === 'string' &&
        'authorId' in message &&
        typeof (message as ChatMessage).authorId === 'string'
    );
}

// Type guard for ApiError
export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

// Type guard for CourseType
export function isCourseType(course: string): course is CourseType {
    const validCourses = ['Spanish', 'French', 'Japanese', 'German', 'Italian', 'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Korean'];
    return validCourses.includes(course);
}
