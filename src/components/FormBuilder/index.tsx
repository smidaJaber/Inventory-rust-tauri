import React, { useEffect, useState } from "react";
import {
	TextInput,
	Select,
	Button,
	SimpleGrid,
	Stack,
	Text,
	Group,
} from "@mantine/core";
import { SelectItem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Form } from "../Form";
import { Spacer } from "../Spacer";
import { useIsLight } from "~/hooks/theme";
import { Fournisseur } from "~/bindings";

function inferTypeFromString(input: string): number | string | Date | null {
	if (/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/.test(input)) {
		//  if input matchh date   "DD-MM-YYYY" or "DD/MM/YYYY"
		const [day, month, year] = input.split(/[-/]/).map(Number);
		const date = new Date(year, month - 1, day);
		return isNaN(date.getTime()) ? "text" : "date";
	} else if (/^\d+$/.test(input)) {
		// only digits
		return "number";
	} else {
		//   consider it as a string
		return "string";
	}
}
const getFieldType = (field: any) => {
	console.log("type of ", field.name, " is ", inferTypeFromString(field.value));

	return inferTypeFromString(field.value);
};
type FieldType = {
	name: string;
	value: any;
	options?: any[];
};
export interface FormBuilderProps {
	fetchDataFunction: (
		start: number | null,
		limit: number | null
	) => Promise<any[]>;
	submitFunction: (newElement: unknown) => Promise<any>;
	editMode?: boolean;
}
const FormBuilder = ({
	fetchDataFunction,
	submitFunction,
	editMode,
}: FormBuilderProps) => {
	const isLight = useIsLight();
	const [formData, setFormData] = useState<any>({});
	const [dataset, setDataSet] = useState<any>([]);

	const handleChange = (field: string, value: any) => {
		setFormData((prevData: any) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		console.log(formData);

		let results = await submitFunction(formData);
		showNotification({
			autoClose: 1500,
			color: "green.6",
			message: (
				<Stack spacing={0}>
					<Text weight={600}>Succès insertion </Text>
					<Text color="light.5">un nouveau element a ete placée fammakia</Text>
				</Stack>
			),
		});
	};

	const renderInputField = (field: FieldType) => {
		const fieldType = getFieldType(field);
		console.log("isnan(" + field.value + ")" + /^\d+$/.test(field.value));
		switch (fieldType) {
			case "text":
				return (
					<TextInput
						id={field.name}
						value={formData[field.name] || ""}
						onChange={(event) =>
							handleChange(field.name, event.currentTarget.value)
						}
					/>
				);
			case "select":
				return (
					<Select
						id={field.name}
						value={(formData[field.name] as any) || ""}
						onChange={(value) => handleChange(field.name, value)}
						data={field.options as SelectItem[]}
					/>
				);
			case "number":
				return (
					<TextInput
						id={field.name}
						value={formData[field.name] || ""}
						onChange={(event) =>
							handleChange(
								field.name,
								parseInt(event.currentTarget.value, 10) || 0
							)
						}
						type="number"
					/>
				);
			default:
				return null;
		}
	};
	function generateCases(str: string) {
		if (typeof str !== "string" || str.length === 0) {
			return {};
		}

		const snakeCase = str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
		const words = snakeCase.split("_");

		const camelCase = words
			.map((word, index) => {
				if (index === 0) {
					return word;
				}
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(" ");

		const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1);

		return {
			snakeCase,
			camelCase,
			pascalCase,
		};
	}

	const getData = async () => {
		const result = await fetchDataFunction(0, 1);
		const fieldnames = Object.keys(result[0]);
		const data = fieldnames.map((field, index) => ({
			name: field,
			label: generateCases(field).pascalCase,
			value: result[0][field],
		}));
		setDataSet(data);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<Form onSubmit={handleSubmit}>
			<SimpleGrid cols={Math.ceil(dataset.length / 3)}>
				{dataset.map((field: any) => {
					return (
						<div key={field.name} style={{ marginBottom: 16 }}>
							<label htmlFor={field.name}>{field.label}</label>
							{renderInputField(field)}
						</div>
					);
				})}
			</SimpleGrid>
			<Group mt="lg">
				<Button
					onClick={() => {}}
					color={isLight ? "light.5" : "light.3"}
					variant="light"
				>
					Annuler
				</Button>
				<Spacer />
				<Button type="submit">{editMode ? "Mettre à jour" : "Ajouter"}</Button>
			</Group>
		</Form>
	);
};

export default FormBuilder;
