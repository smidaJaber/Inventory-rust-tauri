import { editor } from "monaco-editor";
import { baseEditorConfig } from "~/util/editor";
import { useEffect, useMemo, useState } from "react";
import { mdiCheck, mdiClose, mdiTablePlus } from "@mdi/js";
import {
	ActionIcon,
	Button,
	Divider,
	Group,
	Text,
	TextInput,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useIsLight } from "~/hooks/theme";
import { useStable } from "~/hooks/stable";
import { Panel } from "~/components/Panel";
import { Icon } from "~/components/Icon";
import Editor from "@monaco-editor/react";

export interface CreatorPaneProps {
	activeTable: string | null;
	onClose: () => void;
	onSubmit: (table: string, json: string) => void;
}

export function CreatorPane(props: CreatorPaneProps) {
	const isLight = useIsLight();
	const [isInvalid, setIsInvalid] = useState(false);
	const [tableName, setTableName] = useInputState("");
	const [contentText, setContentText] = useState("{\n    \n}");

	const jsonAlert = isInvalid ? (
		<Text color="red">Invalid record JSON</Text>
	) : undefined;

	useEffect(() => {
		setTableName(props.activeTable || "");
	}, [props.activeTable]);

	const handleSubmit = useStable(() => {
		if (!props.activeTable || !contentText) {
			return;
		}

		props.onSubmit(tableName, contentText);
	});

	const updateContent = useStable((content: string | undefined) => {
		if (contentText === content) {
			return;
		}

		setContentText(content || "");

		try {
			const json = content || "{}";
			const parsed = JSON.parse(json);

			if (typeof parsed !== "object") {
				throw new TypeError("Invalid JSON");
			}

			setIsInvalid(false);
		} catch {
			setIsInvalid(true);
		}
	});

	const options = useMemo<editor.IStandaloneEditorConstructionOptions>(() => {
		return {
			...baseEditorConfig,
			wrappingStrategy: "advanced",
			wordWrap: "off",
			suggest: {
				showProperties: false,
			},
		};
	}, []);

	return (
		<Panel
			title="Create Record"
			icon={mdiTablePlus}
			rightSection={
				<Group align="center">
					{jsonAlert && (
						<>
							{jsonAlert}
							<Divider
								orientation="vertical"
								color={isLight ? "light.0" : "dark.5"}
							/>
						</>
					)}

					<ActionIcon onClick={props.onClose} title="Close creator">
						<Icon color="light.4" path={mdiClose} />
					</ActionIcon>
				</Group>
			}
		>
			<TextInput
				mb="xs"
				label="Record name"
				value={tableName}
				onChange={setTableName}
			/>

			<Text color="dark.0" size="sm">
				Record contents
			</Text>

			<div
				style={{
					position: "absolute",
					insetInline: 12,
					bottom: 62,
					top: 94,
				}}
			>
				<Editor
					theme={isLight ? "grau" : "grau-dark"}
					value={contentText}
					onChange={updateContent}
					options={options}
					language="json"
				/>
			</div>

			<Button
				disabled={isInvalid || !tableName}
				onClick={handleSubmit}
				style={{
					position: "absolute",
					insetInline: 12,
					bottom: 12,
				}}
			>
				Create record
				<Icon path={mdiCheck} right />
			</Button>
		</Panel>
	);
}
