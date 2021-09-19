'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client.init({
    client_id: DataTypes.STRING(150),
    client_description: DataTypes.TEXT,
    client_secret_key: DataTypes.STRING(255),
    created_at: DataTypes.DATE,
    activated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Client',
    timestamps: false
  });
  return Client;
};