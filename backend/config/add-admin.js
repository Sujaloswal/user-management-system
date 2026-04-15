const mongoose = require('mongoose');
const User = require('../models/User');
const readline = require('readline');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const addUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB\n');

    console.log('=== ADD NEW ADMIN/MANAGER USER ===\n');

    const name = await question('Enter name: ');
    const email = await question('Enter email: ');
    const password = await question('Enter password: ');
    const role = await question('Enter role (admin/manager/user): ');
    const status = await question('Enter status (active/inactive) [default: active]: ') || 'active';

    // Validate role
    if (!['admin', 'manager', 'user'].includes(role.toLowerCase())) {
      console.error('\n✗ Invalid role. Must be admin, manager, or user');
      process.exit(1);
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('\n✗ User with this email already exists');
      process.exit(1);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role.toLowerCase(),
      status: status.toLowerCase(),
    });

    console.log('\n✓ User created successfully!');
    console.log('\nUser Details:');
    console.log(`  ID: ${user._id}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Role: ${user.role}`);
    console.log(`  Status: ${user.status}`);
    console.log('\nYou can now login with these credentials.');

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
};

addUser();
