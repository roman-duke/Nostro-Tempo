class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: unknown) {
    super(message, 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
