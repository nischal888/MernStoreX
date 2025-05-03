import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/userRoutes.js';
import productRoutes from './routes/productsRoutes.js';
import shopProductRoutes from './routes/shopRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('DB Connected'))
	.catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'DELETE', 'PUT'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'Expires',
			'Pragma',
		],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/authenticate', router);
app.use('/api/administration/products', productRoutes);
app.use('/api/shop/products', shopProductRoutes);
app.use('/api/shop/cart', cartRouter);
app.listen(PORT, () => console.log(`Server is now running in port ${PORT}`));
