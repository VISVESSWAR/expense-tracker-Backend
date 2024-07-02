import { DataTypes } from "sequelize";

const expense = (sequelize) => {
  const expenses = sequelize.define("expenses", {
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    date: {
      type: DataTypes.DATE,
    },
  });
  return expenses;
};

export default expense;