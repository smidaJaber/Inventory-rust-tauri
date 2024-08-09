import { SelectItem } from "@mantine/core";

export function useMakeSelectable(
	data: any[],
	valueProperty: string,
	labelProperty: string
): any[] {
	if (!data || data?.length == 0) {
		return [] as SelectItem[];
	}
	let results = [];
	for (const element of data) {
		const value = element[valueProperty];
		const label = element[labelProperty];
		results.push({ value: value, label: label });
	}
	return results as SelectItem[];
}
