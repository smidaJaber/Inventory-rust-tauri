import { useState, PropsWithChildren } from "react";
import { useStoreValue } from "~/store";
import { Panel } from "~/components/Panel";
import {
	MultiSelect,
	ActionIcon,
	Group,
	Tabs,
	Container,
	Badge,
} from "@mantine/core";
import {
	mdiNaturePeople,
	mdiCog,
	mdiDatabase,
	mdiSecurity,
	mdiPrinter,
	mdiViewModule,
} from "@mdi/js";
import { Icon } from "~/components/Icon";
import { useStable } from "~/hooks/stable";
import { ProfileViewMode, ViewMode } from "~/typings";
import { General } from "../general";
import { useInputState } from "@mantine/hooks";
import Fournisseur from "~/components/fournisseurs";
import { Ressources } from "../ressources";
import {
	FormattedDataResults,
	Fournisseur as TFournisseur,
} from "../../../bindings";
import { SelectItem } from "@mantine/core";
import { TablesPane } from "~/components/TablesPane";
import { DetailsTabProfile } from "../details";
import { useSelector } from "react-redux";
import ActiveProfileSelect from "~/components/ActiveProfileSelect";
export interface FournisseurViewProps {}

const fournisseurs = [
	{ label: "djouber", value: "jbr" },
	{ label: "ali", value: "alli" },
];
function ViewSlot(props: PropsWithChildren<{ visible: boolean }>) {
	if (!props.visible) {
		return <div></div>;
	}
	return (
		<div style={{ display: props.visible ? "initial" : "none" }}>
			{props.children}
		</div>
	);
}

export function FournisseurView(props: FournisseurViewProps) {
	const [activeProfileF, setActiveProfileF] = useInputState(["0"]);
	const [ProfileViewMode, setViewMode] = useState("general");

	const listFournisseurs = useStoreValue((state) =>
		state.listFournisseur.map((el) => {
			let list;
			if (Object.hasOwn(el, "dbname")) {
				list = el as FormattedDataResults;
				return list.data
					.map((dt: TFournisseur) => ({
						label: dt.nom?.toString(),
						value: dt.idfournisseur_prod?.toString(),
					}))
					.flat();
			}
			list = el as TFournisseur;
			return {
				label: list.nom.toString(),
				value: list.idfournisseur_prod.toString(),
			};
		})
	);
	const setProfileViewMode = useStable((idTab: ProfileViewMode) => {
		setViewMode(idTab);
	});
	const RapportData = useSelector(
		(state: any) => state.rapportProfileFournisseur
	);
	return (
		<Group>
			<Panel
				style={{
					position: "sticky",
					top: 60,
					zIndex: 10,
				}}
				withBorder
				title="Profile Fournisseur"
				leftSection={
					<ActiveProfileSelect
						data={listFournisseurs.flat() as SelectItem[]}
						profileType="fournisseur"
					/>
				}
				icon={mdiNaturePeople}
				rightSection={
					<Group align="center">
						<Badge size="lg" mr={0}>
							{RapportData.length}
						</Badge>
						<ActionIcon title="Rapport" ml={0} pl={0}>
							<Icon color="light.4" path={mdiPrinter} />
						</ActionIcon>

						<ActionIcon title="Mode Affichage">
							<Icon color="light.4" path={mdiViewModule} />
						</ActionIcon>
						<ActionIcon title="Paramètre profile fournisseur">
							<Icon color="light.4" path={mdiCog} />
						</ActionIcon>
					</Group>
				}
			>
				<Tabs defaultValue="general">
					<Tabs.List position="center" defaultValue="general">
						<Tabs.Tab
							value="general"
							onClick={() => setProfileViewMode("general")}
						>
							General
						</Tabs.Tab>
						<Tabs.Tab
							value="Détails"
							onClick={() => setProfileViewMode("details")}
						>
							Détaille
						</Tabs.Tab>
						<Tabs.Tab
							value="ressources"
							onClick={() => setProfileViewMode("ressources")}
						>
							Ressources
						</Tabs.Tab>
						<Tabs.Tab
							value="Facture"
							onClick={() => setProfileViewMode("facture")}
						>
							Facture
						</Tabs.Tab>
						<Tabs.Tab
							value="List"
							onClick={() => setProfileViewMode("listing")}
							ml="auto"
						>
							Liste
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</Panel>

			<ViewSlot visible={ProfileViewMode == "general"}>
				<General activeUser={activeProfileF[0]} />
			</ViewSlot>
			<ViewSlot visible={ProfileViewMode == "details"}>
				<DetailsTabProfile activeUser={activeProfileF[0]} />
			</ViewSlot>
			<ViewSlot visible={ProfileViewMode == "ressources"}>
				<Ressources activeUser={"1"} forFournisseur />
			</ViewSlot>

			<ViewSlot visible={ProfileViewMode == "facture"}>
				factures {activeProfileF}
			</ViewSlot>
			<ViewSlot visible={ProfileViewMode == "listing"}>
				<Fournisseur />
			</ViewSlot>
		</Group>
	);
}
