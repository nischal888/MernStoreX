//import { SelectContent } from '@radix-ui/react-select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { FormElement } from '@/types/form';

const types = {
	INPUT: 'input',
	SELECT: 'select',
	TEXTAREA: 'textarea',
} as const;

interface GenericFormProps<T> {
	formElements: FormElement[];
	formData: T;
	setFormData: React.Dispatch<React.SetStateAction<T>>;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	buttonText?: string;
	isBtnDisabled?: boolean;
}

function GenericForm<T extends Record<string, any>>({
	formElements,
	formData,
	setFormData,
	onSubmit,
	buttonText,
	isBtnDisabled,
}: GenericFormProps<T>) {
	function renderInputsByComponentType(getControlItem: FormElement) {
		let element = null;
		const value = formData[getControlItem.name] || '';

		switch (getControlItem.componentType) {
			case types.INPUT:
				element = (
					<Input
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.name}
						type={getControlItem.type}
						value={value}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setFormData({
								...formData,
								[getControlItem.name]: event.target.value,
							})
						}
					/>
				);

				break;
			case types.SELECT:
				element = (
					<Select
						onValueChange={(value) =>
							setFormData({
								...formData,
								[getControlItem.name]: value,
							})
						}
						value={value}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder={getControlItem.label} />
						</SelectTrigger>
						<SelectContent>
							{getControlItem.options && getControlItem.options.length > 0
								? getControlItem.options.map((optionItem) => (
										<SelectItem key={optionItem.id} value={optionItem.id}>
											{optionItem.label}
										</SelectItem>
								  ))
								: null}
						</SelectContent>
					</Select>
				);

				break;
			case types.TEXTAREA:
				element = (
					<Textarea
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.id}
						value={value}
						onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
							setFormData({
								...formData,
								[getControlItem.name]: event.target.value,
							})
						}
					/>
				);

				break;

			default:
				element = (
					<Input
						name={getControlItem.name}
						placeholder={getControlItem.placeholder}
						id={getControlItem.name}
						type={getControlItem.type}
						value={value}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setFormData({
								...formData,
								[getControlItem.name]: event.target.value,
							})
						}
					/>
				);
				break;
		}

		return element;
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-col gap-3">
				{formElements.map((element) => (
					<div className="grid w-full gap-1.5" key={element.name}>
						<Label className="mb-1 text-left">{element.label}</Label>
						{renderInputsByComponentType(element)}
					</div>
				))}
			</div>
			<Button
				disabled={isBtnDisabled}
				type="submit"
				className="mt-2 w-full flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				{buttonText || 'Submit'}
			</Button>
		</form>
	);
}

export default GenericForm;
