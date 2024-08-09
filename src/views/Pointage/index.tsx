import { mdiCalendarAccount } from "@mdi/js";
import ListingPanel from "~/components/ListingPanel";
import FormPointage from "~/components/Pointage/formNvPointage";
import ListPointage from "~/components/Pointage/listePointages";

export interface PointageViewProps {}

export function PointageView(props: PointageViewProps) {
	return (
		<ListingPanel
			FormComponent={<FormPointage />}
			ListComponent={<ListPointage />}
			icon={mdiCalendarAccount}
			formSetting={{
				deletability: false,
				editable: false,
				modalForm: true,
			}}
			PanelTitle={"Gestion employées"}
			tableName={"pointage"}
			activeTable={"pointage"}
			refreshId={""}
			fetchDataFunction={undefined}
			onSelectRecord={function (id: string | null): void {
				throw new Error("Function not implemented.");
			}}
			data={[]}
		/>
	);
}
