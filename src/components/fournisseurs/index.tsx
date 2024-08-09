import { ActionIcon, Group, Modal, Title } from "@mantine/core";
import { useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { Panel } from "../Panel";
import { mdiHead, mdiPlus, mdiRefresh } from "@mdi/js";
import { Icon } from "../Icon";
import FormFournisseur from "./formNvFournisseur";
import ListFournisseur from "./listeFournisseurs";
import ListingPanel from "../ListingPanel";
import { Fournisseur as FournisseurT, getAllFournisseurs } from "~/bindings";
export type FournisseurProps = {};

const Fournisseur = ({}: FournisseurProps) => {
	return (
		<div>
			<ListingPanel
				PanelTitle={"Gestion fournisseur"}
				tableName={"fournisseur"}
				icon={mdiHead}
				ListComponent={<ListFournisseur />}
				FormComponent={<FormFournisseur />}
				formSetting={{ modalForm: false }}
				activeTable={"fournisseur"}
				refreshId={""}
				fetchDataFunction={getAllFournisseurs}
				onSelectRecord={function (id: string | null): void {
					throw new Error("Function not implemented.");
				}}
				data={[]}
			/>
		</div>
	);
};

export default Fournisseur;
