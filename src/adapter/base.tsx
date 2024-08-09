import { TableDefinition } from "~/typings";

export interface GrauAdapter {
	isServeSupported: boolean;

	isPinningSupported: boolean;

	isOpenURLSupported: boolean;

	isUpdateCheckSupported: boolean;

	isPromotionSupported: boolean;

	setWindowTitle(title: string): Promise<void>;

	loadConfig(): Promise<string>;

	saveConfig(config: string): Promise<void>;

	startDatabase(
		username: string,
		password: string,
		port: number,
		localDriver: string,
		localPath: string,
		surrealPath: string
	): Promise<void>;

	stopDatabase(): Promise<void>;

	togglePinned(): Promise<void>;

	openUrl(url: string): Promise<void>;

	fetchSchema(): Promise<TableDefinition[]>;

	validateQuery(query: string): Promise<string | null>;

	validateWhereClause(clause: string): Promise<boolean>;
}
