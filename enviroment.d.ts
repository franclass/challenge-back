

export interface ISecurityConfiguration {
    jwt: {
      secret: string;
      expiresIn: string;
    };
  }
export interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production';
    PORT: string;
    MONGO_URL: string;
    JWT_SECRET: string;
}


export interface imageUrl {
    id: string;
    image: string;
    folder: string;
 }

 
 