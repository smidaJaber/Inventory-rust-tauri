import React, { Fragment, useEffect } from "react";
import Genatab from "../../tools/tablegeneral";
import {
	Row,
	Col,
	Input,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	FormGroup,
	Label,
	Alert,
	Badge,
} from "reactstrap";

import Moment from "moment";
/* eslint-disable no-unused-expressions */
import AccessInterdit from "../../tools/accessDenied";
import FormOppAchat from "../../opperations/oppAchat/formNvOppAchat";
import { useState } from "react";
import {
	Typography,
	Button,
	Box,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isArray } from "lodash";
import { toast } from "react-toastify";

export default function ProfileDetails(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			justifyContent: "left",
			flexWrap: "nowrap",

			margin: theme.spacing(0.5),
		},
		shape: {
			backgroundColor: theme.palette.primary.main,
			width: 40,
			height: 40,
		},
		cs: { background: theme.palette.warning },
		cn: { background: theme.palette.secondary },
		ca: { background: theme.palette.success },
		shapeCircle: {
			borderRadius: "50%",
		},

		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		modalSpecial: {
			zIndex: 1350,
		},
	}));
	const {
		printtable,
		setGlobalData,
		globalDataProfile,
		globalGetIt,
		detailsDe,
		idFournisseur,
		currentUser,
		visibilityCheck,
		THEME,
		config,
		deactivateAutocomplete,
	} = props;
	const classes = useStyles();
	const [selectedDetails, setselectedDetails] = useState("");
	const [loadingOpps, setloadingOpps] = useState(false);
	const [loadingRess, setloadingRess] = useState(false);
	const [loadingNomFournisseur, setloadingNomFournisseur] = useState(false);
	const [loadingNomCategorie, setloadingNomCategorie] = useState(false);
	const [loadingNomLieuStock, setloadingNomLieuStock] = useState(false);
	const [loadingNomProduit, setloadingNomProduit] = useState(false);
	const [loadingNomMat1, setloadingNomMat1] = useState(false);
	const [loadingNomMat2, setloadingNomMat2] = useState(false);
	const [loadingNomEmballage, setloadingNomEmballage] = useState(false);
	const [loadingNomCaisse, setloadingNomCaisse] = useState(false);
	const [oppsAchat, setoppsAchat] = useState([]);
	const [oppsAchatFixed, setoppsAchatFixed] = useState([]);
	const [loadingNomFournisseurRess, setloadingNomFournisseurRess] =
		useState(false);
	const [loadingNomLieuStockRess, setloadingNomLieuStockRess] = useState(false);
	const [loadingNomMat1Ress, setloadingNomMat1Ress] = useState(false);
	const [loadingNomEmballageRess, setloadingNomEmballageRess] = useState(false);
	const [loadingNomCaisseRess, setloadingNomCaisseRess] = useState(false);
	const [loadingNomPaiementRess, setloadingNomPaiementRess] = useState(false);
	const [ressAchat, setressAchat] = useState([]);
	const [ressAchatFixed, setressAchatFixed] = useState([]);
	const [resultatFilterAchat, setresultatFilterAchat] = useState([]);
	const [modalFilterAchatOpen, setmodalFilterAchatOpen] = useState(false);
	const [filterAchatbyNom, setfilterAchatbyNom] = useState("");
	const [filterbyNom, setfilterbyNom] = useState("");
	const [ListecategoriesFilterAchat, setListecategoriesFilterAchat] = useState(
		[]
	);
	const [dateFilterAchat, setdateFilterAchat] = useState("");
	const [categorieFilterAchat, setcategorieFilterAchat] = useState("");
	const [selectedCategFilterAchat, setselectedCategFilterAchat] = useState("");
	const [numLotFilterAchat, setnumLotFilterAchat] = useState("");
	const [lieuStockageFilterAchat, setlieuStockageFilterAchat] = useState("");
	const [ListeLieuxStockageFilterAchat, setListeLieuxStockageFilterAchat] =
		useState("");
	const [selectedLieuStockageFilterAchat, setselectedLieuStockageFilterAchat] =
		useState("");
	const [modalFilterOpen, setmodalFilterOpen] = useState(false);
	const [bodyFilter, setbodyFilter] = useState("");
	const [dateRessFilter, setdateRessFilter] = useState("");
	const [lieuStockRessFilter, setlieuStockRessFilter] = useState("");
	const [listeLieuStockRess, setlisteLieuStockRess] = useState([]);
	const [resultatFilter, setresultatFilter] = useState([]);
	const [fixedTabRessAchat, setfixedTabRessAchat] = useState([]);
	const [cleTextOpp, setcleTextOpp] = useState(idFournisseur);
	const [cleTextRess, setcleTextRess] = useState(idFournisseur);
	const [modalOpen, setmodalOppOpen] = useState(false);
	const [nomDeleteOpp, setNomDeleteOpp] = useState("");
	const [idDelete, setidDelete] = useState("");
	const [modalRessOpen, setmodalRessOpen] = useState(false);
	const [nomDeleter, setNomDelete] = useState("");
	const [idDeleteRess, setIdDeleteRess] = useState("");
	const [refreshConfig, setrefreshConfig] = useState({});
	const [displayRessTab, setdisplayRessTab] = useState(false);
	const [currentPage, setcurrentPage] = useState(1);
	const [nbrOppParPage, setnbrOppParPage] = useState(5);
	const [currentPageRessource, setcurrentPageRessource] = useState(1);
	const [nbrOppParPageRessource, setnbrOppParPageRessource] = useState(5);
	const [startPageRessource, setstartPageRessource] = useState(1);
	const [startPageOpps, setstartPageOpps] = useState(1);
	const [dropPrintAchatOpen, setdropPrintAchatOpen] = useState(false);
	const [dropPrintRessourceOpen, setdropPrintRessourceOpen] = useState(false);
	const [tabAchatToPrint, settabAchatToPrint] = useState([]);
	const [tabRessourceToPrint, settabRessourceToPrint] = useState([]);
	const [dropNbrParPageRessOpen, setdropNbrParPageRessOpen] = useState(false);
	const [dropNbrParPageAchatOpen, setdropNbrParPageAchatOpen] = useState(false);
	const [modalEditOppAchatOpen, setmodalEditOppAchatOpen] = useState(false);
	const [IDEditOppAchat, setIDEditOppAchat] = useState("-1");
	const [idFacture, setIDFacture] = useState([]);

	const [msgColor, setmsgColor] = useState("-1");
	const [msgAddRequest, setmsgAddRequest] = useState("-1");

	const [LoadinglisteLieuStockRess, setLoadinglisteLieuStockRess] =
		useState(false);
	const [selectedLieuStockageFilterRess, setselectedLieuStockageFilterRess] =
		useState("-1");

	const hideOppressTab = () => {
		setdisplayRessTab(true);
	};
	const dragHandler = () => {};

	const setcle = () => {
		setselectedDetails(detailsDe);
		setcleTextOpp(idFournisseur);
		setcleTextRess(idFournisseur);
	};
	const printRawTableOpps = (tab) => {
		const rapport = document.getElementById("divAchatToPrint");
		printtable("Impression opperations d'achat détailles", "", rapport);
	};

	const printRawTableRess = (tab) => {
		const rapport = document.getElementById("divRessourceToPrint");
		printtable("Impression Opperation de ressource détailles", "", rapport);
	};
	const getCategories = () => {
		fetch("/api/mariem/categories")
			.then((res) => res.json())
			.then((categs) => setListecategoriesFilterAchat(categs));
	};
	const getLieuxStockage = () => {
		fetch("/api/mariem/lieustockage")
			.then((res) => res.json())
			.then((lieux) => {
				setListeLieuxStockageFilterAchat(lieux);
				setlisteLieuStockRess(lieux);
			});
	};

	const handleChangeDetails = (e) => {
		setselectedDetails(e.target.value);
	};
	//ress
	const procedureFilterProfile = (
		filterOf,
		tableName,
		cle,
		id,
		cle2,
		id2,
		CX
	) => {
		setloadingRess(true);
		setressAchat([]);
		let linkProcedure =
			"/api/mariem/filterprofile/" +
			filterOf +
			"/" +
			tableName +
			"/" +
			cle +
			"/" +
			id +
			"/" +
			cle2 +
			"/" +
			id2 +
			"/" +
			CX;
		fetch(linkProcedure, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				gd: {
					tableName: globalDataProfile[tableName],
					Produits: globalDataProfile.Produits,
				},
			}),
		})
			.then((res) => res.json())
			.then((ress) => {
				setressAchat(ress);
				setressAchatFixed(ress);
				setfixedTabRessAchat(ress);
			})
			.then((res) => {
				setloadingRess(false);
			});
	};

	//oppp

	const procedureFilterProfileOpp = (
		filterOf,
		tableName,
		cle,
		id,
		cle2,
		id2,
		typ,
		CX
	) => {
		setloadingOpps(true);
		setoppsAchat([]);
		let linkProcedure =
			typ === ""
				? "/api/mariem/filterprofile/" +
				  filterOf +
				  "/opp/" +
				  tableName +
				  "/" +
				  cle +
				  "/" +
				  id +
				  "/" +
				  cle2 +
				  "/" +
				  id2 +
				  "/" +
				  CX
				: "/api/mariem/filterprofile/" +
				  filterOf +
				  "/opp/" +
				  tableName +
				  "/" +
				  cle +
				  "/" +
				  id +
				  "/" +
				  cle2 +
				  "/" +
				  id2 +
				  "/" +
				  typ +
				  "/" +
				  CX;
		fetch(linkProcedure, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				gd: {
					tableName: globalDataProfile[tableName],
					Produits: globalDataProfile.Produits,
				},
			}),
		})
			.then((res) => res.json())
			.then((opp) => {
				setoppsAchat(opp);
				setoppsAchatFixed(opp);
			})
			.then((res) => {
				setloadingOpps(false);
			});
	};
	const getRessources = (Config) => {
		let filterOF = Config.oppDe;
		let IDFournisseur = idFournisseur;
		let cleTextRessInside = idFournisseur === "tous" ? "tous" : "IDFornisseur";
		//alert(filterOF);
		switch (filterOF) {
			case "Caisse":
				let IDCaisse = Config.IDCaisse === "" ? "tous" : Config.IDCaisse;
				let typeCaisse = Config.typCaisse;
				let cle2 = IDCaisse === "tous" ? "tous" : "typeCaisse";
				let CX = typeCaisse === "" ? "tous" : typeCaisse;

				//ress
				procedureFilterProfile(
					filterOF,
					"AllRessAchat",
					cleTextRessInside,
					IDFournisseur,
					cle2,
					IDCaisse,
					CX
				);

				break;
			//montant
			case "PROD":
				//alert(JSON.stringify(Config.IDProduit));

				let cle2Montant = Config.modePaiement === "" ? "0123" : "typePaiement";
				let ID2Montant =
					Config.modePaiement === "" ? "0123" : Config.modePaiement;
				let CXMontant = Config.modePaiement === "" ? "tous" : "LLLL";
				//ress

				procedureFilterProfile(
					"montant",
					"AllRessAchat",
					cleTextRessInside,
					IDFournisseur,
					cle2Montant,
					ID2Montant,
					CXMontant
				);

				/* let ID = Config.IDProduit.match(/\d+/g);
				let TotalGroup = Config.IDProduit.indexOf("total")
					? Config.IDProduit
					: "";

				let details = Config.motantData.CX; */
				//alert(Config.IDProduit.indexOf("total"));

				if (Config.IDProduit === "") {
					cle2Montant = "tous";
					ID2Montant = "12";
					CXMontant = "34";
				} else {
					if (Config.IDProduit.indexOf("total") === 0) {
						cle2Montant = Config.IDProduit;
						ID2Montant = "12";
						CXMontant = "34";
					} else {
						cle2Montant = Config.montantData.champ;

						ID2Montant = Config.IDProduit.match(/\d+/g);
						CXMontant = Config.montantData.CX;
					}
				}

				break;
			//emballage
			case "EMB":
				let IDEmballage =
					Config.IDEmballage === "" ? "tous" : Config.IDEmballage.match(/\d+/g);
				let cle2Emballage = IDEmballage === "tous" ? "tous" : "emballage";
				let CXEmballage = "";

				CXEmballage = CXEmballage === "EMBF" ? "FON" : "";
				CXEmballage = CXEmballage === "EMBC" ? "COV" : "";
				CXEmballage = CXEmballage === "boite" ? "Emb" : "";
				CXEmballage = CXEmballage === "" ? "tous" : "";

				//ress
				procedureFilterProfile(
					"emballage",
					"AllRessAchat",
					cleTextRessInside,
					IDFournisseur,
					cle2Emballage,
					IDEmballage,
					CXEmballage
				);
				break;
			//materiel
			case "MAT":
				let IDMateriel = Config.IDMat === "" ? "tous" : Config.IDMat;
				let cle2Mat = IDMateriel === "tous" ? "tous" : "typeMatriel";
				let CXMatriel = IDMateriel === "tous" ? "tous" : "Matriel";

				//ress
				procedureFilterProfile(
					"materiel",
					"AllRessAchat",
					cleTextRessInside,
					IDFournisseur,
					cle2Mat,
					IDMateriel,
					CXMatriel
				);
				break;
		}
	};
	const getOpps = (txt, Config) => {
		setrefreshConfig(Config);
		setdisplayRessTab(true);
		let filterOF = Config.oppDe;
		let IDFournisseur = idFournisseur;
		let cleTextOppInside = idFournisseur === "tous" ? "tous" : "IDFournisseur";

		//alert(filterOF);
		switch (filterOF) {
			case "Caisse":
				let IDCaisse = Config.IDCaisse === "" ? "tous" : Config.IDCaisse;
				let typeCaisse = Config.typCaisse;
				let cle2 = IDCaisse === "tous" ? "tous" : "typeCaisse";
				let CX = typeCaisse === "" ? "tous" : typeCaisse;

				//opp

				procedureFilterProfileOpp(
					filterOF,
					"AllOppsAchat",
					cleTextOppInside,
					IDFournisseur,
					cle2,
					IDCaisse,
					"",
					CX
				);

				break;
			//montant
			case "PROD":
				//alert(JSON.stringify(Config.IDProduit));

				let cle2Montant = Config.modePaiement === "" ? "0123" : "typePaiement";
				let ID2Montant =
					Config.modePaiement === "" ? "0123" : Config.modePaiement;
				let CXMontant = Config.modePaiement === "" ? "tous" : "LLLL";

				/* let ID = Config.IDProduit.match(/\d+/g);
				let TotalGroup = Config.IDProduit.indexOf("total")
					? Config.IDProduit
					: "";

				let details = Config.motantData.CX; */
				//alert(Config.IDProduit.indexOf("total"));

				if (Config.IDProduit === "") {
					cle2Montant = "tous";
					ID2Montant = "12";
					CXMontant = "34";
				} else {
					if (Config.IDProduit.indexOf("total") === 0) {
						cle2Montant = Config.IDProduit;
						ID2Montant = "12";
						CXMontant = "34";
					} else {
						cle2Montant = Config.montantData.champ;

						ID2Montant = Config.IDProduit.match(/\d+/g);
						CXMontant = Config.montantData.CX;
					}
				}
				//opp

				procedureFilterProfileOpp(
					"montant",
					"AllOppsAchat",
					cleTextOppInside,
					IDFournisseur,
					cle2Montant,
					ID2Montant,
					CXMontant,
					CXMontant
				);

				break;
			//emballage
			case "EMB":
				let IDEmballage =
					Config.IDEmballage === "" ? "tous" : Config.IDEmballage.match(/\d+/g);
				let typeEmballage = Config.typeEmballage;
				let cle2Emballage = IDEmballage === "tous" ? "tous" : "emballage";
				let CXEmballage = "";

				CXEmballage = CXEmballage === "EMBF" ? "FON" : "";
				CXEmballage = CXEmballage === "EMBC" ? "COV" : "";
				CXEmballage = CXEmballage === "boite" ? "Emb" : "";
				CXEmballage = CXEmballage === "" ? "tous" : "";

				//opp

				procedureFilterProfileOpp(
					"emballage",
					"AllOppsAchat",
					cleTextOppInside,
					IDFournisseur,
					cle2Emballage,
					IDEmballage,
					"",
					"CXEmballage"
				);

				break;
			//materiel
			case "MAT":
				let IDMateriel = Config.IDMat === "" ? "tous" : Config.IDMat;
				let cle2Mat = IDMateriel === "tous" ? "tous" : "typeMatriel";
				let CXMatriel = IDMateriel === "tous" ? "tous" : "Matriel";
				//opp

				procedureFilterProfileOpp(
					"materiel",
					"AllOppsAchat",
					cleTextOppInside,
					IDFournisseur,
					IDMateriel === "tous" ? "tous" : "Matriel",
					IDMateriel,
					"",
					"123"
				);

				break;
		}
	};

	///delet opp achat
	const handleDeleteAchat = (ID) => {
		fetch("/api/mariem/oppsAchat/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: ID,
			}),
		}).then((res) => {
			setmodalOppOpen(false);
			if (!res.ok) {
				toast.error("Erreur :  Requet non terminé!" + msgAddRequest);
				return false;
			}
			toast.success("Opperation d'achat supprimée avec succès");
			setidDelete("");
			setGlobalData(true, "AllOppsAchat");
		});
	};
	const handleDeleteRess = (ID) => {
		fetch("/api/mariem/oppsRess/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: ID,
			}),
		}).then((res) => {
			setmodalRessOpen(false);
			if (!res.ok) {
				toast.error(
					<strong>Erreur : Requet non terminé! {res.statusText} </strong>
				);

				return false;
			}
			setIdDeleteRess("");
			toast.success(
				<strong>succé de suppression opération de ressource </strong>
			);
			//this.getRessourceByIDFournisseur(this.props.idFournisseur);
			setGlobalData(true, "AllRessAchat");
		});
	};
	//fn filtrage opération achat
	const handleSetFiltersOppsAchat = (e) => {
		setmodalFilterAchatOpen(true);
		setfilterAchatbyNom(e.target.id);
		setoppsAchat(oppsAchatFixed !== [] ? oppsAchatFixed : oppsAchat);
	};
	const handleFilterOppsAchat = () => {
		setmodalFilterAchatOpen(false);

		let selectedFilters = [];
		let filters = {
			inDate: (item, indx) =>
				Moment(item.date).format("DD/MM/YYYY") ===
				Moment(dateFilterAchat).format("DD/MM/YYYY"),
			inLieu: (item, indx) => item.lieuStock === lieuStockageFilterAchat,
			inCat: (item, indx) => item.IDCateg === categorieFilterAchat,
			inNLot: (item, indx) => item.numLot === numLotFilterAchat,
		};
		if (lieuStockageFilterAchat !== "" && lieuStockageFilterAchat !== "Tous") {
			selectedFilters.push(filters.inLieu);
		}
		if (dateFilterAchat !== "") {
			selectedFilters.push(filters.inDate);
		}
		if (categorieFilterAchat !== "" && categorieFilterAchat !== "Tous") {
			selectedFilters.push(filters.inCat);
		}
		if (numLotFilterAchat !== "") {
			selectedFilters.push(filters.inNLot);
		}

		setoppsAchat(
			oppsAchat.filter((opp, indx) =>
				selectedFilters.every((f) => f(opp, indx))
			)
		);
	};

	//fn filtrage opp RESSOURCES
	const handleSetFilters = (e) => {
		setmodalFilterOpen(true);
		setfilterbyNom(e.target.id);
		setressAchat(fixedTabRessAchat !== [] ? fixedTabRessAchat : ressAchat);
	};
	const handleFilter = () => {
		setmodalFilterOpen(false);

		let selectedFilters = [];
		let filters = {
			inDate: (item, indx) =>
				Moment(item.date).format("DD-MM-YYYY") ===
				Moment(dateRessFilter).format("DD-MM-YYYY"),
			inLieu: (item, indx) => item.lieuStock === lieuStockRessFilter,
		};

		if (lieuStockRessFilter !== "" && lieuStockRessFilter !== "Tous") {
			selectedFilters.push(filters.inLieu);
		}
		if (dateRessFilter !== "") {
			selectedFilters.push(filters.inDate);
		}

		setressAchat(
			ressAchat.filter((opp, indx) =>
				selectedFilters.every((f) => f(opp, indx))
			)
		);
	};

	useEffect(() => {
		setcle();
	}, [detailsDe, config, idFournisseur]);
	useEffect(() => {
		getOpps(detailsDe, config);
	}, [cleTextOpp]);
	useEffect(() => {
		document.addEventListener("rechercher", () => {
			getOpps(detailsDe, config);
		});
		document.addEventListener("getRess", () => {
			getRessources(config);
		});
		deactivateAutocomplete(true);

		return () => {
			document.removeEventListener("rechercher", () => {
				getOpps(detailsDe, config);
			});
			document.removeEventListener("getRess", () => {
				getRessources(config);
			});
			deactivateAutocomplete(false);
		};
	}, []);

	useEffect(() => {
		getRessources(config);
	}, [cleTextRess]);

	if (typeof globalDataProfile.AllOppsAchat !== "undefined") {
		let uuu = JSON.stringify(currentUser);

		const tab = JSON.parse(uuu);
		let canVisit =
			typeof tab.allowedModule !== "undefined" &&
			tab.allowedModule.split(",").includes("M_ProFDet");

		// Logic for displaying ressource
		const indexOfLastOppRessource =
			currentPageRessource * nbrOppParPageRessource;
		const indexOfFirstOppRessource =
			indexOfLastOppRessource - nbrOppParPageRessource;
		const currentOppsRessource = ressAchat.slice(
			indexOfFirstOppRessource,
			indexOfLastOppRessource
		);

		const pageNumbersRessource = [];
		for (
			let i = 1;
			i <= Math.ceil(ressAchat.length / nbrOppParPageRessource);
			i++
		) {
			pageNumbersRessource.push(i);
		}

		// Logic for displaying achat opp
		const indexOfLastOpp = currentPage * nbrOppParPage;
		const indexOfFirstOpp = indexOfLastOpp - nbrOppParPage;
		const currentOpps = oppsAchat.slice(indexOfFirstOpp, indexOfLastOpp);
		let doneOneTimePreviousOpps = false;
		let doneOneTimePreviousRessources = false;

		const pageNumbers = [];
		for (let i = 1; i <= Math.ceil(oppsAchat.length / nbrOppParPage); i++) {
			pageNumbers.push(i);
		}

		if (!canVisit) {
			return <AccessInterdit />;
		} else {
			return (
				<Fragment>
					<div key={"TableOppsAchat-ref"} className="Details_modal_special">
						<Row>
							<Genatab
								isLoading={loadingOpps}
								isTableOpen={false}
								heighttable={440}
								idcle="IDAchat"
								tabletitle={
									"Table Opperations d'achat : Details de " +
									(detailsDe || "Montant")
								}
								printtable={printtable}
								data={oppsAchat}
								labelsPlus={[
									{ value: "Facture", isPrintable: false },
									{ value: "lot", isPrintable: false },
									{
										value: "Emballage",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children[0]
														.split(" ")
														.filter((r, i) => i > 0)
														.join(" ")) ||
												dc
											);
										},
									},
									{
										value: "M1",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children
														.split(" ")
														.filter((r, i) => i > 0)
														.toString()
														.replace(",", "")) ||
												dc
											);
										},
									},
									{
										value: "M2",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children
														.split(" ")
														.filter((r, i) => i > 0)
														.join(" ")) ||
												dc
											);
										},
									},
									{ value: "Bons", isPrintable: false },
									{ value: "Observation", isPrintable: true },
								]}
								champsplus={[
									{
										value: "numFact",
										isPrintable: false,
										fn: (val) => {
											return (!val && "NF") || val;
										},
									},
									{
										value: "numLot",
										isPrintable: false,
										fn: (val) => {
											return val;
										},
									},
									{
										value: "emballage",
										additionalValues: [
											"nbrEmballage",
											"nbrCOV",
											"nbrFON",
											"selected",
										],
										isPrintable: true,
										isInFooter: ["nbrEmballage", "nbrCOV", "nbrFON"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography
														className="resetInPrint"
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
														}}
													>
														<strong> {val[0]}</strong>

														<div>
															<strong className="resetInPrint yellowBadge-table">
																{val[1] + " COVs"}
															</strong>

															<strong className="resetInPrint brownBadge-table">
																{val[2] + " FONDs"}
															</strong>
														</div>
													</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1, val2, val3, val4]) => {
											return (
												(val === 0 && "Aucun Emb.") || (
													<Typography
														className="resetInPrint"
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
															background: ["EMBF", "EMBC", "boite"].includes(
																val4
															)
																? "#e1e1e1"
																: "",
														}}
													>
														{val1 +
															" " +
															globalGetIt(
																globalDataProfile.Emballage,
																"IDEmballage",
																"nom",
																val
															)}
														<div>
															{val2 > 0 && (
																<strong className="resetInPrint yellowBadge-table">
																	{val2} COVs
																</strong>
															)}{" "}
															{val3 > 0 && (
																<strong className="resetInPrint yellowBadge-table">
																	{val3} FONDs
																</strong>
															)}
														</div>
													</Typography>
												)
											);
										},
									},
									{
										value: "matriel1",
										additionalValues: ["nbrM1", "selected"],
										isPrintable: true,
										isInFooter: ["nbrM1", "nbrM1"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>Total Materiaux</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1, val2]) => {
											return (
												((val === 0 || val1 === 0 || !val) && "Aucun M1") || (
													<Typography
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
															background: ["MAT"].includes(val2)
																? "#e1e1e1"
																: "",
														}}
													>
														{val1 +
															" " +
															globalGetIt(
																globalDataProfile.Produits,
																"IDProduit",
																"nom",
																val
															)}
													</Typography>
												)
											);
										},
									},
									{
										value: "matriel2",
										additionalValues: ["nbrM2", "selected"],
										isPrintable: true,
										isFusion: true,
										isInFooter: ["nbrM2", "nbrM1"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>
														{parseInt(val[0]) + parseInt(val[1])}
													</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1, val2]) => {
											return (
												((val === 0 || !val) && "Aucun M2") || (
													<strong
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
															background: ["MAT2"].includes(val2)
																? "#e1e1e1"
																: "",
														}}
													>
														{val1 +
															" " +
															globalGetIt(
																globalDataProfile.Produits,
																"IDProduit",
																"nom",
																val
															)}
													</strong>
												)
											);
										},
									},
									{
										value: "IDBonReclam",
										additionalValues: ["IDBonEntree", "IDBonRecp"],
										isPrintable: false,
										fn: ([val, val1, val2]) => {
											return (
												<Box>
													{(val.toString() !== "0" && <strong>{val}</strong>) ||
														"NA"}
													{(val1.toString() !== "0" && (
														<strong>{val1}</strong>
													)) ||
														"NA"}
													{(val2.toString() !== "0" && (
														<strong>{val2}</strong>
													)) ||
														"NA"}
												</Box>
											);
										},
									},
									{
										value: "observation",
										isPrintable: true,
										fn: (val) => {
											return val;
										},
									},
								]}
								champs={[
									{
										value: "date",
										isPrintable: true,
										fn: (val) => {
											return Moment(val).format("DD/MM/YYYY");
										},
									},
									{
										value: "IDFournisseur",
										isPrintable: true,
										fn: (val) => {
											return globalGetIt(
												globalDataProfile.Fournisseurs,
												"IDFournisseurProd",
												"nom",
												val
											);
										},
									},
									{
										value: "IDCateg",
										isPrintable: false,

										fn: (val) => {
											return (
												(val === 0 && "Aucune categ.") ||
												globalGetIt(
													globalDataProfile.Categories,
													"IDCat",
													"nom",
													val
												)
											);
										},
									},
									{
										value: "lieuStock",
										isPrintable: false,
										fn: (val) => {
											return (
												(val === 0 && "Aucun lieu") ||
												globalGetIt(
													globalDataProfile.LieuxStock,
													"IDLieuStockage",
													"nom",
													val
												)
											);
										},
									},
									{
										value: "typeCaisse",
										additionalValues: [
											"nbrCaisse",
											"selected",

											"nbrCN",
											"nbrCS",
											"nbrCA",
										],
										isPrintable: true,
										isInFooter: ["nbrCaisse", "nbrCN", "nbrCS", "nbrCA"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography
														className="resetInPrint"
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
														}}
													>
														<strong> {val[0]}</strong>

														<div>
															<strong className="resetInPrint brownBadge-table">
																{val[1]}
															</strong>

															<strong className="resetInPrint yellowBadge-table">
																{val[2]}
															</strong>

															<strong className="resetInPrint greenBadge-table">
																{val[3]}
															</strong>
														</div>
													</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1, val2, val3, val4, val5]) => {
											return (
												(val1 === 0 && "Aucune caisse") || (
													<Typography
														className="resetInPrint"
														style={{
															margin: "0px",
															padding: "0px",
															fontSize: "0.875rem",
															background: ["CS", "CA", "CN"].includes(val2)
																? "#e1e1e1"
																: "",
														}}
													>
														{val1 +
															" " +
															globalGetIt(
																globalDataProfile.Caisse,
																"IDCaisse",
																"nom",
																val
															)}
														<div>
															{val3 > 0 && (
																<strong className="resetInPrint brownBadge-table">
																	{val3}
																</strong>
															)}
															{val4 > 0 && (
																<strong className="resetInPrint yellowBadge-table">
																	{val4}
																</strong>
															)}
															{val5 > 0 && (
																<strong className="resetInPrint greenBadge-table">
																	{val5}
																</strong>
															)}
														</div>
													</Typography>
												)
											);
										},
									},
									{
										value: "matierePrincipale",
										additionalValues: ["selected"],
										isPrintable: true,
										fn: ([val, val3]) => {
											return (
												(val === 0 && "Aucun MP") || (
													<strong
														className="resetInPrint"
														style={{
															background: val3 === "PROD" ? "#e1e1e1" : "",
														}}
													>
														{" "}
														{globalGetIt(
															globalDataProfile.Produits,
															"IDProduit",
															"nom",
															val
														)}
													</strong>
												)
											);
										},
									},
									{
										value: "qteBrut",
										isPrintable: true,
										isInFooter: ["qteBrut", "qteBrut"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return val === "NA"
												? val
												: (isArray(val) && (
														<Typography>
															{Intl.NumberFormat("fr").format(val[0])}
														</Typography>
												  )) ||
														Intl.NumberFormat("fr").format(val);
										},
										fn: (val) => {
											return (val === 0 && "NA") || val;
										},
									},
									{
										value: "qteNet",
										isPrintable: true,
										isInFooter: ["qteNet", "qteNet"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return val === "NA"
												? val
												: (isArray(val) && (
														<Typography>
															{Intl.NumberFormat("fr").format(val[0])}
														</Typography>
												  )) ||
														Intl.NumberFormat("fr").format(val);
										},
										fn: (val) => {
											return (val === 0 && "NA") || val;
										},
									},
									{
										value: "prixUnit",
										isPrintable: true,
										formatter: (val) => {
											return Intl.NumberFormat("fr").format(val);
										},
										fn: (val) => {
											return val;
										},
									},
									{
										value: "montant",
										isPrintable: true,
										isInFooter: ["montant", "montant"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>
														{Intl.NumberFormat("fr").format(val[0])}
													</Typography>
												)) ||
												Intl.NumberFormat("fr").format(val)
											);
										},
										fn: (val) => {
											return val;
										},
									},
								]}
								labels={[
									//	{ value: "IDA", isPrintable: false },
									{
										value: "Date",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{
										value: "Fournisseur",
										isPrintable: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},

									{
										value: "Categorie",
										isPrintable: false,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{
										value: "L.Stock",
										isPrintable: false,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{
										value: "Caisse",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children[0]
														.split(" ")
														.filter((r, i) => i > 0)
														.join(" ")) ||
												dc
											);
										},
									},
									{
										value: "Produit",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children[1].toString().replace(",", "")) ||
												dc
											);
										},
									},
									{
										value: "BRUT",
										isPrintable: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{
										value: "NET",
										isPrintable: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{ value: "P/U", isPrintable: true },
									{
										value: "Montant",
										isPrintable: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
								]}
								fnDelete={(arr) => {
									const preliste = globalDataProfile.AllOppsAchat.filter((oa) =>
										arr.map((a) => parseInt(a)).includes(oa.IDAchat)
									);
									setIDFacture(
										new Set(
											preliste
												.filter((oa) => parseInt(oa.numFact) !== 0)
												.map((ff) => ff.numFact)
										)
									);
									setNomDeleteOpp(arr.length + " opperation(s)");
									setidDelete(arr);
									setmodalOppOpen(true);
								}}
								fnEdit={(arr) => {
									setmodalEditOppAchatOpen(true);
									setIDEditOppAchat(arr[0]);
								}}
								fnInsert={(arr) => {}}
							/>
						</Row>
						<Dialog
							color="primary"
							scrollable
							maxWidth="lg"
							open={modalEditOppAchatOpen}
						>
							<DialogTitle>Modifier opération achat</DialogTitle>

							<DialogContent>
								{modalEditOppAchatOpen === true && (
									<FormOppAchat
										globalData={globalDataProfile}
										globalGetIt={globalGetIt}
										setGlobalData={setGlobalData}
										visibilityCheck={visibilityCheck}
										THEME={THEME}
										resetedit={(e) => {
											setmodalEditOppAchatOpen(false);
										}}
										activeTabNow={(e) => {}}
										done={(e) => {
											setGlobalData(true, "AllOppsAchat");
											setmodalEditOppAchatOpen(false);
										}}
										toEdit={IDEditOppAchat}
									/>
								)}
							</DialogContent>
							<DialogActions>
								<Button
									onClick={(e) => {
										setmodalEditOppAchatOpen(false);
									}}
								>
									Fermer
								</Button>
							</DialogActions>
						</Dialog>
						<Modal color={"danger"} isOpen={modalOpen}>
							<ModalHeader>Confirmer suppression</ModalHeader>
							<ModalBody>
								{[...idFacture].length !== 0 && (
									<Alert color="danger">
										<h4>Action INTERDIT </h4>
										<hr />
										Impossible de supprimer une opération déja facturée !<br />
										Veuillez supprimer{" "}
										{[...idFacture].map((fact) => (
											<Badge color="danger">facture N° {fact}</Badge>
										))}
										avant de pouvoir continuer cette action.
									</Alert>
								)}
								{[...idFacture].length === 0 && (
									<h6>
										Voulez vous vraiment supprimer{" "}
										<strong className="text-primary">{nomDeleteOpp}</strong>?
									</h6>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="info"
									onClick={(e) => {
										setmodalOppOpen(false);
									}}
								>
									Annuler
								</Button>
								<Button
									hidden={[...idFacture].length !== 0}
									disabled={[...idFacture].length !== 0}
									color="danger"
									onClick={(e) => {
										e.preventDefault();
										handleDeleteAchat(idDelete);
									}}
								>
									Confirmer
								</Button>
							</ModalFooter>
						</Modal>
					</div>

					<div key={"TableRessAchat-ref"}>
						<Row>
							<Genatab
								isLoading={loadingRess}
								isTableOpen={false}
								heighttable={440}
								idcle="IDResAchat"
								tabletitle={
									"Table Ressource Achat : Details de " +
									(detailsDe || "Montant")
								}
								printtable={printtable}
								data={ressAchat}
								labelsPlus={[
									{
										value: "Emballage",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{ value: "Boite", isPrintable: true },
									{ value: "FON", isPrintable: true },
									{ value: "COUV", isPrintable: true },
									{
										value: "Materiel",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return (
												(typeof dc === "object" &&
													dc.props.children
														.split(" ")
														.filter((r, i) => i > 0)
														.toString()
														.replace(",", "")) ||
												dc
											);
										},
									},
									{ value: "BON", isPrintable: false },
								]}
								champsplus={[
									{
										value: "emballage",
										additionalValues: ["nbrEmb", "nbrCOV", "nbrFON"],
										isPrintable: true,
										fn: ([val, val1, val2, val3]) => {
											return (
												(val === 0 && "Aucun Emb.") || (
													<div>
														{val1 +
															" " +
															globalGetIt(
																globalDataProfile.Emballage,
																"IDEmballage",
																"nom",
																val
															)}
													</div>
												)
											);
										},
									},
									{
										value: "emballage",
										additionalValues: ["nbrEmb", "nbrCOV", "nbrFON"],

										isPrintable: true,
										isInFooter: ["nbrEmb", "nbrCOV"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && <Typography>{val[0]}</Typography>) ||
												val
											);
										},
										fn: ([val, val1, val2, val3]) => {
											return (val1 === 0 && "Aucun B") || <div>{val1}</div>;
										},
									},
									{
										value: "emballage",
										additionalValues: ["nbrEmb", "nbrCOV", "nbrFON"],
										isPrintable: true,
										isInFooter: ["nbrEmb", "nbrCOV"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && <Typography>{val[1]}</Typography>) ||
												val
											);
										},
										fn: ([val, val1, val2, val3]) => {
											return (val2 === 0 && "Aucun F") || val2;
										},
									},
									{
										value: "emballage",
										additionalValues: ["nbrEmb", "nbrCOV", "nbrFON"],
										isPrintable: true,
										isInFooter: ["nbrFON", "nbrCOV"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && <Typography>{val[0]}</Typography>) ||
												val
											);
										},
										fn: ([val, val1, val2, val3]) => {
											return (val3 === 0 && "Aucun C") || val3;
										},
									},
									{
										value: "typeMatriel",
										additionalValues: ["nbrMatriel"],
										isPrintable: true,
										isInFooter: ["nbrMatriel", "nbrMatriel"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && <Typography>{val[0]}</Typography>) ||
												val
											);
										},
										fn: ([val, val1]) => {
											return (
												((val === 0 || val1 === 0 || !val) && "Aucun Mat.") ||
												val1 +
													" " +
													globalGetIt(
														globalDataProfile.Produits,
														"IDProduit",
														"nom",
														val
													)
											);
										},
									},
									{
										value: "IDDoc",
										isPrintable: false,
										fn: (val) => {
											return val;
										},
									},
								]}
								champs={[
									{
										value: "date",
										isPrintable: true,
										isInFooter: false,
										fn: (val) => {
											return Moment(val).format("DD/MM/YYYY");
										},
									},
									{
										value: "IDFornisseur",
										isPrintable: true,
										isInFooter: false,
										fn: (val) => {
											return globalGetIt(
												globalDataProfile.Fournisseurs,
												"IDFournisseurProd",
												"nom",
												val
											);
										},
									},
									{
										value: "montant",
										isPrintable: true,
										isInFooter: ["montant", "montant"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>
														{Intl.NumberFormat("fr").format(val[0])}
													</Typography>
												)) ||
												Intl.NumberFormat("fr").format(val)
											);
										},
										fn: (val) => {
											return val;
										},
									},
									{
										value: "typePaiement",
										isPrintable: true,
										fn: (val) => {
											return (
												(val === 0 && "Aucun paiement.") ||
												globalGetIt(
													globalDataProfile.Paiement,
													"IDPaiement",
													"nom",
													val
												)
											);
										},
									},

									{
										value: "lieuStock",
										isPrintable: false,
										fn: (val) => {
											return (
												(val === 0 && "Aucun lieu") ||
												globalGetIt(
													globalDataProfile.LieuxStock,
													"IDLieuStockage",
													"nom",
													val
												)
											);
										},
									},
									{
										value: "typeCaisse",
										additionalValues: ["nbrCS", "nbrCN", "nbrCA"],
										isPrintable: true,
										isInFooter: ["nbrCS", "nbrCN", "nbrCA"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>
														{parseInt(val[0]) +
															parseInt(val[1]) +
															parseInt(val[2])}
													</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1, val2, val3]) => {
											return (
												(val === 0 && "Aucune caisse") ||
												parseInt(val1) +
													parseInt(val2) +
													parseInt(val3) +
													" " +
													globalGetIt(
														globalDataProfile.Caisse,
														"IDCaisse",
														"nom",
														val
													)
											);
										},
									},
									{
										value: "typeCaisse",
										additionalValues: ["nbrCN"],
										isPrintable: true,
										isInFooter: ["nbrCN", "nbrCS"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>{parseInt(val[0])}</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1]) => {
											return val1;
										},
									},
									{
										value: "typeCaisse",
										additionalValues: ["nbrCS"],
										isPrintable: true,
										isInFooter: ["nbrCN", "nbrCS"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>{parseInt(val[1])}</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1]) => {
											return val1;
										},
									},
									{
										value: "typeCaisse",
										additionalValues: ["nbrCA"],
										isPrintable: true,
										isInFooter: ["nbrCN", "nbrCA"],
										fnFooter: (val) => {
											return parseInt(val);
										},
										formatter: (val) => {
											return (
												(isArray(val) && (
													<Typography>{parseInt(val[1])}</Typography>
												)) ||
												val
											);
										},
										fn: ([val, val1]) => {
											return val1;
										},
									},
									{
										value: "information",
										isPrintable: true,
										fn: (val) => {
											return val;
										},
									},
								]}
								labels={[
									{
										value: "Date",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{ value: "Fournisseur", isPrintable: true },
									{ value: "Montant", isPrintable: true },
									{
										value: "Paiement",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},

									{
										value: "lieuStock",
										isPrintable: false,
										isFilter: true,
										fnFilter: (dc) => {
											return dc; //.props.children[0].split(" ")[1];
										},
									},
									{
										value: "Caisse",
										isPrintable: true,
										isFilter: true,
										fnFilter: (dc) => {
											var all = dc.split(" ").filter((ch, i) => i > 0);
											return dc.toLowerCase() !== "aucune caisse" &&
												dc.toLowerCase() !== "aucun caisse"
												? all.join(" ")
												: dc;
										},
									},
									{ value: "CN", isPrintable: true },
									{ value: "CS", isPrintable: true },
									{ value: "CA", isPrintable: true },
									{ value: "Information", isPrintable: true },
								]}
								fnDelete={(arr) => {
									setNomDelete(arr.length + " opperation(s)");
									setIdDeleteRess(arr);
									setmodalRessOpen(true);
								}}
								fnEdit={null}
								fnInsert={(arr) => {}}
							/>
						</Row>{" "}
						<Modal color={"danger"} isOpen={modalRessOpen}>
							<ModalHeader>Confirmer suppression</ModalHeader>
							<ModalBody>
								<h6>
									Voulez vous vraiment supprimer{" "}
									<strong className="text-primary">{nomDeleter}</strong>?
								</h6>
							</ModalBody>
							<ModalFooter>
								<Button
									color="info"
									onClick={(e) => {
										setmodalRessOpen(false);
									}}
								>
									Annuler
								</Button>
								<Button
									color="danger"
									onClick={(e) => {
										e.preventDefault();
										handleDeleteRess(idDeleteRess);
									}}
								>
									Confirmer
								</Button>
							</ModalFooter>
						</Modal>
						<Modal color={"danger"} isOpen={modalFilterAchatOpen}>
							<ModalHeader>
								Filtrer Opperations achat par : {filterAchatbyNom}
							</ModalHeader>
							<ModalBody>
								{filterAchatbyNom === "Categorie" && (
									<Fragment>
										<FormGroup row>
											<Col sm={12}>
												<Label for="categorieFilter">Categorie</Label>
											</Col>
											<Col sm={4}>
												<Input
													type="select"
													name="categorieFilter"
													id="categorieFilter"
													value={selectedCategFilterAchat || ""}
													onChange={(e) => {
														setcategorieFilterAchat(
															e.target.selectedOptions[0].text
														);
														setselectedCategFilterAchat(e.target.value);
													}}
												>
													<option value="">Tous</option>
													{ListecategoriesFilterAchat.map((cat, n) => {
														return <option value={cat.IDCat}>{cat.nom}</option>;
													})}
												</Input>
											</Col>
										</FormGroup>
									</Fragment>
								)}
								{filterAchatbyNom === "N° Lot" && (
									<Fragment>
										<FormGroup row>
											<Col sm={12}>
												<Label for="numLotFilter">N° Lot</Label>
											</Col>
											<Col sm={4}>
												<Input
													type="text"
													id="numLotFilter"
													name="numLotFilter"
													value={numLotFilterAchat}
													onChange={(e) => {
														setnumLotFilterAchat(e.target.value);
													}}
												/>
											</Col>
										</FormGroup>
									</Fragment>
								)}
								{filterAchatbyNom === "LieuStockage" && (
									<Fragment>
										<FormGroup row>
											<Col sm={12}>
												<Label for="lieuStockageFilter">
													Lieu de stockage :
												</Label>
											</Col>
											<Col sm={4}>
												<Input
													type="select"
													name="lieuStockageFilter"
													id="lieuStockageFilter"
													value={selectedLieuStockageFilterAchat || ""}
													onChange={(e) => {
														setlieuStockageFilterAchat(
															e.target.selectedOptions[0].text
														);
														setselectedLieuStockageFilterAchat(e.target.value);
													}}
												>
													<option value="">Tous</option>
													{ListeLieuxStockageFilterAchat.map((lieu) => (
														<option value={lieu.IDLieuStockage}>
															{lieu.nom}
														</option>
													))}
												</Input>
											</Col>
										</FormGroup>
									</Fragment>
								)}
								{filterAchatbyNom === "Date" && (
									<Fragment>
										<FormGroup className="" row>
											<Col sm={12}>
												<Label for="dateOppAchatFilter">Date :</Label>
											</Col>

											<Col sm={4}>
												<Input
													type="date"
													name="dateOppAchatFilter"
													id="dateOppAchatFilter"
													value={dateFilterAchat}
													onChange={(e) => {
														setdateFilterAchat(e.target.value);
													}}
												></Input>
											</Col>
										</FormGroup>
									</Fragment>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="info"
									onClick={(e) => {
										setmodalFilterAchatOpen(false), setbodyFilter("");
										setfilterAchatbyNom("");
									}}
								>
									Annuler
								</Button>
								<Button
									color="danger"
									onClick={(e) => {
										e.preventDefault();
										handleFilterOppsAchat();
									}}
								>
									Confirmer
								</Button>
							</ModalFooter>
						</Modal>
						<Modal color={"danger"} isOpen={modalFilterOpen}>
							<ModalHeader>Filtrer par : {filterbyNom}</ModalHeader>
							<ModalBody>
								{filterbyNom} :
								{(filterbyNom !== "Date" && (
									<Fragment>
										<FormGroup className="float-right" row>
											<Col>
												<Input
													type="select"
													id="lieuStockFilter"
													value={selectedLieuStockageFilterRess || ""}
													onChange={(e) => {
														setlieuStockRessFilter(
															e.target.selectedOptions[0].text
														);
														setselectedLieuStockageFilterRess(e.target.value);
													}}
												>
													<option value="">Tous</option>
													{(LoadinglisteLieuStockRess && (
														<option>Loading..</option>
													)) ||
														listeLieuStockRess.map((LS) => (
															<option
																key={
																	"lieuStockFilter" +
																	LS.IDLieuStockage +
																	"045678"
																}
																value={LS.IDLieuStockage}
															>
																{LS.nom}
															</option>
														))}
												</Input>
											</Col>
										</FormGroup>
									</Fragment>
								)) || (
									<Fragment>
										<Input
											type="date"
											name="dateOppAchatFilter"
											id="dateOppAchatFilter"
											value={dateRessFilter}
											onChange={(e) => {
												setdateRessFilter(e.target.value);
											}}
										></Input>
									</Fragment>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="info"
									onClick={(e) => {
										setmodalFilterOpen(false);
										setbodyFilter("");
										setfilterbyNom("");
									}}
								>
									Annuler
								</Button>
								<Button
									color="danger"
									onClick={(e) => {
										e.preventDefault();
										handleFilter();
									}}
								>
									Confirmer
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</Fragment>
			);
		}
	} else {
		return "Loading..";
	}
}
