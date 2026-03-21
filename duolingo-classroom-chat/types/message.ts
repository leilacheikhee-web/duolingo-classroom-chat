/**
 * Core types for the Duolingo Classroom Chat system.
 * Demonstrates advanced TypeScript architecture including utility types and generic types.
 */

// Supported courses in the classroom
export type CourseType = 'Spanish' | 'French' | 'Japanese' | 'German' | 'Italian' | 'Portuguese' | 'Dutch' | 'Russian' | 'Chinese' | 'Korean';

// Base payload for any message-like entity
export interface BasePayload {
    id: string;
    createdAt: number;
}

// User role definition
export type UserRole = 'student' | 'teacher' | 'moderator';

// User representation
export interface User {
    id: string;
    username: string;
    role: UserRole;
    avatarUrl?: string;
}

// Concrete Message type extending BasePayload
export interface ChatMessage extends BasePayload {
    authorId: string;
    courseId: CourseType;
    content: string;
    isFlagged: boolean;
    metadata?: MessageMetadata;
}

// Metadata using a generic type for flexible additional data
export interface MessageMetadata<T = any> {
    streak?: number;
    languageLevel?: string;
    customData?: T;
}

// Utility types demonstrating TypeScript power
// Type for creating a new message (omits system-generated fields)
export type CreateMessagePayload = Omit<ChatMessage, 'id' | 'createdAt' | 'isFlagged'>;

// Type for a message update (everything is optional except the ID we want to update)
export type UpdateMessagePayload = Partial<Omit<ChatMessage, 'id' | 'authorId'>> & { id: string };

// Conditional Type Example: extracts 'student' or 'teacher' from UserRole
export type FilterRoles<T, U> = T extends U ? T : never;
export type PrivilegedRoles = FilterRoles<UserRole, 'teacher' | 'moderator'>;
