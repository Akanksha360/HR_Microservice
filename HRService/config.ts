import { DotenvConfigOutput, config } from 'dotenv';

require('custom-env').env(true)

const envFound: DotenvConfigOutput = config();

if (!envFound) {
    throw new Error('.env file was not found.');
}


export const port: any = Number(process.env.port) || 3001;
export const DATABASE_TYPE: any = String(process.env.DATABASE_TYPE) || 'postgres';
export const DATABASE_USERNAME: any = String(process.env.DATABASE_USERNAME) || 'postgres';
export const DATABASE_PASSWORD: any = String(process.env.DATABASE_PASSWORD) || '123Max1234';
export const DATABASE_HOST: any = String(process.env.DATABASE_HOST) || 'localhost';
export const DATABASE_PORT: any = Number(process.env.DATABASE_PORT) || 5432;
export const DATABASE_NAME: any = String(process.env.DATABASE_NAME) || 'testdb';