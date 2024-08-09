import { useStoreValue } from "~/store";
import { mergeConnections } from "~/util/environments";

 
export function useActiveTab() {
	const activeTab = useStoreValue(state => state.config.activeTab);
	const knownTabs = useStoreValue(state => state.config.tabs);

	return knownTabs.find(tab => tab.id === activeTab);
}
 
export function useTabsList() {
	return useStoreValue(state => state.config.tabs);
}

 
export function useEnvironmentList() {
	return useStoreValue(state => state.config.environments);
}
 
export function useConnectionDetails() {
	const tabInfo = useActiveTab();

	if (!tabInfo) {
		return null;
	}

	const environments = useEnvironmentList();
	const envInfo = environments.find(env => env.id === tabInfo.environment);

	return mergeConnections(tabInfo.connection, envInfo?.connection || {});
}