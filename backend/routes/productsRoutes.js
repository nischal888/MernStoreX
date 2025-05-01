import express from 'express';

import {
	handleImageUpload,
	addProduct,
	editProduct,
	fetchAllProducts,
	deleteProduct,
} from '../controllers/productController.js';

import { upload } from '../helpers/cloudinay.js';

const router = express.Router();

router.post('/image-upload', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get', fetchAllProducts);
export default router;
