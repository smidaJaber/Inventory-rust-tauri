import { ActionIcon, Group, Modal, Title } from "@mantine/core";
import { useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { Panel } from "../Panel";
import { mdiHead, mdiPlus, mdiRefresh } from "@mdi/js";
import { Icon } from "../Icon";
import FormClient from "./formNvClient";
import ListClient from "./listeClients";
import ListingPanel from "../ListingPanel";
import { getAllEntreprises } from "~/bindings";
export type ClientProps = {};

const Client = ({}: ClientProps) => {
	//using entreprise table untill add clinet table
	return (
		<ListingPanel
			PanelTitle={"Gestion client"}
			tableName={"client"}
			icon={mdiHead}
			ListComponent={<ListClient />}
			FormComponent={<FormClient />}
			formSetting={{ modalForm: false }}
			activeTable={"client"}
			refreshId={""}
			fetchDataFunction={getAllEntreprises}
			onSelectRecord={function (id: string | null): void {
				throw new Error("Function not implemented.");
			}}
			data={[]}
		/>
	);
};

export default Client;
