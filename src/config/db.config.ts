import { DataSource } from "typeorm"

import env from './env.config';


const HOST = env.getEnvironmentVariable('DB_HOST');
const PASS = env.getEnvironmentVariable('DB_PASS');
const DB_NAME = env.getEnvironmentVariable('DB_NAME');
const USERNAME = env.getEnvironmentVariable('DB_USERNMAE');

export const myDataSource = new DataSource({
    type: "mysql",
    host: HOST,
    port: 3306,
    username: USERNAME,
    password: PASS,
    database: DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    logging: false,
    synchronize: true,
})

