import { filterOptions } from '@/config';
import { Fragment } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

function ProductCategoryFilter({ filters, handleFilter }) {
	return (
		<div className="bg-background rounded-lg shadow-sm">
			<div className="p-4">
				<h2 className="text-lg font-medium text-left">Filters</h2>
			</div>
			<div className="p-4 space-y-4">
				{Object.keys(filterOptions).map((keyItem) => (
					<Fragment>
						<div>
							<h3 className="text-base font-medium text-left">{keyItem}</h3>
							<div className="grid gap-2 mt-2">
								{filterOptions[keyItem].map((option) => (
									<Label
										className="flex font-normal items-center gap-2 "
										key={option.id}
									>
										<Checkbox
											checked={
												filters &&
												Object.keys(filters).length > 0 &&
												filters[keyItem] &&
												filters[keyItem].indexOf(option.id) > -1
											}
											onCheckedChange={() => handleFilter(keyItem, option.id)}
										/>
										{option.label}
									</Label>
								))}
							</div>
						</div>
					</Fragment>
				))}
			</div>
		</div>
	);
}

export default ProductCategoryFilter;
