import {
	FormInputField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from "components/ui/form";
import { Input } from "components/ui/input";
import React from "react";

// Define a type for the props of the FormField component
interface FormFieldProps {
	form: any;
	name: string;
	placeholder: string;
	label?: string;
	errorMessage: string;
	type?: string;
}

const FormField: React.FC<FormFieldProps> = (props) => {
	return (
		<FormInputField
			control={props.form.control}
			name={props.name}
			render={({ field }) => {
				return (
					<FormItem>
						{props.label && <FormLabel>{props.label}</FormLabel>}

						<FormControl>
							<Input
								placeholder={props.placeholder}
								type={props.type}
								{...field}
							/>
						</FormControl>

						<FormMessage>{props.errorMessage}</FormMessage>
					</FormItem>
				);
			}}
		/>
	);
};

export default FormField;
