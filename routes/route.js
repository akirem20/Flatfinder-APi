const express = require('express');
const router = express.Router();
const authmiddleware = require('../middlewares/Authmiddleware');
const auth = authmiddleware;
const { getAllFlats, getFlatById, addFlat, updateFlat, deleteFlat } = require('../controllers/flatcontroller');
const {registerUser,loginUser,getAllUsers,getUserById,updateUserById,deleteUserById} = require('../controllers/userscontroller');
const {getAllMessages,getUserMessages,addMessage} = require('../controllers/messagecontroller');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', auth, getAllUsers); 
router.get('/:id', auth, getUserById);
router.patch('/:id', auth, updateUserById);
router.delete('/:id', auth, deleteUserById);

// Flat routes
router.get('/', auth, getAllFlats);
router.get('/:id', auth, getFlatById);
router.post('/', auth, addFlat);
router.patch('/:id', auth, updateFlat);
router.delete('/:id', auth, deleteFlat);

// Message routes

router.get('/:id/messages', auth, getAllMessages);
router.get('/:id/messages/:senderId', auth, getUserMessages);
router.post('/:id/messages', auth, addMessage);


module.exports = router;
