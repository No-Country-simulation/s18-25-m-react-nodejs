import { DataSource } from "typeorm";
import envs from "./envs";
import { User } from "../features/user/emtities/userEntity";
import { Post } from "../features/post/postEntity";

const con = new DataSource({
  type: "mysql",
  driver: require("mysql2"),
  host: envs.DB.HOST,
  port: envs.DB.PORT,
  username: envs.DB.USER,
  password: envs.DB.PASS,
  database: envs.DB.NAME,
  synchronize: true,
  entities: [User, Post],
});

export default con;
