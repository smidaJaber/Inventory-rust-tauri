import {
	ActionIcon,
	Divider,
	Group,
	Modal,
	SimpleGrid,
	Title,
} from "@mantine/core";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useIsLight } from "~/hooks/theme";
import { Panel } from "../Panel";
import {
	mdiDatabase,
	mdiDelete,
	mdiHead,
	mdiPen,
	mdiPlus,
	mdiRefresh,
	mdiTableLargePlus,
	mdiViewArray,
	mdiViewColumn,
	mdiViewStream,
} from "@mdi/js";
import { Icon } from "../Icon";
import { useImmer } from "use-immer";
import { useDebouncedValue, useInputState, useToggle } from "@mantine/hooks";
import { ColumnSort, OpenFn } from "~/typings";
import { useStable } from "~/hooks/stable";
import { adapter } from "~/adapter";
import {
	Fournisseur as FournisseurT,
	Tableressourceachat as tableRessourceAchatT,
	Tableressourcevente as tableRessourceventeT,
} from "~/bindings";
import { Box } from "@mantine/core";
import { Spacer } from "../Spacer";
import { CreatorPane } from "~/views/explorer/CreatorPane";
import { TabCreator } from "../Scaffold/creator";
import { actions, store, useStoreValue } from "~/store";

const PAGE_SIZES = [
	{ label: "10 Resultas par page", value: "10" },
	{ label: "25 Resultas par page", value: "25" },
	{ label: "50 Resultas par page", value: "50" },
	{ label: "100 Resultas par page", value: "100" },
];
type FormSettings = {
	deletability?: boolean;
	editable?: boolean;
	modalForm?: boolean;
};
export type ListingPanelProps = {
	FormComponent?: ReactNode;
	formSetting: FormSettings;
	ListComponent?: ReactNode;
	PanelTitle: string;
	PanelSize?: number;
	icon?: any;
	tableName: string;
	activeTable: string;
	refreshId: string;
	fetchDataFunction: any;
	onSelectRecord: OpenFn;
	data: any[];
};

