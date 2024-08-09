import { Stack } from "@mantine/core";
import {
	createStyles,
	Text,
	Card,
	RingProgress,
	Group,
	MultiSelect,
} from "@mantine/core";
import FormattedNumber from "~/components/FormattedNumber";

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

interface PercentCircleCardProps {
	title: string;
	completed: number;
	total: number;
	stats: {
		value: number;
		label: string;
		isMoney?: boolean;
	}[];
}

export function PercentCircleCard({
	title,
	completed,
	total,
	stats,
}: PercentCircleCardProps) {
	const { classes, theme } = useStyles();
	const items = stats.map((stat) => (
		<div key={stat.label}>
			<FormattedNumber
				value={stat.value}
				className={classes.label}
				isMoney={stat.isMoney ?? false}
			/>
			<Text size="xs" color="dimmed">
				{stat.label}
			</Text>
		</div>
	));

	return (
		<Card withBorder p="xl" radius="md" className={classes.card}>
			<div className={classes.inner}>
				<div>
					<Text fz="xl" className={classes.label}>
						{title}
					</Text>

					<div>
						<FormattedNumber
							value={completed}
							className={classes.lead}
							mt={20}
							isMoney={stats.some((value) => value.isMoney) ?? false}
						/>
						<Text fz="xs" color="dimmed">
							Total
						</Text>
					</div>
					<Group mt="lg">{items}</Group>
				</div>

				<div className={classes.ring}>
					<RingProgress
						roundCaps
						thickness={6}
						size={100}
						sections={[
							{ value: (completed / total) * 100, color: theme.primaryColor },
						]}
						label={
							<div>
								<Text ta="center" fz="lg" className={classes.label}>
									{((completed / total) * 100).toFixed(0)}%
								</Text>
								<Text ta="center" fz="xs" c="dimmed">
									Total
								</Text>
							</div>
						}
					/>
				</div>
			</div>
		</Card>
	);
}
