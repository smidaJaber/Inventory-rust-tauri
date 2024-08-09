import { useStoreValue } from "~/store";

 
export function useIsConnected() {
	return useStoreValue(state => state.isConnected);
}