export class ApiError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      public errors?: any[]
    ) {
      super(message);
      this.name = 'ApiError';
    }
  
    static BadRequest(message: string, errors?: any[]) {
      return new ApiError(400, message, errors);
    }
  
    static NotFound(message: string = 'Resource not found') {
      return new ApiError(404, message);
    }
  
    static Unauthorized(message: string = 'Unauthorized') {
      return new ApiError(401, message);
    }
  
    static Internal(message: string = 'Internal server error') {
      return new ApiError(500, message);
    }
  }