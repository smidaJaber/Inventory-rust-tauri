import React, { Component, Fragment } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Row,
	Col,
	Alert,
	FormGroup,
	Label,
	Input,
	Form,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
	Container,
	CardFooter,
	Spinner,
} from "reactstrap";
import axios from "axios";

import {
	FaInfoCircle,
	FaStopCircle,
	FaUpload,
	FaTrashAlt,
	FaEdit,
	FaFileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AccessInterdit from "../../tools/accessDenied";
import Genatab from "../../tools/tablegeneral";
import PNormal from "../profileSegments/printModel/normal";
import Moment from "moment";
import { isArray } from "lodash";
import { toast } from "react-toastify";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableFooter,
	TableRow,
	Toolbar,
	Typography,
	Paper,
	IconButton,
	Button,
	ButtonGroup,
	Select,
	TextField,
	InputAdornment,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AlertSP from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import FormNvOppAchat from "../../opperations/oppAchat/formNvOppAchat";
const _ = require("lodash");

//"profile facture idFournisseur = " + this.props.idFournisseur;
class profileFacture extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nomFournisseur: "Tous",
			typeFacture: "Normal",
			visibleFastEDit: false,
			//champs export // normal
			numero: "--",
			IDDoc: "",
			IDClient: "",
			typeFact: "Achat",
			date: Moment().format("YYYY-MM-DD"),
			op1: 0,
			op2: 0,
			op3: 0,
			op4: 0,
			op5: 0,
			op6: 0,
			op7: 0,
			op8: 0,
			op9: 0,
			op10: 0,
			//liste opps
			oppsListe: [],
			information: "",
			informationDelete: "",
			txtIsPayed: "",
			txtRessource: "",
			IDBonRec: 0,
			numeroBonRec: 0,
			IDBonCom: 0,
			numeroBonCom: 0,
			IDBonCon: 0,
			numeroBonCon: 0,
			IDUser: 0,
			IDEntreprise: 0,
			Modepaiement: 0,
			listeTypePaiement: [],
			LoadinglisteTypePaiement: false,

			//normal
			incoterm: "",
			banque: 0,
			ibanRib: "",
			avance: 0,
			isPayed: "-1",
			totalMontant: 0,
			msgAddRequest: "",
			msgAddRequestRessource: "",
			msgColor: "",
			msgColorRessource: "",

			//avoir

			montant: 0,
			typeProduit: "",
			listeProduit: [],
			referenceDoc: "",
			// modal
			modalListeopssOpen: false,
			loadingNomFournisseur: false,
			loadingNomCategorie: false,
			loadingNomLieuStock: false,
			loadingNomProduit: false,
			loadingNomMat1: false,
			loadingNomMat2: false,
			loadingNomEmballage: false,
			loadingNomCaisse: false,
			loadingOpps: false,

			//selected
			loadingNomFournisseurSelected: false,
			loadingNomProduitSelected: false,
			loadingNomMat1Selected: false,
			loadingNomMat2Selected: false,
			loadingNomEmballageSelected: false,
			loadingNomCaisseSelected: false,

			//
			selectedOpps: [],
			dataOppSelected: [],
			msgModalSelectOpps: "",
			colorMsgModal: "",
			x: 0,

			//control
			btnAddDisabled: false,
			editMode: false,
			editFromFacture: false,

			//liste facture

			listeFactures: [],
			loadingFactures: false,

			//modal delete
			modalOpen: false,
			idDelete: "",
			nomDelete: "",

			//edit update
			idToEdit: "",
			listeOppSupprimerOnEdit: [],
			selectedOppsOnEdit: [],

			//liste type produit
			listeCaisse: [],
			loadingCaisse: false,
			//produit
			listeProduit: [],
			loadingProduit: false,
			produitSelect: "",
			//emballage
			listeEmballage: [],
			loadingEmballage: false,
			//materiel
			listeMateriel: [],

			//compte bancaire
			LoadinglisteBanque: false,
			listeBanque: [],

			nomFournisseurEditMode: "",
			modalConfirmationOpen: false,

			//printing
			IDPRINT: 0,
			dureeMsg: 3000,

			//docs
			parametre: [],
			loadingParams: false,
			dataFactNormal: [],
			dataFactIMPEXP: [],
			dataFactAvoir: [],
			dataFactDevis: [],

			//Categ
			Listecategories: [],
			categorieAvoir: "",
			laodingListeCategs: false,
			loadingNomCategAvoir: true,

			//wrongsettings
			modalWrongSettings: false,
			msgWrongSettings: "",
			forcedDisabledButton: false,
			compteConfigure: false,
			entrepriseConfigure: false,

			//devis
			refDocDocDevis: "",
			DoPrintDevis: false,
			clientDevis: "",
			dateDevis: Moment().format("YYYY-MM-DD"),
			loadingDesignation: false,
			currentDesignation: "",
			listeOppsDevis: [],
			selectedProduitDevis: "",

			//details devis
			dataFactDevis: "",
			entrepriseDet: "",
			settings: "",
			banqueDet: "",
			loadingParams: false,

			modalDevis: false,
			listeCaisseDevis: [],
			listeEmballageDevis: [],
			listeProduitDevis: [],
			loadingCaisseDevis: false,
			loadingEmballageDevis: false,

			//proformat
			refDocDocProforma: "",
			DoPrintProformat: false,
			dataFactProformat: [],
			clientProformat: "",
			qteDesignationProformat: "",
			dateProformat: Moment().format("YYYY-MM-DD"),
			infoProformat: "",
			loadingDesignationProformat: false,
			currentDesignationProformat: "",
			currentDesignationProformat2: "",
			listeOppsProformat: [],
			selectedProduitProformat: "",
			selectedNomProduitProformat: "",
			selectedProduitProformat2: "",
			selectedNomProduitProformat2: "",

			ModepaiementProformat: "",
			incotermProformat: "",

			//details proformat
			dataFactProformat: "",
			entrepriseDetProformat: "",
			banqueDetProformat: "",

			modalProformat: false,
			listeCaisseProformat: [],
			listeEmballageProformat: [],
			listeProduitProformat: [],
			loadingCaisseProformat: false,
			loadingEmballageProformat: false,
			moreInfoFactPayed: false,

			//remplacer upload
			uploadingFactReplace: false,
			currentFactureData: [],
			progressReplaceFact: 0,

			modalEditOppAchatOpen: false,
			editFromFacture: false,
			IDEditOppAchat: "-1",
			IDModalPrintNormal: "",
			modalPrintNormal: false,
		};

		this.getOppsNonFacture = this.getOppsNonFacture.bind(this);
		this.handleSelectOpp = this.handleSelectOpp.bind(this);
		this.getOppAchatByID = this.getOppAchatByID.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.getTypePaiment = this.getTypePaiment.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitNormal = this.handleSubmitNormal.bind(this);
		this.handleSubmitExport = this.handleSubmitExport.bind(this);
		this.getNomFournisseur = this.getNomFournisseur.bind(this);

		//listefacture by id fournisseur
		this.getFactures = this.getFactures.bind(this);
		this.getFacturesNormal = this.getFacturesNormal.bind(this);
		this.getFacturesExport = this.getFacturesExport.bind(this);
		this.getBanque = this.getBanque.bind(this);

		// list all facture
		this.getALLFacturesNormal = this.getALLFacturesNormal.bind(this);
		this.getALLFacturesExport = this.getALLFacturesExport.bind(this);

		//delete facture
		this.handleDelete = this.handleDelete.bind(this);
		this.handleDeleteNormal = this.handleDeleteNormal.bind(this);
		this.handleDeleteExport = this.handleDeleteExport.bind(this);

		//print

		this.printFacture = this.printFacture.bind(this);

		//type document // facture
		this.getSettings = this.getSettings.bind(this);
		//Cat
		this.getCategories = this.getCategories.bind(this);

		//devis
		this.getCaisseDevis = this.getCaisseDevis.bind(this);
		this.getProduitDevis = this.getProduitDevis.bind(this);
		this.getEmballageDevis = this.getEmballageDevis.bind(this);

		this.handleChangeProduitDevis = this.handleChangeProduitDevis.bind(this);
		this.printDevis = this.printDevis.bind(this);

		this.getInfoDoc = this.getInfoDoc.bind(this);
		this.getEntreprise = this.getEntreprise.bind(this);
		this.getBanqueByID = this.getBanqueByID.bind(this);

		//proformat
		this.printProformat = this.printProformat.bind(this);
		this.handleChangeProduitProformat =
			this.handleChangeProduitProformat.bind(this);
		this.handleChangeProduitProformat2 =
			this.handleChangeProduitProformat2.bind(this);
		this.addToDocDoc = this.addToDocDoc.bind(this);
		this.handleOpenFolder = this.handleOpenFolder.bind(this);

		this.DoReplaceFacture = this.DoReplaceFacture.bind(this);
		this.handleSelectAllOpp = this.handleSelectAllOpp.bind(this);
		this.handleNormalReset = this.handleNormalReset.bind(this);
	}
	componentDidMount() {
		/*
    this.getCategories();
    this.getTypePaiment();
    //this.getFactures();
    this.getCaisse();
    this.getProduit();
    this.getEmballage();
    this.getBanque();*/
		this.getSettings();

		document.addEventListener("rechercher", () => {
			this.setState(
				{
					nomFournisseur:
						this.props.nomFournisseur !== ""
							? this.props.nomFournisseur
							: "tous",
				},
				this.getFactures
			);
		});
	}
	componentWillUnmount() {
		document.removeEventListener("rechercher", () => {
			this.setState(
				{
					nomFournisseur:
						this.props.nomFournisseur !== ""
							? this.props.nomFournisseur
							: "tous",
				},
				this.getFactures
			);
		});
	}
	//#region  devis

	///devis modal
	getCaisseDevis() {
		this.setState({ loadingCaisseDevis: true });
		fetch("/api/mariem/caisses")
			.then((res) => res.json())
			.then((caisses) =>
				this.setState({
					listeCaisseDevis: caisses,
					loadingCaisseDevis: false,
					listeCaisseProformat: caisses,
					loadingCaisseProformat: false,
				})
			);
	}
	getProduitDevis() {
		this.setState({ loadingProduitDevis: true });
		fetch("/api/mariem/produits")
			.then((res) => res.json())
			.then((prods) =>
				this.setState({
					listeProduitDevis: prods,
					loadingProduitDevis: false,
					listeProduitProformat: prods,
					loadingProduitProformat: false,
				})
			);
	}
	getEmballageDevis() {
		this.setState({ loadingEmballageDevis: true });
		fetch("/api/mariem/emballages")
			.then((res) => res.json())
			.then((embs) =>
				this.setState({
					listeEmballageDevis: embs,
					loadingEmballageDevis: false,
					listeEmballageProformat: embs,
					loadingEmballageProformat: false,
				})
			);
	}

	handleChangeProduitDevis(e) {
		this.setState({
			loadingDesignation: true,
			selectedProduitDevis: e.target.value,
			selectedNomProduitDevis: e.target.selectedOptions[0].text,
		});
		const typSelected = e.target.selectedOptions[0].closest("optgroup").label;
		const types = [
			{ CX: "PROD", champ: "matierePrincipale", txt: "Produit" },
			{ CX: "PROD", champ: "matierePrincipale", txt: "Service" },
			{
				CX: e.target.selectedOptions[0].text
					.trim()
					.substr(e.target.selectedOptions[0].text.lastIndexOf("|") + 1),
				champ: "typeCaisse",
				txt: "Caisse",
			},
			{ CX: "MAT", champ: "matriel", txt: "Materiaux" },
			{
				CX: "boite",
				champ: "emballage",
				txt: "Emballage Simple",
			},
			{
				CX: e.target.value.substr(4, 4),
				champ: "emballage",
				txt: "Emballage Composée",
			},
			{
				CX: e.target.value,
				champ: "emballage",
				txt: "Emballage",
			},
		];
		this.setState(
			{
				currentDesignation: types.filter((tp) => {
					return tp.txt === typSelected;
				}),
			},
			() => {
				this.setState({ loadingDesignation: false });
			}
		);
	}

	printDevis(num) {
		fetch("/api/mariem/printFacture/devis", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: num,
				IDfact: "##",
				IDClient: this.state.clientDevis,
				listeOppsDevis: this.state.listeOppsDevis,

				date: Moment(this.state.dateDevis).format("YYYY-MM-DD"),

				IDEntreprise: this.state.IDEntreprise,
				banque: this.state.banque,
				banqueDet: this.state.banqueDet,
				entrepriseDet: this.state.entrepriseDet,
				destinateurDet: this.state.destinateurDet,
				refDesignation: this.state.referenceDoc,
				referenceDoc:
					this.state.dataFactDevis.code +
					"-" +
					this.state.dataFactDevis.reference +
					"-" +
					this.state.dataFactDevis.revision,
				url: this.state.dataFactDevis.url,
			}),
		})
			.then((res) => res.json())
			.then((printed) => {
				this.handleOpenFolder(printed.link, printed.fname);
			});
	}
	getEntreprise() {
		fetch("/api/mariem/entreprises/" + this.state.settings.IDEntreprise)
			.then((res) => res.json())
			.then((Entreprises) =>
				this.setState({ entrepriseDet: Entreprises }, () => {
					if (this.state.DoPrintDevis) {
						this.addToDocDoc(
							0,
							this.state.refDocDocDevis,
							this.state.settings.IDDocDevis
						);
					}
					if (this.state.DoPrintProformat) {
						this.addToDocDoc(
							0,
							this.state.refDocDocProforma,
							this.state.settings.IDDocProformat
						);
					}
				})
			);
	}
	getInfoDoc(ID) {
		this.setState({ loadingParams: true });
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				this.setState({ settings: setts[0], loadingParams: false }, () => {
					if (this.state.DoPrintProformat) {
						fetch("/api/mariem/documents/" + setts[0].IDDocProformat)
							.then((res) => res.json())
							.then((docIE) => {
								this.setState({ dataFactDevis: docIE }, () => {
									this.getBanqueByID(this.state.settings.IDCompte);
								});
							});
					}
					if (this.state.DoPrintDevis) {
						fetch("/api/mariem/documents/" + setts[0].IDDocDevis)
							.then((res) => res.json())
							.then((docIE) => {
								this.setState({ dataFactDevis: docIE }, () => {
									this.getBanqueByID(this.state.settings.IDCompte);
								});
							});
					}
				});
			});
	}
	getBanqueByID(ID) {
		/*fetch("/api/mariem/CompteBancaires/" + ID)
			.then((res) => res.json())
			.then((CompteBancaires) =>*/
		this.setState(
			{ banqueDet: this.props.globalDataProfile.CptBank },
			this.getEntreprise
		);
		//	);
	}
	//#endregion Devis
	//#region  proformat
	handleChangeProduitProformat(e) {
		this.setState({
			loadingDesignationProformat: true,
			selectedProduitProformat: e.target.value,
			selectedNomProduitProformat: e.target.selectedOptions[0].text,
		});
		const typSelected = e.target.selectedOptions[0].closest("optgroup").label;
		const types = [
			{ CX: "PROD", champ: "matierePrincipale", txt: "Produit" },
			{ CX: "PROD", champ: "matierePrincipale", txt: "Service" },
			{
				CX: e.target.selectedOptions[0].text
					.trim()
					.substr(e.target.selectedOptions[0].text.lastIndexOf("|") + 1),
				champ: "typeCaisse",
				txt: "Caisse",
			},
			{ CX: "MAT", champ: "matriel", txt: "Materiaux" },
			{
				CX: "boite",
				champ: "emballage",
				txt: "Emballage Simple",
			},
			{
				CX: e.target.value.substr(4, 4),
				champ: "emballage",
				txt: "Emballage Composée",
			},
			{
				CX: e.target.value,
				champ: "emballage",
				txt: "Emballage",
			},
		];
		this.setState(
			{
				currentDesignationProformat: types.filter((tp) => {
					return tp.txt === typSelected;
				}),
			},
			() => {
				this.setState({ loadingDesignationProformat: false });
			}
		);
	}
	handleChangeProduitProformat2(e) {
		this.setState({
			loadingDesignationProformat: true,
			selectedProduitProformat2: e.target.value,
			selectedNomProduitProformat2: e.target.selectedOptions[0].text,
		});
		const typSelected = e.target.selectedOptions[0].closest("optgroup").label;
		const types = [
			{ CX: "PROD", champ: "matierePrincipale", txt: "Produit" },
			{ CX: "PROD", champ: "matierePrincipale", txt: "Service" },
			{
				CX: e.target.selectedOptions[0].text
					.trim()
					.substr(e.target.selectedOptions[0].text.lastIndexOf("|") + 1),
				champ: "typeCaisse",
				txt: "Caisse",
			},
			{ CX: "MAT", champ: "matriel", txt: "Materiaux" },
			{
				CX: "boite",
				champ: "emballage",
				txt: "Emballage Simple",
			},
			{
				CX: e.target.value.substr(4, 4),
				champ: "emballage",
				txt: "Emballage Composée",
			},
			{
				CX: e.target.value,
				champ: "emballage",
				txt: "Emballage",
			},
		];
		this.setState(
			{
				currentDesignationProformat2: types.filter((tp) => {
					return tp.txt === typSelected;
				}),
			},
			() => {
				this.setState({ loadingDesignationProformat: false });
			}
		);
	}
	printProformat(num) {
		fetch("/api/mariem/printFacture/proformat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: num,
				IDfact: "##",
				IDClient: this.state.clientProformat,
				Modepaiement: this.state.ModepaiementProformat,
				incoterm: this.state.incotermProformat,
				listeOppsProformat: this.state.listeOppsProformat,
				information: this.state.infoProformat,

				date: Moment(this.state.dateDevis).format("YYYY-MM-DD"),

				IDEntreprise: this.state.IDEntreprise,
				banque: this.state.banque,
				banqueDet: this.state.banqueDet,
				entrepriseDet: this.state.entrepriseDet,
				destinateurDet: this.state.destinateurDet,
				referenceDoc:
					this.state.dataFactProformat.code +
					"-" +
					this.state.dataFactProformat.reference +
					"-" +
					this.state.dataFactProformat.revision,
				url: this.state.dataFactProformat.url,
			}),
		})
			.then((res) => res.json())
			.then((printed) => {
				this.handleOpenFolder(printed.link, printed.fname);
			});

		//add doc to DocDoc
	}
	//#endregion proformat
	handleOpenFolder(f, name) {
		fetch("/api/mariem/filesanddirs/download/", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				file: f,
			}),
		})
			.then((res) => res.json())
			.then((resfile) => {
				//console.log(resfile);
				this.setState({ linkdata: resfile.link64 }, () => {
					let btn = document.createElement("a");
					btn.download = name;
					btn.href = resfile.link64;
					btn.click();
				});
			})
			.catch((re) =>
				toast.error(
					<b>
						<u>{name}</u> est introuvable dans {f}
						<br />
						<hr />
						<span>
							Pour regénérer cette fichier veuillez re-Imprimer la
							facture(Modifier puis enreg. & imprimer).
						</span>
					</b>,
					{ autoClose: false }
				)
			);
	}
	addToDocDoc(num, ref, idDoc) {
		fetch("/api/mariem/docdocs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: 0,
				reference: ref,
				IDDoc: idDoc,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.insertId) {
					alert("La facture a été ajoutée à l'archive document avec succées");
					if (this.state.DoPrintDevis) {
						this.printDevis(res.insertId);
					}
					if (this.state.DoPrintProformat) {
						this.printProformat(res.insertId);
					}
				} else {
					alert(
						"Erreur: erreur de creation de la fichier facture dans l'archive ! "
					);
					console.log(JSON.stringify(res));
				}
			});
	}
	//categ
	getCategories() {
		this.setState({ laodingListeCategs: true });
		/*	fetch("/api/mariem/categories")
			.then((res) => res.json())
			.then((categs) =>*/
		this.setState({
			Listecategories: this.props.globalDataProfile.Categories,
			laodingListeCategs: false,
		});
		//);
	}

	//documents
	getSettings() {
		this.setState({ loadingParams: true });
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				this.setState({
					parametre: setts,
					compteConfigure: setts[0].IDCompte,
					entrepriseConfigure: setts[0].IDEntreprise,
				});
				fetch("/api/mariem/documents/" + setts[0].IDDocProformat)
					.then((res) => res.json())
					.then((docPrf) => {
						this.setState({ dataFactProformat: docPrf });
						fetch("/api/mariem/documents/" + setts[0].IDDocDevis)
							.then((res) => res.json())
							.then((docDevis) => {
								this.setState({ dataFactDevis: docDevis });
								fetch("/api/mariem/documents/" + setts[0].IDDocNormal)
									.then((res) => res.json())
									.then((docN) => {
										this.setState({
											dataFactNormal: docN,
											currentFactureData: docN,
										});
										fetch("/api/mariem/documents/" + setts[0].IDDocIMPEXP)
											.then((res) => res.json())
											.then((docIE) => {
												this.setState({ dataFactIMPEXP: docIE });
												fetch("/api/mariem/documents/" + setts[0].IDDocAvoir)
													.then((res) => res.json())
													.then((docA) => {
														this.setState(
															{
																dataFactAvoir: docA,
																loadingParams: false,
															},
															() => {
																if (
																	typeof this.state.dataFactNormal.code ===
																	"undefined"
																) {
																	this.setState({
																		forcedDisabledButton: true,
																		modalWrongSettings: true,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE NORMAL ACHAT!",
																	});
																} else {
																	this.setState({
																		forcedDisabledButton: false,
																		modalWrongSettings: false,
																	});
																}
															}
														);
													});
											});
									});
							});
					});
			});
	}

	//impresssion

	printFacture(ID) {
		if (this.state.typeFacture === "Normal") {
			this.setState({ modalPrintNormal: true, IDModalPrintNormal: ID });
			//	window.location.href = "/print/fournisseur/normal/" + ID;
		}

		if (this.state.typeFacture === "IMPEXP") {
			window.location.href = "/print/fournisseur/export/" + ID;
		}

		if (this.state.typeFacture === "Avoir") {
			window.location.href = "/print/fournisseur/avoir/" + ID;
		}
	}

	// liste des produit getter
	getCaisse() {
		this.setState({ loadingCaisse: true });
		/*	fetch("/api/mariem/caisses")
			.then((res) => res.json())
			.then((caisses) =>*/
		this.setState({
			listeCaisse: this.props.globalDataProfile.Caisse,
			loadingCaisse: false,
		});
		//);
	}
	getProduit() {
		this.setState({ loadingProduit: true });
		fetch("/api/mariem/produits")
			.then((res) => res.json())
			.then((prods) =>
				this.setState({ listeProduit: prods, loadingProduit: false })
			);
	}
	getEmballage() {
		this.setState({ loadingEmballage: true });
		fetch("/api/mariem/emballages")
			.then((res) => res.json())
			.then((embs) =>
				this.setState({ listeEmballage: embs, loadingEmballage: false })
			);
	}
	getBanque() {
		this.setState({ LoadinglisteBanque: true });
		fetch("/api/mariem/compteBancaires")
			.then((res) => res.json())
			.then((bnks) =>
				this.setState({ listeBanque: bnks, LoadinglisteBanque: false })
			);
	}
	setnvIDFournisseur(ID) {
		this.setState({ IDFournisseurAjout: ID });
	}
	///
	getFactures() {
		this.state.typeFacture === "Normal" &&
			this.props.idFournisseur === "tous" &&
			this.getALLFacturesNormal();
		this.state.typeFacture === "IMPEXP" &&
			this.props.idFournisseur === "tous" &&
			this.getALLFacturesExport();
		this.state.typeFacture === "Avoir" &&
			this.props.idFournisseur === "tous" &&
			this.getALLFacturesAvoir();
		this.state.typeFacture === "Normal" &&
			this.props.idFournisseur !== "tous" &&
			this.getFacturesNormal();
		this.state.typeFacture === "IMPEXP" &&
			this.props.idFournisseur !== "tous" &&
			this.getFacturesExport();
		this.state.typeFacture === "Avoir" &&
			this.props.idFournisseur !== "tous" &&
			this.getFacturesAvoir();
	}

	/// get all facture
	getALLFacturesNormal() {
		this.setState({
			listeFactures: this.props.globalDataProfile.FacturesAchat,
		});
	}
	getALLFacturesExport() {
		this.setState({ listeFactures: this.props.globalDataProfile.FacturesExp });
	}

	getALLFacturesAvoir() {
		this.setState({
			listeFactures: this.props.globalDataProfile.FacturesAvoir,
		});
	}

	getNomFournisseur(ID) {
		this.setState({
			nomFournisseurEditMode: this.props.globalGetIt(
				this.props.globalDataProfile.Fournisseurs,
				"IDFournisseurProd",
				"nom",
				ID
			),
		});
	}
	///get facture by id fournisseur
	getFacturesNormal() {
		this.setState({
			listeFactures: this.props.globalDataProfile.FacturesAchat.filter(
				(fact) => {
					return parseInt(fact.IDClient) === parseInt(this.props.idFournisseur);
				}
			),
		});
	}
	getFacturesExport() {
		let liste =
			this.props.idFournisseur === "tous"
				? this.props.globalDataProfile.FacturesExp
				: this.props.globalDataProfile.FacturesExp.filter((fact) => {
						return (
							parseInt(fact.IDClient) === parseInt(this.props.idFournisseur)
						);
				  });

		this.setState({ listeFactures: liste });
	}
	getFacturesAvoir() {
		let liste =
			this.props.idFournisseur === "tous"
				? this.props.globalDataProfile.FacturesExp
				: this.props.globalDataProfile.FacturesExp.filter((fact) => {
						return (
							parseInt(fact.IDClient) === parseInt(this.props.idFournisseur)
						);
				  });

		this.setState({ listeFactures: liste });
	}

	getTypePaiment() {
		this.setState({ LoadinglisteTypePaiement: true });
		fetch("/api/mariem/paiements")
			.then((res) => res.json())
			.then((pays) =>
				this.setState({
					listeTypePaiement: pays,
					LoadinglisteTypePaiement: false,
				})
			);
	}
	getOppsNonFacture() {
		this.setState({ loadingOpps: true });
		fetch("/api/mariem/oppsAchat/nonFacture/" + this.props.idFournisseur)
			.then((res) => res.json())
			.then((oppAchat) => {
				this.setState({ oppsListe: oppAchat });
			})
			.then((res) => {
				this.setState({ loadingOpps: false });
			});
	}
	handleSelectAllOpp() {
		this.setState({ msgModalSelectOpps: "", colorMsgModal: "" });

		this.setState(
			{
				selectedOpps: [
					...this.state.selectedOpps.filter(
						(sl) => !this.state.oppsListe.map((ol) => ol.IDAchat).includes(sl)
					),
					...this.state.oppsListe
						.filter((ol) => !this.state.selectedOpps.includes(ol.IDAchat))
						.map((op) => op.IDAchat),
				],
				dataOppSelected: [
					...this.state.dataOppSelected.filter(
						(sl) =>
							!this.state.oppsListe.map((ol) => ol.IDAchat).includes(sl.IDAchat)
					),
					...this.state.oppsListe.filter(
						(ol) => !this.state.selectedOpps.includes(ol.IDAchat)
					),
				],
			},
			() => {
				this.setState({
					totalMontant: this.state.dataOppSelected.reduce(
						(totMontant, oppsAchat) => {
							return totMontant + oppsAchat.montant;
						},
						0
					),
				});
				this.state.oppsListe.map((ol) => {
					if (this.state.selectedOpps.includes(ol.IDAchat)) {
						document
							.getElementById("TrSelOpp" + ol.IDAchat)
							.classList.add("activeTroppSeelcted");
					} else {
						document
							.getElementById("TrSelOpp" + ol.IDAchat)
							.classList.remove("activeTroppSeelcted");
					}
				});
			}
		);
	}

	handleSelectOpp(ID) {
		this.setState({ msgModalSelectOpps: "", colorMsgModal: "" });

		let exist = this.state.selectedOpps.includes(ID);

		if (exist) {
			this.setState(
				{
					selectedOpps: this.state.selectedOpps.filter((opp) => {
						return opp.toString() !== ID.toString();
					}),
					dataOppSelected: this.state.dataOppSelected.filter((opp) => {
						return opp.IDAchat.toString() !== ID.toString();
					}),
				},
				() => {
					this.setState({
						totalMontant: this.state.dataOppSelected.reduce(
							(totMontant, oppsAchat) => {
								return totMontant + oppsAchat.montant;
							},
							0
						),
					});
				}
			);
		} else {
			this.setState(
				{
					selectedOpps: [...this.state.selectedOpps, ID],
					dataOppSelected: [
						...this.state.dataOppSelected,
						this.props.globalDataProfile.AllOppsAchat.filter(
							(op) => op.IDAchat === parseInt(ID)
						)[0],
					],
				},
				() => {
					this.setState({
						totalMontant: this.state.dataOppSelected.reduce(
							(totMontant, oppsAchat) => {
								return totMontant + oppsAchat.montant;
							},
							0
						),
					});
				}
			);
		}
	}

	getOppAchatByID(ID) {
		return this.props.globalDataProfile.AllOppsAchat.filter(
			(op) => op.IDAchat === parseInt(ID)
		)[0];
	}
	handleNormalReset() {
		this.setState({
			//champs export // normal
			numero: "--",
			IDDoc: "",
			IDClient: "",
			typeFact: "Achat",
			date: Moment().format("YYYY-MM-DD"),
			op1: 0,
			op2: 0,
			op3: 0,
			op4: 0,
			op5: 0,
			op6: 0,
			op7: 0,
			op8: 0,
			op9: 0,
			op10: 0,
			//liste opps
			oppsListe: [],
			information: "",
			txtIsPayed: "",
			txtRessource: "",
			IDBonRec: 0,
			numeroBonRec: 0,
			IDBonCom: 0,
			numeroBonCom: 0,
			IDBonCon: 0,
			numeroBonCon: 0,
			IDUser: 0,
			IDEntreprise: 0,
			Modepaiement: "",

			//normal
			incoterm: "",
			banque: 0,
			ibanRib: "",

			// modal
			modalListeopssOpen: false,
			loadingNomFournisseur: false,
			loadingNomCategorie: false,
			loadingNomLieuStock: false,
			loadingNomProduit: false,
			loadingNomMat1: false,
			loadingNomMat2: false,
			loadingNomEmballage: false,
			loadingNomCaisse: false,
			loadingOpps: false,

			//
			selectedOpps: [],
			dataOppSelected: [],
			msgModalSelectOpps: "",
			colorMsgModal: "",
			x: 0,

			//avoir

			montant: 0,
			totalMontant: 0,
			isPayed: "-1",
			avance: 0,
			typeProduit: "",
			referenceDoc: "",
			produitSelect: "",

			//control
			btnAddDisabled: false,
			editMode: false,

			//delete facture
			modalOpen: false,
			idDelete: "",
			listeToDelete: "",
			nomDelete: "",

			//edit facture
			idToEdit: "",
			selectedOppsOnEdit: [],
			listeOppSupprimerOnEdit: [],
			nomFournisseurEditMode: "",

			modalConfirmationOpen: false,
			moreInfoFactPayed: false,
		});
	}
	handleReset() {
		this.setState(
			{
				//champs export // normal
				numero: "--",
				IDDoc: "",
				IDClient: "",
				typeFact: "Achat",
				date: Moment().format("YYYY-MM-DD"),
				op1: 0,
				op2: 0,
				op3: 0,
				op4: 0,
				op5: 0,
				op6: 0,
				op7: 0,
				op8: 0,
				op9: 0,
				op10: 0,
				//liste opps
				oppsListe: [],
				information: "",
				txtIsPayed: "",
				txtRessource: "",
				IDBonRec: 0,
				numeroBonRec: 0,
				IDBonCom: 0,
				numeroBonCom: 0,
				IDBonCon: 0,
				numeroBonCon: 0,
				IDUser: 0,
				IDEntreprise: 0,
				Modepaiement: "",

				//normal
				incoterm: "",
				banque: 0,
				ibanRib: "",

				// modal
				modalListeopssOpen: false,
				loadingNomFournisseur: false,
				loadingNomCategorie: false,
				loadingNomLieuStock: false,
				loadingNomProduit: false,
				loadingNomMat1: false,
				loadingNomMat2: false,
				loadingNomEmballage: false,
				loadingNomCaisse: false,
				loadingOpps: false,

				//
				selectedOpps: [],
				dataOppSelected: [],
				msgModalSelectOpps: "",
				colorMsgModal: "",
				x: 0,

				//avoir

				montant: 0,
				totalMontant: 0,
				isPayed: "-1",
				avance: 0,
				typeProduit: "",
				referenceDoc: "",
				produitSelect: "",

				//control
				btnAddDisabled: false,
				editMode: false,

				//delete facture
				modalOpen: false,
				idDelete: "",
				listeToDelete: "",
				nomDelete: "",

				//edit facture
				idToEdit: "",
				selectedOppsOnEdit: [],
				listeOppSupprimerOnEdit: [],
				nomFournisseurEditMode: "",

				modalConfirmationOpen: false,
				moreInfoFactPayed: false,
			},
			() => {
				this.state.typeFacture === "Normal" &&
					this.props.setGlobalData(true, "FacturesAchat");

				this.state.typeFacture === "Avoir" &&
					this.props.setGlobalData(true, "FacturesAvoir");

				this.props.setGlobalData(true, "AllRessAchat");
			}
		);
	}

	//#region  SUBMIT
	handleSubmit(imprim) {
		//this.printFacture();
		//return false;
		this.setState({
			msgAddRequest: "",
			msgAddRequestRessource: "",
			modalConfirmationOpen: false,
		});
		if (this.state.isPayed === "1") {
			this.handleSubmitRessource(this.state.totalMontant, imprim);
		}
		if (this.state.isPayed === "2") {
			this.handleSubmitRessource(this.state.avance, imprim);
		}
		if (this.state.isPayed !== "1" && this.state.isPayed !== "2") {
			this.state.typeFacture === "Normal" && this.handleSubmitNormal(imprim);
			this.state.typeFacture === "IMPEXP" && this.handleSubmitExport(imprim);
			this.state.typeFacture === "Avoir" && this.handleSubmitAvoir(imprim);
		}
	}

	DoReplaceFacture() {
		this.setState({ uploadingFactReplace: true });

		const formData = new FormData();
		formData.append("file", this.state.fileToReplaceBy);
		formData.append("url", this.state.currentFactureData.url);
		formData.append(
			"filename",
			this.state.currentFactureData.code +
				"-" +
				this.state.currentFactureData.reference +
				"-" +
				this.state.currentFactureData.revision +
				"#" +
				this.state.idReplace
		);

		axios
			.post("/api/mariem/uploadFact", formData, {
				onUploadProgress: (ProgressEvent) => {
					let progress =
						Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
						"%";
					this.setState({ progressReplaceFact: progress });
				},
			})
			.then((res) => {
				toast.success("Remplacement de la facture terminé avec succée !");
				this.setState({
					uploadingFactReplace: false,
					msgAddRequest: "Remplacement de la facture terminé avec succée !",
					msgColor: "success",
					fileToReplaceBy: "",
					progressReplaceFact: 0,
					modalReplaceFactOpen: false,
				});
			})
			.catch((err) => console.log(err));
	}
	handleSubmitRessource(montant, imprim) {
		fetch("/api/mariem/oppsRess", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				IDFournisseur:
					this.props.idFournisseur !== "Tous" &&
					this.props.idFournisseur !== "tous" &&
					this.props.idFournisseur !== ""
						? this.props.idFournisseur
						: this.state.IDClient,
				montant: montant,
				typePaiement: this.state.Modepaiement,
				nbrCS: 0,
				nbrCN: 0,
				nbrCA: 0,
				typeCaisse: "",
				nbrMatriel: 0,
				typeMatriel: "",
				emballage: "",
				nbrEmb: 0,
				nbrCOV: 0,
				nbrFON: 0,
				information: this.state.information + this.state.txtIsPayed,
				date: Moment().format("YYYY-MM-DD"),
				lieuStock: "",
				IDDoc: this.state.numeroBonCon,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					msgAddRequestRessource:
						"  Nouvelle opération ressource : " + res.statusText,
				});
				if (!res.insertId) {
					toast.error(
						"Erreur Insertion nouvelle opération ressource :  Requet non terminé!",
						{ autoClose: false }
					);
					this.setState({
						msgAddRequestRessource:
							"Erreur Insertion nouvelle opération ressource :  Requet non terminé!",
						msgColorRessource: "danger",
					});

					return false;
				}

				toast.success("Nouvelle opération ressource ajouté avec succès");
				this.setState(
					{
						msgColorRessource: "success",
						txtRessource: "|Ressource :" + res.insertId,
					},
					() => {
						this.hideAfter();
						if (this.state.editMode) {
							this.state.typeFacture === "Normal" &&
								this.handleUpdateNormal(imprim);
							this.state.typeFacture === "IMPEXP" &&
								this.handleUpdateExport(imprim);
							this.state.typeFacture === "Avoir" &&
								this.handleUpdateAvoir(imprim);
						} else {
							this.state.typeFacture === "Normal" &&
								this.handleSubmitNormal(imprim);
							this.state.typeFacture === "IMPEXP" &&
								this.handleSubmitExport(imprim);
							this.state.typeFacture === "Avoir" &&
								this.handleSubmitAvoir(imprim);
						}
					}
				);
			});
	}

	handleSubmitNormal(imprim) {
		fetch("/api/mariem/Factures", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				numero: this.state.numero,
				IDDoc: this.state.dataFactNormal.IDDoc,
				IDClient: this.props.idFournisseur,
				typeFact: this.state.typeFact,
				date: this.state.date,
				op1: this.state.op1,
				op2: this.state.op2,
				op3: this.state.op3,
				op4: this.state.op4,
				op5: this.state.op5,
				op6: this.state.op6,
				op7: this.state.op7,
				op8: this.state.op8,
				op9: this.state.op9,
				op10: this.state.op10,
				information:
					this.state.information +
					this.state.txtIsPayed +
					this.state.txtRessource,
				IDBonRec: this.state.IDBonRec,
				numeroBonRec: this.state.numeroBonRec,
				IDBonCom: this.state.IDBonCom,
				numeroBonCom: this.state.numeroBonCom,
				IDBonCon: this.state.IDBonCon,
				numeroBonCon: this.state.numeroBonCon,
				IDUser: this.state.IDUser,
				IDEntreprise: this.state.entrepriseConfigure,
				listeIDOpps: this.state.selectedOpps.toString(),
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					msgAddRequest: "Nouvelle Facture Normal ajouté avec succès",
				});
				if (!res.insertId) {
					toast.error(
						"Erreur Insertion nouvelle facture :  Requet non terminé!",
						{ autoClose: false }
					);
					this.setState({
						msgAddRequest:
							"Erreur Insertion nouvelle facture :  Requet non terminé!",

						msgColor: "danger",
					});

					return false;
				}
				toast.success("Nouvelle Facture Normal ajouté avec succès");
				this.setState({ msgColor: "success" }, () => {
					this.hideAfter();
				});

				if (imprim) {
					this.printFacture(res.insertId);
				} else {
					this.handleReset();
				}
			});
	}
	handleSubmitExport(imprim) {
		fetch("/api/mariem/Factures/export", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				numero: this.state.numero,
				IDDoc: this.state.dataFactIMPEXP.IDDoc,
				IDClient: this.props.idFournisseur,
				typeFact: this.state.typeFact,
				date: this.state.date,
				op1: this.state.op1,
				op2: this.state.op2,
				op3: this.state.op3,
				op4: this.state.op4,
				op5: this.state.op5,
				op6: this.state.op6,
				op7: this.state.op7,
				op8: this.state.op8,
				op9: this.state.op9,
				op10: this.state.op10,
				information:
					this.state.information +
					this.state.txtIsPayed +
					this.state.txtRessource,
				IDBonRec: this.state.IDBonRec,
				numeroBonRec: this.state.numeroBonRec,
				IDBonCom: this.state.IDBonCom,
				numeroBonCom: this.state.numeroBonCom,
				IDBonCon: this.state.IDBonCon,
				numeroBonCon: this.state.numeroBonCon,
				IDUser: this.state.IDUser,
				IDEntreprise: this.state.entrepriseConfigure,
				Modepaiement: this.state.Modepaiement,
				incoterm: this.state.incoterm,
				banque: this.state.banque,
				ibanRib: this.state.ibanRib,
				listeIDOpps: this.state.selectedOpps.toString(),
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					msgAddRequest: "Nouvelle Facture IMP/EXp ajouté avec success ",
				});
				if (!res.insertId) {
					this.setState({
						msgAddRequest:
							"Erreur Insertion nouvelle facture :  Requet non terminé!",
						msgColor: "danger",
					});

					return false;
				}
				this.setState({ msgColor: "success" });
				//this.handleReset();
				if (imprim) {
					this.printFacture(res.insertId);
				} else {
					this.handleReset();
				}
			});
	}
	handleSubmitAvoir(imprim) {
		fetch("/api/mariem/Factures/avoir", {
			method: "POST",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({
				IDFact: this.state.dataFactAvoir.IDDoc,
				IDClient: this.props.idFournisseur,
				typeProduit: this.state.typeProduit,
				montant: this.state.montant,
				referenceDoc: this.state.referenceDoc,
				information: this.state.information,

				IDUser: this.state.IDUser,
				date: this.state.date,
				IDCateg: this.state.categorieAvoir,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					msgAddRequest: "Nouvelle Facture Avoir : " + res.statusText,
				});
				if (!res.insertId) {
					this.setState({
						msgAddRequest:
							"Erreur Insertion nouvelle facture :  Requet non terminé!" +
							this.state.msgAddRequest,
						msgColor: "danger",
					});

					return false;
				}
				this.setState({ msgColor: "success" });
				//this.handleReset();
				if (imprim) {
					this.printFacture(res.insertId);
				} else {
					this.handleReset();
				}
			});
	}
	//#endregion
	//#region  DELETE
	handleDelete(ID, list) {
		this.setState({
			msgAddRequest: "",
			msgAddRequestRessource: "",
			msgColor: "",
			msgColorRessource: "",
		});

		this.state.typeFacture === "Normal" && this.handleDeleteNormal(ID, list);
		this.state.typeFacture === "IMPEXP" && this.handleDeleteExport(ID, list);
		this.state.typeFacture === "Avoir" && this.handleDeleteAvoir(ID);
	}
	handleDeleteNormal(ID, list) {
		fetch("/api/mariem/Factures/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({ listeIDOpps: list }),
		}).then((res) => {
			this.setState({ idDelete: "", modalOpen: false });
			if (!res.ok) {
				toast.error("Erreur :  Requet non terminé!", { autoClose: false });

				return false;
			}
			toast.success("Facture supprimé avec succès");
			this.handleReset();
			//this.props.setGlobalData(true, "FacturesAchat");
		});
	}
	handleDeleteExport(ID, list) {
		fetch("/api/mariem/Factures/export/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },

			body: JSON.stringify({ listeIDOpps: list }),
		}).then((res) => {
			this.setState({ msgAddRequest: res.statusText, modalOpen: false });
			if (!res.ok) {
				this.setState({
					msgAddRequest:
						"Erreur :  Requet non terminé!" + this.state.msgAddRequest,
					msgColor: "danger",
				});
				return false;
			}
			this.setState({ msgColor: "success", idDelete: "" }, () => {
				this.handleReset();
			});
		});
	}
	handleDeleteAvoir(ID) {
		fetch("/api/mariem/Factures/avoir/" + ID, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			this.setState({ msgAddRequest: res.statusText, modalOpen: false });
			if (!res.ok) {
				this.setState({
					msgAddRequest:
						"Erreur :  Requet non terminé!" + this.state.msgAddRequest,
					msgColor: "danger",
				});
				return false;
			}
			this.setState({ msgColor: "success", idDelete: "" }, this.handleReset);
		});
	}
	//#endregion

	//#region  EDIT
	//edit
	doEdit(IDFacture) {
		this.scrollTo("TOP");
		this.setState(
			{
				listeOppSupprimerOnEdit: [],
				dataOppSelected: [],
				selectedOpps: [],
				msgAddRequest: "",
				msgAddRequestRessource: "",
				msgColor: "",
				msgColorRessource: "",
				paperFormFacture: true,
			},
			() => {
				this.state.typeFacture === "Normal" && this.DoEditNormal(IDFacture);
				this.state.typeFacture === "IMPEXP" && this.DoEditExport(IDFacture);
				this.state.typeFacture === "Avoir" && this.DoEditAvoir(IDFacture);
			}
		);
	}

	DoEditNormal(IDFacture) {
		this.setState({ loadingFactEdit: true });

		fetch("/api/mariem/Factures/" + IDFacture)
			.then((res) => res.json())
			.then((ORA) => {
				if (ORA.error === "ID introuvable") {
					alert("Facture introuvable");
					return false;
				}
				this.setState({
					idToEdit: IDFacture,
					IDPRINT: IDFacture,

					numero: ORA.numero,
					IDDoc: ORA.IDDoc,
					IDClient: ORA.IDClient,
					typeFact: ORA.typeFact,
					date: Moment(ORA.date).format("YYYY-MM-DD"),
					//liste opps
					oppsListe: [],
					information: ORA.information,
					txtIsPayed:
						typeof ORA.information.split("|")[1] !== "undefined"
							? "|" + ORA.information.split("|")[1]
							: "",
					txtRessource:
						typeof ORA.information.split("|")[2] !== "undefined"
							? "|" + ORA.information.split("|")[2]
							: "",
					IDBonRec: ORA.IDBonRec,
					numeroBonRec: ORA.numeroBonRec,
					IDBonCom: ORA.IDBonCom,
					numeroBonCom: ORA.numeroBonCom,
					IDBonCon: ORA.IDBonCon,
					numeroBonCon: ORA.numeroBonCon,
					IDUser: ORA.IDUser,
					IDEntreprise: ORA.IDEntreprise,
					Modepaiement: "",
					isPayed: "-1",

					LoadinglisteTypePaiement: false,

					//
					selectedOpps: [],
					selectedOppsOnEdit: ORA.listeIDOpps.split(","),
					dataOppSelected: [],
					editMode: true,
				});
				this.getNomFournisseur(ORA.IDClient);
			})
			.then((res) => {
				this.state.selectedOppsOnEdit.map((ID) => {
					this.handleSelectOpp(ID);
				});
			})
			.then((rs) => {
				this.setState({ loadingFactEdit: false });
			});
	}
	DoEditExport(IDFacture) {
		this.setState({ loadingFactEdit: true });

		fetch("/api/mariem/Factures/export/" + IDFacture)
			.then((res) => res.json())
			.then((ORA) => {
				this.setState({
					idToEdit: IDFacture,
					IDPRINT: IDFacture,
					numero: ORA.numero,
					IDDoc: ORA.IDDoc,
					IDClient: ORA.IDClient,
					typeFact: ORA.typeFact,
					date: Moment(ORA.date).format("YYYY-MM-DD"),
					//liste opps
					oppsListe: [],
					information: ORA.information,
					txtIsPayed:
						typeof ORA.information.split("|")[1] !== "undefined"
							? "|" + ORA.information.split("|")[1]
							: "",
					txtRessource:
						typeof ORA.information.split("|")[2] !== "undefined"
							? "|" + ORA.information.split("|")[2]
							: "",
					IDBonRec: ORA.IDBonRec,
					numeroBonRec: ORA.numeroBonRec,
					IDBonCom: ORA.IDBonCom,
					numeroBonCom: ORA.numeroBonCom,
					IDBonCon: ORA.IDBonCon,
					numeroBonCon: ORA.numeroBonCon,
					IDUser: ORA.IDUser,
					IDEntreprise: ORA.IDEntreprise,
					Modepaiement: ORA.Modepaiement,

					isPayed: "-1",
					incoterm: ORA.modeLivraison,
					ibanRib: ORA.ibanRib,
					banque: ORA.banque,

					LoadinglisteTypePaiement: false,

					//
					selectedOpps: [],
					selectedOppsOnEdit: ORA.listeIDOpps.split(","),
					dataOppSelected: [],
					editMode: true,
				});
				this.getNomFournisseur(ORA.IDClient);
			})
			.then((res) => {
				this.state.selectedOppsOnEdit.map((ID) => {
					this.handleSelectOpp(ID);
				});
			})
			.then((rs) => {
				this.setState({ loadingFactEdit: false });
				this.scrollTo("TOP");
			});
	}
	DoEditAvoir(IDFacture) {
		this.setState({ loadingFactEdit: true });

		fetch("/api/mariem/Factures/avoir/" + IDFacture)
			.then((res) => res.json())
			.then((ORA) => {
				this.setState(
					{
						idToEdit: IDFacture,
						IDPRINT: IDFacture,
						numero: IDFacture,
						IDFact: ORA.IDDoc,
						IDClient: ORA.IDClient,
						typeProduit: ORA.typeProduit,
						montant: ORA.montant,
						referenceDoc: ORA.referenceDoc,
						information: ORA.information,

						IDUser: ORA.IDUser,
						date: ORA.date,
						categorieAvoir: ORA.IDCateg,

						editMode: true,
					},
					() => {
						let id = document
							.getElementById("TypeProduit")
							.childNodes.forEach((opt, i) => {
								opt.childNodes.forEach((option, j) => {
									if (option.text === this.state.typeProduit) {
										this.setState({ produitSelect: option.value });
										return true;
									}
								});
							});
					}
				);
				this.getNomFournisseur(ORA.IDClient);
			})

			.then((rs) => {
				this.setState({ loadingFactEdit: false });
				this.scrollTo("TOP");
			});
	}
	//#endregion

	//#region  UPDATE
	// update empty=+>selectedOppsOnEdit

	handleUpdate(imprim) {
		this.setState({ modalConfirmationOpen: false });
		if (this.state.isPayed === "1") {
			this.handleSubmitRessource(this.state.totalMontant, imprim);
		}
		if (this.state.isPayed === "2") {
			this.handleSubmitRessource(this.state.avance, imprim);
		}
		if (this.state.isPayed !== "1" && this.state.isPayed !== "2") {
			this.state.typeFacture === "Normal" && this.handleUpdateNormal(imprim);
			this.state.typeFacture === "IMPEXP" && this.handleUpdateExport(imprim);
			this.state.typeFacture === "Avoir" && this.handleUpdateAvoir(imprim);
		}
	}
	handleUpdateNormal(imprim) {
		fetch("/api/mariem/Factures/" + this.state.idToEdit, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idToEdit: this.state.idToEdit,

				numero: this.state.numero,
				IDDoc: this.state.IDDoc,
				IDClient: this.state.IDClient,
				typeFact: this.state.typeFact,
				date: this.state.date,
				op1: this.state.op1,
				op2: this.state.op2,
				op3: this.state.op3,
				op4: this.state.op4,
				op5: this.state.op5,
				op6: this.state.op6,
				op7: this.state.op7,
				op8: this.state.op8,
				op9: this.state.op9,
				op10: this.state.op10,
				information:
					this.state.information
						.replace(this.state.txtIsPayed, "")
						.replace(this.state.txtRessource, "") +
					this.state.txtIsPayed +
					this.state.txtRessource,
				IDBonRec: this.state.IDBonRec,
				numeroBonRec: this.state.numeroBonRec,
				IDBonCom: this.state.IDBonCom,
				numeroBonCom: this.state.numeroBonCom,
				IDBonCon: this.state.IDBonCon,
				numeroBonCon: this.state.numeroBonCon,
				IDUser: this.state.IDUser,
				IDEntreprise: this.state.IDEntreprise,
				listeIDOpps: this.state.selectedOpps.toString(),
				listeIDoppsDeleted: this.state.listeOppSupprimerOnEdit.toString(),
			}),
		}).then((res) => {
			this.setState({
				msgAddRequest: "Mise à jour Facture NORMAL: " + res.statusText,
			});
			if (!res.ok) {
				toast.error("Erreur Mise à jour facture NORMAL:  Requet non terminé!", {
					autoClose: false,
				});
				this.setState({
					msgAddRequest:
						"Erreur Mise à jour facture NORMAL:  Requet non terminé!" +
						this.state.msgAddRequest,
					msgColor: "danger",
				});
				return false;
			}
			//alert(this.state.isSelected);

			toast.success("Mise à jour Facture NORMAL terminé avec succès");
			this.setState({ msgColor: "success" });

			if (imprim) {
				this.printFacture(this.state.IDPRINT);
			} else {
				this.handleReset();
			}
			//this.handleReset();
		});
	}
	handleUpdateExport(imprim) {
		fetch("/api/mariem/Factures/export/" + this.state.idToEdit, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idToEdit: this.state.idToEdit,

				numero: this.state.numero,
				IDDoc: this.state.IDDoc,
				IDClient: this.state.IDClient,
				typeFact: this.state.typeFact,
				date: this.state.date,
				op1: this.state.op1,
				op2: this.state.op2,
				op3: this.state.op3,
				op4: this.state.op4,
				op5: this.state.op5,
				op6: this.state.op6,
				op7: this.state.op7,
				op8: this.state.op8,
				op9: this.state.op9,
				op10: this.state.op10,
				information:
					this.state.information
						.replace(this.state.txtIsPayed, "")
						.replace(this.state.txtRessource, "") +
					this.state.txtIsPayed +
					this.state.txtRessource,
				numeroBonRec: this.state.numeroBonRec,
				IDBonCom: this.state.IDBonCom,
				numeroBonCom: this.state.numeroBonCom,
				IDBonCon: this.state.IDBonCon,
				numeroBonCon: this.state.numeroBonCon,
				IDUser: this.state.IDUser,
				IDEntreprise: this.state.IDEntreprise,
				Modepaiement: this.state.Modepaiement,
				incoterm: this.state.incoterm,
				ibanRib: this.state.ibanRib,
				banque: this.state.banque,
				listeIDOpps: this.state.selectedOpps.toString(),
				listeIDoppsDeleted: this.state.listeOppSupprimerOnEdit.toString(),
			}),
		}).then((res) => {
			this.setState({
				msgAddRequest: "Mise à jour Facture EXPORT: " + res.statusText,
			});
			if (!res.ok) {
				this.setState({
					msgAddRequest:
						"Erreur Mise à jour facture EXPORT:  Requet non terminé!" +
						this.state.msgAddRequest,
					msgColor: "danger",
				});
				return false;
			}
			//alert(this.state.isSelected);

			//alert(this.state.msgAddRequest);
			this.setState({ msgColor: "success" });

			if (imprim) {
				this.printFacture(this.state.IDPRINT);
			} else {
				this.handleReset();
			}
			//this.handleReset();
		});
	}
	handleUpdateAvoir(imprim) {
		fetch("/api/mariem/Factures/avoir/" + this.state.idToEdit, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				idToEdit: this.state.idToEdit,

				IDFact: this.state.IDDoc,
				IDClient: this.state.IDClient,
				typeProduit: this.state.typeProduit,
				montant: this.state.montant,
				referenceDoc: this.state.referenceDoc,
				information: this.state.information,

				IDUser: this.state.IDUser,
				date: this.state.date,
				IDCateg: this.state.categorieAvoir,
			}),
		}).then((res) => {
			this.setState({
				msgAddRequest: "Mise à jour Facture Avoir: " + res.statusText,
			});
			if (!res.ok) {
				this.setState({
					msgAddRequest:
						"Erreur Mise à jour facture Avoir:  Requet non terminé!" +
						this.state.msgAddRequest,
					msgColor: "danger",
				});
				return false;
			}
			//alert(this.state.isSelected);
			this.setState({ msgColor: "success" });

			if (imprim) {
				this.printFacture(this.state.IDPRINT);
			} else {
				this.handleReset();
			}
			//this.handleReset();
		});
	}

	//#endregion
	scrollTo(direction) {
		if (direction === "TOP" || direction === "" || !direction) {
			const el = document.querySelector("#lapagefacturefournisseurID");
			el.scrollIntoView();
		}
	}

	hideAfter() {
		window.setTimeout(() => {
			this.setState({ msgAddRequestRessource: "", msgAddRequest: "" });
		}, 3000);
	}
	render() {
		let uuu = JSON.stringify(this.props.currentUser);

		const tab = JSON.parse(uuu);
		let canVisit =
			typeof tab.allowedModule !== "undefined" &&
			tab.allowedModule.split(",").includes("M_ProFFact");

		if (!canVisit) {
			return (
				<div>
					<AccessInterdit />
				</div>
			);
		} else {
			return (
				<Fragment>
					<div>
						<Modal color="info" isOpen={this.state.modalConfirmationOpen}>
							<ModalHeader>Facture {this.state.typeFacture}</ModalHeader>
							<CardBody>Que voulez vous faire ?</CardBody>
							<CardFooter>
								<Button
									color={"danger"}
									onClick={(e) => {
										this.setState({ modalConfirmationOpen: false });
									}}
								>
									Annuler
								</Button>
								{!this.state.editMode && (
									<Fragment>
										<Button
											style={{ background: "#388e3c" }}
											color={"warning"}
											onClick={(e) => {
												e.preventDefault();
												this.handleSubmit(false);
											}}
										>
											Ajouter
										</Button>
										<Button
											style={{ background: "#ff9800" }}
											color="default"
											onClick={(e) => {
												e.preventDefault();
												this.handleSubmit(true);
											}}
										>
											Ajouter & Imprimer
										</Button>
									</Fragment>
								)}
								{this.state.editMode && (
									<Fragment>
										<Button
											style={{ background: "#388e3c" }}
											color={"warning"}
											onClick={(e) => {
												e.preventDefault();
												this.handleUpdate(false);
											}}
										>
											Enregistrer
										</Button>
										<Button
											style={{ background: "#ff9800" }}
											color="default"
											onClick={(e) => {
												e.preventDefault();
												this.handleUpdate(true);
											}}
										>
											Enregistrer & Imprimer
										</Button>
									</Fragment>
								)}
							</CardFooter>
						</Modal>
						<Paper className="mb-4" id="lapagefacturefournisseurID">
							<Toolbar
								onClick={() => {
									this.setState({
										paperFormFacture: !this.state.paperFormFacture,
									});
								}}
							>
								<Typography
									variant="h6"
									id="tableTitle"
									component="div"
									style={{ flex: "1 1 100%" }}
								>
									Nouvelle Facture {this.state.typeFacture}
								</Typography>
								<IconButton
									aria-label="expand row"
									size="small"
									onClick={() => {
										this.setState({
											paperFormFacture: !this.state.paperFormFacture,
										});
									}}
								>
									{this.state.paperFormFacture ? (
										<KeyboardArrowUpIcon />
									) : (
										<KeyboardArrowDownIcon />
									)}
								</IconButton>
							</Toolbar>
							<Collapse
								in={this.state.paperFormFacture}
								timeout="auto"
								unmountOnExitisOpen
							>
								{" "}
								<Card color="">
									<div
										hidden={!this.state.loadingFactEdit}
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
										Chargement facture..
									</div>
									<CardHeader>
										<Row>
											<Col sm={4}>
												<Label
													for="numeroFacture"
													style={{ fontFamily: "Time new Roman" }}
												>
													<span>
														<strong
															style={{ color: "#0918fe", fontSize: "19px" }}
														>
															{this.state.nomFournisseurEditMode + " "}
														</strong>
													</span>

													<h5>
														Facture N°:{" "}
														<strong
															onDoubleClick={(e) => {
																this.setState({
																	visibleFastEDit: !this.state.visibleFastEDit,
																});
															}}
															style={{ color: "#0918fe", fontSize: "24px" }}
														>
															{this.state.numero}

															<Input
																hidden={!this.state.visibleFastEDit}
																type="text"
																value={this.state.FastEDit}
																onChange={(e) => {
																	this.setState({ FastEDit: e.target.value });
																}}
																/*onKeyDown={(e) => {
																	if (e.keyCode === 13) {
																		this.doEdit(e.target.value);
																		this.setState({ visibleFastEDit: false });
																	}
																}}*/
															/>
														</strong>
													</h5>

													<Modal isOpen={this.state.modalReplaceFactOpen}>
														<ModalHeader>
															Remplacement de la facture : {this.state.typeFact}
														</ModalHeader>
														<ModalBody>
															<FormGroup row>
																<Col sm={6}>
																	<Label for="IDFileReplace">
																		Choisir un fichier
																	</Label>
																</Col>
																<Col>
																	<Input
																		type="file"
																		id="IDFileReplace"
																		accept=".xlsx"
																		onChange={(e) => {
																			this.setState({
																				fileToReplaceBy: e.target.files[0],
																			});
																		}}
																	/>
																</Col>
															</FormGroup>

															<FormGroup
																row
																hidden={!this.state.uploadingFactReplace}
															>
																<Col sm={12}>
																	<Label for="uploadDoc">
																		Envoi de la facture en cours...
																		{this.state.progressReplaceFact}
																	</Label>
																</Col>
																<Col>
																	<Spinner size="sm" color="primary" />{" "}
																</Col>
															</FormGroup>
														</ModalBody>
														<ModalFooter>
															<Row>
																<Col>
																	<Button
																		disabled={this.state.uploadingFactReplace}
																		onClick={(e) => {
																			this.setState({
																				modalReplaceFactOpen: false,
																			});
																		}}
																	>
																		Annuler
																	</Button>
																	<Button
																		color="success"
																		disabled={this.state.uploadingFactReplace}
																		onClick={this.DoReplaceFacture}
																	>
																		Enregistrer
																	</Button>
																</Col>
															</Row>
														</ModalFooter>
													</Modal>
												</Label>
											</Col>

											<Col sm={4}>
												<FormGroup className="pr-0 mr-0 " row>
													<Col sm={4}>
														<Label className="pr-0 mr-0 " for="dateFacture">
															Date :{" "}
														</Label>
													</Col>

													<Col sm={8} className="pl-0 ml-0">
														<Input
															className="pl-0 ml-0"
															type="date"
															name="dateFacture"
															id="dateFacture"
															value={this.state.date}
															onChange={(e) => {
																this.setState({ date: e.target.value });
															}}
														></Input>
													</Col>
												</FormGroup>
											</Col>

											<Col sm={4}>
												<FormGroup row>
													<Col sm={4} className="pr-0 mr-0 float-right">
														<Label className="pr-0 mr-0 " for="typeFacture">
															Type facture
														</Label>
													</Col>

													<Col sm={8} className="pl-0 ml-0">
														<Input
															className="pl-0 ml-0"
															type="select"
															id="typePaiement"
															value={this.state.typeFacture}
															onChange={(e) => {
																if (
																	typeof this.state.dataFactNormal.code !==
																		"undefined" &&
																	e.target.value === "Normal"
																) {
																	this.setState(
																		{
																			typeFacture: e.target.value,
																			listeFactures: [],
																			forcedDisabledButton: false,
																			currentFactureData:
																				this.state.dataFactNormal,
																		},
																		() => {
																			this.handleReset();
																		}
																	);
																}

																if (
																	typeof this.state.dataFactIMPEXP.code !==
																		"undefined" &&
																	e.target.value === "IMPEXP"
																) {
																	this.setState(
																		{
																			typeFacture: e.target.value,
																			listeFactures: [],
																			forcedDisabledButton: false,
																			currentFactureData:
																				this.state.dataFactIMPEXP,
																		},
																		() => {
																			this.handleReset();
																		}
																	);
																}
																if (
																	typeof this.state.dataFactAvoir.code !==
																		"undefined" &&
																	e.target.value === "Avoir"
																) {
																	this.setState(
																		{
																			typeFacture: e.target.value,
																			listeFactures: [],
																			forcedDisabledButton: false,
																			currentFactureData:
																				this.state.dataFactAvoir,
																		},
																		() => {
																			this.handleReset();
																		}
																	);
																}

																if (
																	typeof this.state.dataFactDevis.code ===
																		"undefined" &&
																	e.target.value === "Devis"
																) {
																	this.setState({
																		modalDevis: false,
																		modalWrongSettings: true,
																		currentFactureData:
																			this.state.dataFactDevis,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE Devis!",
																	});
																}
																if (
																	typeof this.state.dataFactProformat.code ===
																		"undefined" &&
																	e.target.value === "Proformat"
																) {
																	this.setState({
																		modalProformat: false,
																		modalWrongSettings: true,
																		currentFactureData:
																			this.state.dataFactProformat,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE PROFORMAT!",
																	});
																}
																if (
																	typeof this.state.dataFactDevis.code !==
																		"undefined" &&
																	e.target.value === "Devis"
																) {
																	this.setState(
																		{
																			modalDevis: true,
																			DoPrintDevis: true,
																			DoPrintProformat: false,
																			currentFactureData:
																				this.state.dataFactDevis,
																		},
																		() => {
																			this.getCaisseDevis();
																			this.getEmballageDevis();
																			this.getProduitDevis();
																		}
																	);
																}
																if (
																	typeof this.state.dataFactProformat.code !==
																		"undefined" &&
																	e.target.value === "Proformat"
																) {
																	this.setState(
																		{
																			modalProformat: true,
																			DoPrintProformat: true,
																			DoPrintDevis: false,
																			currentFactureData:
																				this.state.dataFactProformat,
																		},
																		() => {
																			this.getCaisseDevis();
																			this.getEmballageDevis();
																			this.getProduitDevis();
																		}
																	);
																}

																if (
																	typeof this.state.dataFactNormal.code ===
																		"undefined" &&
																	e.target.value === "Normal"
																) {
																	this.setState({
																		modalWrongSettings: true,
																		currentFactureData:
																			this.state.dataFactNormal,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE NORMAL ACHAT!",
																	});
																}
																if (
																	typeof this.state.dataFactIMPEXP.code ===
																		"undefined" &&
																	e.target.value === "IMPEXP"
																) {
																	this.setState({
																		modalWrongSettings: true,
																		currentFactureData:
																			this.state.dataFactIMPEXP,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE EXPORT ACHAT!",
																	});
																}
																if (
																	typeof this.state.dataFactAvoir.code ===
																		"undefined" &&
																	e.target.value === "Avoir"
																) {
																	this.setState({
																		modalWrongSettings: true,
																		currentFactureData:
																			this.state.dataFactAvoir,
																		msgWrongSettings:
																			"Veuillez mettre à jour votre paramètres de facturation pour FACTURE AVOIR ACHAT!",
																	});
																}
															}}
														>
															{this.state.loadingParams && (
																<option>Loading...</option>
															)}
															{!this.state.loadingParams && (
																<Fragment>
																	<option value="Normal">
																		{typeof this.state.dataFactNormal.code ===
																			"undefined" && "Normal : Non configuré"}
																		{typeof this.state.dataFactNormal.code !==
																			"undefined" &&
																			"Normal : " +
																				this.state.dataFactNormal.code +
																				"-" +
																				this.state.dataFactNormal.reference +
																				"-" +
																				this.state.dataFactNormal.revision}
																	</option>
																	{/* <option value="IMPEXP">
														{typeof this.state.dataFactIMPEXP.code ===
															"undefined" && "IMP/EXP : Non configuré"}
														{typeof this.state.dataFactIMPEXP.code !==
															"undefined" &&
															"IMP/EXP : " +
																this.state.dataFactIMPEXP.code +
																"-" +
																this.state.dataFactIMPEXP.reference +
																"-" +
																this.state.dataFactIMPEXP.revision}
													</option>
													<option value="Avoir">
														{typeof this.state.dataFactAvoir.code ===
															"undefined" && "Avoir : Non configuré"}
														{typeof this.state.dataFactAvoir.code !==
															"undefined" &&
															"Avoir : " +
																this.state.dataFactAvoir.code +
																"-" +
																this.state.dataFactAvoir.reference +
																"-" +
																this.state.dataFactAvoir.revision}
													</option>
													<option value="Proformat">
														{typeof this.state.dataFactProformat.code ===
															"undefined" && "Proformat : Non configuré"}
														{typeof this.state.dataFactProformat.code !==
															"undefined" &&
															"Proformat : " +
																this.state.dataFactProformat.code +
																"-" +
																this.state.dataFactProformat.reference +
																"-" +
																this.state.dataFactProformat.revision}
													</option>
													<option value="Devis">
														{typeof this.state.dataFactDevis.code ===
															"undefined" && "Devis : Non configuré"}
														{typeof this.state.dataFactDevis.code !==
															"undefined" &&
															"Devis : " +
																this.state.dataFactDevis.code +
																"-" +
																this.state.dataFactDevis.reference +
																"-" +
																this.state.dataFactDevis.revision}
													</option> */}
																</Fragment>
															)}
														</Input>
													</Col>
												</FormGroup>
											</Col>
										</Row>

										{this.state.editMode &&
											this.state.txtRessource !== "" &&
											this.state.txtIsPayed !== "" && (
												<AlertSP severity="warning">
													<Container>
														<AlertTitle>
															Attention : Facture relié à une opperation
															ressource
														</AlertTitle>
														La facture selectionnée est enregistrer sous{" "}
														<b>
															{
																this.state.information
																	.split("|")

																	.filter(
																		(pyd) =>
																			pyd.includes("Payé") ||
																			pyd.includes("Avance")
																	).length
															}
														</b>{" "}
														statut(s) :
														<strong>
															{this.state.information
																.split("|")

																.map((pyd) => {
																	if (
																		pyd.includes("Payé") ||
																		pyd.includes("Avance")
																	) {
																		let txtsTab = pyd.split(" ");
																		let txts =
																			txtsTab[0].replace("|", "") + " ";
																		let nbr = parseInt(
																			txtsTab[1]
																		).toLocaleString("fr");
																		return txts + nbr + " - ";
																	} else {
																		return "";
																	}
																})}
														</strong>
														<br />
														Opperation(s) ressource relatives identifier sous{" "}
														<b>
															{" "}
															{
																this.state.information
																	.split("|")

																	.filter((pyd) => pyd.includes("Ressource"))
																	.length
															}
														</b>{" "}
														ID(s) :{" "}
														<strong>
															{this.state.information
																.split("|")

																.map((pyd) => {
																	if (pyd.includes("Ressource")) {
																		let txt = pyd.replace("Ressource :", "");
																		return txt + " - ";
																	} else {
																		return "";
																	}
																})}
														</strong>
														.
														<Divider />
														<Link
															onClick={(e) => {
																this.setState({
																	moreInfoFactPayed:
																		!this.state.moreInfoFactPayed,
																});
															}}
														>
															Plus d'informations
														</Link>
														<Collapse in={this.state.moreInfoFactPayed}>
															<FaStopCircle color="danger" />
															<strong>
																La creation d'une facture PAYEE ou AVANCE, cause
																l'ajout des opperations de ressource. Cette
																opération est automatique et prendre toujours un
																seul sens: l'ajout. veuillez controler la
																modification ou la suppression manuellement, sur
																votre propres mesures!
															</strong>
															<br />
															<FaStopCircle color="danger" />
															<strong>
																Si vous re-enregistrez la facture comme PAYEE ou
																AVANCE, une autre opération de ressource sera
																ajouté !
															</strong>
															<br />
															<FaStopCircle color="danger" />
															<strong>
																Si vous modifier les montants, ou n'import
																qu'elle information qui peut affecter les
																ressources, çela n'affectera jamais
																l'ancienne(s) opperation(s) de ressource.
															</strong>
														</Collapse>
													</Container>
												</AlertSP>
											)}
									</CardHeader>
									<CardBody>
										{(this.state.compteConfigure === 0 ||
											this.state.entrepriseConfigure === 0) && (
											<Alert color="danger">
												<h4>Facturation non Configurée</h4>
												<hr />
												Paramètre(s) manquant(s) : <br /> <br />
												<Container>
													<ol>
														{!this.state.compteConfigure && (
															<li>
																<strong>
																	Paramètre de compte de facturation.
																</strong>
																<br />
																<small>
																	<FaInfoCircle /> Paramètre COMPTE : le compte
																	à utilisée dans les factures.
																</small>
															</li>
														)}
														{!this.state.entrepriseConfigure && (
															<li>
																<strong>
																	Paramètre d'entreprise de facturation.
																</strong>
																<br />
																<small>
																	<FaInfoCircle /> Paramètre ENTREPRISE : les
																	détails de l'entreprise à utilisée dans les
																	factures.
																</small>
															</li>
														)}
													</ol>
												</Container>
												<hr />
												<small>
													Acéder au menu paramètre <a href="/settings">ICI</a>
												</small>
											</Alert>
										)}
										{this.state.compteConfigure !== 0 &&
											this.state.entrepriseConfigure !== 0 && (
												<Form className=" ">
													{this.state.msgAddRequest.length > 0 && (
														<Row>
															<Col>
																<Alert
																	className="animated fadeIn fadeOut"
																	color={this.state.msgColor}
																>
																	{this.state.msgAddRequest}
																</Alert>
															</Col>
														</Row>
													)}
													{this.state.msgAddRequestRessource.length > 0 && (
														<Row>
															<Col>
																<Alert
																	className="animated fadeIn fadeOut"
																	color={
																		this.state.msgColorRmsgAddRequestRessource
																	}
																>
																	{this.state.msgAddRequestRessource}
																</Alert>
															</Col>
														</Row>
													)}
													{this.state.typeFacture !== "Avoir" && (
														<Fragment>
															<TableContainer
																style={{ maxHeight: 250, width: "100%" }}
															>
																<Table
																	border={0}
																	cellPadding="0"
																	cellSpacing="0"
																	stickyHeader
																	style={{ minWidth: 750 }}
																	aria-labelledby="tableTitle"
																	size={"small"}
																	aria-label="enhanced table"
																>
																	<TableHead>
																		<TableRow>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Caisse"
																				align="center"
																			>
																				Caisse
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Emballage"
																				align="center"
																			>
																				Emballage
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Produit"
																				align="center"
																			>
																				Produit
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Materiel 1"
																				align="center"
																			>
																				Mat1
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Materiel 2"
																				align="center"
																			>
																				Mat2
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				align="center"
																			>
																				Prix unit.
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				align="center"
																			>
																				Montant
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					whiteSpace: "nowrap",
																				}}
																				colSpan={0}
																				align={
																					"left" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																				id="Date"
																				align="center"
																			>
																				Date
																			</TableCell>
																		</TableRow>
																	</TableHead>
																	<TableBody>
																		{this.state.dataOppSelected.map(
																			(oppAchat, i) => (
																				<TableRow
																					hover
																					tabIndex={-1}
																					onDoubleClick={(e) => {
																						e.preventDefault();

																						//handleEdit
																						this.setState({
																							editFromFacture: true,
																							modalEditOppAchatOpen: true,
																							IDEditOppAchat: oppAchat.IDAchat,
																						});
																						//this.props.doEdit();
																					}}
																				>
																					<TableCell
																						align="center"
																						colSpan={0}
																						key={"headoffkeycheckbox"}
																						style={{
																							position: "relative",
																							border: "2px solid #000",
																							backgroundColor:
																								oppAchat.selected === "CS" ||
																								oppAchat.selected === "CA" ||
																								oppAchat.selected === "CN"
																									? "#ADD8E6"
																									: "",
																						}}
																					>
																						<IconButton
																							style={{
																								borderRadius: 0,
																								margin: 0,
																								padding: 0,
																								position: "absolute",
																								top: 0,
																								left: 0,
																							}}
																							className="btnDeleteOppFacture"
																							onClick={(e) => {
																								this.setState(
																									{
																										listeOppSupprimerOnEdit: [
																											...this.state
																												.listeOppSupprimerOnEdit,
																											oppAchat.IDAchat.toString(),
																										],
																										selectedOpps:
																											this.state.selectedOpps.filter(
																												(opp) => {
																													return (
																														opp.toString() !==
																														oppAchat.IDAchat.toString()
																													);
																												}
																											),
																										dataOppSelected:
																											this.state.dataOppSelected.filter(
																												(opp) => {
																													return (
																														opp.IDAchat.toString() !==
																														oppAchat.IDAchat.toString()
																													);
																												}
																											),
																									},
																									() => {
																										this.setState({
																											totalMontant:
																												this.state.dataOppSelected.reduce(
																													(
																														totMontant,
																														oppsAchat
																													) => {
																														return (
																															totMontant +
																															oppsAchat.montant
																														);
																													},
																													0
																												),
																										});
																									}
																								);
																							}}
																						>
																							<DeleteIcon />
																						</IconButton>

																						{(oppAchat.nbrCaisse === 0 && (
																							<span></span>
																						)) || (
																							<div>
																								<div>
																									<strong>
																										{(this.state
																											.loadingNomCaisseSelected &&
																											"Loading..") ||
																											oppAchat.nbrCaisse +
																												" " +
																												this.props.globalGetIt(
																													this.props
																														.globalDataProfile
																														.Caisse,
																													"IDCaisse",
																													"nom",
																													oppAchat.typeCaisse
																												)}
																									</strong>
																								</div>
																								<ButtonGroup
																									size="small"
																									aria-label="small outlined button group"
																								>
																									<Button
																										variant="outlined"
																										color="danger"
																									>
																										{oppAchat.nbrCS}CS{" "}
																									</Button>

																									<Button
																										variant="outlined"
																										color="warning"
																									>
																										{oppAchat.nbrCN}CN{" "}
																									</Button>

																									<Button
																										variant="outlined"
																										color="success"
																									>
																										{oppAchat.nbrCA}CA{" "}
																									</Button>
																								</ButtonGroup>
																							</div>
																						)}
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																						style={{
																							border: "2px solid #000",
																							backgroundColor:
																								oppAchat.selected === "EMBF" ||
																								oppAchat.selected === "EMBC" ||
																								oppAchat.selected === "boite"
																									? "#ADD8E6"
																									: "",
																						}}
																					>
																						{(oppAchat.emballage === 0 && (
																							<span></span>
																						)) || (
																							<Fragment>
																								<div>
																									<strong>
																										{(this.state
																											.loadingNomEmballageSelected &&
																											"Loading..") ||
																											oppAchat.nbrEmballage +
																												" " +
																												this.props.globalGetIt(
																													this.props
																														.globalDataProfile
																														.Emballage,
																													"IDEmballage",
																													"nom",
																													oppAchat.emballage
																												)}
																									</strong>
																								</div>
																								<ButtonGroup
																									size="small"
																									aria-label="small outlined button group"
																								>
																									<Button color="jneyah">
																										{oppAchat.nbrCOV} COUV{" "}
																									</Button>

																									<Button color="jneyah">
																										{oppAchat.nbrFON} FOND
																									</Button>
																								</ButtonGroup>
																							</Fragment>
																						)}
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																						style={{
																							border: "2px solid #000",
																							backgroundColor:
																								oppAchat.selected === "PROD"
																									? "#ADD8E6"
																									: "",
																						}}
																					>
																						{(oppAchat.matierePrincipale ===
																							0 && (
																							<div>
																								<strong></strong>
																							</div>
																						)) || (
																							<div>
																								<div>
																									<strong>
																										Prod.:{" "}
																										{(this.state
																											.loadingNomProduitSelected &&
																											"Loading..") ||
																											this.props.globalGetIt(
																												this.props
																													.globalDataProfile
																													.Produits,
																												"IDProduit",
																												"nom",
																												oppAchat.matierePrincipale
																											)}
																									</strong>
																								</div>
																								<ButtonGroup
																									size="small"
																									aria-label="small outlined button group"
																								>
																									<Button color="jneyah">
																										BRUT : {oppAchat.qteBrut}
																									</Button>

																									<Button color="jneyah">
																										NET : {oppAchat.qteNet}
																									</Button>
																								</ButtonGroup>
																							</div>
																						)}
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																						style={{
																							border: "2px solid #000",
																							backgroundColor:
																								oppAchat.selected === "MAT"
																									? "#ADD8E6"
																									: "",
																						}}
																					>
																						{((oppAchat.matriel1 === 0 ||
																							oppAchat.nbrM1 === 0 ||
																							!oppAchat.matriel1) && (
																							<div>
																								<strong></strong>
																							</div>
																						)) || (
																							<div>
																								<strong>
																									{oppAchat.nbrM1 +
																										" " +
																										this.props.globalGetIt(
																											this.props
																												.globalDataProfile
																												.Produits,
																											"IDProduit",
																											"nom",
																											oppAchat.matriel1
																										)}
																								</strong>
																							</div>
																						)}
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																						style={{
																							border: "2px solid #000",
																							backgroundColor:
																								oppAchat.selected === "MAT2"
																									? "#ADD8E6"
																									: "",
																						}}
																					>
																						{((oppAchat.matriel2 === 0 ||
																							oppAchat.nbrM2 === 0 ||
																							!oppAchat.matriel2) && (
																							<div>
																								<strong></strong>
																							</div>
																						)) || (
																							<div>
																								<strong>
																									{oppAchat.nbrM2 +
																										" " +
																										this.props.globalGetIt(
																											this.props
																												.globalDataProfile
																												.Produits,
																											"IDProduit",
																											"nom",
																											oppAchat.matriel2
																										)}
																								</strong>
																							</div>
																						)}
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																							border: "2px solid #000",
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																					>
																						<Typography>
																							{Intl.NumberFormat("fr").format(
																								oppAchat.prixUnit
																							)}
																						</Typography>
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																							border: "2px solid #000",
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																					>
																						<Typography>
																							{Intl.NumberFormat("fr").format(
																								oppAchat.montant
																							)}
																						</Typography>
																					</TableCell>
																					<TableCell
																						style={{
																							margin: 0,
																							padding: 0,
																							paddingLeft: 3,
																							border: "2px solid #000",
																						}}
																						colSpan={0}
																						key={i}
																						align="center"
																					>
																						{Moment(oppAchat.date).format(
																							"DD/MM/YYYY"
																						)}
																					</TableCell>
																				</TableRow>
																			)
																		)}
																	</TableBody>

																	{this.state.dataOppSelected.length > 0 && (
																		<TableFooter>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<ButtonGroup
																					size="small"
																					aria-label="small outlined button group"
																				>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						{this.state.dataOppSelected.reduce(
																							(totCaisse, oppsAchat) => {
																								return (
																									totCaisse +
																									oppsAchat.nbrCaisse
																								);
																							},
																							0
																						)}
																					</Button>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						CS:{" "}
																						{this.state.dataOppSelected.reduce(
																							(totCS, oppsAchat) => {
																								return totCS + oppsAchat.nbrCS;
																							},
																							0
																						)}
																					</Button>

																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						CN:
																						{this.state.dataOppSelected.reduce(
																							(totCN, oppsAchat) => {
																								return totCN + oppsAchat.nbrCN;
																							},
																							0
																						)}
																					</Button>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						CA:
																						{this.state.dataOppSelected.reduce(
																							(totCA, oppsAchat) => {
																								return totCA + oppsAchat.nbrCA;
																							},
																							0
																						)}
																					</Button>
																				</ButtonGroup>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<ButtonGroup
																					size="small"
																					aria-label="small outlined button group"
																				>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						{this.state.dataOppSelected.reduce(
																							(totEmb, oppsAchat) => {
																								return (
																									totEmb +
																									oppsAchat.nbrEmballage
																								);
																							},
																							0
																						)}
																					</Button>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						COUV:
																						{this.state.dataOppSelected.reduce(
																							(totCOV, oppsAchat) => {
																								return (
																									totCOV + oppsAchat.nbrCOV
																								);
																							},
																							0
																						)}
																					</Button>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						{" "}
																						FOND:
																						{this.state.dataOppSelected.reduce(
																							(totFON, oppsAchat) => {
																								return (
																									totFON + oppsAchat.nbrFON
																								);
																							},
																							0
																						)}
																					</Button>
																				</ButtonGroup>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<ButtonGroup
																					size="small"
																					aria-label="small outlined button group"
																				>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						BRUT:
																						{this.state.dataOppSelected.reduce(
																							(totBrut, oppsAchat) => {
																								return (
																									totBrut + oppsAchat.qteBrut
																								);
																							},
																							0
																						)}
																					</Button>
																					<Button
																						color="jneyah"
																						style={{
																							color: "#fff",
																							border: "1px solid #fff",
																						}}
																					>
																						NET:
																						{this.state.dataOppSelected.reduce(
																							(totNET, oppsAchat) => {
																								return (
																									totNET + oppsAchat.qteNet
																								);
																							},
																							0
																						)}
																					</Button>
																				</ButtonGroup>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<Typography>
																					<strong>
																						{this.state.dataOppSelected.reduce(
																							(totM1, oppsAchat) => {
																								return totM1 + oppsAchat.nbrM1;
																							},
																							0
																						)}{" "}
																					</strong>
																				</Typography>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<Typography>
																					<strong>
																						{this.state.dataOppSelected.reduce(
																							(totM2, oppsAchat) => {
																								return totM2 + oppsAchat.nbrM2;
																							},
																							0
																						)}
																					</strong>
																				</Typography>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				{" "}
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<Typography>
																					<strong>
																						{Intl.NumberFormat("fr").format(
																							this.state.dataOppSelected.reduce(
																								(tot, oppsAchat) => {
																									return (
																										tot + oppsAchat.montant
																									);
																								},
																								0
																							)
																						)}
																					</strong>
																				</Typography>
																			</TableCell>
																			<TableCell
																				style={{
																					background: "rgb(51,51,51)",
																					color: "#fff",
																					position: "sticky",
																					bottom: 0,
																					left: 0,
																					zIndex: 2,
																				}}
																				align={
																					"center" /*headCell.numeric ? "right" : "left"*/
																				}
																				padding={"default"}
																			>
																				<Select
																					style={{
																						"&:before": {
																							borderColor: "#fff",
																						},
																						"&:after": {
																							borderColor: "#fff",
																						},
																						color: "#fff",
																					}}
																					id="typePaiement"
																					value={this.state.isPayed}
																					onChange={(e) => {
																						this.setState({
																							isPayed: e.target.value,
																							txtIsPayed:
																								e.target.value !== "-1"
																									? e.target.value === "1"
																										? "|Payee " +
																										  this.state.totalMontant
																										: "|Avance " +
																										  this.state.avance
																									: "",
																						});
																					}}
																					native
																					inputProps={{
																						name: "age",
																						id: "age-native-simple",
																					}}
																				>
																					{" "}
																					<option
																						key={"isPayedSelectFactNP-1"}
																						value="-1"
																						style={{
																							backgroundColor: "rgb(51,51,51)",
																							color: "#fff",
																						}}
																					>
																						Non Payée
																					</option>
																					<option
																						key={"isPayedSelectFactPyd1"}
																						value="1"
																						style={{
																							backgroundColor: "rgb(51,51,51)",
																							color: "#fff",
																						}}
																					>
																						Payée
																					</option>
																					<option
																						key={"isPayedSelectFactAdvc2"}
																						value="2"
																						style={{
																							backgroundColor: "rgb(51,51,51)",
																							color: "#fff",
																						}}
																					>
																						Avance
																					</option>
																				</Select>

																				{this.state.isPayed === "2" && (
																					<TextField
																						style={{
																							"&:before": {
																								borderColor: "#fff",
																							},
																							"&:after": {
																								borderColor: "#fff",
																							},
																							color: "#000",
																						}}
																						value={this.state.avance}
																						placeholder="Saisir avance"
																						onChange={(e) => {
																							this.setState({
																								avance: e.target.value.replace(
																									/\D/,
																									""
																								),
																								txtIsPayed:
																									e.target.value !== "-1"
																										? e.target.value === "1"
																											? "|Payee " +
																											  this.state.totalMontant
																											: "|Avance " +
																											  e.target.value.replace(
																													/\D/,
																													""
																											  )
																										: "",
																							});
																						}}
																						id="input-with-icon-textfield"
																						InputProps={{
																							style: {
																								color: "rgb(51,51,51)",
																								background: "#EEE",
																								borderRadius: "19px",
																							},

																							startAdornment: (
																								<InputAdornment position="start"></InputAdornment>
																							),
																						}}
																					/>
																				)}
																			</TableCell>
																		</TableFooter>
																	)}
																</Table>
															</TableContainer>

															<Row>
																<Col>
																	<FormGroup className="">
																		<Col sm={12}>
																			<Label for="typePaiement">
																				Type de Paiement :{" "}
																			</Label>
																		</Col>

																		<Col>
																			<Input
																				type="select"
																				id="typePaiement"
																				value={this.state.Modepaiement}
																				onChange={(e) => {
																					this.setState({
																						Modepaiement: e.target.value,
																					});
																				}}
																			>
																				<option value=""></option>
																				{(!this.props.globalDataProfile
																					.Paiement && (
																					<option>Loading..</option>
																				)) ||
																					this.props.globalDataProfile.Paiement.map(
																						(pay, i) => (
																							<option
																								key={"payListFact" + i}
																								value={pay.IDPaiement}
																							>
																								{pay.nom}
																							</option>
																						)
																					)}
																			</Input>
																		</Col>
																	</FormGroup>
																</Col>

																<Col>
																	<FormGroup className="">
																		<Col sm={12}>
																			<Label for="bonRec">
																				Bon de reclamation :{" "}
																			</Label>
																		</Col>

																		<Col>
																			<Input
																				type="text"
																				id="bonRec"
																				value={this.state.numeroBonRec}
																				onChange={(e) => {
																					this.setState({
																						numeroBonRec:
																							e.target.value.replace(/\D/, ""),
																					});
																				}}
																			></Input>
																		</Col>
																	</FormGroup>
																</Col>
																<Col>
																	<FormGroup className="">
																		<Col sm={12}>
																			<Label for="bonComm">
																				Bon de Commande :{" "}
																			</Label>
																		</Col>

																		<Col>
																			<Input
																				type="text"
																				id="bonComm"
																				value={this.state.numeroBonCom}
																				onChange={(e) => {
																					this.setState({
																						numeroBonCom:
																							e.target.value.replace(/\D/, ""),
																					});
																				}}
																			></Input>
																		</Col>
																	</FormGroup>
																</Col>
																<Col>
																	<FormGroup className="">
																		<Col sm={12}>
																			<Label for="bonCon">
																				Réference devis :{" "}
																			</Label>
																		</Col>

																		<Col>
																			<Input
																				type="text"
																				id="bonCon"
																				value={this.state.numeroBonCon}
																				onChange={(e) => {
																					this.setState({
																						numeroBonCon: e.target.value,
																					});
																				}}
																			></Input>
																		</Col>
																	</FormGroup>
																</Col>
															</Row>
														</Fragment>
													)}
													{this.state.typeFacture === "IMPEXP" && (
														<Row>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="modeLivraison">
																			INCOTERM :{" "}
																		</Label>
																	</Col>

																	<Col>
																		<Input
																			type="text"
																			id="modeLivraison"
																			value={this.state.incoterm}
																			onChange={(e) => {
																				this.setState({
																					incoterm: e.target.value,
																				});
																			}}
																		></Input>
																	</Col>
																</FormGroup>
															</Col>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="banque">Banque : </Label>
																	</Col>

																	<Col>
																		<Input
																			type="select"
																			id="banque"
																			value={this.state.banque}
																			onChange={(e) => {
																				this.setState({
																					banque: e.target.value,
																					ibanRib:
																						e.target.selectedOptions[0].id,
																				});
																			}}
																		>
																			<option value=""></option>
																			{(this.state.LoadinglisteBanque && (
																				<option>Loading..</option>
																			)) ||
																				this.state.listeBanque.map((bnk) => (
																					<option
																						key={"listeBakFact" + bnk.IDCompte}
																						value={bnk.IDCompte}
																						id={bnk.IBAN}
																					>
																						{bnk.nomBanque}
																					</option>
																				))}
																		</Input>
																	</Col>
																</FormGroup>
															</Col>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="ibanRIB">IBAN RIB. : </Label>
																	</Col>

																	<Col>
																		<Input
																			type="text"
																			id="ibanRIB"
																			value={this.state.ibanRib}
																			onChange={(e) => {
																				this.setState({
																					ibanRib: e.target.value,
																				});
																			}}
																		></Input>
																	</Col>
																</FormGroup>
															</Col>
														</Row>
													)}
													{this.state.typeFacture === "Avoir" && (
														<Row className="animated fadeIn fadeOut">
															<Col>
																<FormGroup row>
																	<Col sm={12}>
																		<Label for="categorie">Categorie</Label>
																	</Col>
																	<Col sm={12}>
																		<Input
																			type="select"
																			name="categorie"
																			id="categorie"
																			value={this.state.categorieAvoir}
																			onChange={(e) => {
																				this.setState({
																					categorieAvoir: e.target.value,
																				});
																			}}
																		>
																			{this.state.Listecategories.map(
																				(cat, n) => {
																					if (
																						n === 0 &&
																						this.state.categorieAvoir === "" &&
																						!this.state.editMode
																					) {
																						this.setState({
																							categorieAvoir: cat.IDCat,
																						});
																					}
																					return (
																						<option
																							key={
																								"listCatsOnFact123" + cat.IDCat
																							}
																							value={cat.IDCat}
																						>
																							{cat.nom}
																						</option>
																					);
																				}
																			)}
																		</Input>
																	</Col>
																</FormGroup>
															</Col>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="TypeProduit">
																			TypeProduit :{" "}
																			{this.state.editMode &&
																				this.state.typeProduit}{" "}
																		</Label>
																	</Col>

																	<Col>
																		<Input
																			type="select"
																			id="TypeProduit"
																			value={this.state.produitSelect}
																			onChange={(e) => {
																				this.setState({
																					typeProduit:
																						e.target.selectedOptions[0].text,
																					produitSelect: e.target.value,
																				});
																			}}
																		>
																			{this.state.loadingProduit && (
																				<option>Loading..</option>
																			)}
																			<option value=""></option>
																			<optgroup label="Produit">
																				{!this.state.loadingProduit &&
																					this.state.listeProduit
																						.filter((prd) => {
																							return (
																								prd.nomTypeProd ===
																								"MATIERE PRIMAIRE"
																							);
																						})
																						.map((produit) => (
																							<option
																								key={
																									"prodMatiereprimaireFacture05" +
																									produit.IDProduit
																								}
																								value={
																									"prod" + produit.IDProduit
																								}
																							>
																								{produit.nom}
																							</option>
																						))}
																			</optgroup>

																			<optgroup label="Service">
																				{!this.state.loadingProduit &&
																					this.state.listeProduit
																						.filter((prd) => {
																							return (
																								prd.nomTypeProd === "SERVICE"
																							);
																						})
																						.map((produit) => (
																							<option
																								key={
																									"prodServicesFacture0075" +
																									produit.IDProduit
																								}
																								value={
																									"prod" + produit.IDProduit
																								}
																							>
																								{produit.nom}
																							</option>
																						))}
																			</optgroup>
																			<optgroup label="Materiaux">
																				{!this.state.loadingProduit &&
																					this.state.listeProduit
																						.filter((prd) => {
																							return (
																								prd.nomTypeProd === "MATERIEL"
																							);
																						})
																						.map((produit) => (
																							<option
																								key={
																									"prodMaterielFacture04705" +
																									produit.IDProduit
																								}
																								value={
																									"prod" + produit.IDProduit
																								}
																							>
																								{produit.nom}
																							</option>
																						))}
																			</optgroup>
																			<optgroup label="Caisse">
																				{!this.state.loadingCaisse &&
																					this.state.listeCaisse.map(
																						(caisse) => (
																							<Fragment>
																								<option
																									key={
																										"caisseCSonFactureSSMLO123" +
																										caisse.IDCaisse +
																										"s"
																									}
																									value={
																										"caisse" +
																										caisse.IDCaisse +
																										"s"
																									}
																								>
																									{caisse.nom} | CS
																								</option>
																								<option
																									key={
																										"caisseCNNonFactureSSMLO123" +
																										caisse.IDCaisse +
																										"s"
																									}
																									value={
																										"caisse" +
																										caisse.IDCaisse +
																										"n"
																									}
																								>
																									{caisse.nom} | CN
																								</option>
																								<option
																									key={
																										"caisseCAAonFactureSSMLO123" +
																										caisse.IDCaisse +
																										"s"
																									}
																									value={
																										"caisse" +
																										caisse.IDCaisse +
																										"a"
																									}
																								>
																									{caisse.nom} | CA
																								</option>
																							</Fragment>
																						)
																					)}
																			</optgroup>
																			<optgroup label="Emballage"></optgroup>
																			<optgroup label="Emballage Simple">
																				{!this.state.loadingEmballage &&
																					this.state.listeEmballage
																						.filter((emb) => {
																							return (
																								emb.composition === "simple"
																							);
																						})
																						.map((embs) => (
																							<option
																								key={
																									"embsOnFactSimple0145" +
																									embs.IDEmballage +
																									"t"
																								}
																								value={
																									"embs" +
																									embs.IDEmballage +
																									"t"
																								}
																							>
																								{embs.nom} - {embs.poid}Kg
																							</option>
																						))}
																			</optgroup>
																			<optgroup label="Emballage Composée">
																				{!this.state.loadingEmballage &&
																					this.state.listeEmballage
																						.filter((emb) => {
																							return (
																								emb.composition === "compose"
																							);
																						})
																						.map((embs) => (
																							<Fragment>
																								<option
																									key={
																										"embcEMBFOnFactSimple0145f" +
																										embs.IDEmballage +
																										"f"
																									}
																									value={
																										"embcEMBF" +
																										embs.IDEmballage +
																										"f"
																									}
																								>
																									{embs.nom} - {embs.poid}Kg |
																									Fond
																								</option>
																								<option
																									key={
																										"embcEMBCOnFactSimple0145c" +
																										embs.IDEmballage +
																										"c"
																									}
																									value={
																										"embcEMBC" +
																										embs.IDEmballage +
																										"c"
																									}
																								>
																									{embs.nom} - {embs.poid}Kg |
																									Couvercle
																								</option>
																							</Fragment>
																						))}
																			</optgroup>
																		</Input>
																	</Col>
																</FormGroup>
															</Col>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="montant">montant : </Label>
																	</Col>

																	<Col>
																		<Input
																			type="text"
																			id="montant"
																			value={this.state.montant}
																			onChange={(e) => {
																				this.setState({
																					montant: e.target.value,
																				});
																			}}
																		></Input>
																	</Col>
																</FormGroup>
															</Col>
															<Col>
																<FormGroup className="" row>
																	<Col sm={12}>
																		<Label for="referenceDoc">
																			reference Doc :{" "}
																		</Label>
																	</Col>

																	<Col>
																		<Input
																			type="text"
																			id="referenceDoc"
																			value={this.state.referenceDoc}
																			onChange={(e) => {
																				this.setState({
																					referenceDoc: e.target.value.replace(
																						/\D/,
																						""
																					),
																				});
																			}}
																		></Input>
																	</Col>
																</FormGroup>
															</Col>
														</Row>
													)}
													<Row>
														<Col sm={6} className="pr-0 mr-0">
															<FormGroup row>
																<Col sm={12} className="pr-0 mr-0">
																	<Label for="infoFacture">
																		Information :{" "}
																	</Label>
																</Col>

																<Col className=" ">
																	<Input
																		type="text"
																		id="infoFacture"
																		value={this.state.information}
																		onChange={(e) => {
																			this.setState({
																				information: e.target.value,
																			});
																		}}
																		/*onFocus={(e) => {
														e.target.setSelectionRange(
															e.target.value.indexOf("|"),
															e.target.value.indexOf("|")
														);
													}}
													onKeyDown={(e) => {
														if (
															e.keyCode === 46 &&
															this.state.information.indexOf("|")
														) {
															e.preventDefault();
														}
														if (this.state.information.indexOf("|")) {
															e.target.setSelectionRange(
																this.state.information.indexOf("|"),
																this.state.information.indexOf("|")
															);
														}
													}}*/
																	></Input>
																	<legend>{this.state.txtIsPayed}</legend>
																</Col>
															</FormGroup>
														</Col>
													</Row>

													<Row
														style={{
															position: "sticky",
															zIndex: 999,
															width: "100%",
															background: "#000",
															bottom: 0,
															padding: 0,
															margin: 0,
															alignContent: "right",
														}}
													>
														<Col>
															{this.state.editMode && (
																<Fragment>
																	{" "}
																	<Button
																		style={{ background: "#388e3c" }}
																		className="  mt-3 mb-3 float-right "
																		onClick={(e) => {
																			e.preventDefault();
																			if (!Moment(this.state.date).isValid()) {
																				this.setState(
																					{
																						msgAddRequest:
																							"Erreur : Date invalide !",
																						msgColor: "danger",
																					},
																					() => {
																						alert(this.state.msgAddRequest);
																					}
																				);
																				return false;
																			} else {
																				this.setState({
																					msgAddRequest: "",
																					msgColor: "",
																				});
																			}

																			if (this.state.typeFacture !== "Avoir") {
																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					(this.state.isPayed === "1" ||
																						this.state.isPayed === "2") &&
																					this.state.Modepaiement === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez choisir le type de paiement !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}
																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					this.state.banque === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez choisir le banque !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}

																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					this.state.incoterm === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez saisir un INCOTERM !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}

																				if (this.state.totalMontant === 0) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Facture vide !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					if (
																						this.state.isPayed === "2" &&
																						this.state.avance === 0
																					) {
																						this.setState(
																							{
																								msgAddRequest:
																									"Erreur : Veuillez remplir le champ AVANCE !",
																								msgColor: "danger",
																							},
																							() => {
																								alert(this.state.msgAddRequest);
																							}
																						);
																						return false;
																					} else {
																						this.setState({
																							msgAddRequest: "",
																							msgColor: "",
																						});
																					}
																				}
																			} else {
																				if (
																					this.props.idFournisseur === "" ||
																					this.props.idFournisseur === "-1"
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez selectionner un fournisseur !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				}
																				if (
																					this.state.montant === 0 ||
																					this.state.typeProduit === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez remplir les champs manquants !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}
																			}
																			this.setState({
																				modalConfirmationOpen: true,
																			});
																		}}
																		disabled={
																			this.state.btnAddDisabled ||
																			this.state.forcedDisabledButton
																		}
																	>
																		Enregistrer
																	</Button>
																</Fragment>
															)}

															{!this.state.editMode && (
																<Fragment>
																	<Button
																		style={{ background: "#388e3c" }}
																		className="   mt-3 mb-3 float-right "
																		onClick={(e) => {
																			e.preventDefault();
																			if (!Moment(this.state.date).isValid()) {
																				this.setState(
																					{
																						msgAddRequest:
																							"Erreur : Date invalide !",
																						msgColor: "danger",
																					},
																					() => {
																						alert(this.state.msgAddRequest);
																					}
																				);
																				return false;
																			} else {
																				this.setState({
																					msgAddRequest: "",
																					msgColor: "",
																				});
																			}

																			if (this.state.typeFacture !== "Avoir") {
																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					(this.state.isPayed === "1" ||
																						this.state.isPayed === "2") &&
																					this.state.Modepaiement === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez choisir le type de paiement !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}

																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					this.state.banque === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez choisir le banque !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}

																				if (
																					this.state.typeFacture === "IMPEXP" &&
																					this.state.incoterm === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez saisir un INCOTERM !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}

																				if (this.state.totalMontant === 0) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Facture vide !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					if (
																						this.state.isPayed === "2" &&
																						this.state.avance === 0
																					) {
																						this.setState(
																							{
																								msgAddRequest:
																									"Erreur : Veuillez remplir le champ AVANCE !",
																								msgColor: "danger",
																							},
																							() => {
																								alert(this.state.msgAddRequest);
																							}
																						);
																						return false;
																					} else {
																						this.setState({
																							msgAddRequest: "",
																							msgColor: "",
																						});
																					}
																				}
																			} else {
																				if (
																					this.props.idFournisseur === "tous" ||
																					this.props.idFournisseur === "-1"
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez selectionner un fournisseur !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				}
																				if (
																					this.state.montant === 0 ||
																					this.state.typeProduit === ""
																				) {
																					this.setState(
																						{
																							msgAddRequest:
																								"Erreur : Veuillez remplir les champs manquants !",
																							msgColor: "danger",
																						},
																						() => {
																							alert(this.state.msgAddRequest);
																						}
																					);
																					return false;
																				} else {
																					this.setState({
																						msgAddRequest: "",
																						msgColor: "",
																					});
																				}
																			}
																			this.setState({
																				modalConfirmationOpen: true,
																			});
																		}}
																		disabled={
																			this.state.btnAddDisabled ||
																			this.state.forcedDisabledButton
																		}
																	>
																		Ajouter
																	</Button>
																</Fragment>
															)}

															<Button
																style={{ background: "#e7e7e7" }}
																className="  mt-3 mb-3 float-right mr-3"
																onClick={(e) => {
																	e.preventDefault();
																	this.handleNormalReset();
																}}
															>
																Reset
															</Button>
															<Button
																style={{ background: "#ff9800" }}
																color="default"
																hidden={this.state.typeFacture === "Avoir"}
																className="mt-3 mb-3 "
																onClick={(e) => {
																	if (
																		this.props.idFournisseur === "tous" ||
																		this.state.IDFournisseurAjout === "-1"
																	) {
																		this.setState({
																			msgAddRequest:
																				"Veuillez choisir un fournisseur !",
																			msgColor: "primary",
																		});
																		return false;
																	} else {
																		this.setState({
																			msgAddRequest: "",
																			msgAddRequestRessource: "",
																			msgColor: "",
																			msgColorRessource: "",
																		});
																	}
																	this.getOppsNonFacture();
																	!this.state.editMode &&
																		this.setState({
																			modalListeopssOpen: true,
																			selectedOpps: [],
																			dataOppSelected: [],
																		});
																	this.state.editMode &&
																		this.setState({
																			modalListeopssOpen: true,
																		});
																}}
															>
																Préparer la facture
															</Button>
														</Col>
													</Row>
												</Form>
											)}
										<Dialog
											open={this.state.modalListeopssOpen}
											onClose={(e) => {
												this.setState({ modalListeopssOpen: false });
											}}
											maxWidth={false}
											scroll="paper"
											aria-labelledby="scroll-dialog-title"
											aria-describedby="scroll-dialog-description"
										>
											<DialogTitle id="scroll-dialog-title">
												Liste Opperations : {this.props.nomFournisseur}
												<br />
												<Alert
													className="animated fadeIn fadeOut"
													color={this.state.colorMsgModal}
												>
													{this.state.msgModalSelectOpps}
												</Alert>
											</DialogTitle>
											<DialogContent dividers={true}>
												<div
													hidden={!this.state.loadingOpps}
													style={{
														zIndex: 9999,
														background: "#fff",
														opacity: 0.5,
														width: "100%",
														height: "100%",
														position: "absolute",
														textAlign: "center",
														fontSize: "25px",
													}}
												>
													Recherche operations..
												</div>

												<Table
													className="animated fadeIn fadeOut"
													bordered
													dark
													border={1}
													cellPadding={4}
												>
													<thead>
														<tr>
															<th className="fixed-tab-header">#</th>

															<th className="fixed-tab-header" id="Date">
																Date
															</th>

															<th
																className="fixed-tab-header"
																className="fixed-tab-header"
																id="NumFact"
															>
																N°Fact.
															</th>

															<th className="fixed-tab-header" id="Caisse">
																Caisse
															</th>
															<th className="fixed-tab-header" id="Produit">
																Produit
															</th>
															<th className="fixed-tab-header" id="Emballage">
																Emballage
															</th>
															<th className="fixed-tab-header" id="Materiel 1">
																Mat1
															</th>
															<th className="fixed-tab-header" id="Materiel 2">
																Mat2
															</th>
															<th className="fixed-tab-header">Prix unit.</th>
															<th className="fixed-tab-header">Montant</th>
														</tr>
													</thead>

													<tbody>
														{!this.state.loadingOpps &&
															this.state.oppsListe.map((oppAchat, index) => (
																<tr
																	id={"TrSelOpp" + oppAchat.IDAchat}
																	key={oppAchat.IDAchat}
																	className={
																		this.state.selectedOpps.includes(
																			oppAchat.IDAchat
																		)
																			? "activeTroppSeelcted"
																			: ""
																	}
																	onClick={(e) => {
																		e.currentTarget.classList.toggle(
																			"activeTroppSeelcted"
																		);
																		this.handleSelectOpp(oppAchat.IDAchat);
																	}}
																>
																	<td>{index + 1}</td>
																	<td>
																		{Moment(oppAchat.date).format("DD-MM-YYYY")}
																	</td>

																	<td>
																		{(!oppAchat.numFact && (
																			<Badge color="light">N</Badge>
																		)) || <strong>{oppAchat.numFact}</strong>}
																	</td>

																	<td
																		style={{
																			backgroundColor:
																				oppAchat.selected === "CS" ||
																				oppAchat.selected === "CA" ||
																				oppAchat.selected === "CN"
																					? "#ADD8E6"
																					: "",
																		}}
																	>
																		{(oppAchat.nbrCaisse === 0 && (
																			<div>
																				<strong>Aucune Caisse</strong>
																			</div>
																		)) || (
																			<div>
																				<div>
																					<strong>
																						{(!this.props.globalDataProfile
																							.Caisse &&
																							"Loading..") || (
																							<Badge color="info">
																								{oppAchat.nbrCaisse}{" "}
																								{this.props.globalGetIt(
																									this.props.globalDataProfile
																										.Caisse,
																									"IDCaisse",
																									"nom",
																									oppAchat.typeCaisse
																								)}
																							</Badge>
																						)}
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="warning">
																							{oppAchat.nbrCS}CS{" "}
																						</Badge>
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="danger">
																							{oppAchat.nbrCN}CN{" "}
																						</Badge>
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="success">
																							{oppAchat.nbrCA}CA{" "}
																						</Badge>
																					</strong>
																				</div>
																			</div>
																		)}
																	</td>
																	<td
																		style={{
																			backgroundColor:
																				oppAchat.selected === "PROD"
																					? "#ADD8E6"
																					: "",
																		}}
																	>
																		{(oppAchat.matierePrincipale === 0 && (
																			<div>
																				<strong>Aucun Prod/serv.</strong>
																			</div>
																		)) || (
																			<div>
																				<div>
																					<strong>
																						<Badge color="primary">
																							Prod.:{" "}
																							{(!this.props.globalDataProfile
																								.Produits &&
																								"Loading..") ||
																								this.props.globalGetIt(
																									this.props.globalDataProfile
																										.Produits,
																									"IDProduit",
																									"nom",
																									oppAchat.matierePrincipale
																								)}
																						</Badge>
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="dark">
																							Brut : {oppAchat.qteBrut}
																						</Badge>
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="dark">
																							NET : {oppAchat.qteNet}
																						</Badge>
																					</strong>
																				</div>
																			</div>
																		)}
																	</td>
																	<td
																		style={{
																			backgroundColor:
																				oppAchat.selected === "EMBF" ||
																				oppAchat.selected === "EMBC" ||
																				oppAchat.selected === "boite"
																					? "#ADD8E6"
																					: "",
																		}}
																	>
																		{(oppAchat.emballage === 0 && (
																			<div>
																				<strong>Aucun Emb.</strong>
																			</div>
																		)) || (
																			<Fragment>
																				<div>
																					<strong>
																						{(this.props.globalDataProfile
																							.Emballage &&
																							"Loading..") || (
																							<Badge color="light">
																								{oppAchat.nbrEmballage +
																									" " +
																									this.props.globalGetIt(
																										this.props.globalDataProfile
																											.Emballage,
																										"IDEmballage",
																										"nom",
																										oppAchat.emballage
																									)}
																							</Badge>
																						)}
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="dark">
																							{oppAchat.nbrCOV} COVs{" "}
																						</Badge>
																					</strong>
																				</div>
																				<div>
																					<strong>
																						<Badge color="dark">
																							{oppAchat.nbrFON} fonds
																						</Badge>
																					</strong>
																				</div>
																			</Fragment>
																		)}
																	</td>
																	<td
																		style={{
																			backgroundColor:
																				oppAchat.selected === "MAT"
																					? "#ADD8E6"
																					: "",
																		}}
																	>
																		{((oppAchat.matriel1 === 0 ||
																			oppAchat.nbrM1 === 0 ||
																			!oppAchat.matriel1) && (
																			<div>
																				<strong>Aucun Mat1.</strong>
																			</div>
																		)) || (
																			<div>
																				<Badge color="dark">
																					<strong>
																						{oppAchat.nbrM1 +
																							" " +
																							this.props.globalGetIt(
																								this.props.globalDataProfile
																									.Produits,
																								"IDProduit",
																								"nom",
																								oppAchat.matriel1
																							)}
																					</strong>
																				</Badge>
																			</div>
																		)}
																	</td>
																	<td
																		style={{
																			backgroundColor:
																				oppAchat.selected === "MAT2"
																					? "#ADD8E6"
																					: "",
																		}}
																	>
																		{((oppAchat.matriel2 === 0 ||
																			oppAchat.nbrM2 === 0 ||
																			!oppAchat.matriel2) && (
																			<div>
																				<strong>Aucun Mat2.</strong>
																			</div>
																		)) || (
																			<div>
																				<Badge color="dark">
																					<strong>
																						{oppAchat.nbrM2 +
																							" " +
																							this.props.globalGetIt(
																								this.props.globalDataProfile
																									.Produits,
																								"IDProduit",
																								"nom",
																								oppAchat.matriel2
																							)}
																					</strong>
																				</Badge>
																			</div>
																		)}
																	</td>
																	<td>{oppAchat.prixUnit} </td>
																	<td>{oppAchat.montant} </td>
																</tr>
															))}
													</tbody>
													{this.state.dataOppSelected.length > 0 && (
														<tfoot>
															<tr>
																<td className="fixed-tab-footer">{"####"}</td>
																<td className="fixed-tab-footer">{"####"}</td>
																<td className="fixed-tab-footer">{"####"}</td>
																<td className="fixed-tab-footer">
																	<Badge
																		color="info"
																		className="smallFooter  mr-4"
																	>
																		{this.state.dataOppSelected.reduce(
																			(totCaisse, oppsAchat) => {
																				return totCaisse + oppsAchat.nbrCaisse;
																			},
																			0
																		)}
																	</Badge>
																	<br></br>
																	<span>
																		<Badge color="danger  ">
																			{this.state.dataOppSelected.reduce(
																				(totCS, oppsAchat) => {
																					return totCS + oppsAchat.nbrCS;
																				},
																				0
																			)}
																		</Badge>
																		<Badge color="warning">
																			{this.state.dataOppSelected.reduce(
																				(totCN, oppsAchat) => {
																					return totCN + oppsAchat.nbrCN;
																				},
																				0
																			)}
																		</Badge>
																		<Badge color="success">
																			{this.state.dataOppSelected.reduce(
																				(totCA, oppsAchat) => {
																					return totCA + oppsAchat.nbrCA;
																				},
																				0
																			)}
																		</Badge>
																	</span>
																</td>
																<td className="fixed-tab-footer">
																	{" "}
																	<Badge color="light">
																		BRUT:
																		{this.state.dataOppSelected.reduce(
																			(totBrut, oppsAchat) => {
																				return totBrut + oppsAchat.qteBrut;
																			},
																			0
																		)}
																	</Badge>
																	<Badge color="light">
																		{" "}
																		NET:
																		{this.state.dataOppSelected.reduce(
																			(totNET, oppsAchat) => {
																				return totNET + oppsAchat.qteNet;
																			},
																			0
																		)}
																	</Badge>
																</td>
																<td className="fixed-tab-footer">
																	<Badge color="primary">
																		{this.state.dataOppSelected.reduce(
																			(totEmb, oppsAchat) => {
																				return totEmb + oppsAchat.nbrEmballage;
																			},
																			0
																		)}
																	</Badge>
																	<br></br>
																	<Badge color="light">
																		COUV:
																		{this.state.dataOppSelected.reduce(
																			(totCOV, oppsAchat) => {
																				return totCOV + oppsAchat.nbrCOV;
																			},
																			0
																		)}
																	</Badge>
																	<Badge color="light">
																		FOND:
																		{this.state.dataOppSelected.reduce(
																			(totFON, oppsAchat) => {
																				return totFON + oppsAchat.nbrFON;
																			},
																			0
																		)}
																	</Badge>{" "}
																</td>

																<td className="fixed-tab-footer">
																	{this.state.dataOppSelected.reduce(
																		(totM1, oppsAchat) => {
																			return totM1 + oppsAchat.nbrM1;
																		},
																		0
																	)}{" "}
																</td>
																<td className="fixed-tab-footer">
																	{this.state.dataOppSelected.reduce(
																		(totM2, oppsAchat) => {
																			return totM2 + oppsAchat.nbrM2;
																		},
																		0
																	)}
																</td>
																<td className="fixed-tab-footer">{"####"}</td>
																<td className="fixed-tab-footer">
																	{this.state.dataOppSelected.reduce(
																		(totMontant, oppsAchat) => {
																			return totMontant + oppsAchat.montant;
																		},
																		0
																	)}
																</td>
															</tr>
														</tfoot>
													)}
												</Table>
											</DialogContent>
											<DialogActions>
												<Button
													outline
													color="danger"
													onClick={this.handleSelectAllOpp}
												>
													Sélectionner tout
												</Button>
												<Button
													outline
													color="danger"
													onClick={(e) => {
														this.setState({ modalListeopssOpen: false });
													}}
												>
													Fermer
												</Button>
											</DialogActions>
										</Dialog>

										<Dialog
											open={this.state.modalEditOppAchatOpen}
											onClose={(e) => {
												this.setState({ modalEditOppAchatOpen: false });
											}}
											maxWidth={false}
											scroll="paper"
											aria-labelledby="scroll-dialog-title"
											aria-describedby="scroll-dialog-description"
										>
											<DialogTitle id="scroll-dialog-title">
												Modifier opération d'achat
											</DialogTitle>
											<DialogContent dividers={true}>
												{this.state.modalEditOppAchatOpen === true && (
													<FormNvOppAchat
														globalData={this.props.globalDataProfile}
														globalGetIt={this.props.globalGetIt}
														setGlobalData={this.props.setGlobalDataProfile}
														visibilityCheck={() => {}}
														editFromFacture={this.state.editFromFacture}
														THEME={""}
														resetedit={(e) => {
															this.setState({
																modalEditOppAchatOpen: false,
																editFromFacture: false,
															});
														}}
														activeTabNow={(e) => {}}
														done={async (e) => {
															this.props.setGlobalData(true, "AllOppsAchat");
															this.setState({
																modalEditOppAchatOpen: false,
																editFromFacture: false,
																dataOppSelected: await Promise.all(
																	this.state.dataOppSelected.map(
																		async (dt, i) => {
																			if (
																				dt.IDAchat === this.state.IDEditOppAchat
																			) {
																				const IDnew = await fetch(
																					"/api/mariem/oppsAchat/" +
																						this.state.IDEditOppAchat
																				)
																					.then((res) => res.json())
																					.then((oppAchat) => {
																						return oppAchat;
																					});
																				console.log(IDnew);
																				return IDnew;
																			} else {
																				return dt;
																			}
																		}
																	)
																),
															});
														}}
														toEdit={this.state.IDEditOppAchat}
													/>
												)}
											</DialogContent>
											<DialogActions>
												<Button
													onClick={(e) => {
														this.setState({
															modalEditOppAchatOpen: false,
															editFromFacture: false,
														});
													}}
												>
													Fermer
												</Button>
											</DialogActions>
										</Dialog>
									</CardBody>
								</Card>
							</Collapse>
						</Paper>
						{(!this.props.globalDataProfile.FacturesAchat ||
							this.state.loadingParams) &&
							"Chargement Liste..."}
						{this.props.globalDataProfile.FacturesAchat &&
							!this.state.loadingParams && (
								<span>
									{this.state.typeFacture === "Normal" && (
										<Genatab
											noSelectOption
											isLoading={!this.props.globalDataProfile.FacturesAchat}
											isTableOpen={false}
											heighttable={440}
											idcle="IDFact"
											tabletitle={
												"Liste factures :" +
												this.state.typeFacture +
												" pour " +
												this.state.nomFournisseur
											}
											printtable={this.props.printtable}
											data={this.state.listeFactures}
											labelsPlus={[]}
											champsplus={[]}
											champs={[
												{
													value: "numero",
													isPrintable: true,

													formatter: (val) => {
														return val;
													},
													fn: (val) => {
														return val;
													},
												},
												{
													value: "date",
													isPrintable: true,

													fn: (val) => {
														return Moment(val).format("DD/MM/YYYY");
													},
												},
												{
													value: "IDClient",
													isPrintable: true,

													fn: (val) => {
														return this.props.globalGetIt(
															this.props.globalDataProfile.Fournisseurs,
															"IDFournisseurProd",
															"nom",
															val
														);
													},
												},

												{
													value: "listeIDOpps",
													isPrintable: true,
													isInFooter: ["listeIDOpps", "listeIDOpps"],
													fnFooter: (val) => {
														return this.props.globalDataProfile.AllOppsAchat.reduce(
															(tot, opp) => {
																return (
																	tot +
																	(val.includes(opp.IDAchat.toString())
																		? opp.montant
																		: 0)
																);
															},
															0
														);
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
														const valsTab = val
															.split(",")
															.map((v) => parseInt(v));
														return this.props.globalDataProfile.AllOppsAchat.filter(
															(oa) => valsTab.includes(oa.IDAchat)
														).reduce((tot, opp) => {
															return tot + opp.montant;
														}, 0);
													},
												},
												{
													value: "information",
													isPrintable: true,

													formatter: (val) => {
														return val;
													},
													fn: (val) => {
														return val;
													},
												},
												{
													value: "IDFact",
													additionalValues: [
														"listeIDOpps",
														"numero",
														"nomFournisseur",
														"information",
													],
													isPrintable: false,

													fn: ([IDF, ListOpp, num, IDC, info]) => {
														return (
															<ButtonGroup>
																<Tooltip title="Modifier">
																	<Button
																		style={{ color: "#ffc107" }}
																		onClick={(e) => {
																			e.preventDefault();
																			//handleEdit
																			//	window.location.href =
																			//		"/oppachat/" + fact.IDFact;
																			this.doEdit(IDF);
																		}}
																	>
																		<FaEdit size="14" />
																	</Button>
																</Tooltip>
																<Tooltip title="Supprimer">
																	<Button
																		style={{ color: "#dd2c00" }}
																		onClick={(e) => {
																			e.preventDefault();
																			this.setState({
																				idDelete: IDF,
																				listeToDelete: ListOpp,
																				nomDelete:
																					"Facture NORMAL N°: " +
																					num +
																					" de " +
																					this.props.globalGetIt(
																						this.props.globalDataProfile
																							.Fournisseurs,
																						"IDFournisseurProd",
																						"nom",
																						IDC
																					),
																				informationDelete: info,
																				modalOpen: true,
																			});
																		}}
																	>
																		<FaTrashAlt size="14" />
																	</Button>
																</Tooltip>
																<Tooltip title="Remplacer">
																	<Button
																		style={{ color: "#8bc34a" }}
																		onClick={(e) => {
																			e.preventDefault();
																			this.setState({
																				idReplace: IDF,
																				url: "",
																				filename: "",
																				modalReplaceFactOpen: true,
																			});
																		}}
																	>
																		<FaUpload size="14" />
																	</Button>
																</Tooltip>
																<Tooltip
																	title={
																		"Ouvrir : " +
																		this.state.dataFactNormal.url
																			.split("/")
																			.join("-") +
																		"#" +
																		num +
																		".docx"
																	}
																>
																	<Button
																		style={{ color: "#00bcd4" }}
																		onClick={(e) => {
																			this.handleOpenFolder(
																				this.state.dataFactNormal.url +
																					"/" +
																					this.state.dataFactNormal.url
																						.split("/")
																						.join("-") +
																					"#" +
																					num +
																					".docx",
																				"Facture Achat Normal N°" + num
																			);
																		}}
																	>
																		<FaFileAlt size="14" />
																	</Button>
																</Tooltip>
															</ButtonGroup>
														);
													},
												},
											]}
											labels={[
												//	{ value: "IDA", isPrintable: false },
												{
													value: "Numero",
													isPrintable: true,
													isFilter: false,
													fnFilter: (dc) => {
														return dc; //.props.children[0].split(" ")[1];
													},
												},
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
													isFilter: true,
													fnFilter: (dc) => {
														return dc; //.props.children[0].split(" ")[1];
													},
												},
												{
													value: "Montant",
													isPrintable: true,
													isFilter: false,
													fnFilter: (dc) => {
														return dc; //.props.children[0].split(" ")[1];
													},
												},
												{
													value: "Information",
													isPrintable: true,
													isFilter: false,
													fnFilter: (dc) => {
														return dc; //.props.children[0].split(" ")[1];
													},
												},
												{
													value: "Actions",
													isPrintable: false,
													isFilter: false,
													fnFilter: (dc) => {
														return dc; //.props.children[0].split(" ")[1];
													},
												},
											]}
											fnDelete={null}
											fnEdit={(arr) => {
												this.doEdit(arr);
											}}
											fnInsert={(arr) => {}}
										/>
									)}
									{this.props.currentTab === "4" &&
										this.state.typeFacture === "IMPEXP" && (
											<Table className="animated fadeIn fadeOut" bordered dark>
												<thead>
													<tr>
														<th className="fixed-tab-header">#</th>
														<th className="fixed-tab-header" id="ID">
															ID
														</th>
														<th className="fixed-tab-header" id="Numero">
															Numero
														</th>
														<th className="fixed-tab-header" id="Date">
															Date
														</th>
														<th className="fixed-tab-header" id="Fournisseur">
															Fournisseur
														</th>
														<th className="fixed-tab-header" id="Banque">
															Banque
														</th>
														<th className="fixed-tab-header" id="RIB">
															RIB
														</th>
														<th className="fixed-tab-header" id="Information">
															Information
														</th>

														<th
															style={{
																position: "sticky",
																right: 0,
																top: 0,
																color: "#ffffff",
																background: "#000000",
																fontWeight: "bold",
																fontSize: "large",
																zIndex: 999,
															}}
														>
															Actions
														</th>
													</tr>
												</thead>

												<tbody>
													{!this.state.loadingFactures &&
														this.state.listeFactures.map((fact, index) => (
															<tr key={fact.IDFact}>
																<td>{index + 1}</td>
																<td>{fact.IDFact}</td>
																<td>{fact.numero}</td>
																<td>
																	{Moment(fact.date).format("DD-MM-YYYY")}
																</td>
																<td>{fact.nomFournisseur}</td>
																<td>{fact.banque}</td>
																<td>{fact.ibanRib}</td>
																<td>{fact.information}</td>

																<td
																	style={{
																		position: "sticky",
																		right: 0,
																		background: "#000",
																	}}
																	className="align-middle"
																>
																	<ButtonGroup size="sm">
																		<Button
																			onClick={(e) => {
																				e.preventDefault();
																				//handleEdit

																				//this.props.doEdit();
																				this.doEdit(fact.IDFact);
																			}}
																		>
																			<span className="">Edit</span>
																		</Button>
																		<Button
																			color={"danger"}
																			onClick={(e) => {
																				e.preventDefault();
																				this.setState({
																					idDelete: fact.IDFact,
																					listeToDelete: fact.listeIDOpps,
																					nomDelete:
																						"Facture EXPORT N°: " +
																						fact.numero +
																						" de " +
																						fact.nomFournisseur,
																					informationDelete: fact.information,
																					modalOpen: true,
																				});
																			}}
																		>
																			<span className="">Supp</span>
																		</Button>
																	</ButtonGroup>
																</td>
															</tr>
														))}
												</tbody>
											</Table>
										)}
									{this.props.currentTab === "4" &&
										this.state.typeFacture === "Avoir" && (
											<Table className="animated fadeIn fadeOut" bordered dark>
												<thead>
													<tr>
														<th className="fixed-tab-header">#</th>
														<th className="fixed-tab-header" id="ID">
															ID
														</th>
														<th className="fixed-tab-header" id="Numero">
															Numero
														</th>
														<th className="fixed-tab-header" id="Date">
															Date
														</th>
														<th className="fixed-tab-header" id="Categorie">
															Categorie
														</th>

														<th className="fixed-tab-header" id="Fournisseur">
															Fournisseur
														</th>
														<th className="fixed-tab-header" id="type Produit">
															type Produit
														</th>
														<th className="fixed-tab-header" id="Montant">
															Montant
														</th>
														<th className="fixed-tab-header" id="Ref. Doc.">
															Ref. Doc.
														</th>
														<th className="fixed-tab-header" id="Information">
															Information
														</th>

														<th
															style={{
																position: "sticky",
																right: 0,
																top: 0,
																color: "#ffffff",
																background: "#000000",
																fontWeight: "bold",
																fontSize: "large",
																zIndex: 999,
															}}
														>
															Actions
														</th>
													</tr>
												</thead>

												<tbody>
													{!this.state.loadingFactures &&
														this.state.listeFactures.map((fact, index) => (
															<tr key={fact.IDFactAvoir}>
																<td>{index + 1}</td>
																<td>{fact.IDFactAvoir}</td>
																<td>{fact.IDFactAvoir}</td>
																<td>
																	{Moment(fact.date).format("DD/MM/YYYY")}
																</td>
																<td>
																	{this.state.loadingNomCategAvoir &&
																		"Loading.."}
																	{!this.state.loadingNomCategAvoir &&
																		fact.nomCateg}
																</td>
																<td>{fact.nomFournisseur}</td>
																<td>{fact.typeProduit}</td>
																<td>{fact.montant}</td>
																<td>{fact.referenceDoc}</td>
																<td>{fact.information}</td>

																<td
																	style={{
																		position: "sticky",
																		right: 0,
																		background: "#000",
																	}}
																	className="align-middle"
																>
																	<ButtonGroup size="sm">
																		<Button
																			onClick={(e) => {
																				e.preventDefault();
																				//handleEdit

																				//this.props.doEdit();
																				this.doEdit(fact.IDFactAvoir);
																			}}
																		>
																			<span className="">Edit</span>
																		</Button>
																		<Button
																			color={"danger"}
																			onClick={(e) => {
																				e.preventDefault();
																				this.setState({
																					idDelete: fact.IDFactAvoir,
																					nomDelete:
																						"Facture Avoir N°: " +
																						fact.IDFactAvoir +
																						" de " +
																						fact.nomFournisseur,
																					informationDelete: "",
																					modalOpen: true,
																				});
																			}}
																		>
																			<span className="">Supp</span>
																		</Button>
																	</ButtonGroup>
																</td>
															</tr>
														))}
												</tbody>
											</Table>
										)}
									<Modal color={"danger"} isOpen={this.state.modalOpen}>
										<ModalHeader>Confirmer suppression</ModalHeader>
										<ModalBody>
											{this.state.informationDelete
												.split("|")

												.filter((pyd) => pyd.includes("Ressource")).length >
												0 && (
												<Alert color="danger">
													<h5>
														Attention : Opperation(s) de ressource creéer par la
														facture
													</h5>
													Cette facture a causé l'ajout d'opperation(s) de
													ressource à la moment de création et/ou mise à jour.
													<br />
													Si vous la suppriemr, ce(s) opperation(s) ne seront
													pas modifier/supprimer, j'usqu'a vous le
													modifier/supprimer manuellement !<br />
													Liste d'Opperation(s) ressource relative(s):{" "}
													<strong>
														{this.state.informationDelete
															.split("|")

															.map((pyd) => {
																if (pyd.includes("Ressource")) {
																	let txt = pyd.replace("Ressource :", "");
																	return txt + " - ";
																} else {
																	return "";
																}
															})}
													</strong>
													.
												</Alert>
											)}
											<h6>
												Voulez vous vraiment supprimer{" "}
												<strong className="text-primary">
													{this.state.nomDelete}
												</strong>
												?
											</h6>
										</ModalBody>
										<ModalFooter>
											<Button
												color="info"
												onClick={(e) => {
													this.setState({ modalOpen: false });
												}}
											>
												Annuler
											</Button>
											<Button
												color="danger"
												onClick={(e) => {
													e.preventDefault();
													this.handleDelete(
														this.state.idDelete,
														this.state.listeToDelete
													);
												}}
											>
												Confirmer
											</Button>
										</ModalFooter>
									</Modal>
								</span>
							)}

						<Modal
							isOpen={
								this.state.modalWrongSettings && this.props.currentTab === "4"
							}
						>
							<ModalHeader>Paramètre manquant</ModalHeader>
							<ModalBody>
								<Alert color="danger">
									<h4>Facture non configurée</h4>
									<hr />
									{this.state.msgWrongSettings}
								</Alert>
								<small>
									Acéder au menu paramètre <a href="/settings">ICI</a>
								</small>
							</ModalBody>
							<ModalFooter>
								<Button
									outline
									color="danger"
									onClick={(e) => {
										this.setState({ modalWrongSettings: false });
									}}
								>
									Fermer
								</Button>
							</ModalFooter>
						</Modal>

						<Modal isOpen={this.state.modalDevis} style={{ minWidth: "50%" }}>
							<ModalHeader>Facture Dévis</ModalHeader>
							<ModalBody>
								<Row>
									<Col sm={4}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="refDevist">Réference</Label>
											</Col>
											<Col>
												<Input
													id="refDevis"
													type="text"
													value={this.state.refDocDocDevis}
													onChange={(e) => {
														this.setState({ refDocDocDevis: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={4}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="fournDevis">Client</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="text"
													id="fournDevis"
													value={this.state.clientDevis}
													onChange={(e) => {
														this.setState({ clientDevis: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={4} className="float-right">
										<FormGroup row>
											<Col sm={12}>
												<Label for="dateDevis">Date</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="date"
													id="dateDevis"
													value={this.state.dateDevis}
													onChange={(e) => {
														this.setState({ dateDevis: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col sm={4}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="selectedProdMontantDevis">
													Designation
												</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="select"
													id="selectedProdMontantDevis"
													value={this.state.selectedProduitDevis}
													onChange={this.handleChangeProduitDevis}
												>
													<option value=""></option>
													{this.state.loadingProduitDevis && (
														<option>Loading..</option>
													)}

													<optgroup label="Produit">
														{!this.state.loadingProduitDevis &&
															this.state.listeProduitDevis
																.filter((prd) => {
																	return prd.nomTypeProd === "MATIERE PRIMAIRE";
																})
																.map((produit) => (
																	<option
																		key={
																			"selectedProdMontantDevis123587" +
																			produit.IDProduit +
																			"prod"
																		}
																		value={"prod" + produit.IDProduit}
																	>
																		{produit.nom}
																	</option>
																))}
													</optgroup>

													<optgroup label="Service">
														{!this.state.loadingProduitDevis &&
															this.state.listeProduitDevis
																.filter((prd) => {
																	return prd.nomTypeProd === "SERVICE";
																})
																.map((produit) => (
																	<option
																		key={
																			"selectedProdServiceDevis123587" +
																			produit.IDProduit +
																			"prodServ"
																		}
																		value={"prod" + produit.IDProduit}
																	>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Materiaux">
														{!this.state.loadingProduitDevis &&
															this.state.listeProduitDevis
																.filter((prd) => {
																	return prd.nomTypeProd === "MATERIEL";
																})
																.map((produit) => (
																	<option
																		key={
																			"selectedProdMateriauxDevis123587" +
																			produit.IDProduit +
																			"prodMats"
																		}
																		value={"prod" + produit.IDProduit}
																	>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Caisse">
														{!this.state.loadingCaisseDevis &&
															this.state.listeCaisseDevis.map((caisse) => (
																<Fragment>
																	<option
																		value={"caisse" + caisse.IDCaisse + "s"}
																	>
																		{caisse.nom} CS
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "n"}
																	>
																		{caisse.nom} CN
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "a"}
																	>
																		{caisse.nom} CA
																	</option>
																</Fragment>
															))}
													</optgroup>
													<optgroup label="Emballage"></optgroup>
													<optgroup label="Emballage Simple">
														{!this.state.loadingEmballageDevis &&
															this.state.listeEmballageDevis
																.filter((emb) => {
																	return emb.composition === "simple";
																})
																.map((embs) => (
																	<option
																		value={"embs" + embs.IDEmballage + "t"}
																	>
																		{embs.nom} - {embs.poid}Kg boite
																	</option>
																))}
													</optgroup>
													<optgroup label="Emballage Composée">
														{!this.state.loadingEmballageDevis &&
															this.state.listeEmballageDevis
																.filter((emb) => {
																	return emb.composition === "compose";
																})
																.map((embs) => (
																	<Fragment>
																		<option
																			value={
																				"embcEMBF" + embs.IDEmballage + "f"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg Fond
																		</option>
																		<option
																			value={
																				"embcEMBC" + embs.IDEmballage + "c"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg Couvercle
																		</option>
																	</Fragment>
																))}
													</optgroup>
												</Input>
											</Col>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup row>
											<Col sm={12}>Ajouter à la facture</Col>
											<Col>
												{" "}
												<Button
													disabled={this.state.loadingDesignation}
													color="info"
													outline
													onClick={(e) => {
														this.setState({
															listeOppsDevis: [
																...this.state.listeOppsDevis,
																{
																	ID: this.state.selectedProduitDevis,
																	designation:
																		this.state.currentDesignation[0].txt +
																		": " +
																		this.state.selectedNomProduitDevis,
																	qte: 0,
																	prix: 0,
																},
															],
														});
													}}
												>
													{" + Ajouter"}
												</Button>
											</Col>
										</FormGroup>
									</Col>
								</Row>
								<Row className="mt-1 pt-1">
									<Col>
										<Table dark responsive>
											<thead>
												<th>----</th>
												<th>Designation</th>
												<th>Qte</th>
												<th>Prix</th>
												<th>Total</th>
											</thead>
											<tbody id="wrappDevis">
												{this.state.listeOppsDevis.map((opp, i) => (
													<tr>
														<td>
															<Button
																outline
																color="danger"
																onClick={(e) => {
																	this.state.listeOppsDevis.splice(i, 1);
																	this.setState({
																		listeOppsDevis: this.state.listeOppsDevis,
																	});
																}}
															>
																-
															</Button>
														</td>
														<td>
															<strong>{opp.designation}</strong>
														</td>
														<td>
															<Input
																type="text"
																value={this.state.listeOppsDevis[i].qte}
																onChange={(e) => {
																	this.state.listeOppsDevis[i].qte =
																		e.target.value;
																	this.setState({
																		listeOppsDevis: this.state.listeOppsDevis,
																	});
																}}
															></Input>
														</td>
														<td>
															<Input
																type="text"
																value={this.state.listeOppsDevis[i].prix}
																onChange={(e) => {
																	this.state.listeOppsDevis[i].prix =
																		e.target.value;
																	this.setState({
																		listeOppsDevis: this.state.listeOppsDevis,
																	});
																}}
															></Input>
														</td>
														<td>
															<strong>
																{(opp.qte * opp.prix).toLocaleString("fr")}
															</strong>
														</td>
													</tr>
												))}
											</tbody>
											<tbody>
												<tr>
													<td>Total</td>
													<td>{this.state.listeOppsDevis.length}</td>
													<td>
														{this.state.listeOppsDevis
															.reduce((tot, opp) => {
																return tot + parseInt(opp.qte);
															}, 0)
															.toLocaleString("fr")}
													</td>
													<td>---</td>
													<td>
														{this.state.listeOppsDevis
															.reduce((tot, opp) => {
																return tot + opp.qte * opp.prix;
															}, 0)
															.toLocaleString("fr")}
													</td>
												</tr>
											</tbody>
										</Table>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											className="float-right"
											color="warning"
											disabled={
												this.state.loadingParams ||
												this.state.listeOppsDevis.length === 0
											}
											onClick={this.getInfoDoc}
										>
											Imprimer
										</Button>
										<Button
											className="float-right"
											disabled={this.state.loadingParams}
											onClick={(e) => {
												this.setState({
													modalDevis: false,
													DoPrintProformat: false,
													DoPrintDevis: false,
													listeOppsDevis: [],
													selectedProduitDevis: "",
													clientDevis: "",
													dateDevis: Moment().format("YYYY-MM-DD"),
													refDocDocDevis: "",
												});
											}}
										>
											Fermer
										</Button>
									</Col>
								</Row>
							</ModalBody>
						</Modal>

						<Modal
							isOpen={this.state.modalProformat}
							style={{ minWidth: "70%" }}
						>
							<ModalHeader>Facture Proformat</ModalHeader>
							<ModalBody>
								<Row>
									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="fournProformat">Client</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="text"
													id="fournProformat"
													value={this.state.clientProformat}
													onChange={(e) => {
														this.setState({ clientProformat: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={3}>
										<FormGroup className="" row>
											<Col sm={12}>
												<Label for="typePaiementProformat">
													Type de Paiement :{" "}
												</Label>
											</Col>

											<Col>
												<Input
													type="select"
													id="typePaiementProformat"
													value={this.state.ModepaiementProformat}
													onChange={(e) => {
														this.setState({
															ModepaiementProformat: e.target.value,
														});
													}}
												>
													<option value=""></option>
													{(this.state.LoadinglisteTypePaiement && (
														<option>Loading..</option>
													)) ||
														this.state.listeTypePaiement.map((pay, i) => (
															<option
																key={"typPaiProfFact" + i}
																value={pay.IDPaiement}
															>
																{pay.nom}
															</option>
														))}
												</Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="incotermProformat">INCOTERM</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="text"
													id="incotermProformat"
													value={this.state.incotermProformat}
													onChange={(e) => {
														this.setState({
															incotermProformat: e.target.value,
														});
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={3} className="float-right">
										<FormGroup row>
											<Col sm={12}>
												<Label for="dateProformat">Date</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="date"
													id="dateProformat"
													value={this.state.dateProformat}
													onChange={(e) => {
														this.setState({ dateProformat: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<FormGroup row>
											<Col sm={12}>
												<Label for="refProformat">Réference</Label>
											</Col>
											<Col>
												<Input
													id="refProformat"
													type="text"
													value={this.state.refDocDocProforma}
													onChange={(e) => {
														this.setState({
															refDocDocProforma: e.target.value,
														});
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup row>
											<Col sm={12}>
												<Label for="infoProformat">Info & Conditions</Label>
											</Col>
											<Col>
												<Input
													id="infoProformat"
													type="textarea"
													value={this.state.infoProformat}
													onChange={(e) => {
														this.setState({ infoProformat: e.target.value });
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
								</Row>
								<Row
									className="m-1 mb-1 pb-1"
									style={{ background: "rgba(111,66,193,0.7)" }}
								>
									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="qteDesign">Qte Design.</Label>
											</Col>
											<Col>
												<Input
													type="number"
													id="qteDesign"
													value={this.state.qteDesignationProformat}
													onChange={(e) => {
														this.setState({
															qteDesignationProformat: e.target.value,
														});
													}}
												></Input>
											</Col>
										</FormGroup>
									</Col>
									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="selectedProdMontantProformat">
													Designation
												</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="select"
													id="selectedProdMontantProformat"
													value={this.state.selectedProduitProformat}
													onChange={this.handleChangeProduitProformat}
												>
													<option value=""></option>
													{this.state.loadingProduitProformat && (
														<option>Loading..</option>
													)}

													<optgroup label="Produit">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "MATIERE PRIMAIRE";
																})
																.map((produit) => (
																	<option
																		key={
																			"prodFactMontantProf" + produit.IDProduit
																		}
																		value={"prod" + produit.IDProduit}
																	>
																		{produit.nom}
																	</option>
																))}
													</optgroup>

													<optgroup label="Service">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "SERVICE";
																})
																.map((produit) => (
																	<option value={"prod" + produit.IDProduit}>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Materiaux">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "MATERIEL";
																})
																.map((produit) => (
																	<option value={"prod" + produit.IDProduit}>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Caisse">
														{!this.state.loadingCaisseProformat &&
															this.state.listeCaisseProformat.map((caisse) => (
																<Fragment>
																	<option
																		value={"caisse" + caisse.IDCaisse + "s"}
																	>
																		{caisse.nom} CS
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "n"}
																	>
																		{caisse.nom} CN
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "a"}
																	>
																		{caisse.nom} CA
																	</option>
																</Fragment>
															))}
													</optgroup>
													<optgroup label="Emballage"></optgroup>
													<optgroup label="Emballage Simple">
														{!this.state.loadingEmballageProformat &&
															this.state.listeEmballageProformat
																.filter((emb) => {
																	return emb.composition === "simple";
																})
																.map((embs) => (
																	<option
																		value={"embs" + embs.IDEmballage + "t"}
																	>
																		{embs.nom} - {embs.poid}Kg{" "}
																		{" " + embs.typeEmb + " "} boite
																	</option>
																))}
													</optgroup>
													<optgroup label="Emballage Composée">
														{!this.state.loadingEmballageProformat &&
															this.state.listeEmballageProformat
																.filter((emb) => {
																	return emb.composition === "compose";
																})
																.map((embs) => (
																	<Fragment>
																		<option
																			value={
																				"embcEMBF" + embs.IDEmballage + "f"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg{" "}
																			{" " + embs.typeEmb + " "} Fond
																		</option>
																		<option
																			value={
																				"embcEMBC" + embs.IDEmballage + "c"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg{" "}
																			{" " + embs.typeEmb + " "}Couvercle
																		</option>
																	</Fragment>
																))}
													</optgroup>
												</Input>
											</Col>
										</FormGroup>
									</Col>

									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="selectedProdMontantProformat2">
													Designation2
												</Label>
											</Col>
											<Col sm={12}>
												<Input
													type="select"
													id="selectedProdMontantProformat2"
													value={this.state.selectedProduitProformat2}
													onChange={this.handleChangeProduitProformat2}
												>
													<option value=""></option>
													{this.state.loadingProduitProformat && (
														<option>Loading..</option>
													)}

													<optgroup label="Produit">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "MATIERE PRIMAIRE";
																})
																.map((produit) => (
																	<option
																		key={"matPrimFactProf2" + produit.IDProduit}
																		value={"prod" + produit.IDProduit}
																	>
																		{produit.nom}
																	</option>
																))}
													</optgroup>

													<optgroup label="Service">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "SERVICE";
																})
																.map((produit) => (
																	<option value={"prod" + produit.IDProduit}>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Materiaux">
														{!this.state.loadingProduitProformat &&
															this.state.listeProduitProformat
																.filter((prd) => {
																	return prd.nomTypeProd === "MATERIEL";
																})
																.map((produit) => (
																	<option value={"prod" + produit.IDProduit}>
																		{produit.nom}
																	</option>
																))}
													</optgroup>
													<optgroup label="Caisse">
														{!this.state.loadingCaisseProformat &&
															this.state.listeCaisseProformat.map((caisse) => (
																<Fragment>
																	<option
																		value={"caisse" + caisse.IDCaisse + "s"}
																	>
																		{caisse.nom} CS
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "n"}
																	>
																		{caisse.nom} CN
																	</option>
																	<option
																		value={"caisse" + caisse.IDCaisse + "a"}
																	>
																		{caisse.nom} CA
																	</option>
																</Fragment>
															))}
													</optgroup>
													<optgroup label="Emballage"></optgroup>
													<optgroup label="Emballage Simple">
														{!this.state.loadingEmballageProformat &&
															this.state.listeEmballageProformat
																.filter((emb) => {
																	return emb.composition === "simple";
																})
																.map((embs) => (
																	<option
																		value={"embs" + embs.IDEmballage + "t"}
																	>
																		{embs.nom} - {embs.poid}Kg boite
																	</option>
																))}
													</optgroup>
													<optgroup label="Emballage Composée">
														{!this.state.loadingEmballageProformat &&
															this.state.listeEmballageProformat
																.filter((emb) => {
																	return emb.composition === "compose";
																})
																.map((embs) => (
																	<Fragment>
																		<option
																			value={
																				"embcEMBF" + embs.IDEmballage + "f"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg Fond
																		</option>
																		<option
																			value={
																				"embcEMBC" + embs.IDEmballage + "c"
																			}
																		>
																			{embs.nom} - {embs.poid}Kg{" "}
																			{" " + embs.typeEmb}Couvercle
																		</option>
																	</Fragment>
																))}
													</optgroup>
												</Input>
											</Col>
										</FormGroup>
									</Col>

									<Col sm={3}>
										<FormGroup row>
											<Col sm={12}>
												<Label for="addLineBtnProformat">
													Ajouter à la facture
												</Label>
											</Col>
											<Col sm={12}>
												<Button
													id="addLineBtnProformat"
													disabled={this.state.loadingDesignationProformat}
													color="info"
													onClick={(e) => {
														this.setState({
															listeOppsProformat: [
																...this.state.listeOppsProformat,
																{
																	ID: this.state.selectedProduitProformat,
																	qteDesign: this.state.qteDesignationProformat,
																	designation:
																		this.state.selectedNomProduitProformat +
																		" " +
																		this.state.selectedNomProduitProformat2,
																	qteBrut: 0,
																	qteNet: 0,
																	prix: 0,
																},
															],
															selectedProduitProformat: "",
															selectedProduitProformat2: "",
															qteDesignationProformat: 0,
															selectedNomProduitProformat: "",
															selectedNomProduitProformat2: "",
														});
													}}
												>
													{" + Ajouter"}
												</Button>
											</Col>
										</FormGroup>
									</Col>
								</Row>
								<Row>
									<Col>
										<Table dark responsive className="table-fact-proformat">
											<thead>
												<th>----</th>
												<th>Qte. Design.</th>
												<th>Designation</th>
												<th>Qte Brut</th>
												<th>Qte NET</th>
												<th>Prix. unit.</th>
												<th>Total</th>
											</thead>
											<tbody id="wrappDevis">
												{this.state.listeOppsProformat.map((opp, i) => (
													<tr>
														<td>
															<Button
																outline
																color="danger"
																onClick={(e) => {
																	this.state.listeOppsProformat.splice(i, 1);
																	this.setState({
																		listeOppsProformat:
																			this.state.listeOppsProformat,
																	});
																}}
															>
																-
															</Button>
														</td>
														<td>
															<Input
																type="number"
																value={
																	this.state.listeOppsProformat[i].qteDesign
																}
																onChange={(e) => {
																	this.state.listeOppsProformat[i].qteDesign =
																		e.target.value;
																	this.setState({
																		listeOppsProformat:
																			this.state.listeOppsProformat,
																	});
																}}
															></Input>
														</td>
														<td style={{ minWidth: "100%" }}>
															<Input
																type="text"
																value={
																	this.state.listeOppsProformat[i].designation
																}
																onChange={(e) => {
																	this.state.listeOppsProformat[i].designation =
																		e.target.value;
																	this.setState({
																		listeOppsProformat:
																			this.state.listeOppsProformat,
																	});
																}}
															></Input>
														</td>
														<td>
															<Input
																type="text"
																value={this.state.listeOppsProformat[i].qteBrut}
																onChange={(e) => {
																	this.state.listeOppsProformat[i].qteBrut =
																		e.target.value;
																	this.setState({
																		listeOppsProformat:
																			this.state.listeOppsProformat,
																	});
																}}
															></Input>
														</td>
														<td>
															<Input
																type="text"
																value={this.state.listeOppsProformat[i].qteNet}
																onChange={(e) => {
																	this.state.listeOppsProformat[i].qteNet =
																		e.target.value;
																	this.setState({
																		listeOppsProformat:
																			this.state.listeOppsProformat,
																	});
																}}
															></Input>
														</td>
														<td>
															<Input
																type="text"
																value={this.state.listeOppsProformat[i].prix}
																onChange={(e) => {
																	this.state.listeOppsProformat[i].prix =
																		e.target.value;
																	this.setState({
																		listeOppsDevis:
																			this.state.listeOppsProformat,
																	});
																}}
															></Input>
														</td>
														<td>
															<strong>
																{(opp.qteNet * opp.prix).toLocaleString("fr")}
															</strong>
														</td>
													</tr>
												))}
											</tbody>
											<tbody>
												<tr>
													<td>Total</td>
													<td>
														{this.state.listeOppsProformat
															.reduce((tot, opp) => {
																return tot + parseInt(opp.qteDesign);
															}, 0)
															.toLocaleString("fr")}
													</td>
													<td>
														{this.state.listeOppsProformat
															.reduce((tot, opp) => {
																return tot + parseInt(opp.qteBrut);
															}, 0)
															.toLocaleString("fr")}
													</td>
													<td>
														{this.state.listeOppsProformat
															.reduce((tot, opp) => {
																return tot + parseInt(opp.qteNet);
															}, 0)
															.toLocaleString("fr")}
													</td>
													<td>---</td>
													<td>
														{this.state.listeOppsProformat
															.reduce((tot, opp) => {
																return tot + opp.qteNet * opp.prix;
															}, 0)
															.toLocaleString("fr")}
													</td>
												</tr>
											</tbody>
										</Table>
									</Col>
								</Row>
								<Row>
									<Col>
										<Button
											className="float-right"
											color="warning"
											disabled={
												this.state.loadingParams ||
												this.state.listeOppsProformat.length === 0
											}
											onClick={this.getInfoDoc}
										>
											Imprimer
										</Button>
										<Button
											className="float-right"
											disabled={this.state.loadingParams}
											onClick={(e) => {
												this.setState({
													modalProformat: false,
													DoPrintProformat: false,
													DoPrintDevis: false,
													listeOppsProformat: [],
													selectedProduitProformat: "",
													selectedProduitProformat2: "",
													selectedNomProduitProformat: "",
													selectedNomProduitProformat2: "",

													qteDesign: 0,
													clientProformat: "",
													dateProformat: Moment().format("YYYY-MM-DD"),
													infoProformat: "",
													refDocDocProforma: "",
												});
											}}
										>
											Fermer
										</Button>
									</Col>
								</Row>
							</ModalBody>
						</Modal>
						<Modal isOpen={this.state.modalPrintNormal}>
							<ModalHeader>Impression Facture Normal</ModalHeader>
							<ModalBody>
								{this.state.modalPrintNormal && (
									<PNormal
										ID={this.state.IDModalPrintNormal}
										done={(e) => {
											this.setState(
												{ modalPrintNormal: false },
												this.handleReset
											);
										}}
									/>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									onClick={(e) => {
										this.setState({ modalPrintNormal: false });
									}}
								>
									Fermer
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</Fragment>
			);
		}
	}
}

export default profileFacture;
