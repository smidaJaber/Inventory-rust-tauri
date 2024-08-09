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
	Center,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import {
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	ReactPortal,
	useEffect,
	useState,
} from "react";
import { useIsLight } from "~/hooks/theme";
import { InheritAlert } from "../InheritAlert/interface";
import { Form } from "../Form";
import { Spacer } from "../Spacer";
import {
	NewFournisseur,
	NewTablepointage,
	insertFournisseur,
	insertTablepointage,
} from "~/bindings";
import { showNotification } from "@mantine/notifications";
import { actions, store, useStoreValue } from "~/store";
export type FormPointageProps = {};
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

const FormPointage = ({}: FormPointageProps) => {
	const { classes } = useStyles();
	const isLight = useIsLight();
	const [editMode, seteditMode] = useState(false);

	const listPersonnel = useStoreValue((state) =>
		state.listPersonnel.map((personnel) => ({
			...personnel,
			form_jour: 0,
			form_heur: 0,
			form_qte: 0,
			form_category: "0",
			form_lieu_travail: "0",
			form_avance: 0,
			form_montant: 0,
			form_info: "",
			form_total_montant: 0,
			form_total_avance: 0,
			form_total_solde: 0,
		}))
	);
	const [listPersonnelActive, setListPersonnelActive] = useState(
		listPersonnel.filter(
			(personnel) => personnel.statut.toLowerCase() === "active"
		)
	);
	const handleReset = () => {};
	const handleEditMode = (ID: number) => {};
	const handleUpdatePointage = () => {};

	const handleSubmitNvPointage = async () => {
		let newDayPointage = {
			liste_pointage: "1,1,2",
			date_pointage: "14/01/2020",
			nbr_personnel: 50,
			montant: 0,
			avance: 0,
			lieutravail: "12",
			idcateg: "1",
			information: "info",
			iduser: 1,
		} as NewTablepointage;
		let results = await insertTablepointage(newDayPointage);
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
		store.dispatch(actions.getListPointage());
	};
	const handlePropertyChange = (
		index: number,
		propertyName: string,
		value: string
	) => {
		setListPersonnelActive((prevList: any) => {
			const newList = [...prevList];
			newList[index][propertyName] = value;

			const prix_h = newList[index].prix_h ?? 0;
			const prix_j = newList[index].prix_j ?? 0;
			const prix_qte = newList[index].prix_qte ?? 0;
			let jour = parseInt(newList[index].form_jour, 10) ?? 0;
			jour *= prix_j;
			let heur = parseInt(newList[index].form_heur, 10) ?? 0;
			heur *= prix_h;
			let qte = parseInt(newList[index].form_qte, 10) ?? 0;
			qte *= prix_qte;

			newList[index].form_total_montant = jour + heur + qte;

			return newList;
		});
	};
	useEffect(() => {
		store.dispatch(actions.getListPersonnel());
	}, []);

	return (
		<div>
			<InheritAlert visible={true} environment={"env grau"} />

			<Form onSubmit={editMode ? handleUpdatePointage : handleSubmitNvPointage}>
				{listPersonnelActive.length ? (
					listPersonnelActive.map(
						(
							personnel: {
								statut: string;
								nom_prenom:
									| string
									| number
									| boolean
									| ReactElement<any, string | JSXElementConstructor<any>>
									| ReactFragment
									| ReactPortal
									| null
									| undefined;
								form_jour: string | number | readonly string[] | undefined;
								form_heur: string | number | readonly string[] | undefined;
								form_qte: string | number | readonly string[] | undefined;
								form_category: string | null | undefined;
								form_lieu_travail: string | null | undefined;
								prix_h: number;
								prix_j: number;
								prix_u: number;
								form_avance: string | number | readonly string[] | undefined;
								form_info: string | number | readonly string[] | undefined;
								form_total_montant:
									| string
									| number
									| readonly string[]
									| undefined;
								form_total_avance:
									| string
									| number
									| readonly string[]
									| undefined;
								form_total_solde:
									| string
									| number
									| readonly string[]
									| undefined;
							},
							index: number
						) => {
							if (personnel.statut !== "active") return;
							return (
								<SimpleGrid cols={12}>
									<Text>{personnel.nom_prenom}</Text>
									<TextInput
										value={personnel.form_jour}
										onChange={(e) =>
											handlePropertyChange(
												index,
												"form_jour",
												e.currentTarget.value
											)
										}
										placeholder="jour"
									/>

									<TextInput
										value={personnel.form_heur}
										onChange={(e) =>
											handlePropertyChange(
												index,
												"form_heur",
												e.currentTarget.value
											)
										}
										placeholder="Heur"
									/>

									<TextInput
										value={personnel.form_qte}
										onChange={(e) =>
											handlePropertyChange(
												index,
												"form_qte",
												e.currentTarget.value
											)
										}
										placeholder="Qte"
									/>
									<Select
										value={personnel.form_category}
										data={[{ value: "c1", label: "categorie 1" }]}
									/>
									<Select
										value={personnel.form_lieu_travail}
										data={[{ value: "lt1", label: "Lieu travail 1" }]}
									/>

									<Text className="BTNTODELETE">
										{personnel.form_total_montant}
									</Text>

									<TextInput
										value={personnel.form_avance}
										onChange={(e) =>
											handlePropertyChange(
												index,
												"form_avance",
												e.currentTarget.value
											)
										}
										placeholder="avance"
									/>
									<TextInput
										value={personnel.form_info}
										onChange={(e) =>
											handlePropertyChange(
												index,
												"form_info",
												e.currentTarget.value
											)
										}
										placeholder="information"
									/>

									<TextInput
										value={personnel.form_total_montant}
										placeholder="montantPp"
									/>
									<TextInput
										value={personnel.form_total_avance}
										placeholder="avancePp"
									/>
									<TextInput
										value={personnel.form_total_solde}
										placeholder="soldePp"
									/>
								</SimpleGrid>
							);
						}
					)
				) : (
					<Center h="90%" c="light.5">
						Aucun personnel active trouvé
					</Center>
				)}

				<SimpleGrid cols={12}>
					<Stack>
						<Text>Tot:0</Text>
						<Text>Ac:0</Text>
						<Text>Pr:0</Text>
					</Stack>

					<Text>--</Text>
					<Text>--</Text>
					<Text>--</Text>
					<Text>--</Text>
					<Text>--</Text>
					<Text>total montant</Text>
					<Text>total avance</Text>
					<Text>total montant</Text>
					<Text>total avance</Text>
					<Text>sold pointage total</Text>
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
					<Button type="submit">
						{editMode ? "Mettre à jour" : "Ajouter"}
					</Button>
				</Group>
			</Form>
		</div>
	);
};

export default FormPointage;
