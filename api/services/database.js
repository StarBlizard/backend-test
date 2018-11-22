'use strict';

const nconf     = require('nconf');
const Sequelize = require('sequelize');


// Replace this whit Sequalize

module.exports = {

  init(){
    const { database, username, password } = nconf.get('Database'); 
    const connection  = ncong.get('Database:connection');

    console.log(connection);
 
    return;

    this.db = new Sequelize(database, username, password, {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },

      // SQLite only
      storage: 'path/to/database.sqlite',

      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      operatorsAliases: false
    });
}

};
