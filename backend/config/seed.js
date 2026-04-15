const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing users (optional)
  await User.deleteMany({});

  const admin = await User.create({
    name: 'Super Admin',
    email: 'admin@example.com',
    password: 'Admin@123',
    role: 'admin',
    status: 'active',
  });

  await User.create({
    name: 'John Manager',
    email: 'manager@example.com',
    password: 'Manager@123',
    role: 'manager',
    status: 'active',
    createdBy: admin._id,
  });

  await User.create({
    name: 'Jane User',
    email: 'user@example.com',
    password: 'User@123',
    role: 'user',
    status: 'active',
    createdBy: admin._id,
  });

  console.log('Seed data created successfully');
  process.exit();
};

seedData().catch((err) => {
  console.error(err);
  process.exit(1);
});
