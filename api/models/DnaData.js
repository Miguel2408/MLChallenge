const sequelize = require('../../config/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const tableName = 'dna_data';



const DnaData = sequelize.define('DnaData', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dna: {
    type: Sequelize.TEXT,
    get: function () {
        return JSON.parse(this.getDataValue('dna'));
    },
    set: function (value) {
        this.setDataValue('dna', JSON.stringify(value));
    },
    notEmpty: false,
    allowNull: true,
  },
  is_mutant: {
    type: Sequelize.BOOLEAN,
    notEmpty: false,
    allowNull: true,
    defaultValue: 0,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  }
}, { tableName ,underscored: true, charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' });



module.exports = DnaData;