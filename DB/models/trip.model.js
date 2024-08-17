import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection.js";


export const tripModel = sequelize.define(
  "trip",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Price must be an integer" },
        min: { args: [0], msg: "Price must be a positive value" },
      },
    },
    priceAfterDis: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Price after discount must be an integer" },
        min: {
          args: [0],
          msg: "Price after discount must be a positive value",
        },
      },
    },
    ratingQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: "Rating quantity must be an integer" },
        min: {
          args: [0],
          msg: "Rating quantity must be a non-negative integer",
        },
      },
    },
    ratingAverage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isFloat: { msg: "Rating average must be a float" },
        min: { args: [0.0], msg: "Rating average must be at least 0.0" },
        max: { args: [5.0], msg: "Rating average must be at most 5.0" },
      },
    },
  },
  {
    timestamps: true,
    validate: {
      priceAfterDisLowerThanPrice() {
        if (this.priceAfterDis >= this.price) {
          throw new Error(
            "Price after discount must be lower than the original price"
          );
        }
      },
    },
  }
);

