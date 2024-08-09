import {
	ActionIcon,
	Badge,
	NativeSelect,
	Select,
	SelectItem,
	Stack,
} from "@mantine/core";
import {
	createStyles,
	Text,
	Card,
	RingProgress,
	Group,
	MultiSelect,
} from "@mantine/core";
import { mdiClose, mdiFilePlus, mdiInformation, mdiTablePlus } from "@mdi/js";
import { Icon } from "~/components/Icon";
import { Panel } from "~/components/Panel";
import { PercentBarCard } from "../PercentBarCard";
import { PercentCircleCard } from "../PercentCircleCard";
import { group } from "console";
import { actions, store, useStoreValue } from "~/store";
import { ProfileCardNumbers } from "~/typings";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useStable } from "~/hooks/stable";

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

interface ProfileGeneralCardProps {
	title: string;
	data: {
		title: string;
		completed: number;
		total: number;
		stats: {
			value: number;
			label: string;
			isMoney?: boolean;
		}[];
	};
	selectData?: {
		label: string;
		value: string;
		disabled?: boolean;
		group?: string;
	}[][];

	total: number;
}

export function ProfileGeneralCard({
	title,
	data,
	selectData,
	total,
}: ProfileGeneralCardProps) {
	const [selectedOne, setSelectedOne] = useState("tous");
	const [selectedTwo, setSelectedTwo] = useState("tous");
	const RapportData = useSelector(
		(state: any) => state.rapportProfileFournisseur
	);
	const handleChangeSelectOne = useStable((value: string | null) => {
		setSelectedOne(value ?? "tous");
	});
	const handleChangeSelectTwo = useStable((value: string | null) => {
		setSelectedTwo(value ?? "tous");
	});
	const handleAddToRapport = () => {
		const item: ProfileCardNumbers = {
			tableName: data.title.toLowerCase(),
			entree: data.stats[0].value,
			sortie: data.stats[1].value,
			select1: selectedOne,
			select2: selectedTwo,
		};
		store.dispatch(actions.addToRapport(item));
		console.log(item, "data:", RapportData);
	};
	return (
		<Panel
			title={data.title}
			icon={mdiTablePlus}
			leftSection={
				<Group>
					<Select
						w={120}
						size={"xs"}
						value={selectedOne}
						onChange={handleChangeSelectOne}
						data={selectData ? (selectData[0] as SelectItem[]) : []}
					/>
					<Select
						w={120}
						size={"xs"}
						value={selectedTwo}
						onChange={handleChangeSelectTwo}
						data={selectData ? (selectData[1] as SelectItem[]) : []}
					/>
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
				completed={data.completed}
				stats={data.stats}
			/>
		</Panel>
	);
}
