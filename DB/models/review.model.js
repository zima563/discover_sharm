import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import { tripModel } from "./trip.model.js";

export const reviewModel = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  rateText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "invalid email" },
    },
  },
  trip: {
    type: DataTypes.INTEGER,
    references: {
      model: tripModel,
      key: "id",
    },
  },
});
