import { StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { setProductDetails } from '@/store/shoppingProductSlice';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { addToCart, fetchCartItems } from '@/store/cartSlice';

function ShoppingProductDetails({ open, setOpen, productDetails }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.authenticate);
	const { cartItems } = useSelector((state) => state.shopCarts);

	const { toast } = useToast();

	function handleAddToCart(getCurrentProductId, getTotalStock) {
		let getCartItems = cartItems.items || [];

		if (getCartItems.length) {
			const indexOfCurrentItem = getCartItems.findIndex(
				(item) => item.productId === getCurrentProductId
			);
			if (indexOfCurrentItem > -1) {
				const getQuantity = getCartItems[indexOfCurrentItem].quantity;
				if (getQuantity + 1 > getTotalStock) {
					toast({
						title: `Only ${getQuantity} quantity can be added for this item`,
						variant: 'destructive',
					});

					return;
				}
			}
		}
		dispatch(
			addToCart({
				userId: user?.id,
				productId: getCurrentProductId,
				quantity: 1,
			})
		).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchCartItems(user?.id));
				toast({
					title: 'Product is added to cart',
				});
			}
		});
	}

	function handleDialogClose() {
		setOpen(false);
		dispatch(setProductDetails());
	}

	return (
		<Dialog open={open} onOpenChange={handleDialogClose}>
			<DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
				<div className="relative overflow-hidden rounded-lg">
					<img
						src={productDetails?.image}
						alt={productDetails?.title}
						width={600}
						height={600}
						className="aspect-square w-full object-cover"
					/>
				</div>
				<div className="">
					<div>
						<h1 className="text-3xl font-medium">{productDetails?.title}</h1>
						<p className="text-muted-foreground text-2xl mb-5 mt-4">
							{productDetails?.description}
						</p>
					</div>
					<div className="flex items-center justify-between">
						<p
							className={`text-3xl font-medium text-primary ${
								productDetails?.salePrice > 0 ? 'line-through' : ''
							}`}
						>
							${productDetails?.price}
						</p>
						{productDetails?.salePrice > 0 ? (
							<p className="text-2xl font-medium text-muted-foreground">
								${productDetails?.salePrice}
							</p>
						) : null}
					</div>

					<div className="mt-5 mb-5">
						{productDetails?.totalStock === 0 ? (
							<Button className="w-full opacity-60 cursor-not-allowed">
								Out of Stock
							</Button>
						) : (
							<Button
								className="w-full"
								onClick={() =>
									handleAddToCart(
										productDetails?._id,
										productDetails?.totalStock
									)
								}
							>
								Add to Cart
							</Button>
						)}
					</div>
					<Separator />
					<div className="max-h-[300px] overflow-auto">
						<h2 className="text-xl font-medium mb-4">Reviews</h2>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ShoppingProductDetails;
