/**
 * Utility for ensuring educational content safety.
 * This filters out banned words and flags inappropriate messages.
 */

// A simple local banned words list. In a real system, this would be backed by a moderation API.
const BANNED_WORDS = new Set([
    'badword',
    'inappropriate',
    'spam',
    'cheat',
    'hack',
]);

export interface FilterResult {
    isSafe: boolean;
    flaggedWords: string[];
    sanitizedContent: string;
}

/**
 * Validates a given text against the banned words list.
 * 
 * @param content The raw message string to validate.
 * @returns A structured FilterResult containing safety metrics.
 */
export function filterContent(content: string): FilterResult {
    if (!content || typeof content !== 'string') {
        return { isSafe: false, flaggedWords: [], sanitizedContent: '' };
    }

    const words = content.split(/\b/);
    const flaggedWords: string[] = [];

    const sanitizedWords = words.map(word => {
        const lowerWord = word.toLowerCase();
        if (BANNED_WORDS.has(lowerWord)) {
            flaggedWords.push(lowerWord);
            return '*'.repeat(word.length);
        }
        return word;
    });

    const isSafe = flaggedWords.length === 0;

    return {
        isSafe,
        flaggedWords,
        // Provide a safer version just in case, though usually we block the message entirely.
        sanitizedContent: sanitizedWords.join('')
    };
}
