import { Stack, Center, Divider, Pagination, Switch } from "@mantine/core";
import { useEffect, useLayoutEffect, useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { DataTable } from "../DataTable";
import { actions, store, useStoreValue } from "~/store";
import { getAllFournisseursMultiDb } from "~/bindings";
export type ListFournisseurProps = {};

const getfromdiff = async () => {
	let data_from_dbs = await getAllFournisseursMultiDb(0, 999999, [
		"db_all.db",
		"db_all_2.db",
	]);
	console.log(data_from_dbs);
};
const ListFournisseur = ({}: ListFournisseurProps) => {
	const isLight = useIsLight();
	const [resultTab, setResultTab] = useState<number>(1);
	const [tous, setTous] = useState<boolean>(false);

	const listFournisseurs = useStoreValue((state) => state.listFournisseur);
	useEffect(() => {
		store.dispatch(actions.getListFournisseur());
		//getfromdiff();
	}, []);
	useLayoutEffect(() => {
		setResultTab(1);
	}, [listFournisseurs.length]);
	useLayoutEffect(() => {
		if (tous) {
			store.dispatch(
				actions.getListFournisseur_multi_db(["db_all.db", "db_all_2.db"])
			);
		} else {
			store.dispatch(actions.getListFournisseur());
		}
	}, [tous]);
	return (
		<div>
			<Switch
				checked={tous}
				onChange={(event) => setTous(event.currentTarget.checked)}
			>
				Tous
			</Switch>
			{listFournisseurs.length > 0 ? (
				<div
					style={{
						position: "relative",
						insetInline: 14,
						top: 0,
						bottom: 0,
						height: "200px",
					}}
				>
					<DataTable
						data={tous ? listFournisseurs.flat() : listFournisseurs}
						//openRecord={() => {}}
						//active={"1"}
						sorting={["adresse", "asc"]}
						//onSortingChange={() => {}}
						//onRowClick={() => {}}
					/>
				</div>
			) : (
				<Center h="90%" c="light.5">
					Aucun fournisseur trouvé or tous
				</Center>
			)}
			<Stack
				spacing="xs"
				align="center"
				style={{
					position: "relative",
					insetInline: 14,
				}}
			>
				<Divider w="100%" color={isLight ? "light.0" : "dark.5"} />
				<Pagination
					total={listFournisseurs.length}
					page={resultTab}
					onChange={setResultTab}
				/>
			</Stack>
		</div>
	);
};

export default ListFournisseur;
