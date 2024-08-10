
import morgan from 'morgan';
export * as AuthMiddlewares from './auth';
export * as ErrorMiddlewares from './errors';

const stream = {
  write: (message:string) =>console.log('Morgan:',message.replace(/(?:\r\n|\r|\n)/g, '')),
};
export const MorganMiddleware = morgan('dev', { stream });


