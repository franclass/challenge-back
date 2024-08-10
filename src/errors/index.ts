interface APIErrorProps {
    message?: string;
    statusCode?: number;
    data?: any;
}

interface APIError extends Error {
    name: string;
    statusCode?: number;
    data?: any;
}


class APIError extends Error  {
  constructor({ message, statusCode, data }: APIErrorProps) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
} 



export default APIError ;
