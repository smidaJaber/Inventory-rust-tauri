import { Accordion, ActionIcon, Group, Modal, Title } from "@mantine/core";
import { useState } from "react";
import ListRessources from "./ListeRessources";
import { Panel } from "~/components/Panel";
import { mdiMonitorEye, mdiPlus, mdiRefresh } from "@mdi/js";
import { Icon } from "~/components/Icon";
import { useIsLight } from "~/hooks/theme";
import FormRessource from "./FormRessource";
import { Spacer } from "~/components/Spacer";
export interface RessourcesProps {
	activeUser: string | null;
	forFournisseur: boolean;
}

export function Ressources(props: RessourcesProps) {
	const isLight = useIsLight();
	const [modalNvRessourceOpen, setmodalNvRessourceOpen] = useState(false);
	const [editMode, seteditMode] = useState(false);
	const openFormNvRessource = () => {
		setmodalNvRessourceOpen(true);
	};
	const closeFormNvRessource = () => {
		setmodalNvRessourceOpen(false);
	};

	return (
		<div>
			<Accordion
				variant="contained"
				radius="xs"
				chevronPosition="left"
				defaultValue=""
			>
				<Accordion.Item value="ressource_achat">
					<Accordion.Control>
						{" "}
						<Panel
							w={"auto"}
							miw={1024}
							title="Gestion Ressources Achaht"
							icon={mdiMonitorEye}
							rightSection={
								<Group noWrap>
									<ActionIcon title="Actualiser" onClick={() => {}}>
										<Icon color="light.4" path={mdiRefresh} />
									</ActionIcon>
									<ActionIcon
										title="Ajouter ressource"
										onClick={openFormNvRessource}
									>
										<Icon color="light.4" path={mdiPlus} />
									</ActionIcon>
								</Group>
							}
						></Panel>
					</Accordion.Control>
					<Accordion.Panel>
						<ListRessources
							refreshId={0}
							activeTable={"ressources"}
							activeRecordId={null}
							onSelectRecord={function (id: string | null): void {
								throw new Error("Function not implemented.");
							}}
							onRequestCreate={function (): void {
								throw new Error("Function not implemented.");
							}}
						/>
					</Accordion.Panel>
				</Accordion.Item>
				<Accordion.Item value="ressource_vente">
					<Accordion.Control>
						{" "}
						<Panel
							miw={800}
							title="Gestion Ressources Achaht"
							icon={mdiMonitorEye}
							rightSection={
								<Group noWrap>
									<ActionIcon title="Actualiser" onClick={() => {}}>
										<Icon color="light.4" path={mdiRefresh} />
									</ActionIcon>
									<ActionIcon
										title="Ajouter ressource"
										onClick={openFormNvRessource}
									>
										<Icon color="light.4" path={mdiPlus} />
									</ActionIcon>
								</Group>
							}
						></Panel>
					</Accordion.Control>
					<Accordion.Panel>
						<ListRessources
							refreshId={0}
							activeTable={"ressources"}
							activeRecordId={null}
							onSelectRecord={function (id: string | null): void {
								throw new Error("Function not implemented.");
							}}
							onRequestCreate={function (): void {
								throw new Error("Function not implemented.");
							}}
						/>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>

			<Modal
				size="60%"
				opened={modalNvRessourceOpen}
				onClose={closeFormNvRessource}
				trapFocus={false}
				title={
					<Title size={16} color={isLight ? "light.6" : "white"}>
						{editMode ? "Modifier Ressource" : "Nouveau Ressource"}
					</Title>
				}
			>
				<FormRessource />
			</Modal>
		</div>
	);
}
