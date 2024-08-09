import { Stack, Center, Divider, Pagination, Switch } from "@mantine/core";
import { useEffect, useLayoutEffect, useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { DataTable } from "../DataTable";
import { actions, store, useStoreValue } from "~/store";
import { getAllTablepointages } from "~/bindings";
export type ListPointageProps = {};

const ListPointage = ({}: ListPointageProps) => {
	const isLight = useIsLight();
	const [resultTab, setResultTab] = useState<number>(1);
	const [tous, setTous] = useState<boolean>(false);

	const listPointages = useStoreValue((state) => state.listPointage);
	useEffect(() => {
		store.dispatch(actions.getListPointage());
		//getfromdiff();
	}, []);
	useLayoutEffect(() => {
		setResultTab(1);
	}, [listPointages.length]);
	useLayoutEffect(() => {
		if (tous) {
			//store.dispatch(
			//	actions.getListPointage_multi_db(["db_all.db", "db_all_2.db"])
			//);
		} else {
			store.dispatch(actions.getListPointage());
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
			{listPointages.length > 0 ? (
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
						data={tous ? listPointages.flat() : listPointages}
						//openRecord={() => {}}
						//active={"1"}
						sorting={["adresse", "asc"]}
						//onSortingChange={() => {}}
						//onRowClick={() => {}}
					/>
				</div>
			) : (
				<Center h="90%" c="light.5">
					Aucun jour pointage trouvé or tous
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
					total={listPointages.length}
					page={resultTab}
					onChange={setResultTab}
				/>
			</Stack>
		</div>
	);
};

export default ListPointage;
