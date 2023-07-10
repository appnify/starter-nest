export class AppValidationError extends Error {
  messages: string[] = [];

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }

  setMessages(errors: string[]) {
    this.messages = errors;
  }
}
