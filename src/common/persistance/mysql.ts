import { createPool } from "mysql2/promise";
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";

dotenv.config({
    path: `${__dirname}/../../../config/${process.env.APP_ENV}.env`,
  });  

export default createPool({
    host: process.env.db_mysql_host,
    user: process.env.db_mysql_user,
    password: process.env.db_mysql_pasword,
    database: process.env.db_mysql_database,
});