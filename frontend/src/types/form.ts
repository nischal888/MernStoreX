export type ComponentType = 'input' | 'select' | 'textarea';

export interface FormOption {
	id: string;
	label: string;
}

export interface BaseFormElement {
	name: string;
	label: string;
	placeholder?: string;
	componentType: ComponentType;
}

export interface InputFormElement extends BaseFormElement {
	componentType: 'input';
	type: string;
}

export interface SelectFormElement extends BaseFormElement {
	componentType: 'select';
	options: FormOption[];
}

export interface TextareaFormElement extends BaseFormElement {
	componentType: 'textarea';
	id?: string;
}

// Union type for all form elements
export type FormElement =
	| InputFormElement
	| SelectFormElement
	| TextareaFormElement;
