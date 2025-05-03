import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const registerUser = async (req, res) => {
	const { userName, email, password } = req.body;
	try {
		const checkUser = await User.findOne({ email });
		if (checkUser)
			return res.json({ success: false, message: 'Email already exists' });
		const hashPassword = await bcrypt.hash(password, 12);
		const newUser = new User({
			userName,
			email,
			password: hashPassword,
		});
		await newUser.save();
		res.status(200).json({
			success: true,
			message: 'User Registration Successfull',
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Error Occured',
		});
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const checkUser = await User.findOne({ email });
		if (!checkUser)
			return res.json({ success: false, message: 'User does not exists' });
		const checkPassword = await bcrypt.compare(password, checkUser.password);
		if (!checkPassword) {
			return res.json({
				success: false,
				message: 'Incorrect Password',
			});
		}
		const token = jwt.sign(
			{
				id: checkUser._id,
				role: checkUser.role,
				email: checkUser.email,
				userName: checkUser.userName,
			},
			'CLIENT_SECRET_KEY',
			{ expiresIn: '60m' }
		);
		res.cookie('token', token, { httpOnly: true, secure: false }).json({
			success: true,
			message: 'Login Successfull',
			user: {
				email: checkUser.email,
				role: checkUser.role,
				id: checkUser._id,
				userName: checkUser.userName,
			},
		});
	} catch (e) {
		res.status(500).json({
			success: false,
			message: 'Error Occured',
		});
	}
};

const logOutUser = (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'Logout Successfull',
	});
};

const authenicationMiddleware = (req, res, next) => {
	const token = req.cookies.token;
	if (!token)
		return res.status(401).json({
			success: false,
			message: 'Unauthorize user',
		});
	try {
		const decode = jwt.verify(token, 'CLIENT_SECRET_KEY');
		req.user = decode;
		next();
	} catch (e) {
		res.status(401).json({
			success: false,
			message: 'Unauthorize user',
		});
	}
};

export { registerUser, loginUser, logOutUser, authenicationMiddleware };
