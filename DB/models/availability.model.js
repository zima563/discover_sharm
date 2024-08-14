import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";

export const availability = sequelize.define("avail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY, // Use DATEONLY if only the date is needed
    allowNull: false,
    validate: {
      notNull: { msg: "Date is required" },
      isDate: { msg: "Must be a valid date" },
    },
  },
  booked: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
