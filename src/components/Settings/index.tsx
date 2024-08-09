import {
	Button,
	Divider,
	Group,
	Modal,
	Paper,
	Stack,
	Tabs,
	Text,
	Title,
} from "@mantine/core";
import { useStoreValue } from "~/store";

import { Icon } from "../Icon";
import { mdiCog } from "@mdi/js";
import { useIsLight } from "~/hooks/theme";
import { useStable } from "~/hooks/stable";
import { PropsWithChildren, useState } from "react";
import { adapter } from "~/adapter";
import { Spacer } from "../Spacer";
import { runUpdateChecker } from "~/util/updater";
import { GeneralTab } from "./tabs/General";
import { LocalDatabaseTab } from "./tabs/LocalDatabase";

function SectionTitle({
	isLight,
	children,
	first,
}: PropsWithChildren<{ isLight: boolean; first?: boolean }>) {
	return (
		<>
			<Title
				mt={first ? 0 : 38}
				mb={6}
				size={14}
				weight={600}
				color={isLight ? "black" : "white"}
			>
				{children}
			</Title>

			<Divider color={isLight ? "light.0" : "dark.5"} mb="sm" />
		</>
	);
}

export function Settings() {
	const isLight = useIsLight();
	const config = useStoreValue((state) => state.config);
	const [showSettings, setShowSettings] = useState(false);

	const version = import.meta.env.VERSION;
	const author = import.meta.env.AUTHOR;

	const openSettings = useStable(() => {
		setShowSettings(true);
	});

	const closeSettings = useStable(() => {
		setShowSettings(false);
	});

	const checkForUpdates = useStable(() => {
		runUpdateChecker(config.lastPromptedVersion, true);
		closeSettings();
	});

	return (
		<>
			<Button
				color={isLight ? "light.0" : "dark.4"}
				onClick={openSettings}
				title="Settings"
				px="xs"
			>
				<Icon path={mdiCog} color={isLight ? "light.8" : "white"} />
			</Button>

			<Modal
				opened={showSettings}
				onClose={closeSettings}
				size={580}
				title={
					<Title size={16} color={isLight ? "light.6" : "white"}>
						Settings
					</Title>
				}
			>
				{adapter.isPromotionSupported && (
					<Paper
						mb="xl"
						c="white"
						sx={(theme) => ({
							background: `url(/desktop.png), ${theme.fn.gradient()}`,
							overflow: "hidden",
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center right",
						})}
					>
						<Stack spacing="xs" p="md">
							<Text size="xl" weight={600}>
								Grau Desktop
							</Text>
							<Text style={{ maxWidth: "80%" }}>
								Download Grau for desktop to gain additional features including
								database running and offline support.
							</Text>
							<div>
								<a
									href="https://github.com/bensmidajaber/Grau/releases"
									target="_blank"
								>
									<Button color="light.0" variant="outline">
										Download
									</Button>
								</a>
							</div>
						</Stack>
					</Paper>
				)}

				<Tabs defaultValue="general">
					<Tabs.List mb="md">
						<Tabs.Tab value="general">General</Tabs.Tab>

						{adapter.isServeSupported && (
							<Tabs.Tab value="database">Database - Archive</Tabs.Tab>
						)}
					</Tabs.List>

					<Tabs.Panel value="general" pt="xs">
						<GeneralTab config={config} />
					</Tabs.Panel>

					<Tabs.Panel value="database" pt="xs">
						<LocalDatabaseTab config={config} />
					</Tabs.Panel>
				</Tabs>

				<Group mt="xl" position="center">
					<Text color={isLight ? "light.4" : "dark.3"}>
						Version {version} by {author}
					</Text>
					<Spacer />
					<Button variant="subtle" onClick={checkForUpdates}>
						Check for updates
					</Button>
				</Group>
			</Modal>
		</>
	);
}
