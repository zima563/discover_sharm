import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./DB/dbConnection.js";
import { bootstrap } from "./src/index.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

// ✅ تفعيل الاتصال بقاعدة البيانات
sequelize
  .sync()
  .then(() => console.log("✅ Database connected & synced"))
  .catch((err) => console.error("❌ Database error:", err));

// ✅ routes
bootstrap(app);

// ✅ تشغيل السيرفر
app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
);
