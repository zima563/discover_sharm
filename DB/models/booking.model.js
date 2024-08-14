import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";
import { tripModel } from "./trip.model.js";

export const bookingModel = sequelize.define(
  "booking",
  {
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
    Adults: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: "Number of adults is required" },
        isInt: { msg: "Must be an integer" },
        min: { args: [0], msg: "Must be at least 1" },
      },
    },
    children: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: "Number of adults is required" },
        isInt: { msg: "Must be an integer" },
        min: { args: [0], msg: "Must be at least 1" },
      },
    },
    children_s: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: "Number of adults is required" },
        isInt: { msg: "Must be an integer" },
        min: { args: [0], msg: "Must be at least 1" },
      },
    },
    trip: {
      type: DataTypes.INTEGER,
      references: {
        model: tripModel,
        key: "id",
      },
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.TIME,
    },
    hotel: {
      type: DataTypes.STRING,
    },
    RoomNumber: {
      type: DataTypes.INTEGER,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: true, // or false based on your requirements
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);
