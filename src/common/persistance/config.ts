import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../../config/${process.env.APP_ENV}.env`,
  });  

export const config = {
    json__secret_key: process.env.json_secret_key,
    expiresIn: 7
}