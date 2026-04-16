const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  activateUser,
  updatePassword,
  getStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // All user routes require login

// Stats route must come BEFORE /:id route to avoid conflicts
router.get('/stats', authorize('admin', 'manager'), getStats);

router
  .route('/')
  .get(authorize('admin', 'manager'), getAllUsers)
  .post(authorize('admin'), createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(authorize('admin', 'manager'), deleteUser);

router.put('/:id/activate', authorize('admin', 'manager'), activateUser);
router.put('/:id/password', updatePassword);

module.exports = router;
