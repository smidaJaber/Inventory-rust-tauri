import { Modal, SimpleGrid, Text } from "@mantine/core";
import {
	mdiAbjadHebrew,
	mdiAccountAlert,
	mdiBagSuitcase,
	mdiBank,
	mdiBoxShadow,
	mdiCardAccountDetails,
	mdiFileDocument,
	mdiFlaskEmpty,
	mdiFoodApple,
	mdiGarage,
	mdiHamburger,
	mdiHead,
	mdiHeadCog,
	mdiHomePlusOutline,
	mdiKeyWireless,
	mdiLoginVariant,
	mdiMapMarker,
	mdiOfficeBuilding,
	mdiSunAngle,
	mdiTruck,
} from "@mdi/js";
import React, { ReactNode, useEffect, useState } from "react";
import {
	getAllComptebancaires,
	getAllDepenses,
	getAllDocuments,
	getAllEmballages,
	getAllEntreprises,
	getAllEquipements,
	getAllFournisseurs,
	getAllLieustockages,
	getAllLieutravails,
	getAllLocals,
	getAllPaiements,
	getAllPersonnels,
	getAllProduits,
	getAllSaisons,
	getAllTypeproduits,
	getAllUsers,
	insertComptebancaire,
	insertDepense,
	insertDocument,
	insertEmballage,
	insertEntreprise,
	insertEquipement,
	insertFournisseur,
	insertLieustockage,
	insertLieutravail,
	insertLocal,
	insertPaiement,
	insertPersonnel,
	insertProduit,
	insertSaison,
	insertTypeproduit,
	insertUser,
} from "~/bindings";
import GestionListCard, {
	GestionListCardElement,
} from "~/components/Cards/GestionListCard";
import FormBuilder from "~/components/FormBuilder";
import ListOfData from "~/components/ListOfData";
import ListingPanel from "~/components/ListingPanel";
import { useStable } from "~/hooks/stable";
import { useStoreValue } from "~/store";

type GestionListViewProps = {};
type PanelListingData = {
	title: string;
	fetcherFunction: () => Promise<unknown>;
	dataset: any[];
};
const list_of_lists = [
	{ title: "Fournisseur", icon: mdiHead, color: "violet" },
	{ title: "Client", icon: mdiBagSuitcase, color: "indigo" },
	{ title: "Personnel", icon: mdiHeadCog, color: "blue" },
	{ title: "Produit", icon: mdiBoxShadow, color: "green" },
	{ title: "Caisse", icon: mdiFlaskEmpty, color: "teal" },
	{ title: "Emballage", icon: mdiFoodApple, color: "cyan" },
	{ title: "Matriel", icon: mdiKeyWireless, color: "pink" },
	{ title: "Paiement", icon: mdiCardAccountDetails, color: "red" },
	{ title: "Entreprise", icon: mdiOfficeBuilding, color: "orange" },
	{ title: "Categorie", icon: mdiAbjadHebrew, color: "red" },
	{ title: "Compte Bancaire", icon: mdiBank, color: "teal" },
	{ title: "Depense", icon: mdiAccountAlert, color: "gray" },
	{ title: "Document", icon: mdiFileDocument, color: "yellow" },
	{ title: "Lieu de stockage", icon: mdiGarage, color: "maginta" },
	{ title: "Lieu de travail", icon: mdiMapMarker, color: "pink" },
	{ title: "Equipement", icon: mdiTruck, color: "orange" },
	{ title: "Local", icon: mdiHomePlusOutline, color: "cyan" },
	{ title: "Saison", icon: mdiSunAngle, color: "blue" },
	{ title: "Type de produit", icon: mdiHamburger, color: "teal" },
	{ title: "Utilisateur", icon: mdiLoginVariant, color: "orange" },
];

