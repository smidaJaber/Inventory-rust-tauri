import { useEffect, useRef, useMemo } from "react";
import { Panel } from "~/components/Panel";
import { mdiClose, mdiConsole, mdiDelete } from "@mdi/js";
import {
	ActionIcon,
	Group,
	ScrollArea,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { Icon } from "~/components/Icon";
import { actions, store, useStoreValue } from "~/store";
import AnsiToHtml from "ansi-to-html";
import { useStable } from "~/hooks/stable";

function ConsoleActions() {
	const clearConsole = useStable(() => {
		store.dispatch(actions.clearConsole());
	});

	const hideConsole = useStable(() => {
		store.dispatch(actions.setConsoleEnabled(false));
	});

	return (
		<Group align="center">
			<ActionIcon onClick={clearConsole} title="Clear console">
				<Icon color="light.4" path={mdiDelete} />
			</ActionIcon>

			<ActionIcon onClick={hideConsole} title="Hide console">
				<Icon color="light.4" path={mdiClose} />
			</ActionIcon>
		</Group>
	);
}

function ConsoleOutputEntry({
	index,
	message,
	formatter,
}: {
	index: number;
	message: string;
	formatter: AnsiToHtml;
}) {
	return (
		<Text
			key={index}
			color="light.4"
			ff="JetBrains Mono"
			dangerouslySetInnerHTML={{ __html: formatter.toHtml(message) }}
		></Text>
	);
}

export function ConsolePane() {
	const messages = useStoreValue((state) => state.consoleOutput);
	const scroller = useRef<HTMLDivElement>(null);
	const theme = useMantineTheme();

	const convert = useMemo(
		() =>
			new AnsiToHtml({
				fg: theme.fn.themeColor("light.4"),
				bg: theme.fn.themeColor("dark.0"),
				newline: true,
				colors: {
					4: "#3993d4",
				},
			}),
		[]
	);

	useEffect(() => {
		if (scroller.current) {
			const { scrollTop, scrollHeight, clientHeight } = scroller.current;

			if (scrollHeight - scrollTop < clientHeight + 100) {
				scroller.current.scrollTop = scrollHeight;
			}
		}
	}, [messages]);

	return (
		<Panel title="Console" icon={mdiConsole} rightSection={<ConsoleActions />}>
			<ScrollArea
				style={{ position: "absolute", inset: 12, top: 0 }}
				viewportRef={scroller}
			>
				{messages.map((message, index) => (
					<ConsoleOutputEntry
						key={index}
						index={index}
						message={message}
						formatter={convert}
					/>
				))}
			</ScrollArea>
		</Panel>
	);
}
