import { Text } from "@mantine/core";
import { Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { uid } from "radash";
import { CSSProperties } from "react";
import { adapter } from "~/adapter";
import { VIEW_MODES } from "~/constants";
import { actions, store } from "~/store";

export const TRUNCATE_STYLE: CSSProperties = {
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
};

export function updateTitle() {
	const { isPinned, config } = store.getState();

	let title = "";

	if (config.activeTab) {
		const tab = config.tabs.find((t) => t.id === config.activeTab);

		if (tab) {
			const viewInfo = VIEW_MODES.find((v) => v.id === tab.activeView);

			title += `${tab.name} - Grau ${viewInfo?.name}`;
		}
	}

	if (isPinned) {
		title += " (Pinned)";
	}

	adapter.setWindowTitle(title);
}

export async function updateConfig() {
	return adapter.saveConfig(JSON.stringify(store.getState().config));
}

export function updateZoom() {
	const zoom = store.getState().config.zoomLevel;

	(document.documentElement.style as any).zoom = `${zoom}`;
}

export function watchNativeTheme() {
	const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

	store.dispatch(actions.setNativeTheme(mediaMatch.matches ? "dark" : "light"));

	mediaMatch.addEventListener("change", (event) => {
		store.dispatch(actions.setNativeTheme(event.matches ? "dark" : "light"));
	});
}

export function showError(title: string, subtitle: string) {
	showNotification({
		color: "red.6",
		message: (
			<Stack spacing={0}>
				<Text weight={600}>{title}</Text>
				<Text color="light.5">{subtitle}</Text>
			</Stack>
		),
	});
}

export function printLog(label: string, color: string, ...message: any[]) {
	console.log(`%c${label}:`, `color: ${color}; font-weight: bold`, ...message);
}

export function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}

export function extractTypeList(input: string, prefix: string) {
	return input
		.replace(`${prefix}<`, "")
		.replace(">", "")
		.split(",")
		.map((t) => t.trim());
}

export function newId() {
	return uid(5);
}

export function applyOrder<T>(items: T[], order: T[]) {
	let index = 0;

	return items.map((item) => {
		if (order.includes(item)) {
			return order[index++];
		}

		return item;
	});
}
