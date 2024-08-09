import { editor } from "monaco-editor";
import { baseEditorConfig } from "~/util/editor";
import { useEffect, useMemo, useState } from "react";
import { mdiCheck, mdiClose, mdiTablePlus } from "@mdi/js";
import {
	ActionIcon,
	Button,
	Divider,
	Group,
	Text,
	TextInput,
	Grid,
	Col,
	Flex,
	SimpleGrid,
	MultiSelect,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useIsLight } from "~/hooks/theme";
import { useStable } from "~/hooks/stable";
import { Panel } from "~/components/Panel";
import { Icon } from "~/components/Icon";
import { PercentBarCard } from "~/components/Cards/PercentBarCard";
import { useStoreValue } from "~/store";
import { ProfileGeneralCard } from "~/components/Cards/ProfileGeneralCard";
import { Box } from "@mantine/core";
import {
	GetTotauxResponse,
	Tableachat,
	getAllOppsAchatMultiDb,
	getAllRessAchatMultiDb,
	getAllTableachats,
	getAllTableressourceachats,
	getTotaux,
} from "~/bindings";
import { ProfileGeneralProductCard } from "~/components/Cards/ProfileGeneralProductCard";

const dataCaisse = {
	total: "3970",
	diff: 18,
	data: [
		{
			label: "Sages",
			count: "2041",
			part: 59,
			color: "yellow",
		},
		{
			label: "Normal",
			count: "1211",
			part: 35,
			color: "#03141a",
		},
		{
			label: "Autre",
			count: "318",
			part: 6,
			color: "#4fcdf7",
		},
	],
};
const dataMoney = {
	total: "3970",
	diff: -31,
	data: [
		{
			label: "Ougoing",
			count: "241 000",
			part: 70,
			color: "red",
		},
		{
			label: "Incoming",
			count: "78 000",
			part: 23,
			color: "green",
		},
		{
			label: "Autre",
			count: "6350",
			part: 7,
			color: "violet",
		},
	],
};
const dataGeneral_materiel = {
	title: "Produit",
	completed: 1887,
	total: 4564,
	stats: [
		{
			value: 447,
			label: "Entree",
		},
		{
			value: 76,
			label: "Sortie",
		},
		{
			value: 706,
			label: "Total",
		},
	],
	selectData: [
		[
			{
				label: "Tous",
				value: "Tous",
			},
			{
				label: "M1",
				value: "M1",
			},
			{ label: "M2", value: "M2" },
		],
		[
			{
				label: "Mat1",
				value: "Mat1",
			},
		],
	],
};
const dataGeneral_caisse = {
	title: "Caisse",
	completed: 72272,
	total: 25478,
	stats: [
		{
			value: 7555,
			label: "Plein",
		},
		{
			value: 1222,
			label: "Vide",
		},
		{
			value: 777,
			label: "Alors",
		},
	],
	selectData: [
		[
			{
				label: "Tous",
				value: "Tous",
			},
			{
				label: "Lame",
				value: "Lame",
			},
			{ label: "Plateau", value: "Plateau" },
			{ label: "Palox", value: "Palox" },
		],
		[
			{
				label: "CN",
				value: "CN",
			},
			{ label: "CS", value: "CS" },
			{ label: "CA", value: "CA" },
		],
	],
};
const dataGeneral_emballage = {
	title: "Emballage",
	completed: 738,
	total: 37877,
	stats: [
		{
			value: 447,
			label: "Couvercle",
		},
		{
			value: 378,
			label: "chikabika",
		},
		{
			value: 7893,
			label: "Total",
		},
	],
	selectData: [
		[
			{
				label: "Tous",
				value: "Tous",
			},
			{
				label: "EM001",
				value: "Branche",
			},
			{ label: "Emb002", value: "Vraq" },
		],
		[
			{
				label: "Couv",
				value: "Pack",
			},
		],
	],
};
const dataGeneral_produit = {
	title: "Unité",
	completed: 456,
	total: 6331,
	stats: [
		{
			value: 455,
			isMoney: true,
			label: "Cash",
		},
		{
			value: 5656,
			isMoney: true,
			label: "Cheque",
		},
		{
			value: 44,
			isMoney: true,
			label: "Virement",
		},
		{
			value: 4564566,
			isMoney: true,
			label: "Vercement",
		},
	],
	selectData: [
		[
			{
				label: "Tous",
				value: "Tous",
				group: "Produits",
			},
			{
				label: "Branche",
				value: "Branche",
				group: "Produits",
			},
			{ label: "Vraq", value: "Vraq", group: "Produits" },
			{ label: "2eme", value: "2eme", group: "Produits" },
		],
		[
			{
				label: "Virement",
				value: "Virement",
			},
			{ label: "Cash", value: "cash" },
		],
	],
};
export interface CreatorPaneProps {
	activeUser: string;
}

