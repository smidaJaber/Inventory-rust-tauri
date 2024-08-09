import { useStoreValue } from "~/store";
 
export function useIsLight() {
	const colorScheme = useStoreValue(state => state.config.theme);
	const defaultScheme = useStoreValue(state => state.nativeTheme);
	const actualTheme = colorScheme == "automatic" ? defaultScheme : colorScheme;
	
	return actualTheme == 'light';
} 