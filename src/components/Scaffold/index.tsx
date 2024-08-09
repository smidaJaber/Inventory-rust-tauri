import classes from "./style.module.scss";
import grauLogo from "~/assets/icon.png";
import {
	Badge,
	Box,
	Button,
	Center,
	Image,
	NavLink,
	Stack,
	Text,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { actions, store, useStoreValue } from "~/store";
import { useStable } from "~/hooks/stable";
import { uid } from "radash";
import { MouseEvent, PropsWithChildren, useEffect, useState } from "react";
import { mod, showError, updateConfig, updateTitle } from "~/util/helpers";
import { Toolbar } from "../Toolbar";
import { getSurreal, openSurreal } from "~/surreal";
import { useActiveTab } from "~/hooks/environment";
import { showNotification } from "@mantine/notifications";
import { useIsLight } from "~/hooks/theme";
import { Icon } from "../Icon";
import { Splitter, SplitValues } from "../Splitter";
import { ViewMode } from "~/typings";
import { useHotkeys } from "@mantine/hooks";
import { VIEW_MODES } from "~/constants";

import { adapter } from "~/adapter";
import { DesktopAdapter } from "~/adapter/desktop";
import { fetchDatabaseSchema } from "~/util/schema";
import { isConnectionValid, mergeConnections } from "~/util/environments";
import { useLater } from "~/hooks/later";
import { FournisseurView } from "~/views/fournisseur/fournisseurView";
import { AppShell, Navbar, Header } from "@mantine/core";
import { TabCreator } from "./creator";
import { PointageView } from "~/views/Pointage";
import GestionListView from "~/views/GestionList";
import { DesignerView } from "~/views/designer/DesignerView";
const SPLIT_SIZE: SplitValues = [100, 1024];
function ViewSlot(props: PropsWithChildren<{ visible: boolean }>) {
	return (
		<div style={{ display: props.visible ? "initial" : "none" }}>
			{props.children}
		</div>
	);
}
type MenuProps = {
	viewMode: string;
	isDesktop: boolean;
	isLight: boolean;
	setViewMode: (id: ViewMode) => unknown;
};
function TheMenu({ viewMode, isDesktop, setViewMode, isLight }: MenuProps) {
	return (
		<Stack spacing="xs">
			{VIEW_MODES.map((info) => {
				const isActive = info.id === viewMode;
				const isDisabled = !isDesktop && info.desktop;

				return (
					<Button
						key={info.id}
						w={180}
						px={0}
						h="unset"
						color={isActive ? "pink" : "blue"}
						variant={isActive ? "light" : "subtle"}
						className={classes.viewModeButton}
						onClick={() => setViewMode(info.id as ViewMode)}
						bg={isDisabled ? "transparent !important" : undefined}
						disabled={isDisabled}
					>
						<NavLink
							component="span"
							className={classes.viewModeContent}
							label={info.name}
							icon={
								<Icon
									color={isDisabled ? "light.5" : "surreal"}
									path={info.icon}
								/>
							}
							description={
								<Stack spacing={6}>
									{info.desc}
									{isDisabled && (
										<div>
											<Badge color="blue" variant="filled" radius="sm">
												Grau Desktop
											</Badge>
										</div>
									)}
								</Stack>
							}
							styles={{
								label: {
									color: isLight ? "black" : "white",
									fontWeight: 600,
								},
								description: {
									whiteSpace: "normal",
								},
							}}
						/>
					</Button>
				);
			})}
		</Stack>
	);
}
export function Scaffold() {
	const isLight = useIsLight();
	const theme = useMantineTheme();
	const activeTab = useStoreValue((state) => state.config.activeTab);
	const environments = useStoreValue((state) => state.config.environments);
	const autoConnect = useStoreValue((state) => state.config.autoConnect);
	const servePending = useStoreValue((state) => state.servePending);
	const isServing = useStoreValue((state) => state.isServing);
	const enableConsole = useStoreValue((state) => state.config.enableConsole);
	const isConnected = useStoreValue((state) => state.isConnected);
	const tabInfo = useActiveTab();

	const [isConnecting, setIsConnecting] = useState(false);
	const [isViewListing, setIsViewListing] = useState(false);
	const [splitValues, setSplitValues] = useState<SplitValues>(SPLIT_SIZE);
	const setIsConnected = useStable((value: boolean) => {
		store.dispatch(actions.setIsConnected(value));
	});

	const openConnection = useStable((e?: MouseEvent, silent?: boolean) => {
		e?.stopPropagation();

		if (isConnecting || !activeTab) {
			return;
		}

		try {
			openSurreal({
				connection: mergedInfoDetails,
				onConnect() {
					setIsConnecting(false);
					setIsConnected(true);
					fetchDatabaseSchema();
				},
				onDisconnect(code, reason) {
					setIsConnecting(false);
					setIsConnected(false);

					if (code != 1000 && !silent) {
						const subtitle =
							code === 1006
								? "Unexpected connection close"
								: reason || `Unknown reason`;

						showNotification({
							disallowClose: true,
							color: "red.4",
							bg: "red.6",
							message: (
								<div>
									<Text color="white" weight={600}>
										Connection Closed
									</Text>
									<Text color="white" opacity={0.8} size="sm">
										{subtitle} ({code})
									</Text>
								</div>
							),
						});
					}
				},
			});

			setIsConnecting(true);
		} catch (err: any) {
			showError("Failed to open connection", err.message);
		}
	});

	const scheduleConnect = useLater(openConnection);

	const sendQuery = useStable(async (override?: string) => {
		if (tabInfo?.activeView !== "query") {
			return;
		}

		if (!isConnected) {
			showNotification({
				message: "You must be connected to send a query",
			});
			return;
		}

		const { query, name } = tabInfo!;
		const variables = tabInfo!.variables
			? JSON.parse(tabInfo!.variables)
			: undefined;

		try {
			const response = await getSurreal()?.query(
				override?.trim() || query,
				variables
			);

			store.dispatch(
				actions.updateTab({
					id: activeTab!,
					lastResponse: response,
				})
			);
		} catch (err: any) {
			store.dispatch(
				actions.updateTab({
					id: activeTab!,
					lastResponse: [
						{
							status: "ERR",
							detail: err.message,
						},
					],
				})
			);
		}

		store.dispatch(
			actions.addHistoryEntry({
				id: uid(5),
				query: query,
				tabName: name,
				timestamp: Date.now(),
			})
		);

		await updateConfig();
	});

	const closeConnection = useStable((e?: MouseEvent) => {
		e?.stopPropagation();
		getSurreal()?.close();
		setIsConnecting(false);
		setIsConnected(false);
	});

	const setViewMode = useStable((id: ViewMode) => {
		setIsViewListing(false);

		store.dispatch(
			actions.updateTab({
				id: activeTab!,
				activeView: id,
			})
		);

		updateConfig();
		updateTitle();
	});

	const revealConsole = useStable((e: MouseEvent) => {
		e.stopPropagation();
		store.dispatch(actions.setConsoleEnabled(true));
	});

	const openTabCreator = useStable((envId?: string) => {
		store.dispatch(
			actions.openTabCreator({
				environment: envId,
			})
		);
	});

	const createNewTab = useStable(() => {
		openTabCreator();
	});

	const openTabEditor = useStable(() => {
		if (!tabInfo) {
			return;
		}

		store.dispatch(actions.openTabEditor(tabInfo.id));
	});

	const handleActiveChange = useStable(async () => {
		if (isConnected) {
			getSurreal()?.close();
		}

		await updateConfig();

		if (autoConnect) {
			openConnection();
		}
	});

	const envInfo = environments.find((e) => e.id === tabInfo?.environment);
	const mergedInfoDetails = mergeConnections(
		tabInfo?.connection || {},
		envInfo?.connection || {}
	);
	const detailsValid = isConnectionValid(mergedInfoDetails);

	const showConsole = enableConsole && (servePending || isServing);
	const borderColor = theme.fn.themeColor(
		isConnected ? "surreal" : detailsValid ? "light" : "red"
	);
	const viewMode = tabInfo?.activeView || "query";
	const viewInfo = VIEW_MODES.find((v) => v.id == viewMode)!;
	const isDesktop = adapter instanceof DesktopAdapter;

	const handleSendQuery = useStable((e: MouseEvent) => {
		e.stopPropagation();
		sendQuery();
	});

	const relativeViewMode = useStable((value: number) => {
		let available = VIEW_MODES;

		if (!(adapter instanceof DesktopAdapter)) {
			available = available.filter((v: any) => !v.desktop) as any;
		}

		const current = available.findIndex((v: any) => v.id == viewMode);
		const next = mod(current + value, available.length);

		setViewMode(VIEW_MODES[next].id);
	});

	useEffect(() => {
		if (activeTab && autoConnect) {
			if (detailsValid) {
				openConnection(undefined, true);
			} else {
				closeConnection();
			}
		}
	}, [autoConnect, activeTab]);

	useHotkeys(
		[
			[
				"ctrl+arrowLeft",
				() => {
					relativeViewMode(-1);
				},
			],
			[
				"ctrl+arrowRight",
				() => {
					relativeViewMode(1);
				},
			],
		],
		[]
	);

	useHotkeys([
		["F9", () => sendQuery()],
		["mod+Enter", () => sendQuery()],
	]);

	return (
		<div className={classes.root}>
			{activeTab ? (
				<AppShell
					padding="md"
					navbar={
						<Navbar width={{ base: 200 }} height={900} p="xs">
							<TheMenu
								isLight
								isDesktop
								setViewMode={setViewMode}
								viewMode={viewMode}
							/>
						</Navbar>
					}
					header={
						<Header height={70} p="xs">
							<Toolbar
								viewMode={viewMode}
								openConnection={scheduleConnect}
								closeConnection={closeConnection}
								onCreateTab={openTabCreator}
								onSaveEnvironments={scheduleConnect}
							/>
						</Header>
					}
					styles={(theme) => ({
						main: {
							backgroundColor:
								theme.colorScheme === "dark"
									? theme.colors.dark[8]
									: theme.colors.gray[0],
						},
					})}
				>
					<Box>
						<ViewSlot visible={viewMode == "profileF"}>
							<FournisseurView />
						</ViewSlot>
						<ViewSlot visible={viewMode == "pointage"}>
							<PointageView />
						</ViewSlot>
						<ViewSlot visible={viewMode == "lists"}>
							<GestionListView />
						</ViewSlot>
						<ViewSlot visible={viewMode == "designer"}>
							<DesignerView />
						</ViewSlot>
					</Box>
				</AppShell>
			) : (
				<Center h="100%">
					<div>
						<Image
							className={classes.emptyImage}
							src={grauLogo}
							width={120}
							mx="auto"
						/>
						<Title color="light" align="center" mt="md">
							Grau
						</Title>
						<Text color="light.2" align="center">
							Open or create a new session to continue
						</Text>
						<Center mt="lg">
							<Button size="xs" onClick={createNewTab}>
								Create tab
							</Button>
						</Center>
					</div>
				</Center>
			)}
			<TabCreator />
			{/* 

			<TabEditor onActiveChange={handleActiveChange} /> */}
		</div>
	);
}
