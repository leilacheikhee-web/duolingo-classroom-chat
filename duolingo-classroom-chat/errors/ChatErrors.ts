export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
export class ContentFilterError extends Error {
  constructor(public flaggedWords: string[]) {
    super(`Inappropriate content: ${flaggedWords.join(', ')}`);
    this.name = 'ContentFilterError';
  }
}
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
