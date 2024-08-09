import { MultiSelect, Select, SelectItem } from "@mantine/core";
import React from "react";
import {
	profileActions,
	profileStore,
	useProfileStoreValue,
} from "~/stores/profileStore";
import { ProfileType, SelectedTous } from "~/typings";

export interface ActiveProfileSelectProps {
	profileType: ProfileType;
	data: SelectItem[];
}

const ActiveProfileSelect = ({
	profileType,
	data,
}: ActiveProfileSelectProps) => {
	const activeFournisseur = useProfileStoreValue(
		(state) => state.activeProfile
	);
	const activeClient = useProfileStoreValue((state) => state.activeProfile);
	const activeProfile =
		profileType === "fournisseur" ? activeFournisseur : activeClient;

	const handleChangeProfile = (value: string | null) => {
		let id =
			!value || value === "" || value === "tous"
				? ("tous" as SelectedTous)
				: parseInt(value, 10);
		profileStore.dispatch(profileActions.setActiveProfil(id));
	};
	return (
		<Select
			data={data}
			value={activeProfile?.toString()}
			onChange={handleChangeProfile}
			//limit={20}
			//valueComponent={Value}
			//itemComponent={Item}
			//maxSelectedValues={1}
			searchable
			defaultValue={"tous"}
			placeholder={`cliquer le nom de ${profileType}`}
			label=""
			clearable
			creatable
			getCreateLabel={(query) => `+ Ajouter ${query}`}
			onCreate={(q) => {
				const item = { value: q, label: q };
				return item;
			}}
		/>
	);
};

export default ActiveProfileSelect;
