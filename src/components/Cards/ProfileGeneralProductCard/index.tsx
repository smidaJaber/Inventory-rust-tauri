import { ActionIcon, Select, Text } from "@mantine/core";
import { createStyles, Group } from "@mantine/core";
import { mdiClose, mdiFilePlus, mdiInformation, mdiTablePlus } from "@mdi/js";
import { Icon } from "~/components/Icon";
import { Panel } from "~/components/Panel";
import { PercentCircleCard } from "../PercentCircleCard";
import { actions, store, useStoreValue } from "~/store";
import { ProfileCardNumbers, SelectedTous } from "~/typings";
import { useEffect, useMemo } from "react";
import { useInputState } from "@mantine/hooks";
import { useMakeSelectable } from "~/hooks/selectable";
import {
	profileActions,
	profileStore,
	useProfileStoreValue,
} from "~/stores/profileStore";
import { getAllPaiements, getAllProduits } from "~/bindings";
import { useQueries, useQuery } from "@tanstack/react-query";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	label: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		lineHeight: 1,
	},

	lead: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: "20px",
		lineHeight: 1,
	},

	inner: {
		display: "flex",

		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column",
		},
	},

	ring: {
		flex: 1,
		display: "flex",
		justifyContent: "flex-end",

		[theme.fn.smallerThan("xs")]: {
			justifyContent: "center",
			marginTop: theme.spacing.md,
		},
	},
}));

interface ProfileGeneralProductCardProps {}

const selectData_empty = [{ value: "empty", label: "Aucun element trouve" }];
const selectData_loading = [
	{ value: "loading", label: "Aucun element trouve" },
];
export function ProfileGeneralProductCard({}: ProfileGeneralProductCardProps) {
	const [selectedProduct, setSelectedProduct] = useInputState("tous");
	const [selectedPayment, setSelectedPayment] = useInputState("tous");

	const activeProfileType = "fournisseur";
	const activeProfile = useProfileStoreValue((state) => state.activeProfile);

	const start = null;
	const limit = null;

	const total = 12_250_111;
	const completed = 250_111;
	const stats = [
		{ value: 10_000_000, label: "Entree", isMoney: true },
		{ value: 1_500_000, label: "Sortie", isMoney: true },
		{ value: 500_000, label: "Solde", isMoney: true },
	];

	const { data: listProduct, isLoading: isLoadingProducts } = useQuery({
		queryKey: ["products", start, limit],
		queryFn: () => getAllProduits(start, limit),
		keepPreviousData: true,
	});
	const { data: listPayment, isLoading: isLoadingPayment } = useQuery({
		queryKey: ["products", start, limit],
		queryFn: () => getAllPaiements(start, limit),
		keepPreviousData: true,
	});

	const listProductData = useMakeSelectable(
		listProduct ?? [],
		"idproduit",
		"nom"
	);
	const listPaymentData = useMakeSelectable(
		listPayment ?? [],
		"idpaiement",
		"nom"
	);
	const handleAddToRapport = () => {
		const item: ProfileCardNumbers = {
			tableName: "produit",
			entree: stats[0].value,
			sortie: stats[1].value,
			select1: selectedProduct,
			select2: selectedPayment,
		};
		store.dispatch(actions.addToRapport(item));
	};
	useEffect(() => {
		profileStore.dispatch(
			profileActions.setSelectedProduit({
				selectedValue: parseInt(selectedProduct, 10) ?? "tous",
				selectedType: selectedPayment,
			})
		);
		setSelectedProduct(selectedProduct);
		setSelectedPayment(selectedPayment);
	}, [selectedProduct, selectedPayment]);

	return (
		<Panel
			title={"Produits"}
			icon={mdiTablePlus}
			leftSection={
				<Group>
					{isLoadingProducts && (
						<Select
							defaultValue={"loading"}
							data={[{ value: "loading", label: "Chargement.." }]}
						/>
					)}
					{!isLoadingProducts && (
						<Select
							w={120}
							size={"xs"}
							value={selectedProduct as string}
							onChange={setSelectedProduct}
							data={listProductData ?? selectData_empty}
							disabled={isLoadingPayment || isLoadingProducts}
							defaultValue={
								listProduct && listProduct?.length > 0 ? "tous" : "empty"
							}
						/>
					)}
					{isLoadingPayment && (
						<Select
							defaultValue={"loading"}
							data={[{ value: "loading", label: "Chargement.." }]}
						/>
					)}
					{!isLoadingPayment && (
						<Select
							w={120}
							size={"xs"}
							value={selectedPayment}
							onChange={setSelectedPayment}
							data={
								listPaymentData && listPaymentData?.length > 0
									? listPaymentData
									: selectData_empty
							}
							disabled={isLoadingPayment || isLoadingProducts}
							defaultValue={
								listPaymentData && listPaymentData?.length > 0
									? "tous"
									: "empty"
							}
						/>
					)}
				</Group>
			}
			rightSection={
				<Group align="center">
					<ActionIcon onClick={() => {}} title="Reset">
						<Icon color="light.4" path={mdiClose} />
					</ActionIcon>
					<ActionIcon onClick={handleAddToRapport} title="Ajouter au Rapport">
						<Icon color="light.4" path={mdiFilePlus} />
					</ActionIcon>
					<ActionIcon onClick={() => {}} title="Voir Détailles">
						<Icon color="light.4" path={mdiInformation} />
					</ActionIcon>
				</Group>
			}
		>
			<PercentCircleCard
				total={total}
				title={""}
				completed={completed}
				stats={stats}
			/>
		</Panel>
	);
}
