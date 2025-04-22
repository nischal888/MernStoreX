export type ComponentType = 'input' | 'select' | 'textarea';

export interface FormOption {
	id: string; // value for select options
	label: string; // label displayed in the UI
}

export interface BaseFormElement {
	name: string; // form field name (key)
	label: string; // UI label
	placeholder: string; // placeholder text
	componentType: ComponentType;
}

// Input-specific
export interface InputFormElement extends BaseFormElement {
	componentType: 'input';
	type: string; // text, password, email, etc.
}

// Select-specific
export interface SelectFormElement extends BaseFormElement {
	componentType: 'select';
	options: FormOption[];
}

// Textarea-specific
export interface TextareaFormElement extends BaseFormElement {
	componentType: 'textarea';
	id?: string; // optional ID override
}

// Union type for all form elements
export type FormElement =
	| InputFormElement
	| SelectFormElement
	| TextareaFormElement;
