const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "platform",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      image_background: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
