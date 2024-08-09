import React from "react";
import { Button, Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { store, actions, useStoreValue } from "~/store";
import { insertTableressourceachat } from "~/bindings";
type FormRessourceProps = {};

const FormRessource = (props: FormRessourceProps) => {
	const handleAddRessource = async () => {
		let newRessource = {
			date_ressource_achat: Intl.DateTimeFormat("fr").format(new Date()),
			idfornisseur: 1,
			montant: 15000,
			type_paiement: 2,
			nbr_cs: 250,
			nbr_cn: 0,
			nbr_ca: 0,
			type_caisse: 1,
			nbr_matriel: 0,
			type_matriel: 0,
			emballage: 0,
			nbr_emb: 0,
			nbr_cov: 0,
			nbr_fon: 0,
			information: "caisse cs yeah",
			lieu_stock: 0,
			iddoc: 0,
			iduser: 0,
		};
		let results = await insertTableressourceachat(newRessource);
		showNotification({
			autoClose: 1500,
			color: "green.6",
			message: (
				<Stack spacing={0}>
					<Text weight={600}>Nouveau ressource </Text>
					<Text color="light.5">
						un nouveau ressource a ete placée fammakia
					</Text>
				</Stack>
			),
		});
		showNotification({
			autoClose: 1500,
			color: "blue.6",
			message: (
				<Stack spacing={0}>
					<Text weight={600}>Result </Text>
					<Text color="light.5">{JSON.stringify(results)}</Text>
				</Stack>
			),
		});
	};
	return (
		<div>
			<Button onClick={handleAddRessource}>Add ressource</Button>
		</div>
	);
};

export default FormRessource;