const ListingPanel = ({
	FormComponent,
	formSetting,
	ListComponent,
	PanelTitle,
	PanelSize,
	tableName,
	icon,
	activeTable,
	refreshId,
	fetchDataFunction,
	onSelectRecord,
	data,
}: ListingPanelProps) => {
	const isLight = useIsLight();

	const [records, setRecords] = useImmer<any[]>([]);
	const [recordCount, setRecordCount] = useState(0);
	const [filterValid, setFilterValid] = useState(false);
	const [filter, setFilter] = useState(false);
	const [filterText, setFilterText] = useInputState("");
	const [pageText, setPageText] = useInputState("1");
	const [pageSize, setPageSize] = useInputState("25");
	const [sortMode, setSortMode] = useState<ColumnSort | null>(null);
	const [page, setPage] = useState(1);

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [editMode, seteditMode] = useState(false);
	const [hiddenForm, setHiddenForm] = useState(formSetting.modalForm);

	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const toggleHiddenForm = () => {
		setHiddenForm(!hiddenForm);
	};

	const pageCount = Math.ceil(recordCount / Number.parseInt(pageSize));

	function setCurrentPage(number: number) {
		setPageText(number.toString());
		setPage(number);
	}

	const toggleFilter = useStable(() => {
		setFilter(!filter);
	});

	const [showFilter] = useDebouncedValue(filter, 250);
	const [filterClause] = useDebouncedValue(filterText, 500);

	const fetchRecords = useStable(async () => {
		const limitBy = Number.parseInt(pageSize);
		const startAt = (page - 1) * Number.parseInt(pageSize);
		const [sortCol, sortDir] = sortMode || ["id", "asc"];

		let countQuery = `SELECT * FROM count((SELECT * FROM ${activeTable}`;
		let fetchQuery = `SELECT * FROM ${activeTable}`;

		if (showFilter && filterClause) {
			countQuery += ` WHERE ${filterClause}`;
			fetchQuery += ` WHERE ${filterClause}`;
		}

		countQuery += "))";
		fetchQuery += ` ORDER BY ${sortCol} ${sortDir} LIMIT ${limitBy}`;

		if (startAt > 0) {
			store.dispatch(actions.getListRessourceAchat(startAt));
			data = useStoreValue((state) => state.listRessourceAchat);
			fetchQuery += ` START ${startAt}`;
		}

		const response = [{ result: data }, { result: data }];
		const resultCount = response[0].result?.[0] || 0;
		const resultRecords = response[1].result || [];

		setRecordCount(data.length);
		setRecords(resultRecords);

		if (page > pageCount) {
			setCurrentPage(pageCount || 1);
		}
	});

	useEffect(() => {
		fetchRecords();
	}, [
		activeTable,
		refreshId,
		pageSize,
		page,
		sortMode,
		showFilter,
		filterClause,
	]);

	useEffect(() => {
		if (showFilter && filterText) {
			adapter.validateWhereClause(filterText).then((isValid) => {
				setFilterValid(isValid);
			});
		} else {
			setFilterValid(true);
		}
	}, [showFilter, filterText]);

	const gotoPage = useStable((e: FocusEvent | KeyboardEvent) => {
		if (e.type === "keydown" && (e as KeyboardEvent).key !== "Enter") {
			return;
		}

		const value = (e.target as HTMLInputElement).value;
		let newPage = Number.parseInt(value).valueOf();

		if (!value || Number.isNaN(newPage)) {
			setPageText(page.toString());
			return;
		}

		if (newPage < 1) {
			newPage = 1;
		}

		if (newPage > pageCount) {
			newPage = pageCount;
		}

		setCurrentPage(newPage);
	});

	const previousPage = useStable(() => {
		if (page <= 1) return;

		setCurrentPage(page - 1);
	});

	const nextPage = useStable(() => {
		if (page >= pageCount) return;

		setCurrentPage(page + 1);
	});

	const handleOpenRow = useStable((record: any) => {
		onSelectRecord(record.id);
	});
	useEffect(() => {
		fetchRecords();
	}, []);
	return (
		<Panel
			miw={PanelSize ?? "100vw"}
			title={PanelTitle}
			icon={icon ?? mdiDatabase}
			rightSection={
				<Group noWrap>
					<ActionIcon title="Actualiser" onClick={() => {}}>
						<Icon color="light.4" path={mdiRefresh} />
					</ActionIcon>
					<ActionIcon title="Mode affichage" onClick={toggleHiddenForm}>
						<Icon
							color="light.4"
							path={hiddenForm ? mdiViewStream : mdiTableLargePlus}
						/>
					</ActionIcon>
					<ActionIcon title={`supprimer ${tableName}`}>
						<Icon color="light.4" path={mdiDelete} />
					</ActionIcon>
					<ActionIcon title={`Editer ${tableName}`}>
						<Icon color="light.4" path={mdiPen} />
					</ActionIcon>
					{hiddenForm && (
						<ActionIcon title={`Ajouter ${tableName}`} onClick={openModal}>
							<Icon color="light.4" path={mdiPlus} />
						</ActionIcon>
					)}
				</Group>
			}
		>
			{!hiddenForm ? (
				<SimpleGrid cols={1}>
					{FormComponent}
					<Divider />
					{ListComponent}
				</SimpleGrid>
			) : (
				ListComponent
			)}
			{hiddenForm && (
				<Modal
					size="60%"
					opened={modalIsOpen}
					onClose={closeModal}
					trapFocus={false}
					title={
						<Title size={16} color={isLight ? "light.6" : "white"}>
							{editMode ? `Modifier ${tableName}` : `Nouveau ${tableName}`}
						</Title>
					}
				>
					{FormComponent ?? ""}
				</Modal>
			)}
		</Panel>
	);
};

export default ListingPanel;
