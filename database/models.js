const Sequelize = require('sequelize');
const connection = require('./index.js');

const Users = connection.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    review_auth: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: false }
);

const Feedbacks = connection.define(
  'feedback', 
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  { timestamps: false }
);

const Reviews = connection.define(
  'reviews', 
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userReviewed: {
      type: Sequelize.INTEGER,
      references: 'users',
      referencesKey: 'id'
    },
    reviewer: {
      type: Sequelize.INTEGER,
      references: 'users',
      referencesKey: 'id'
    }
  },
  { timestamps: false }
);

Users.hasMany(Reviews);
Reviews.hasMany(Feedbacks);
Reviews.belongsTo(Users);
Feedbacks.belongsTo(Users);


// connection.sync({ force: false }); //remove force: false after initial schema is finalized

module.exports = {
  Users,
  Feedbacks,
  Reviews
}