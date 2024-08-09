import {
	createStyles,
	Card,
	Text,
	SimpleGrid,
	UnstyledButton,
	Anchor,
	Group,
} from "@mantine/core";
import { Icon } from "~/components/Icon";
const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
	},

	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		borderRadius: theme.radius.md,
		height: "100px",
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		transition: "box-shadow 150ms ease, transform 100ms ease",

		"&:hover": {
			boxShadow: theme.shadows.md,
			transform: "scale(1.05)",
		},
	},
}));

export type GestionListCardElement = {
	title: string;
	icon: string;
	color: string;
};
export interface GestionListCardProps {
	elements: GestionListCardElement[];
	maxList?: number;
	perLine?: number;
	handleOnClick: (item: GestionListCardElement) => void;
}

function GestionListCard({
	elements,
	maxList,
	perLine,
	handleOnClick,
}: GestionListCardProps) {
	const { classes, theme } = useStyles();

	const items = elements.slice(0, maxList).map((item) => (
		<UnstyledButton
			key={item.title}
			className={classes.item}
			onClick={() => handleOnClick(item)}
		>
			<Icon path={item.icon} color={item.color} size={"2rem"} />
			<Text size="xs" mt={7}>
				{item.title}
			</Text>
		</UnstyledButton>
	));

	return (
		<Card withBorder radius="md" className={classes.card}>
			<Group position="apart">
				<Text className={classes.title}>Listes</Text>
				{maxList && (
					<Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
						+ {elements.length - maxList} autre liste
					</Anchor>
				)}
			</Group>
			<SimpleGrid cols={perLine ?? 3} mt="md">
				{items}
			</SimpleGrid>
		</Card>
	);
}

export default GestionListCard;
