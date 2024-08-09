import React, { useEffect, useState, Fragment } from "react";
import {
	Row,
	Col,
	Button,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";
import Moment from "moment";
import AccessInterdit from "../../tools/accessDenied";
import { toast } from "react-toastify";
import { isArray } from "lodash";
import Genatab from "../../tools/tablegeneral";
import {
	Paper,
	Typography,
	Grid,
	Container,
	DialogContent,
} from "@material-ui/core";
import AlertTitle from "@material-ui/lab/AlertTitle";
/* eslint-disable no-unused-expressions */
export default function ProfileRessourcesAchat(props) {
	const {
		globalGetIt,
		setGlobalData,
		globalDataProfile,
		printtable,
		THEME,
		currentUser,
		ref,
		activeTabNow,
		nomFournisseur,
		idFournisseur,
		refreshListeFournisseur,
		editModeFournisseurDetails,
		IDFournisseurOnEdit,
		visibilityCheck,
		editModeRessource,
		idToEditRessource,
		seteditModeRessource,
		setIdEditRessource,
	} = props;
	const [msgAddRequest, setmsgAddRequest] = useState("");
	const [listeTypePaiementRess, setlisteTypePaiementRess] = useState([]);
	const [montantRess, setmontantRess] = useState(0);
	const [typePaiementRess, settypePaiementRess] = useState("");
	const [listeCaisseRess, setlisteCaisseRess] = useState([]);
	const [nbrCSRess, setnbrCSRess] = useState(0);
	const [nbrCNRess, setnbrCNRess] = useState(0);
	const [nbrCARess, setnbrCARess] = useState(0);
	const [typeCaisseRess, settypeCaisseRess] = useState("");
	const [listeMaterielRess, setlisteMaterielRess] = useState([]);
	const [nbrMatrielRess, setnbrMatrielRess] = useState(0);
	const [typeMatrielRess, settypeMatrielRess] = useState("");
	const [listeEmballageRess, setlisteEmballageRess] = useState([]);
	const [emballageRess, setemballageRess] = useState("");
	const [nbrEmbRess, setnbrEmbRess] = useState(0);
	const [nbrCOVRess, setnbrCOVRess] = useState(0);
	const [nbrFONRess, setnbrFONRess] = useState(0);
	const [informationRess, setinformationRess] = useState("");
	const [dateRess, setdateRess] = useState(Moment().format("YYYY-MM-DD"));
	const [listeLieuStockRess, setlisteLieuStockRess] = useState([]);
	const [lieuStockRess, setlieuStockRess] = useState("");
	const [IDDocRess, setIDDocRess] = useState("");
	const [LoadinglisteTypePaiementRess, setLoadinglisteTypePaiementRess] =
		useState(false);
	const [LoadinglisteCaisseRess, setLoadinglisteCaisseRess] = useState(false);
	const [LoadinglisteMaterielRess, setLoadinglisteMaterielRess] =
		useState(false);
	const [LoadinglisteEmballageRess, setLoadinglisteEmballageRess] =
		useState(false);
	const [LoadinglisteLieuStockRess, setLoadinglisteLieuStockRess] =
		useState(false);
	const [loadingAppEdit, setloadingAppEdit] = useState(false);
	const [pleaseWait, setpleaseWait] = useState(false);
	const [loadingRess, setloadingRess] = useState(false);
	const [ressAchat, setressAchat] = useState([]);
	const [editMode, seteditMode] = useState(editModeRessource);
	const [btnAddDisabled, setbtnAddDisabled] = useState(false);
	const [IDFournisseur, setIDFournisseur] = useState("");
	const [modalOpen, setmodalOpen] = useState(false);
	const [modalFilterOpen, setmodalFilterOpen] = useState(false);
	const [bodyFilter, setbodyFilter] = useState("");
	const [filterbyNom, setfilterbyNom] = useState("");
	const [dateRessFilter, setdateRessFilter] = useState("");
	const [lieuStockRessFilter, setlieuStockRessFilter] = useState("");
	const [resultatFilter, setresultatFilter] = useState([]);
	const [fixedTabRessAchat, setfixedTabRessAchat] = useState([]);
	const [isNewFournisseur, setisNewFournisseur] = useState(false);
	const [currentPage, setcurrentPage] = useState(1);
	const [nbrOppParPage, setnbrOppParPage] = useState(5); //10 opp par page
	const [startPageOpps, setstartPageOpps] = useState(1);
	const [dropNbrParPageAchatOpen, setdropNbrParPageAchatOpen] = useState(false);
	const [TotalnbrRessTous, setTotalnbrRessTous] = useState(1);

	const [idToEdit, setidToEdit] = useState(idToEditRessource);

	const [idDelete, setidDelete] = useState("");
	const [nomDelete, setnomDelete] = useState("");
	const [msgColor, setmsgColor] = useState("");
	const [canVisit, setcanVisit] = useState(false);
	const [indexOfLastOpp, setindexOfLastOpp] = useState();
	const [indexOfFirstOpp, setindexOfFirstOpp] = useState();
	const [currentOpps, setcurrentOpps] = useState();
	const [doneOneTimePreviousOpps, setdoneOneTimePreviousOpps] = useState();
	const [pageNumbers, setpageNumbers] = useState();
	const [selectedLieuStockageFilterRess, setselectedLieuStockageFilterRess] =
		useState("");

	useEffect(() => {
		setIDFournisseur(idFournisseur);
	}, [idFournisseur]);
	useEffect(() => {
		getRessourceByIDFournisseur();
	}, [IDFournisseur, globalDataProfile.AllRessAchat]);
	useEffect(() => {
		seteditModeRessource(editMode);
		setIdEditRessource(idToEdit);

		editMode && idToEdit !== "" && doEdit(idToEdit);
		editMode && idToEdit !== "" && setIDFournisseur(idFournisseur);
	}, [idToEdit, editMode]);

	useEffect(() => {
		let uuu = JSON.stringify(currentUser);

		const tab = JSON.parse(uuu);
		setcanVisit(
			typeof tab.allowedModule !== "undefined" &&
				tab.allowedModule.split(",").includes("M_ProFRS")
		);
	}, []);
	const scrollTo = (direction) => {
		if (direction === "TOP" || direction === "" || !direction) {
			const el = document.querySelector("#formajoutEditress");
			el.scrollIntoView();
		}
	};
	//edit // update
	const doEdit = (IDOppRess) => {
		//seteditMode(true);
		setloadingAppEdit(true);

		globalDataProfile.AllRessAchat.map((ORA) => {
			if (ORA.IDResAchat === parseInt(IDOppRess)) {
				//setidToEdit(IDOppRess),
				setmontantRess(ORA.montant),
					settypePaiementRess(ORA.typePaiement),
					setnbrCSRess(ORA.nbrCS),
					setnbrCNRess(ORA.nbrCN),
					setnbrCARess(ORA.nbrCA),
					settypeCaisseRess(ORA.typeCaisse),
					setnbrMatrielRess(ORA.nbrMatriel),
					settypeMatrielRess(ORA.typeMatriel),
					setemballageRess(ORA.emballage),
					setnbrEmbRess(ORA.nbrEmb),
					setnbrCOVRess(ORA.nbrCOV),
					setnbrFONRess(ORA.nbrFON),
					setinformationRess(ORA.information),
					setdateRess(Moment(ORA.date).format("YYYY-MM-DD")),
					setlieuStockRess(ORA.lieuStock),
					setIDDocRess(ORA.IDDoc),
					setbtnAddDisabled(false),
					//fournisseur
					setIDFournisseur(ORA.IDFornisseur),
					setloadingAppEdit(false);
				editMode &&
					idToEdit !== "" &&
					idToEdit !== idToEditRessource &&
					editModeFournisseurDetails(ORA.IDFornisseur);
				//scrollTo("TOP");
			}
		});
	};

	const countAllRess = () => {
		globalDataProfile.AllRessAchat &&
			setTotalnbrRessTous(globalDataProfile.AllRessAchat);
	};
	const countAllRessByID = () => {
		if (globalDataProfile.AllRessAchat) {
			setTotalnbrRessTous(
				globalDataProfile.AllRessAchat.filter((res) => {
					return parseInt(res.IDFornisseur) === parseInt(idFournisseur);
				})
			);
		}
	};
	const getRessourceByIDFournisseur = () => {
		setloadingRess(true);
		if (IDFournisseur.toString() === "-1") {
			setloadingRess(false);
			setressAchat([]);
			setfixedTabRessAchat([]);
		}
		if (
			IDFournisseur === "tous" ||
			IDFournisseur === "Tous" ||
			IDFournisseur === ""
		) {
			setressAchat(globalDataProfile.AllRessAchat);
			setfixedTabRessAchat(globalDataProfile.AllRessAchat);

			setloadingRess(false);
		}
		if (
			IDFournisseur.toString().toLowerCase() !== "tous" &&
			IDFournisseur !== "" &&
			IDFournisseur.toString() !== "-1"
		) {
			setressAchat(
				globalDataProfile.AllRessAchat.filter(
					(or) => or.IDFornisseur === parseInt(IDFournisseur)
				)
			);
			setfixedTabRessAchat(
				globalDataProfile.AllRessAchat.filter(
					(or) => or.IDFornisseur === parseInt(IDFournisseur)
				)
			);

			setloadingRess(false);
		}
	};

	//submit
	const checkFournisseur = () => {
		fetch("/api/mariem/fournisseurs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				nomFournisseur: nomFournisseur,
				adressFournissuer: "",
				mobile: "",
				fixe: "",
				email: "",
				fax: "",
				specialite: "",
				noteFournisseur: "",
				RIB: "",
				matricule: "",
				statutFournisseur: "",
				infoFournisseur: "",
				typeFournisseur: "",
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.insertId) {
					toast.error(
						<strong>Erreur : Requet ajout fournisseur non terminé!</strong>
					);
					return false;
				}
				toast.info(<strong>Nouveau fournisseur ajoutee avec succee</strong>);
				setGlobalData(true, "Fournisseurs");
				setIDFournisseur(res.insertId);
				setisNewFournisseur(true);
				refreshListeFournisseur(res.insertId, nomFournisseur);
				//setGlobalData(true, "Fournisseurs");

				!editMode && trueSubmit(res.insertId);
				editMode && trueUpdate(res.insertId);
			});
	};
	const handleSubmit = () => {
		setpleaseWait(true);
		if (IDFournisseur === "tous" || IDFournisseur === "Tous") {
			toast.warning(<strong>Veuillez choisir un fournisseur ! </strong>, {
				autoClose: false,
			});
			setpleaseWait(false);
			return false;
		}
		if (IDFournisseur.toString() === "-1") {
			checkFournisseur();
			return false;
		}

		trueSubmit(IDFournisseur);
	};

	const trueSubmit = (id) => {
		fetch("/api/mariem/oppsRess", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				IDFournisseur: id,
				montant: montantRess,
				typePaiement: typePaiementRess,
				nbrCS: nbrCSRess,
				nbrCN: nbrCNRess,
				nbrCA: nbrCARess,
				typeCaisse: typeCaisseRess,
				nbrMatriel: nbrMatrielRess,
				typeMatriel: typeMatrielRess,
				emballage: emballageRess,
				nbrEmb: nbrEmbRess,
				nbrCOV: nbrCOVRess,
				nbrFON: nbrFONRess,
				information: informationRess,
				date: dateRess,
				lieuStock: lieuStockRess,
				IDDoc: IDDocRess,
			}),
		}).then((res) => {
			if (!res.ok) {
				toast.error(
					<strong>
						Erreur Insertion nouvelle opération ressource : Requet non terminé!
					</strong>
				);
				return false;
			} else {
				toast.success(
					<strong>Nouvelle opération de ressource ajouté avec succès</strong>
				);

				handleReset();
			}
		});
	};

	const handleNormalReset = () => {
		setisNewFournisseur(false);
		setmontantRess(0);
		settypePaiementRess("");
		setnbrCSRess(0);
		setnbrCNRess(0);
		setnbrCARess(0);
		settypeCaisseRess("");
		setnbrMatrielRess(0);
		settypeMatrielRess("");
		setemballageRess("");
		setnbrEmbRess(0);
		setnbrCOVRess(0);
		setnbrFONRess(0);
		setinformationRess("");
		setdateRess(Moment().format("YYYY-MM-DD"));
		setlieuStockRess("");
		setIDDocRess("");
		setLoadinglisteTypePaiementRess(false);
		setLoadinglisteCaisseRess(false);
		setLoadinglisteMaterielRess(false);
		setLoadinglisteEmballageRess(false);
		setLoadinglisteLieuStockRess(false);
		seteditMode(false);
		setidToEdit("");
		seteditModeRessource(false);
		setIdEditRessource("");
		setbtnAddDisabled(false);

		scrollTo("TOP");
		//setGlobalData(true, "AllRessAchat");
		//setGlobalData(true, "AllRessAchat");
		//this.getRessourceByIDFournisseur();
	};
	const handleReset = () => {
		setisNewFournisseur(false);

		setmontantRess(0);
		settypePaiementRess("");
		setnbrCSRess(0);
		setnbrCNRess(0);
		setnbrCARess(0);
		settypeCaisseRess("");
		setnbrMatrielRess(0);
		settypeMatrielRess("");
		setemballageRess("");
		setnbrEmbRess(0);
		setnbrCOVRess(0);
		setnbrFONRess(0);
		setinformationRess("");
		setdateRess(Moment().format("YYYY-MM-DD"));
		setlieuStockRess("");
		setIDDocRess("");
		setLoadinglisteTypePaiementRess(false);
		setLoadinglisteCaisseRess(false);
		setLoadinglisteMaterielRess(false);
		setLoadinglisteEmballageRess(false);
		setLoadinglisteLieuStockRess(false);

		setbtnAddDisabled(false);
		scrollTo("TOP");
		setGlobalData(true, "AllRessAchat");
	};

	//delete  opp ress

	const handleDelete = (ID) => {
		fetch("/api/mariem/oppsRess/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: ID,
			}),
		}).then((res) => {
			setmsgAddRequest(res.statusText);
			setmodalOpen(false);
			if (!res.ok) {
				setmsgAddRequest("Erreur :  Requet non terminé!" + msgAddRequest);
				setmsgColor("danger");

				toast.error(
					<strong>Erreur : Requet non terminé! {res.statusText} </strong>
				);

				return false;
			}
			setmsgColor("success");
			setidDelete("");
			toast.success(
				<strong>succé de suppression opération de ressource </strong>
			);
			setGlobalData(true, "AllRessAchat");
		});
	};

	//update ress
	const handleUpdateOppRess = () => {
		setpleaseWait(true);
		if (IDFournisseur === "tous" || IDFournisseur === "Tous") {
			toast.warning(<strong>Veuillez choisir un fournisseur !</strong>, {
				autoClose: false,
			});
			setpleaseWait(false);
			return false;
		}

		if (IDFournisseur.toString() === "-1") {
			checkFournisseur();

			return false;
		}

		trueUpdate(IDFournisseur);
	};
	const trueUpdate = (id) => {
		fetch("/api/mariem/oppsRess/" + idToEdit, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: idToEdit,
				IDFournisseur: id,
				montant: montantRess,
				typePaiement: typePaiementRess,
				nbrCS: nbrCSRess,
				nbrCN: nbrCNRess,
				nbrCA: nbrCARess,
				typeCaisse: typeCaisseRess,
				nbrMatriel: nbrMatrielRess,
				typeMatriel: typeMatrielRess,
				emballage: emballageRess,
				nbrEmb: nbrEmbRess,
				nbrCOV: nbrCOVRess,
				nbrFON: nbrFONRess,
				information: informationRess,
				date: dateRess,
				lieuStock: lieuStockRess,
				IDDoc: IDDocRess,
			}),
		}).then((res) => {
			setmsgAddRequest("Mise à jour Operation ressource : " + res.statusText);

			if (!res.ok) {
				setmsgAddRequest("Erreur Mise à jour:  Requet non terminé!");
				setmsgColor("danger");

				toast.error(
					<strong>
						Erreur Mise à jour: Requet non terminé! + {res.statusText}
					</strong>
				);

				return false;
			}
			toast.success(
				<strong>
					Succès de Mise à jour Operation ressource pour {nomFournisseur}
				</strong>
			);
			seteditMode(false);
			setidToEdit("");
			seteditModeRessource(false);
			setIdEditRessource("");
			setmsgColor("success");

			handleReset();
		});
	};
	//fn filtrage
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

	if (!canVisit) {
		return (
			<div>
				<AccessInterdit />
			</div>
		);
	} else {
		return (
			<Fragment>
				<div
					hidden={!loadingAppEdit}
					style={{
						zIndex: 9999,
						background: "#f7f7f7",
						opacity: 0.8,
						width: "100%",
						height: "100%",
						position: "absolute",
						textAlign: "center",
						fontSize: "25px",
					}}
				>
					Chargement opération ressource..
				</div>
				<Container id="formajoutEditress">
					<Grid spacing={2} container>
						<Grid item xs={3}>
							<Label for="montant">Montant</Label>
							<Input
								type="number"
								id="montant"
								name="montant"
								min="-99999999999"
								max="999999999999"
								required
								value={montantRess}
								onChange={(e) => {
									setmontantRess(e.target.value);
								}}
							></Input>
						</Grid>
						<Grid item xs={3}>
							<Label for="typePaiement">Type paiement</Label>
							<Input
								type="select"
								id="typePaiement"
								value={typePaiementRess}
								onChange={(e) => {
									settypePaiementRess(e.target.value);
								}}
							>
								<option value="">Tous</option>
								{(!globalDataProfile.Paiement && <option>Loading..</option>) ||
									globalDataProfile.Paiement.map((pay, i) => (
										<option
											key={"tpPaimentinResource01" + i}
											value={pay.IDPaiement}
										>
											{pay.nom}
										</option>
									))}
							</Input>
						</Grid>
						<Grid item xs={3}>
							<Label for="LieuStock">Lieu de stock : </Label>
							<Input
								type="select"
								id="lieuStock"
								value={lieuStockRess}
								onChange={(e) => {
									setlieuStockRess(e.target.value);
								}}
							>
								<option value="">Tous</option>
								{(!globalDataProfile.LieuxStock && (
									<option>Loading..</option>
								)) ||
									globalDataProfile.LieuxStock.map((LS) => (
										<option
											key={"lieuStockFilter2OnRessPage" + LS.IDLieuStockage}
											value={LS.IDLieuStockage}
										>
											{LS.nom}
										</option>
									))}
							</Input>
						</Grid>
						<Grid item xs={3}>
							<Label for="dateOppAchat">Date : </Label>
							<Input
								type="date"
								name="dateOppAchat"
								id="dateOppAchat"
								value={dateRess}
								onChange={(e) => {
									setdateRess(e.target.value);
								}}
							></Input>
						</Grid>
					</Grid>
					<Grid spacing={2} zeroMinWidth container>
						<Grid item xs={4}>
							<Paper
								style={{
									borderBottom: "2px solid yellow",
									background: "#fff",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											variant="h5"
											component="h2"
											style={{ flex: "1 1 100%" }}
										>
											Caisse
										</Typography>
									</Grid>
									<Grid item xs={6}>
										{" "}
										<Input
											type="select"
											id="nomCaisse"
											name="nomCaisse"
											value={typeCaisseRess}
											onChange={(e) => {
												settypeCaisseRess(e.target.value);
											}}
										>
											<option value=""></option>
											{globalDataProfile.Caisse &&
												globalDataProfile.Caisse.map((cs, i) => (
													<option
														key={"CsRess" + i}
														id={cs.poid}
														value={cs.IDCaisse}
													>
														{cs.nom}
													</option>
												))}
										</Input>
									</Grid>
								</Grid>

								<Grid container>
									<Grid item xs={4}>
										<span for="caisseCN">CN</span>

										<Input
											type="number"
											id="caisseCN"
											name="caisseCN"
											min="-99999999999"
											max="999999999999"
											required
											//placeholder="CN"
											value={nbrCNRess}
											onChange={(e) => {
												setnbrCNRess(e.target.value);
											}}
										></Input>
									</Grid>
									<Grid item xs={4}>
										<span className="bg-warning" for="caisseCS">
											CS
										</span>

										<Input
											type="number"
											id="caisseCS"
											name="caisseCS"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrCSRess}
											onChange={(e) => {
												setnbrCSRess(e.target.value);
											}}
										></Input>
									</Grid>
									<Grid item xs={4}>
										<span for="caisseCA">CA</span>

										<Input
											type="number"
											id="caisseCA"
											name="caisseCA"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrCARess}
											onChange={(e) => {
												setnbrCARess(e.target.value);
											}}
										></Input>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={4}>
							<Paper
								style={{
									borderBottom: "2px solid blue",
									background: "#fff",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography
											variant="h5"
											component="h2"
											style={{ flex: "1 1 100%" }}
										>
											Materiel
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Input
											type="select"
											name="nomMat1OppAchat"
											id="nomMat1OppAchat"
											value={typeMatrielRess}
											onChange={(e) => {
												settypeMatrielRess(e.target.value);
											}}
										>
											<option value=""></option>
											{globalDataProfile.Produits &&
												globalDataProfile.Produits.map((prod) => {
													if (prod.nomTypeProd === "MATERIEL")
														return (
															<option value={prod.IDProduit}>{prod.nom}</option>
														);
												})}
										</Input>
									</Grid>
								</Grid>

								<Grid container>
									<Grid item xs={12}>
										<span for="nbrMat1OppAchat">Nbr.</span>
									</Grid>
									<Grid item xs={12}>
										{" "}
										<Input
											type="number"
											name="nbrMat1OppAchat"
											id="nbrMat1OppAchat"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrMatrielRess}
											onChange={(e) => {
												setnbrMatrielRess(e.target.value);
											}}
										></Input>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={4}>
							<Paper
								style={{
									borderBottom: "2px solid green",
									background: "#fff",
								}}
							>
								<Grid container>
									<Grid item xs={6}>
										<Typography gutterBottom variant="h5" component="h2">
											Emballage
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Input
											type="select"
											id="nomEmballage"
											value={emballageRess}
											onChange={(e) => {
												setemballageRess(e.target.value);
											}}
										>
											<option value=""></option>
											{globalDataProfile.Emballage &&
												globalDataProfile.Emballage.map((emb) => (
													<option value={emb.IDEmballage}>
														{emb.nom} - {emb.poid}Kg - {emb.typeEmb}
													</option>
												))}
										</Input>
									</Grid>
								</Grid>

								<Grid container>
									<Grid item xs={4}>
										{" "}
										<span for="nbrEmbboite">Nbr. boite</span>
										<Input
											type="number"
											id="nbrEmbboite"
											name="nbrEmbboite"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrEmbRess}
											onChange={(e) => {
												setnbrEmbRess(e.target.value);
											}}
										></Input>
									</Grid>
									<Grid item xs={4}>
										<span for="nbrEmbcov">Nbr. Couv</span>

										<Input
											type="number"
											id="nbrEmbcov"
											name="nbrEmbcov"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrCOVRess}
											onChange={(e) => {
												setnbrCOVRess(e.target.value);
											}}
										></Input>
									</Grid>
									<Grid item xs={4}>
										<span for="nbrEmbfon">Nbr. Fond</span>
										<Input
											type="number"
											id="nbrEmbfon"
											name="nbrEmbfon"
											min="-99999999999"
											max="999999999999"
											required
											value={nbrFONRess}
											onChange={(e) => {
												setnbrFONRess(e.target.value);
											}}
										></Input>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
					<Grid spacing={2} container>
						<Grid item xs={12}>
							<Label for="observationOppAchat">Information</Label>
							<Input
								type="text"
								name="observationOppAchat"
								id="observationOppAchat"
								value={informationRess}
								onChange={(e) => {
									setinformationRess(e.target.value);
								}}
							></Input>
						</Grid>
						<Grid item xs={12}>
							{" "}
							{editMode && (
								<Fragment>
									{" "}
									<Button
										className="  btn btn-success mt-3 mb-3 float-right "
										onClick={(e) => {
											if (
												Number.isInteger(parseInt(nbrCSRess)) === false ||
												Number.isInteger(parseInt(nbrCNRess)) === false ||
												Number.isInteger(parseInt(nbrCARess)) === false ||
												Number.isInteger(parseInt(montantRess)) === false ||
												Number.isInteger(parseInt(nbrEmbRess)) === false ||
												Number.isInteger(parseInt(nbrFONRess)) === false ||
												Number.isInteger(parseInt(nbrMatrielRess)) === false ||
												Number.isInteger(parseInt(nbrCOVRess)) === false
											) {
												toast.warn("ERREUR: Un des champs est non valide   !", {
													autoClose: false,
												});
											} else {
												e.preventDefault();

												setmsgAddRequest("");
												setmsgColor("");
												let caisseValid = false;
												let materielValid = false;
												let emballageValid = false;
												let montantValid = false;
												if (!Moment(dateRess).isValid()) {
													toast.warn("Erreur : Date invalide !", {
														autoClose: false,
													});

													return false;
												} else {
													setmsgAddRequest("");
													setmsgColor("");
												}
												if (
													montantRess === 0 &&
													nbrCSRess === 0 &&
													nbrCNRess === 0 &&
													nbrCARess === 0 &&
													nbrCOVRess === 0 &&
													nbrFONRess === 0 &&
													nbrEmbRess === 0 &&
													nbrMatrielRess === 0
												) {
													toast.warn("Erreur : Ressource Vide !", {
														autoClose: false,
													});

													return false;
												} else {
													if (
														typeCaisseRess !== "" &&
														(parseInt(nbrCSRess) !== 0 ||
															parseInt(nbrCNRess) !== 0 ||
															parseInt(nbrCARess) !== 0)
													) {
														caisseValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (
														typeMatrielRess !== "" &&
														parseInt(nbrMatrielRess) !== 0
													) {
														materielValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (
														emballageRess !== "" &&
														(parseInt(nbrEmbRess) !== 0 ||
															parseInt(nbrCOVRess) !== 0 ||
															parseInt(nbrFONRess) !== 0)
													) {
														emballageValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (parseInt(montantRess) !== 0) {
														montantValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
												}
												if (
													montantValid ||
													caisseValid ||
													materielValid ||
													emballageValid
												) {
													setmsgAddRequest("");
													setmsgColor("");
													handleUpdateOppRess();
												} else {
													toast.warning(
														"Erreur : Veuillez remplir les champs correctement !",
														{
															autoClose: false,
														}
													);
												}
											}
										}}
										disabled={btnAddDisabled}
									>
										Enregistrer
									</Button>
								</Fragment>
							)}
							{!editMode && (
								<Fragment>
									<Button
										className="  btn btn-success mt-3 mb-3 float-right "
										onClick={(e) => {
											if (
												Number.isInteger(parseInt(nbrCSRess)) === false ||
												Number.isInteger(parseInt(nbrCNRess)) === false ||
												Number.isInteger(parseInt(nbrCARess)) === false ||
												Number.isInteger(parseInt(montantRess)) === false ||
												Number.isInteger(parseInt(nbrEmbRess)) === false ||
												Number.isInteger(parseInt(nbrFONRess)) === false ||
												Number.isInteger(parseInt(nbrMatrielRess)) === false ||
												Number.isInteger(parseInt(nbrCOVRess)) === false
											) {
												toast.warning(
													"ERREUR: Un des champs est non valide   !",
													{
														autoClose: false,
													}
												);
											} else {
												e.preventDefault();
												setmsgAddRequest("");
												setmsgColor("");
												let caisseValid = false;
												let materielValid = false;
												let emballageValid = false;
												let montantValid = false;
												if (!Moment(dateRess).isValid()) {
													toast.warning("Erreur : Date invalide !", {
														autoClose: false,
													});

													return false;
												} else {
													setmsgAddRequest("");
													setmsgColor("");
												}
												if (
													montantRess === 0 &&
													nbrCSRess === 0 &&
													nbrCNRess === 0 &&
													nbrCARess === 0 &&
													nbrCOVRess === 0 &&
													nbrFONRess === 0 &&
													nbrEmbRess === 0 &&
													nbrMatrielRess === 0
												) {
													toast.warn("Erreur : Ressource Vide !", {
														autoClose: false,
													});

													return false;
												} else {
													if (
														typeCaisseRess !== "" &&
														(parseInt(nbrCSRess) !== 0 ||
															parseInt(nbrCNRess) !== 0 ||
															parseInt(nbrCARess) !== 0)
													) {
														caisseValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (
														typeMatrielRess !== "" &&
														parseInt(nbrMatrielRess) !== 0
													) {
														materielValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (
														emballageRess !== "" &&
														(parseInt(nbrEmbRess) !== 0 ||
															parseInt(nbrCOVRess) !== 0 ||
															parseInt(nbrFONRess) !== 0)
													) {
														emballageValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
													if (parseInt(montantRess) !== 0) {
														montantValid = true;
														setmsgAddRequest("");
														setmsgColor("");
													}
												}
												if (
													montantValid ||
													caisseValid ||
													materielValid ||
													emballageValid
												) {
													setmsgAddRequest("");
													setmsgColor("");
													handleSubmit();
												} else {
													toast.warn(
														"Erreur : Veuillez remplir les champs correctement !",
														{
															autoClose: false,
														}
													);
												}
											}
										}}
										disabled={btnAddDisabled}
									>
										Ajouter
									</Button>{" "}
								</Fragment>
							)}
							<Button
								className=" btn btn-secondary mt-3 mb-3 float-right mr-3"
								onClick={(e) => {
									e.preventDefault();
									handleNormalReset();
								}}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
					<Row>
						<Genatab
							isLoading={loadingRess}
							isTableOpen={true}
							heighttable={440}
							idcle="IDResAchat"
							tabletitle={"Table Ressource Achat "}
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
											(isArray(val) && <Typography>{val[0]}</Typography>) || val
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
											(isArray(val) && <Typography>{val[1]}</Typography>) || val
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
											(isArray(val) && <Typography>{val[0]}</Typography>) || val
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
											(isArray(val) && <Typography>{val[0]}</Typography>) || val
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
											(val === 0 && "Aucun paiement") ||
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
											(val === 0 && "Aucun lieu.") ||
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
								setnomDelete(arr.length + " opperation(s)");

								setidDelete(arr);
								setmodalOpen(true);
							}}
							fnEdit={(arr) => {
								seteditMode(true);
								setidToEdit(arr);
							}}
							fnInsert={(arr) => {}}
						/>
					</Row>
					<Modal color={"danger"} isOpen={modalFilterOpen}>
						<ModalHeader>Filtrer par : {filterbyNom}</ModalHeader>
						<ModalBody>
							{filterbyNom} :
							{(filterbyNom !== "Date" && (
								<Fragment>
									<FormGroup className="float-right">
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
																"lieuStockFilter0123Ressss" + LS.IDLieuStockage
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
					<Modal color={"danger"} isOpen={modalOpen}>
						<ModalHeader>Confirmer suppression</ModalHeader>
						<ModalBody>
							<h6>
								Voulez vous vraiment supprimer{" "}
								<strong className="text-primary">{nomDelete}</strong>?
							</h6>
						</ModalBody>
						<ModalFooter>
							<Button
								color="info"
								onClick={(e) => {
									setmodalOpen(false);
								}}
							>
								Annuler
							</Button>
							<Button
								color="danger"
								onClick={(e) => {
									e.preventDefault();

									handleDelete(idDelete);
								}}
							>
								Confirmer
							</Button>
						</ModalFooter>
					</Modal>
				</Container>
			</Fragment>
		);
	}
}
