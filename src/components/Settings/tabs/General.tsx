import { Stack, Select, ColorScheme, Switch } from "@mantine/core";
import { adapter } from "~/adapter";
import { useStable } from "~/hooks/stable";
import { actions, store } from "~/store";
import { GrauConfig } from "~/typings";
import { updateConfig } from "~/util/helpers";
import { Setting } from "../setting";

const THEMES = [
	{ label: "Automatique", value: "automatic" },
	{ label: "Light - Claire", value: "light" },
	{ label: "Dark - Sombre", value: "dark" },
];

export interface GeneralTabProps {
	config: GrauConfig;
}

export function GeneralTab({ config }: GeneralTabProps) {
	const setColorScheme = useStable((scheme: ColorScheme) => {
		store.dispatch(actions.setColorScheme(scheme));
		updateConfig();
	});

	const setTableSuggest = useStable(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			store.dispatch(actions.setTableSuggest(e.target.checked));
			updateConfig();
		}
	);

	const setErrorChecking = useStable(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			store.dispatch(actions.setErrorChecking(e.target.checked));
			updateConfig();
		}
	);

	const setWordWrap = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setWordWrap(e.target.checked));
		updateConfig();
	});

	const setTabSearch = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setTabSearch(e.target.checked));
		updateConfig();
	});

	const setUpdateChecker = useStable(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			store.dispatch(actions.setUpdateChecker(e.target.checked));
			updateConfig();
		}
	);

	return (
		<Stack spacing="xs">
			{adapter.isUpdateCheckSupported && (
				<Setting label="Mise à jour">
					<Switch checked={config.updateChecker} onChange={setUpdateChecker} />
				</Setting>
			)}

			<Setting label="alert de stock (en fonction de config ?)">
				<Switch checked={config.wordWrap} onChange={setWordWrap} />
			</Setting>

			<Setting label="Auto save et archivage (en fn de config, every 5min, 1h ..)">
				<Switch checked={config.errorChecking} onChange={setErrorChecking} />
			</Setting>

			<Setting label="Toujours afficher les solde general dans profile">
				<Switch checked={config.tabSearch} onChange={setTabSearch} />
			</Setting>

			<Setting label="Theme">
				<Select data={THEMES} value={config.theme} onChange={setColorScheme} />
			</Setting>
		</Stack>
	);
}
