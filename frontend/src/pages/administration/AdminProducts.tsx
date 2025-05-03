import { Fragment, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { productFormElements } from '@/config';
import AdminProductImageUpload from '@/components/administration/AdminProductImageUpload';
import AdminProductTile from '@/components/administration/AdminProductTile';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import GenericForm from '@/components/shared/GenericForm';
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from '@/store/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';

interface FormData {
	image: File | null;
	title: string;
	description: string;
	category: string;
	brand: string;
	price: string;
	salePrice: string;
	totalStock: string;
	averageReview: number;
}
const initialFormData = {
	image: null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: '',
	salePrice: '',
	totalStock: '',
	averageReview: 0,
};
function AdminProducts() {
	const [openProductDialogueBox, setOpenProductDialogueBox] =
		useState<boolean>(false);
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [imageLoadingState, setImageLoadingState] = useState(false);
	const [currentEditedId, setCurrentEditedId] = useState(null);
	const { productList } = useSelector((state) => state.adminProducts);

	const dispatch = useDispatch();
	const { toast } = useToast();
	function onSubmit(event) {
		event.preventDefault();

		currentEditedId !== null
			? dispatch(
					editProduct({
						id: currentEditedId,
						formData,
					})
			  ).then((data) => {
					console.log(data, 'edit');

					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setFormData(initialFormData);
						setOpenProductDialogueBox(false);
						setCurrentEditedId(null);
					}
			  })
			: dispatch(
					addNewProduct({
						...formData,
						image: uploadedImageUrl,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts());
						setOpenProductDialogueBox(false);
						setImageFile(null);
						setFormData(initialFormData);
						toast({
							title: 'Product add successfully',
						});
					}
			  });
	}

	function handleDelete(getCurrentProductId) {
		dispatch(deleteProduct(getCurrentProductId)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts());
			}
		});
	}

	function isFormValid() {
		return Object.keys(formData)
			.filter((currentKey) => currentKey !== 'averageReview')
			.map((key) => formData[key] !== '')
			.every((item) => item);
	}

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	console.log(formData, 'productList');
	return (
		<Fragment>
			<div className="mb-5 w-full flex justify-end">
				<Button onClick={() => setOpenProductDialogueBox(true)}>
					Add New Product
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
				{productList && productList.length > 0
					? productList.map((productItem) => (
							<AdminProductTile
								setFormData={setFormData}
								setOpenProductDialogueBox={setOpenProductDialogueBox}
								setCurrentEditedId={setCurrentEditedId}
								product={productItem}
								handleDelete={handleDelete}
							/>
					  ))
					: null}
			</div>
			<Sheet
				open={openProductDialogueBox}
				onOpenChange={() => {
					setOpenProductDialogueBox(false);
					setCurrentEditedId(null);
					setFormData(initialFormData);
				}}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle>Add New Product</SheetTitle>
					</SheetHeader>
					<AdminProductImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
						setImageLoadingState={setImageLoadingState}
						imageLoadingState={imageLoadingState}
						isEditMode={currentEditedId !== null}
					/>
					<div className="py-6">
						<GenericForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
							formElements={productFormElements}
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
}

export default AdminProducts;
