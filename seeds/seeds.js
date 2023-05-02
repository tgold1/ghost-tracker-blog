const sequelize = require('../config/connection');
const { User, Blogpost } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogData of blogpostData) {
    await Blogpost.create({
      ...blogData,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();