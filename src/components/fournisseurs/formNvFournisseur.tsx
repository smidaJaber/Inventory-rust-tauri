import {
	Button,
	Group,
	Select,
	SimpleGrid,
	Stack,
	TextInput,
	Textarea,
	createStyles,
	Text,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { InheritAlert } from "../InheritAlert/interface";
import { Form } from "../Form";
import { Spacer } from "../Spacer";
import { NewFournisseur, insertFournisseur } from "~/bindings";
import { showNotification } from "@mantine/notifications";
import { actions, store, useStoreValue } from "~/store";
export type FormFournisseurProps = {};
const useStyles = createStyles((theme) => ({
	root: {
		position: "relative",
	},

	input: {
		height: "20px",
		paddingTop: "12px",
	},

	label: {
		opacity: "0.7",
		position: "absolute",
		pointerEvents: "none",
		fontSize: theme.fontSizes.xs,
		paddingLeft: theme.spacing.sm,
		paddingTop: `calc(${theme.spacing.sm} / 2)`,
		zIndex: 1,
	},
}));

const FormFournisseur = ({}: FormFournisseurProps) => {
	const { classes } = useStyles();
	const isLight = useIsLight();
	const [typeFournisseur, settypeFournisseur] = useInputState("");
	const [specialite, setspecialite] = useInputState("");
	const [nomFournisseur, setnomFournisseur] = useInputState("");
	const [matricule, setmatricule] = useInputState("");
	const [RIB, setRIB] = useInputState("");
	const [mobile, setmobile] = useInputState("");
	const [fixe, setfixe] = useInputState("");
	const [fax, setfax] = useInputState("");
	const [email, setemail] = useInputState("");
	const [adressFournissuer, setadressFournissuer] = useInputState("");
	const [noteFournisseur, setnoteFournisseur] = useInputState("");
	const [statutFournisseur, setstatutFournisseur] = useInputState("");
	const [infoFournisseur, setinfoFournisseur] = useInputState("");
	const [msgAddRequest, setmsgAddRequest] = useInputState("");
	const [msgColor, setmsgColor] = useInputState("");
	const [btnAddDisabled, setbtnAddDisabled] = useState(true);
	const [editMode, seteditMode] = useState(false);
	const handleReset = () => {};
	const handleEditMode = (ID: number) => {};
	const handleUpdateFournisseur = () => {};

	const handleSubmitNvFournisseur = async () => {
		let newFournisseur = {
			nom: nomFournisseur,
			adresse: adressFournissuer,
			tel_mob: mobile,
			tel_fix: fixe,
			mail: email,
			fax: fax,
			specialite: specialite,
			note: noteFournisseur,
			rib: RIB,
			matricule: matricule,
			date_creation: Intl.DateTimeFormat("fr").format(new Date()),
			ajouter_par: 1,
			statut: statutFournisseur,
			information: infoFournisseur,
			type_fornisseur: typeFournisseur,
			iduser: 1,
		} as NewFournisseur;
		let results = await insertFournisseur(newFournisseur);
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
		store.dispatch(actions.getListFournisseur());
	};

	return (
		<div>
			<InheritAlert visible={true} environment={"env grau"} />

			<Form
				onSubmit={
					editMode ? handleUpdateFournisseur : handleSubmitNvFournisseur
				}
			>
				<SimpleGrid cols={4}>
					<TextInput
						classNames={classes}
						label="Nom Complet"
						value={nomFournisseur}
						onChange={setnomFournisseur}
						autoFocus
						mb="lg"
					/>
					<Select
						classNames={classes}
						withinPortal
						label="Type"
						data={["Fournisseur de produits", "Fournisseur diver"]}
						value={typeFournisseur}
						onChange={settypeFournisseur}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="Specialite"
						value={specialite}
						onChange={setspecialite}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="Matricule"
						value={matricule}
						onChange={setmatricule}
						autoFocus
						mb="lg"
					/>
				</SimpleGrid>

				<SimpleGrid cols={3}>
					<TextInput
						classNames={classes}
						label="RIB"
						value={RIB}
						onChange={setRIB}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="E-mail"
						value={email}
						onChange={setemail}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="Adresse"
						value={adressFournissuer}
						onChange={setadressFournissuer}
						autoFocus
						mb="lg"
					/>
				</SimpleGrid>

				<SimpleGrid cols={6}>
					<TextInput
						classNames={classes}
						label="Mobile"
						value={mobile}
						onChange={setmobile}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="Fixe"
						value={fixe}
						onChange={setfixe}
						autoFocus
						mb="lg"
					/>
					<TextInput
						classNames={classes}
						label="Fax"
						value={fax}
						onChange={setfax}
						autoFocus
						mb="lg"
					/>

					<Select
						classNames={classes}
						withinPortal
						label="Note"
						data={["Faible", "Moyen", "Fort"]}
						value={noteFournisseur}
						onChange={setnoteFournisseur}
						autoFocus
						mb="lg"
					/>
					<Select
						classNames={classes}
						withinPortal
						label="Statut"
						data={["Actif", "Inactif"]}
						value={statutFournisseur}
						onChange={setstatutFournisseur}
						autoFocus
						mb="lg"
					/>
				</SimpleGrid>

				<Textarea
					minRows={2}
					maxRows={4}
					label="Information"
					value={infoFournisseur}
					onChange={setinfoFournisseur}
					autoFocus
					mb="lg"
				/>
				<Group mt="lg">
					<Button
						onClick={() => {}}
						color={isLight ? "light.5" : "light.3"}
						variant="light"
					>
						Annuler
					</Button>
					<Spacer />
					<Button type="submit">
						{editMode ? "Mettre à jour" : "Ajouter"}
					</Button>
				</Group>
			</Form>
		</div>
	);
};

export default FormFournisseur;
