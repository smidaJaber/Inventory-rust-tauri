import {
	getAllTableressourceachats,
	getAllTableressourceventes,
} from "~/bindings";
import ListingPanel from "~/components/ListingPanel";
import ListeRessources from "../ressources/ListeRessources";
import { Button, Divider, Space } from "@mantine/core";
import FormRessource from "../ressources/FormRessource";
import { Spacer } from "~/components/Spacer";

export interface DetailsTabProfileProps {
	activeUser: string | null;
}

export function DetailsTabProfile(props: DetailsTabProfileProps) {
	return (
		<>
			<ListingPanel
				formSetting={{
					deletability: false,
					editable: false,
					modalForm: true,
				}}
				PanelTitle={"Getion Ressource Achat"}
				tableName={"ressource achat"}
				activeTable={"tableressourceachat"}
				refreshId={""}
				FormComponent={<FormRessource />}
				ListComponent={
					<ListeRessources
						refreshId={0}
						activeTable={null}
						activeRecordId={null}
						onSelectRecord={function (id: string | null): void {
							throw new Error("Function not implemented.");
						}}
						onRequestCreate={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				}
				fetchDataFunction={async () => await getAllTableressourceachats(0, 5)}
				onSelectRecord={function (id: string | null): void {
					throw new Error("Function not implemented.");
				}}
				data={[]}
			/>

			<ListingPanel
				formSetting={{
					deletability: undefined,
					editable: undefined,
					modalForm: undefined,
				}}
				PanelTitle={"Getion Ressource Vente"}
				tableName={"ressource vente"}
				activeTable={"tableressourcevente"}
				refreshId={""}
				FormComponent={<FormRessource />}
				ListComponent={
					<ListeRessources
						refreshId={0}
						activeTable={null}
						activeRecordId={null}
						onSelectRecord={function (id: string | null): void {
							throw new Error("Function not implemented.");
						}}
						onRequestCreate={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
				}
				fetchDataFunction={async () => await getAllTableressourceventes(50, 5)}
				onSelectRecord={function (id: string | null): void {
					throw new Error("Function not implemented.");
				}}
				data={[]}
			/>
		</>
	);
}
