interface ErrorConstructor {
  captureStackTrace(thisArg: any, func: any): void;
}

abstract class GeneralError extends Error {
  abstract type: string;
  statusCode: number;
  detail?: string;
  constructor(message: string, statusCode: number, detail?: any) {
    super(message);
    this.statusCode = statusCode;
    this.detail = detail;
  }

  override toString(): string {
    return `[APP CONSOLE] (${this.type.toUpperCase()}): ${this.message}`;
  }
}

class EmptyDataError extends GeneralError {
  override type = 'Empty Data';

  constructor(message: string, details?: any) {
    super(message, 1004, details);
    this.stack = new Error().stack;
  }
}

export { EmptyDataError };
