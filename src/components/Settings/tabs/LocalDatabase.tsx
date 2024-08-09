import {
	Stack,
	TextInput,
	NumberInput,
	Select,
	Group,
	Tooltip,
	Box,
} from "@mantine/core";
import { mdiInformation } from "@mdi/js";
import { Icon } from "~/components/Icon";
import { useStable } from "~/hooks/stable";
import { store, actions } from "~/store";
import { DriverType, GrauConfig } from "~/typings";
import { updateConfig } from "~/util/helpers";
import { Setting } from "../setting";

const DRIVERS = [
	{ label: "Memory", value: "memory" },
	{ label: "File storage", value: "file" },
	{ label: "TiKV cluster", value: "tikv" },
];

export interface ConnectionTabProps {
	config: GrauConfig;
}

export function LocalDatabaseTab({ config }: ConnectionTabProps) {
	const setLocalDriver = useStable((driver: string) => {
		store.dispatch(actions.setLocalDatabaseDriver(driver as DriverType));
		updateConfig();
	});

	const setLocalPath = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setLocalDatabaseStorage(e.target.value));
		updateConfig();
	});

	const setSurrealUser = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setSurrealUser(e.target.value));
		updateConfig();
	});

	const setSurrealPass = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setSurrealPass(e.target.value));
		updateConfig();
	});

	const setSurrealPort = useStable((value: number) => {
		store.dispatch(actions.setSurrealPort(value));
		updateConfig();
	});

	const setSurrealPath = useStable((e: React.ChangeEvent<HTMLInputElement>) => {
		store.dispatch(actions.setSurrealPath(e.target.value));
		updateConfig();
	});

	return (
		<Stack spacing="xs">
			<Setting label="DB admin user">
				<TextInput
					placeholder="root"
					value={config.surrealUser}
					onChange={setSurrealUser}
					w={250}
				/>
			</Setting>

			<Setting label="DB admin password">
				<TextInput
					placeholder="grau"
					value={config.surrealPass}
					onChange={setSurrealPass}
					w={250}
				/>
			</Setting>

			<Setting label="Port(local or Remote ??)">
				<NumberInput
					value={config.surrealPort}
					min={1}
					max={65_535}
					onChange={setSurrealPort}
					w={250}
				/>
			</Setting>

			{config.localDriver === "file" && (
				<Setting label="Emplacement de la BD">
					<TextInput
						placeholder="/path/to/database"
						value={config.localStorage}
						onChange={setLocalPath}
						w={250}
					/>
				</Setting>
			)}
		</Stack>
	);
}
