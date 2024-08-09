import { mdiLock } from "@mdi/js";
import { Panel } from "../Panel";
import { InheritAlert } from "../InheritAlert/interface";
import { Form } from "../Form";
import { Button, Group } from "@mantine/core";
import { Spacer } from "../Spacer";
import { useIsLight } from "~/hooks/theme";

type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
	const isLight = useIsLight();
	return (
		<Panel title="Connexion" icon={mdiLock}>
			<InheritAlert visible={true} environment={"env grau"} />

			<Form onSubmit={() => {}}>
				<Group mt="lg">
					<Button color={isLight ? "light.5" : "light.3"} variant="light">
						Close
					</Button>
					<Spacer />
					<Button type="submit">Save details</Button>
				</Group>
			</Form>
		</Panel>
	);
}
