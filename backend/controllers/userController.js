const User = require('../models/User');

// @GET /api/users — Admin & Manager only
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;

    const filter = {};
    if (role) filter.role = role;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await User.countDocuments(filter);
    const users = await User.find(filter)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      users,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET /api/users/:id — Admin, Manager, or own profile
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Regular users can only view their own profile
    if (
      req.user.role === 'user' &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @POST /api/users — Admin only
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password: password || 'Password@123',
      role: role || 'user',
      status: status || 'active',
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    const userResponse = await User.findById(user._id);
    res.status(201).json({ message: 'User created successfully', user: userResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/users/:id — Admin (all), Manager (non-admins), User (own only)
exports.updateUser = async (req, res) => {
  try {
    const userToUpdate = await User.findById(req.params.id);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { role: currentRole, _id: currentUserId } = req.user;
    const isOwnProfile = currentUserId.toString() === req.params.id;

    // Regular users can only update their own profile
    if (currentRole === 'user' && !isOwnProfile) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Managers cannot update admins
    if (currentRole === 'manager' && userToUpdate.role === 'admin') {
      return res.status(403).json({ message: 'Managers cannot update admin users' });
    }

    // Non-admins cannot change roles
    const allowedUpdates = { ...req.body };
    if (currentRole !== 'admin') {
      delete allowedUpdates.role;
    }

    // Never allow password update via this route — separate flow
    delete allowedUpdates.password;

    allowedUpdates.updatedBy = currentUserId;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email').populate('updatedBy', 'name email');

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @DELETE /api/users/:id — Admin only (soft delete by setting inactive)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    await User.findByIdAndUpdate(req.params.id, {
      status: 'inactive',
      updatedBy: req.user._id,
    });

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @PUT /api/users/:id/password — Own profile only
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(req.params.id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    user.updatedBy = req.user._id;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
