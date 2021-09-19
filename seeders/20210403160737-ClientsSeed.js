'use strict';

const { UUID } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
         {
             client_id: 'SPA_APP',
             client_secret_key:  bcrypt.hashSync(UUID() + 'SPA_APP', 10),
             created_at: new Date()
         }
    ];
    
    await queryInterface.bulkInsert('Clients', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
