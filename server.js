import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./DB/dbConnection.js";
import { bootstrap } from "./src/index.routes.js";

dotenv.config();
const app = express();

sequelize.sync();

app.use(express.json());

bootstrap(app);


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${3000}!`)
);
