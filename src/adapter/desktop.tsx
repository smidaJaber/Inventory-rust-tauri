import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { open } from "@tauri-apps/api/shell";
import { listen } from "@tauri-apps/api/event";
import { Stack, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { actions, store } from "~/store";
import { GrauAdapter } from "./base";
import { extractTypeList, printLog } from "~/util/helpers";
import { getActiveSurreal } from "~/surreal";
import { map } from "radash";
import { TableSchema, TableField, TableIndex, TableEvent } from "~/typings";

const WAIT_DURATION = 1000;

/**
 * Grau adapter   desktop app
 */
export class DesktopAdapter implements GrauAdapter {
	public isServeSupported = true;
	public isPinningSupported = true;
	public isOpenURLSupported = true;
	public isUpdateCheckSupported = true;
	public isPromotionSupported = false;

	#startTask: any;
	#isPinned = false;

	public constructor() {
		this.initDatabaseEvents();

		(window as any).invoke = invoke;

		document.addEventListener("DOMContentLoaded", () => {
			setTimeout(() => {
				appWindow.show();
			}, 500);
		});

		document.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});
	}

	public async setWindowTitle(title: string) {
		appWindow.setTitle(title || "Grau");
	}

	public loadConfig() {
		return invoke<string>("load_config");
	}

	public saveConfig(config: string) {
		return invoke<void>("save_config", {
			config,
		});
	}

	public async startDatabase(
		username: string,
		password: string,
		port: number,
		localDriver: string,
		localPath: string,
		surrealPath: string
	) {
		return invoke<void>("start_database", {
			username: username,
			password: password,
			port: port,
			driver: localDriver,
			storage: localPath,
			executable: surrealPath,
		});
	}

	public stopDatabase() {
		return invoke<void>("stop_database");
	}

	public async togglePinned() {
		this.#isPinned = !this.#isPinned;

		appWindow.setAlwaysOnTop(this.#isPinned);
	}

	public async openUrl(url: string) {
		open(url);
	}

	public async fetchSchema() {
		const surreal = getActiveSurreal();
		const dbResponse = await surreal.query("INFO FOR DB");
		const dbResult = dbResponse[0].result;

		if (!dbResult) {
			return [];
		}

		const databaseInfo = await map(
			Object.values(dbResult.tables ?? dbResult.tb),
			(definition) => {
				return invoke<TableSchema>("extract_table_definition", { definition });
			}
		);

		const tableQuery = databaseInfo.reduce((acc, table) => {
			return acc + `INFO FOR TABLE ${table.name};`;
		}, "");

		if (!tableQuery) {
			return [];
		}

		const tableData = await surreal.query(tableQuery);

		return map(databaseInfo, async (table, index) => {
			const tableInfo = tableData[index].result;

			const fieldInfo = await map(
				Object.values(tableInfo.fields ?? tableInfo.fd),
				(definition) => {
					return invoke<TableField>("extract_field_definition", { definition });
				}
			);

			const indexInfo = await map(
				Object.values(tableInfo.indexes ?? tableInfo.ix),
				(definition) => {
					return invoke<TableIndex>("extract_index_definition", { definition });
				}
			);

			const eventInfo = await map(
				Object.values(tableInfo.events ?? tableInfo.ev),
				(definition) => {
					return invoke<TableEvent>("extract_event_definition", { definition });
				}
			);

			const mappedFields = fieldInfo.map((field) => {
				let kind = field.kind;
				let kindTables: string[] = [];
				let kindGeometry: string[] = [];

				if (field.kind.startsWith("record")) {
					kindTables = extractTypeList(field.kind, "record");
					kind = "record";
				}

				if (field.kind.startsWith("geometry")) {
					kindGeometry = extractTypeList(field.kind, "geometry");
					kind = "geometry";
				}

				return {
					...field,
					kind,
					kindGeometry,
					kindTables,
				};
			});

			return {
				schema: table,
				fields: mappedFields,
				indexes: indexInfo,
				events: eventInfo,
			};
		});
	}

	public async validateQuery(query: string) {
		return invoke<string | null>("validate_query", { query });
	}

	public async validateWhereClause(clause: string) {
		return invoke<boolean>("validate_where_clause", { clause });
	}

	private initDatabaseEvents() {
		listen("database:start", () => {
			printLog("Runner", "#f2415f", "Received database start signal");

			this.#startTask = setTimeout(() => {
				store.dispatch(actions.confirmServing());

				showNotification({
					autoClose: 1500,
					color: "green.6",
					message: (
						<Stack spacing={0}>
							<Text weight={600}>Database started</Text>
							<Text color="light.5">Local database is now online</Text>
						</Stack>
					),
				});
			}, WAIT_DURATION);
		});

		listen("database:stop", () => {
			printLog("Runner", "#f2415f", "Received database stop signal");

			if (this.#startTask) {
				clearTimeout(this.#startTask);
			}

			store.dispatch(actions.stopServing());

			showNotification({
				autoClose: 1500,
				color: "red.6",
				message: (
					<Stack spacing={0}>
						<Text weight={600}>Database stopped</Text>
						<Text color="light.5">Local database is now offline</Text>
					</Stack>
				),
			});
		});

		listen("database:output", (event) => {
			store.dispatch(actions.pushConsoleLine(event.payload as string));
		});

		listen("database:error", (event) => {
			printLog("Runner", "#f2415f", "Received database error signal");

			const msg = event.payload as string;

			if (this.#startTask) {
				clearTimeout(this.#startTask);
			}

			store.dispatch(actions.stopServing());

			showNotification({
				color: "red.6",
				message: (
					<Stack spacing={0}>
						<Text weight={600}>Failed to start database</Text>
						<Text color="light.5">{msg}</Text>
					</Stack>
				),
			});
		});
	}
}