const form_list = [
	{
		title: "Fournisseur",
		fetcherFunction: getAllFournisseurs,
		submitFunction: insertFournisseur,
	},
	{
		title: "Client",
		fetcherFunction: getAllFournisseurs,
		submitFunction: insertFournisseur,
	},
	{
		title: "Personnel",
		fetcherFunction: getAllPersonnels,
		submitFunction: insertPersonnel,
	},
	{
		title: "Produit",
		fetcherFunction: getAllProduits,
		submitFunction: insertProduit,
	},
	{
		title: "Caisse",
		fetcherFunction: () => [],
		submitFunction: insertFournisseur,
	},
	{
		title: "Emballage",
		fetcherFunction: getAllEmballages,
		submitFunction: insertEmballage,
	},
	{
		title: "Matriel",
		fetcherFunction: () => [],
		submitFunction: insertFournisseur,
	},
	{
		title: "Paiement",
		fetcherFunction: getAllPaiements,
		submitFunction: insertPaiement,
	},
	{
		title: "Entreprise",
		fetcherFunction: getAllEntreprises,
		submitFunction: insertEntreprise,
	},
	{
		title: "Categorie",
		fetcherFunction: () => [],
		submitFunction: insertFournisseur,
	},
	{
		title: "Compte Bancaire",
		fetcherFunction: getAllComptebancaires,
		submitFunction: insertComptebancaire,
	},
	{
		title: "Depense",
		fetcherFunction: getAllDepenses,
		submitFunction: insertDepense,
	},
	{
		title: "Document",
		fetcherFunction: getAllDocuments,
		submitFunction: insertDocument,
	},
	{
		title: "Lieu de stockage",
		fetcherFunction: getAllLieustockages,
		submitFunction: insertLieustockage,
	},
	{
		title: "Lieu de travail",
		fetcherFunction: getAllLieutravails,
		submitFunction: insertLieutravail,
	},
	{
		title: "Equipement",
		fetcherFunction: getAllEquipements,
		submitFunction: insertEquipement,
	},
	{
		title: "Local",
		fetcherFunction: getAllLocals,
		submitFunction: insertLocal,
	},
	{
		title: "Saison",
		fetcherFunction: getAllSaisons,
		submitFunction: insertSaison,
	},
	{
		title: "Type de produit",
		fetcherFunction: getAllTypeproduits,
		submitFunction: insertTypeproduit,
	},
	{
		title: "Utilisateur",
		fetcherFunction: getAllUsers,
		submitFunction: insertUser,
	},
];
function GestionListView({}: GestionListViewProps) {
	const [openModal, setOpenModal] = useState(false);
	const [itemInFocus, setItemInFocus] = useState({} as GestionListCardElement);
	const [panleListingData, setPanelListingData] = useState<any>({
		title: "",
		fetcherFunction: async () => {},
		dataset: [],
	} as PanelListingData);
	const handleClick = useStable((item: GestionListCardElement) => {
		setItemInFocus(item);
	});
	useEffect(() => {
		const data = form_list.find((frm, index) => frm.title == itemInFocus.title);
		setPanelListingData(data);
		setOpenModal(true);
	}, [itemInFocus]);

	return (
		<div>
			<SimpleGrid cols={1}>
				<GestionListCard
					elements={list_of_lists}
					maxList={99}
					perLine={9}
					handleOnClick={handleClick}
				/>
			</SimpleGrid>
			<Modal
				opened={openModal}
				onClose={() => setOpenModal(false)}
				withCloseButton
				withinPortal
				size={"auto"}
			>
				<ListingPanel
					FormComponent={
						<FormBuilder
							fetchDataFunction={
								(panleListingData && panleListingData.fetcherFunction) || null
							}
							submitFunction={
								(panleListingData && panleListingData.submitFunction) || null
							}
						/>
					}
					ListComponent={
						<ListOfData
							refreshId={0}
							activeTable={null}
							activeRecordId={null}
							onSelectRecord={function (id: string | null): void {
								throw new Error("Function not implemented.");
							}}
							onRequestCreate={function (): void {
								throw new Error("Function not implemented.");
							}}
							data={"listFournisseur"}
							fetcherFunction={
								(panleListingData && panleListingData.fetcherFunction) || null
							}
						/>
					}
					formSetting={{
						deletability: undefined,
						editable: undefined,
						modalForm: true,
					}}
					PanelTitle={(panleListingData && panleListingData.title) || ""}
					tableName={""}
					activeTable={""}
					refreshId={""}
					fetchDataFunction={
						(panleListingData && panleListingData.fetcherFunction) || null
					}
					onSelectRecord={function (id: string | null): void {
						throw new Error("Function not implemented.");
					}}
					data={[]}
				/>
			</Modal>
		</div>
	);
}

export default GestionListView;