export function General({ activeUser }: CreatorPaneProps) {
	const isLight = useIsLight();
	const [isInvalid, setIsInvalid] = useState(false);
	const [totaux, setTotaux] = useState({} as GetTotauxResponse);

	const jsonAlert = isInvalid ? (
		<Text color="red">Invalid record JSON</Text>
	) : undefined;

	const prepTot = async () => {
		getAllOppsAchatMultiDb(null, null, ["db_all.db", "db_all_2.db"]).then(
			(AllOppsAchat) => {
				getAllRessAchatMultiDb(null, null, ["db_all.db", "db_all_2.db"]).then(
					(AllRessAchat) => {
						getTotaux({
							fc: "Fournisseur",
							id: parseInt(activeUser, 10).toString() ?? "tous",
							all_opps: [].concat.apply(
								[],
								AllOppsAchat.map((opp) => opp.data) as never[]
							) as Tableachat[],
							all_ress: [].concat.apply(
								[],
								AllRessAchat.map((opp) => opp.data) as never[]
							),
						}).then((tot) => {
							setTotaux(tot);
						});
					}
				);
			}
		);
	};
	useEffect(() => {
		prepTot();
	}, [activeUser]);

	return (
		<div>
			<SimpleGrid cols={2} mb={"xl"}>
				<ProfileGeneralProductCard />
				<ProfileGeneralCard
					title={""}
					selectData={dataGeneral_caisse.selectData}
					data={{
						title: "Caisse",
						completed: totaux.total_opp_caisse,
						total: dataGeneral_caisse.completed,
						stats: [
							{ label: "Pleine", value: totaux.total_opp_caisse },
							{ label: "Vide", value: totaux.total_opp_ress_caisse },
						],
					}}
					total={totaux.total_opp_caisse}
				/>
				<ProfileGeneralCard
					title={""}
					selectData={dataGeneral_emballage.selectData}
					data={{
						title: "Emballage",
						completed: totaux.total_opp_emb,
						total: dataGeneral_emballage.completed,
						stats: [
							{ label: "Pleine", value: totaux.total_opp_emb },
							{
								label: "Vide",
								value: totaux.total_opp_ress_emb,
							},
						],
					}}
					total={totaux.total_opp_emb}
				/>
				<ProfileGeneralCard
					title={""}
					selectData={dataGeneral_materiel.selectData}
					data={{
						title: "Materiel",
						completed:
							totaux.total_opp_mat1 +
							totaux.total_opp_mat2 -
							totaux.total_opp_ress_mat,
						total: totaux.total_opp_mat1 + totaux.total_opp_mat2,
						stats: [
							{
								label: "Pleine",
								value: totaux.total_opp_mat1 + totaux.total_opp_mat2,
							},
							{
								label: "Vide",
								value: totaux.total_opp_ress_mat,
							},
						],
					}}
					total={totaux.total_opp_mat1 + totaux.total_opp_mat2}
				/>
			</SimpleGrid>
			<Panel
				title="General"
				icon={mdiTablePlus}
				rightSection={
					<Group align="center">
						{jsonAlert && (
							<>
								{jsonAlert}
								<Divider
									orientation="vertical"
									color={isLight ? "light.0" : "dark.5"}
								/>
							</>
						)}

						<ActionIcon onClick={() => {}} title="Close creator">
							<Icon color="light.4" path={mdiClose} />
						</ActionIcon>
					</Group>
				}
			>
				<Grid>
					<Grid.Col md={6} lg={6}>
						<PercentBarCard
							data={dataMoney.data}
							total={dataMoney.total}
							diff={dataMoney.diff}
						/>
					</Grid.Col>
					<Grid.Col md={6} lg={6}>
						<PercentBarCard
							data={dataCaisse.data}
							total={dataCaisse.total}
							diff={dataCaisse.diff}
						/>
					</Grid.Col>
				</Grid>
				<Grid>
					<Grid.Col md={6} lg={6}>
						<PercentBarCard
							data={dataMoney.data}
							total={dataMoney.total}
							diff={dataMoney.diff}
						/>
					</Grid.Col>
					<Grid.Col md={6} lg={6}>
						<PercentBarCard
							data={dataCaisse.data}
							total={dataCaisse.total}
							diff={dataCaisse.diff}
						/>
					</Grid.Col>
				</Grid>
			</Panel>
		</div>
	);
}
