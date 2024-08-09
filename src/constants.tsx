import {
	mdiLightningBolt,
	mdiTable,
	mdiLockOpen,
	mdiChartBoxOutline,
	mdiWrench,
	mdiAdjust,
	mdiElectricSwitch,
	mdiCalendar,
	mdiCogBox,
	mdiViewDashboard,
} from "@mdi/js";

export type StructureTab = "graph" | "builder";

export const AUTH_MODES = [
	{ label: "Root authentication", value: "root" },
	{ label: "Namespace authentication", value: "namespace" },
	{ label: "Database authentication", value: "database" },
	{ label: "Scope authentication", value: "scope" },
	{ label: "Anonymous", value: "none" },
];

export const VIEW_MODES = [
	{
		id: "designer",
		name: "Acceuil",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "profileF",
		name: "Profile Fournisseur",
		icon: mdiElectricSwitch,
		desc: "",
		desktop: true,
	},
	{
		id: "profileC",
		name: "Profile Client",
		icon: mdiLightningBolt,
		desc: "",
		desktop: true,
	},
	{
		id: "opp_achat",
		name: "Opperations Achat",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "opp_vente",
		name: "Opperations vente",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "pointage",
		name: "Pointage",
		icon: mdiCalendar,
		desc: "",
		desktop: true,
	},
	{
		id: "settings",
		name: "Paramètres",
		icon: mdiCogBox,
		desc: "",
		desktop: true,
	},
	{
		id: "dashboard",
		name: "Tableau de board",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "depense",
		name: "Depenses",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "documents",
		name: "Documents",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "lists",
		name: "Gestion Liste",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "stock",
		name: "Stock",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "stats",
		name: "Statistique",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
	{
		id: "about",
		name: "À props",
		icon: mdiViewDashboard,
		desc: "",
		desktop: true,
	},
] as const;

export const STRUCTURE_TABS = [
	{
		id: "builder",
		name: "Builder",
		icon: mdiTable,
	},
	{
		id: "graph",
		name: "Visualizer",
		icon: mdiChartBoxOutline,
	},
] as const;

export const SURREAL_KINDS = [
	{ label: "No kind specified", value: "" },
	{ label: "Any", value: "any" },
	{ label: "Array", value: "array" },
	{ label: "Bool", value: "bool" },
	{ label: "Datetime", value: "datetime" },
	{ label: "Decimal", value: "decimal" },
	{ label: "Duration", value: "duration" },
	{ label: "Float", value: "float" },
	{ label: "Int", value: "int" },
	{ label: "Number", value: "number" },
	{ label: "Object", value: "object" },
	{ label: "String", value: "string" },
	{ label: "Record", value: "record" },
	{ label: "Geometry", value: "geometry" },
];

export const GEOMETRY_TYPES = [
	{ label: "Feature", value: "feature" },
	{ label: "Point", value: "point" },
	{ label: "Line", value: "line" },
	{ label: "Polygon", value: "polygon" },
	{ label: "MultiPoint", value: "multipoint" },
	{ label: "MultiLine", value: "multiline" },
	{ label: "MultiPolygon", value: "multipolygon" },
	{ label: "Collection", value: "collection" },
];
