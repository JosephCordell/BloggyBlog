const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    
  },
  {
    sequelize
  }
);

module.exports = Post;
