import { store } from "~/store";
import { SurrealConnection } from "~/surreal";

export function getActiveTab() {
	const { activeTab, tabs } = store.getState().config;

	return tabs.find((tab) => tab.id === activeTab);
}

export function createEmptyConnection(): SurrealConnection {
	return {
		endpoint: "",
		namespace: "",
		database: "",
		username: "",
		password: "",
		authMode: "root",
		scope: "",
		scopeFields: [],
	};
}

export function mergeConnections(
	left: Partial<SurrealConnection>,
	right: Partial<SurrealConnection>
): SurrealConnection {
	const leftFields = left.scopeFields || [];
	const rightFields = right.scopeFields || [];

	return {
		namespace: left.namespace || right.namespace || "",
		database: left.database || right.database || "",
		endpoint: left.endpoint || right.endpoint || "",
		username: left.username || right.username || "",
		password: left.password || right.password || "",
		authMode: left.authMode || right.authMode || ("" as any),
		scope: left.scope || right.scope || "",
		scopeFields: [...leftFields, ...rightFields],
	};
}

export function isConnectionValid(details: SurrealConnection | undefined) {
	if (!details) {
		return false;
	}

	return !!(
		details.endpoint &&
		details.namespace &&
		details.database &&
		details.username &&
		details.password &&
		details.authMode
	);
}
