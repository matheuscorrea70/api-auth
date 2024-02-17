import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import entities from "../models/entities/index";
import migrations from "../migrations/index";

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities,
  migrations,
  subscribers: [],
});

export default AppDataSource;
