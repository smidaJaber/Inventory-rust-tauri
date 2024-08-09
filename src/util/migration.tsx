import { Open, GrauConfig } from "~/typings";

export function migrateConfig(config: Open<GrauConfig>) {
	// 1.6.0
	for (const tab of config.tabs) {
		if (!tab.activeView) {
			tab.activeView = "query";
		}

		if (tab.connection.scopeFields === undefined) {
			if (tab.connection.authMode == "scope") {
				tab.connection.scopeFields = [
					{ subject: "user", value: tab.connection.username },
					{ subject: "pass", value: tab.connection.password },
				];
			} else {
				tab.connection.scopeFields = [];
			}
		}
	}

	// 1.7.0 (version 3) // remember to migrate old version of GRAU !!!!!!!!!!!!!!!!!!!
	for (const tab of config.tabs) {
		if (!tab.environment) {
			tab.environment = config.environments[0].id;
			tab.pinned = false;
		}
	}
}
