import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { productFormElements } from '@/config/index';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import GenericForm from '@/components/shared/GenericForm';

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
	function onSubmit(e) {
		e.preventDefault();
	}
	return (
		<Fragment>
			<div className="mb-5 w-full flex justify-end">
				<Button onClick={() => setOpenProductDialogueBox(true)}>
					Add New Product
				</Button>
			</div>

			<Sheet
				open={openProductDialogueBox}
				onOpenChange={() => {
					setOpenProductDialogueBox(false);
				}}
			>
				<SheetContent side="right" className="overflow-auto">
					<SheetHeader>
						<SheetTitle>Add New Product</SheetTitle>
					</SheetHeader>

					<div className="py-6">
						<GenericForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={'Add'}
							formElements={productFormElements}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	);
}

export default AdminProducts;
