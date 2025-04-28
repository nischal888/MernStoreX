import express from 'express';
import {
	registerUser,
	loginUser,
	logOutUser,
	authenicationMiddleware,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logOutUser);
router.get('/status', authenicationMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		message: 'Authenticated User',
		user,
	});
});
export default router;
