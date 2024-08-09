import React, { Component, Fragment, useRef, useEffect } from "react";
import {
	Row,
	Col,
	Modal,
	ModalHeader,
	ModalBody,
	Table,
	Alert,
	Spinner,
} from "reactstrap";
import Moment from "moment";
/* eslint-disable no-unused-expressions */
import { FaTrash, FaCalendarDay } from "react-icons/fa";
import { isEmpty } from "lodash";
import AccessInterdit from "../../tools/accessDenied";
import { toast } from "react-toastify";
import { resolve } from "bluebird";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProduitIcon from "@material-ui/icons/ListAlt";
import ArgentIcon from "@material-ui/icons/MonetizationOn";
import SoldeIcon from "@material-ui/icons/SwapVert";
import AddToRapportIcon from "@material-ui/icons/Print";
import DetailsIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/HighlightOff";
import {
	BottomNavigation,
	BottomNavigationAction,
	FormControl,
	Grid,
	IconButton,
	Paper,
	Select,
	Badge,
	Dialog,
	AppBar,
	Toolbar,
	Slide,
} from "@material-ui/core";
Moment.locale("fr");
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function usePrevious(value) {
	const ref = useRef();

	// Store current value in ref
	useEffect(() => {
		ref.current = value;
	}, [value]); // Only re-run if value changes

	// Return previous value (happens before update in useEffect above)
	if (ref.current !== value) {
		return true;
	} else {
		return false;
	}
}
class profileGeneral extends Component {
	constructor(props) {
		super(props);
		this.state = {
			MoneyChange: false,
			CseChange: false,
			EmbChange: false,
			MatChange: false,
			listeCaisse: [],
			loadingCaisse: false,
			selectedCaisse: "",
			selectedTypeCaisse: "",
			selectedNomCaisse: "",
			entreeCaisse: 0,
			sortieCaisse: 0,
			soldeCaisse: 0,
			//produit
			listeProduit: [],
			loadingProduit: false,
			selectedProduit: "",
			selectedNomProduit: "",
			entreeProduit: 0,
			sortieProduit: 0,
			soldeProduit: 0,

			pourcentage: 0,
			//payement
			listeModePayement: [],
			loadingModePayement: false,
			selectedModePayement: "",
			entreePaiement: 0,
			sortiePaiement: 0,
			soldePaiement: 0,
			//emballage
			listeEmballage: [],
			loadingEmballage: false,
			selectedEmballage: "",
			selectedNomEmballage: "",
			entreeEmballage: 0,
			sortieEmballage: 0,
			soldeEmballage: 0,
			//materiel
			listeMateriel: [],
			selectedMateriel: "",
			selectedNomMateriel: "",
			entreeMateriel: 0,
			sortieMateriel: 0,
			soldeMateriel: 0,

			//general
			loadingTotaux: false,
			selectedObjMontant: {},
			selectedLieuStockage: "",
			Date: "",
			txt: "Filtre >>",
			loadingLieuStockage: false,
			listeLieuStockage: [],
			selectedCategorie: "",
			loadingCategorie: false,
			listeCategorie: [],

			selectedOptionPaiment: "",

			cleTextOpp: "IDFournisseur",
			cleTextRess: "IDFornisseur",

			//RApport
			rapport: [],
			btnRapportVisible: false,
			modalRapportOpen: false,

			//rapport total
			somRapport: "",
			cle2Rapport: "",
			id2Rapport: "",
			typeRapport: "",
			CXRapport: "",
			somRapportRess: "",
			cle2RapportRess: "",
			id2RapportRess: "",
			typeRapportRess: "",
			CXRapportRess: "",
			rapportTot: [],
			wantedRapports: [],
			loadingRapportTotal: false,
			tableNameRapport: "",
			cleRapport: "",
			idRapport: "",

			listeFournis: [],
			listeNewFournis: [],
			counter: 0,
			done: 0,
			//ress Rapport
			tableNameRapportRess: "",
			cleRapportRess: "",
			idRapportRess: "",
			//cs
			somRapportCaisse: "Caisse",
			cle2RapportCaisse: "typeCaisse",
			id2RapportCaisse: 111,
			typeRapportCaisse: "CAISSE",
			CXRapportCaisse: "tous",
			somRapportRessCaisse: "tous",
			cle2RapportRessCaisse: "typeCaisse",
			id2RapportRessCaisse: this.props.idFournisseur,
			typeRapportRessCaisse: "CAISSE",
			CXRapportRessCaisse: "+++",

			//mat
			somRapportMat: "nbr",
			cle2RapportMat: "matriel",
			id2RapportMat: "123",
			typeRapportMat: "MAT",
			CXRapportMat: "tous",
			somRapportRessMat: "nbrMatriel",
			cle2RapportRessMat: "mat",
			id2RapportRessMat: 111,
			typeRapportRessMat: "MAT",
			CXRapportRessMat: "tous",
			//emb
			somRapportEmb: "nbrEmballage",
			cle2RapportEmb: "emballage",
			id2RapportEmb: "-1",
			typeRapportEmb: "EMB",
			CXRapportEmb: "tous",
			somRapportRessEmb: "tous",
			cle2RapportRessEmb: "embx",
			id2RapportRessEmb: 111,
			typeRapportRessEmb: "EMB",
			CXRapportRessEmb: "tous",

			loadingRCS: false,
			loadingREmb: false,
			loadingRMat: false,

			entreeProduitRapportTotal: 0,
			entreeCaisseRapportTotal: 0,
			entreeEmballageRapportTotal: 0,
			entreeMaterielRapportTotal: 0,
			entreeProduitRapportTotal: 0,

			sortieProduitRapportTotal: 0,
			sortieCaisseRapportTotal: 0,
			sortieEmballageRapportTotal: 0,
			sortieMaterielRapportTotal: 0,
			sortieProduitRapportTotal: 0,
			loadingInCS: true,
			loadingOutCs: true,
			loadingInMat: true,
			loadingOutMat: true,
			loadingInEmb: true,
			loadingOutEmb: true,
			laodingInProd: true,
			loadingOutProd: true,
			//calcule loading
			loadingCalcMontantIn: false,
			loadingCalcMontantOut: false,
			loadingCalcMontantSold: false,

			loadingCalcCaisseIn: false,
			loadingCalcCaisseOut: false,
			loadingCalcCaisseSold: false,

			loadingCalcEmbIn: false,
			loadingCalcEmbOut: false,
			loadingCalcEmbSold: false,

			loadingCalcMatIn: false,
			loadingCalcMatOut: false,
			loadingCalcMatSold: false,
			preparingRapport: false,
			//settings
			settings: "",
			loadingParams: false,
			DocumentRapport: "",
			LoadinglisteDocuments: false,
			gettotauxOnce: false,
			//DoLoadData: this.props.match.params.CALC === "T" ? true : false,
		};
		// this.getCaisse = this.getCaisse.bind(this);
		this.handleChangeCaisse = this.handleChangeCaisse.bind(this);
		this.handleChangeTypeCaisse = this.handleChangeTypeCaisse.bind(this);
		this.handleClickDetailsCaisse = this.handleClickDetailsCaisse.bind(this);
		//fn produits
		// this.getProduit = this.getProduit.bind(this);
		this.handleChangeProduit = this.handleChangeProduit.bind(this);
		this.handleClickDetailsProduit = this.handleClickDetailsProduit.bind(this);
		//fn payement
		// this.getModePayement = this.getModePayement.bind(this);
		this.handleChangePayement = this.handleChangePayement.bind(this);
		//fn emballage
		// this.getEmballage = this.getEmballage.bind(this);
		this.handleChangeEmballage = this.handleChangeEmballage.bind(this);
		this.handleClickDetailsEmballage =
			this.handleClickDetailsEmballage.bind(this);
		//fn materiel
		this.handleChangeMateriel = this.handleChangeMateriel.bind(this);
		this.handleClickDetailsMateriel =
			this.handleClickDetailsMateriel.bind(this);

		//general
		//this.getTotaux = this.getTotaux.bind(this);
		this.procedureTotalDetail = this.procedureTotalDetail.bind(this);
		this.procedureTotalDetailRess = this.procedureTotalDetailRess.bind(this);

		//Rapport
		this.handleAddToRapport = this.handleAddToRapport.bind(this);
		this.handleAddToRapportTotal = this.handleAddToRapportTotal.bind(this);
		this.handlePrintRappor = this.handlePrintRappor.bind(this);
		// this.getAllFournisseurs = this.getAllFournisseurs.bind(this);
		//Rapport total

		this.getTotauxRapport = this.getTotauxRapport.bind(this);

		this.procedureTotalDetailRapport =
			this.procedureTotalDetailRapport.bind(this);
		this.procedureTotalDetailRessRapport =
			this.procedureTotalDetailRessRapport.bind(this);

		this.checkDone = this.checkDone.bind(this);
		this.handleResetRapport = this.handleResetRapport.bind(this);
		this.saveRapport = this.saveRapport.bind(this);
		this.getSettings = this.getSettings.bind(this);
		this.getDocument = this.getDocument.bind(this);
		this.getGlobalTotaux = this.getGlobalTotaux.bind(this);
		this.setcle = this.setcle.bind(this);
		//this.getLieuStockage = this.getLieuStockage.bind(this);
		//this.getCategorie = this.getCategorie.bind(this);
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (
			prevState.selectedModePayement !== this.state.selectedModePayement ||
			prevState.selectedNomProduit !== this.state.selectedNomProduit
		) {
			this.setState({ MoneyChange: true }, () => {
				setTimeout(() => {
					this.setState({ MoneyChange: false });
				}, 600);
			});
		}
		if (
			prevState.selectedCaisse !== this.state.selectedCaisse ||
			prevState.selectedNomCaisse !== this.state.selectedNomCaisse ||
			prevState.selectedTypeCaisse !== this.state.selectedTypeCaisse
		) {
			this.setState({ CseChange: true }, () => {
				setTimeout(() => {
					this.setState({ CseChange: false });
				}, 600);
			});
		}
		if (
			prevState.selectedEmballage !== this.state.selectedEmballage ||
			prevState.selectedNomEmballage !== this.state.selectedNomEmballage
		) {
			this.setState({ EmbChange: true }, () => {
				setTimeout(() => {
					this.setState({ EmbChange: false });
				}, 600);
			});
		}
		if (
			prevState.selectedMateriel !== this.state.selectedMateriel ||
			prevState.selectedNomMateriel !== this.state.selectedNomMateriel
		) {
			this.setState({ MatChange: true }, () => {
				setTimeout(() => {
					this.setState({ MatChange: false });
				}, 600);
			});
		}
	}

	componentDidMount() {
		this.setState(
			{
				cleTextOpp:
					this.props.idFournisseur === "tous" ? "tous" : "IDFournisseur",
				cleTextRess:
					this.props.idFournisseur === "tous" ? "tous" : "IDFornisseur",
			},
			() => {
				this.props.doCalculate &&
					this.getGlobalTotaux(this.props.idFournisseur);

				//this.getSettings();
				/* this.getAllFournisseurs();
          this.getCaisse();
          this.getProduit();
          this.getModePayement();
          this.getEmballage();
          this.getLieuStockage();
          this.getCategorie();*/
				//this.props.doCalculate && this.getTotaux();
			}
		);
		document.addEventListener("rechercher", () => {
			this.setcle();
			this.getGlobalTotaux(this.props.idFournisseur);
			this.setState({
				selectedCaisse: "",
				selectedTypeCaisse: "",
				selectedNomCaisse: "",
				selectedProduit: "",
				selectedNomProduit: "",
				selectedModePayement: "",
				selectedEmballage: "",
				selectedNomEmballage: "",
				selectedMateriel: "",
				selectedNomMateriel: "",
			});
		});
		document.addEventListener("changedProfile", () => {
			this.handleResetRapport();
		});
		//this.getSettings();
		//this.props.doCalculate && this.getTotaux();
	}
	componentWillUnmount() {
		document.removeEventListener("changedProfile", () => {
			this.handleResetRapport();
		});
		document.removeEventListener("rechercher", () => {
			this.setcle();
			this.getGlobalTotaux(this.props.idFournisseur);
			this.setState({
				selectedCaisse: "",
				selectedTypeCaisse: "",
				selectedNomCaisse: "",
				selectedProduit: "",
				selectedNomProduit: "",
				selectedModePayement: "",
				selectedEmballage: "",
				selectedNomEmballage: "",
				selectedMateriel: "",
				selectedNomMateriel: "",
			});
		});
	}

	getSettings() {
		this.setState({ loadingParams: true });
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				this.setState(
					{
						settings: setts[0],

						loadingParams: false,
					},
					() => {
						this.getDocument(this.state.settings.IDDocRapport);
					}
				);
			});
	}
	async getDocument(ID) {
		this.setState({
			LoadinglisteDocuments: true,
		});
		let doc = {};
		await Promise.all(
			this.props.globalDataProfile.Documents.map(async (docr) => {
				if (parseInt(docr.IDDoc) === parseInt(ID)) {
					//return doc;
					doc = docr;
					return resolve(docr);
				}
			})
		);

		this.setState({
			DocumentRapport: doc,
			LoadinglisteDocuments: false,
		});
	}

	handleChangeCaisse(e) {
		this.setState({
			selectedCaisse: e.target.value,
			selectedNomCaisse: e.target.selectedOptions[0].text,
			loadingRCS: false,
		});

		//opps
		e.target.value === ""
			? (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"Caisse",
					"typeCaisse",
					111,
					"CAISSE",
					"tous"
			  ),
			  this.setState({
					somRapportCaisse: "Caisse",
					cle2RapportCaisse: "typeCaisse",
					id2RapportCaisse: 111,
					typeRapportCaisse: "CAISSE",
					CXRapportCaisse: "tous",
			  }))
			: (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					this.state.selectedTypeCaisse === ""
						? "Caisse"
						: this.state.selectedTypeCaisse,
					"typeCaisse",
					e.target.value,
					"CAISSE",
					this.state.selectedTypeCaisse === ""
						? "tousType"
						: this.state.selectedTypeCaisse
			  ),
			  this.setState({
					somRapport:
						this.state.selectedTypeCaisse === ""
							? "Caisse"
							: this.state.selectedTypeCaisse,
					cle2RapportCaisse: "typeCaisse",
					id2RapportCaisse: e.target.value,
					typeRapportCaisse: "CAISSE",
					CXRapportCaisse:
						this.state.selectedTypeCaisse === ""
							? "tousType"
							: this.state.selectedTypeCaisse,
			  }));
		//ressource

		e.target.value === ""
			? (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"tous",
					"typeCaisse",
					this.props.idFournisseur,
					"CAISSE",
					"+++"
			  ),
			  this.setState({
					somRapportRessCaisse: "tous",
					cle2RapportRessCaisse: "typeCaisse",
					id2RapportRessCaisse: this.props.idFournisseur,
					typeRapportRessCaisse: "CAISSE",
					CXRapportRessCaisse: "+++",
			  }))
			: (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"nbr" + this.state.selectedTypeCaisse,
					"typeCaisse",
					e.target.value,
					"CAISSE",
					this.state.selectedTypeCaisse === ""
						? "tous"
						: "nbr" + this.state.selectedTypeCaisse
			  ),
			  this.setState({
					somRapportRessCaisse: "nbr" + this.state.selectedTypeCaisse,
					cle2RapportRessCaisse: "typeCaisse",
					id2RapportRessCaisse: e.target.value,
					typeRapportRessCaisse: "CAISSE",
					CXRapportRessCaisse:
						this.state.selectedTypeCaisse === ""
							? "tous"
							: "nbr" + this.state.selectedTypeCaisse,
			  }));
	}
	handleChangeTypeCaisse(e) {
		this.setState({ selectedTypeCaisse: e.target.value });

		e.target.value === ""
			? (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"Caisse",
					"typeCaisse",
					this.state.selectedCaisse,
					"CAISSE",
					"tousType"
			  ),
			  this.setState({
					somRapportCaisse: "Caisse",
					cle2RapportCaisse: "typeCaisse",
					id2RapportCaisse: this.state.selectedCaisse,
					typeRapportCaisse: "CAISSE",
					CXRapportCaisse: "tousType",
			  }))
			: (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					e.target.value,
					"typeCaisse",
					this.state.selectedCaisse,
					"CAISSE",
					e.target.value
			  ),
			  this.setState({
					somRapportCaisse: e.target.value,
					cle2RapportCaisse: "typeCaisse",
					id2RapportCaisse: this.state.selectedCaisse,
					typeRapportCaisse: "CAISSE",
					CXRapportCaisse: e.target.value,
			  }));
		//ressource

		if (this.state.selectedCaisse !== "") {
			e.target.value === ""
				? (this.procedureTotalDetailRess(
						"tableressourceachat",
						this.state.cleTextRess,
						this.props.idFournisseur,
						"123",
						"typeCaisse",
						this.state.selectedCaisse,
						"CAISSE",
						"tous"
				  ),
				  this.setState({
						somRapportRessCaisse: "123",
						cle2RapportRessCaisse: "typeCaisse",
						id2RapportRessCaisse: this.state.selectedCaisse,
						typeRapportRessCaisse: "CAISSE",
						CXRapportRessCaisse: "tous",
				  }))
				: (this.procedureTotalDetailRess(
						"tableressourceachat",
						this.state.cleTextRess,
						this.props.idFournisseur,
						"nbr" + e.target.value,
						"typeCaisse",
						this.state.selectedCaisse,
						"CAISSE",
						"123"
				  ),
				  this.setState({
						somRapportRessCaisse: "nbr" + e.target.value,
						cle2RapportRessCaisse: "typeCaisse",
						id2RapportRessCaisse: this.state.selectedCaisse,
						typeRapportRessCaisse: "CAISSE",
						CXRapportRessCaisse: "123",
				  }));
		}
	}
	handleClickDetailsCaisse(e) {
		this.props.setDetailsDe(
			"Caisse " +
				this.state.selectedNomCaisse +
				" " +
				this.state.selectedTypeCaisse,
			{
				oppDe: "Caisse",
				IDCaisse: this.state.selectedCaisse,
				typCaisse: this.state.selectedTypeCaisse,
			}
		);
	}
	setcle() {
		this.setState({
			cleTextOpp:
				this.props.idFournisseur === "tous" ? "tous" : "IDFournisseur",
			cleTextRess:
				this.props.idFournisseur === "tous" ? "tous" : "IDFornisseur",
		});
	}

	handleChangeProduit(e) {
		this.setState({
			selectedProduit: e.target.value,
			selectedNomProduit: e.target.selectedOptions[0].text,
		});

		//	return false;
		if (e.target.value === "") {
			this.procedureTotalDetail(
				"tableachat",
				this.state.cleTextOpp,
				this.props.idFournisseur,
				"montant",
				"123",
				1111,
				"tous",
				"cx"
			);
		} else {
			if (e.target.value.indexOf("total") === 0) {
				this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"montant",
					"cl2",
					2222,
					e.target.value,
					"cx"
				);
			} else {
				const typSelected =
					e.target.selectedOptions[0].closest("optgroup").label;
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
				let cle2 = types.filter((tp) => {
					return tp.txt === typSelected;
				});
				//	alert(e.target.value.match(/\d+/g));

				this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"montant",
					cle2[0].champ,
					e.target.value.match(/\d+/g),
					"MONTANT",
					cle2[0].CX
				);

				this.setState({ selectedObjMontant: cle2[0] });
			}
		}
	}
	handleClickDetailsProduit(e) {
		this.props.setDetailsDe("Montant " + this.state.selectedNomProduit, {
			oppDe: "PROD",
			IDProduit: this.state.selectedProduit,
			modePaiement: this.state.selectedModePayement,
			montantData: this.state.selectedObjMontant,
			doShowRessources: false,
		});
	}

	handleChangePayement(e) {
		this.setState({
			selectedModePayement: e.target.value,
			selectedOptionPaiment: e.target.selectedOptions[0].text,
		});

		this.procedureTotalDetailRess(
			"tableressourceachat",
			this.state.cleTextRess,
			this.props.idFournisseur,
			"montant",
			"typePaiement",
			e.target.value === "" ? "123" : e.target.value,
			"MONTANT",
			e.target.value === "" ? "tous" : "xxx"
		);
	}

	handleChangeEmballage(e) {
		this.setState({
			selectedEmballage: e.target.value,
			selectedNomEmballage: e.target.selectedOptions[0].text,
		});

		const typSelected =
			e.target.value === ""
				? "-1"
				: e.target.selectedOptions[0].closest("optgroup").label;

		let COVFOND = "";
		switch (e.target.value.substr(0, 4)) {
			case "EMBC":
				COVFOND = "COV";
				break;
			case "EMBF":
				COVFOND = "FON";
				break;
		}
		const types = [
			{ CXResource: "Emb", CX: "boite", txt: "Simple" },
			{
				CXResource: COVFOND,
				CX: e.target.value.substr(0, 4),

				txt: "Composée",
			},
			{ CXResource: "", CX: "tous", txt: "-1" },
		];
		let cle2 = types.filter((tp) => {
			return tp.txt === typSelected;
		});

		this.procedureTotalDetail(
			"tableachat",
			this.state.cleTextOpp,
			this.props.idFournisseur,
			"nbrEmballage",
			"emballage",
			e.target.value.match(/\d+/g),
			"EMB",
			cle2[0].CX
		);
		this.setState({
			somRapportEmb: "nbrEmballage",
			cle2RapportEmb: "emballage",
			id2RapportEmb: e.target.value.match(/\d+/g),
			typeRapportEmb: "EMB",
			CXRapportEmb: cle2[0].CX,
		});

		///resource
		//alert(e.target.value);
		e.target.value === ""
			? (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"tous",
					"embx",
					111,
					"EMB",
					"tous"
			  ),
			  this.setState({
					somRapportRessEmb: "tous",
					cle2RapportRessEmb: "embx",
					id2RapportRessEmb: 111,
					typeRapportRessEmb: "EMB",
					CXRapportRessEmb: "tous",
			  }))
			: (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"nbr" + cle2[0].CXResource,
					"emballage",
					e.target.value.match(/\d+/g),
					"EMB",
					cle2[0].CXResource
			  ),
			  this.setState({
					somRapportRessEmb: "nbr" + cle2[0].CXResource,
					cle2RapportRessEmb: "emballage",
					id2RapportRessEmb: e.target.value.match(/\d+/g),
					typeRapportRessEmb: "EMB",
					CXRapportRessEmb: cle2[0].CXResource,
			  }));
	}
	handleClickDetailsEmballage(e) {
		this.props.setDetailsDe("Emballage " + this.state.selectedNomEmballage, {
			oppDe: "EMB",
			IDEmballage: this.state.selectedEmballage,
			typeEmballage:
				this.state.selectedEmballage.substr(0, 4) !== "EMBC" &&
				this.state.selectedEmballage.substr(0, 4) !== "EMBF" &&
				this.state.selectedEmballage.substr(0, 4) !== ""
					? "boite"
					: this.state.selectedEmballage.substr(0, 4),
		});
	}
	//fn materiel
	handleChangeMateriel(e) {
		this.setState({
			selectedMateriel: e.target.value,
			selectedNomMateriel: e.target.selectedOptions[0].text,
		});

		//opps
		e.target.value === ""
			? (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"nbr",
					"matriel",
					"123",
					"MAT",
					"tous"
			  ),
			  this.setState({
					somRapportMat: "nbr",
					cle2RapportMat: "matriel",
					id2RapportMat: "123",
					typeRapportMat: "MAT",
					CXRapportMat: "tous",
			  }))
			: (this.procedureTotalDetail(
					"tableachat",
					this.state.cleTextOpp,
					this.props.idFournisseur,
					"nbr",
					"matriel",
					e.target.value,
					"MAT",
					"123"
			  ),
			  this.setState({
					somRapportMat: "nbr",
					cle2RapportMat: "matriel",
					id2RapportMat: e.target.value,
					typeRapportMat: "MAT",
					CXRapportMat: "123",
			  }));

		///resource
		//	alert(e.target.value);
		e.target.value === ""
			? (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"nbrMatriel",
					"mat",
					111,
					"MAT",
					"tous"
			  ),
			  this.setState({
					somRapportRessMat: "nbrMatriel",
					cle2RapportRessMat: "mat",
					id2RapportRessMat: 111,
					typeRapportRessMat: "MAT",
					CXRapportRessMat: "tous",
			  }))
			: (this.procedureTotalDetailRess(
					"tableressourceachat",
					this.state.cleTextRess,
					this.props.idFournisseur,
					"nbrMatriel",
					"typeMatriel",
					e.target.value,
					"MAT",
					"nbrMatriel"
			  ),
			  this.setState({
					somRapportRessMat: "nbrMatriel",
					cle2RapportRessMat: "typeMatriel",
					id2RapportRessMat: e.target.value,
					typeRapportRessMat: "MAT",
					CXRapportRessMat: "nbrMatriel",
			  }));
	}
	handleClickDetailsMateriel(e) {
		//alert(this.state.selectedMateriel);
		this.props.setDetailsDe("Materiel " + this.state.selectedNomMateriel, {
			oppDe: "MAT",
			IDMat: this.state.selectedMateriel,
		});
	}

	//general

	getGlobalTotaux_OPPS(c) {
		fetch("/api/mariem/getTotaux_opps", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				FC: "Fournisseur",
				ID: c,
				AllOpps: this.props.globalDataProfile.AllOppsAchat,
			}),
		})
			.then((res) => res.json())
			.then((r) => {
				this.setState({
					entreeCaisse: r.oppcaisse || 0,
					//produit
					entreeProduit: r.oppmont || 0,

					//emballage
					entreeEmballage: r.oppemb || 0,
					//materiel
					entreeMateriel: (r.oppmat1 || 0) + (r.oppmat2 || 0),

					loadingTotaux_OPPS: false,
				});
			});
	}
	getGlobalTotaux_RESS(c) {
		fetch("/api/mariem/getTotaux_ress", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				FC: "Fournisseur",
				ID: c,
				AllRess: this.props.globalDataProfile.AllRessAchat,
			}),
		})
			.then((res) => res.json())
			.then((r) => {
				this.setState({
					sortieCaisse: r.oppResscaisse || 0,
					//produit
					sortieProduit: r.oppRessmont || 0,

					//emballage
					sortieEmballage: r.oppRessemb || 0,
					//materiel
					sortieMateriel: r.oppRessmat || 0,

					loadingTotaux_RESS: false,
				});
			});
	}
	getGlobalTotaux(c) {
		if (this.props.globalDataProfile.AllOppsAchat) {
			this.setState({ loadingTotaux_OPPS: true }, () => {
				this.getGlobalTotaux_OPPS(c);
			});
		}
		if (this.props.globalDataProfile.AllRessAchat) {
			this.setState({ loadingTotaux_RESS: true }, () => {
				this.getGlobalTotaux_RESS(c);
			});
		}
	}

	procedureTotalDetail(tableName, cle, id, som, cle2, id2, type, CX) {
		//this.setState({ entreeProduit: "Calcule.." });

		this.setState(
			{
				tableNameRapport: tableName,
				cleRapport: cle,
				idRapport: id,
				somRapport: som,
				cle2Rapport: cle2,
				id2Rapport: id2,
				typeRapport: type,
				CXRapport: CX,
				loadingCalcMontantIn: type === "MONTANT" || type === "tous",

				loadingCalcCaisseIn: type === "CAISSE",
				loadingCalcEmbIn: type === "EMB",

				loadingCalcMatIn: type === "MAT",
			},
			() => {
				fetch(
					"/api/mariem/totaldetailsopp/" +
						tableName +
						"/" +
						cle +
						"/" +
						id +
						"/" +
						som +
						"/" +
						cle2 +
						"/" +
						id2 +
						"/" +
						type +
						"/" +
						CX
				)
					.then((res) => res.json())
					.then((tots) => {
						(type === "MONTANT" || type === "tous") &&
							this.setState({
								entreeProduit: tots[0][0].result,

								loadingCalcMontantIn: false,
							});
						type === "CAISSE" &&
							this.setState({
								entreeCaisse: tots[0][0].result,
								loadingCalcCaisseIn: false,
							});
						type === "EMB" &&
							this.setState({
								entreeEmballage: tots[0][0].result,
								loadingCalcEmbIn: false,
							});
						type === "MAT" &&
							this.setState({
								entreeMateriel:
									parseInt(tots[0][0].result || 0) +
									parseInt(tots[1][0].result2 || 0),
								loadingCalcMatIn: false,
							});

						type.indexOf("total") === 0 &&
							this.setState({
								entreeProduit: parseInt(tots[0][0].result || 0),
								loadingCalcMontantIn: false,
							});
					});
			}
		);
	}

	procedureTotalDetailRess(tableName, cle, id, som, cle2, id2, type, CX) {
		//this.setState({ entreeProduit: "Calcule.." });
		this.setState(
			{
				tableNameRapportRess: tableName,
				cleRapportRess: cle,
				idRapportRess: id,
				somRapportRess: som,
				cle2RapportRess: cle2,
				id2RapportRess: id2,
				typeRapportRess: type,
				CXRapportRess: CX,
				loadingCalcMontantOut: type === "MONTANT" || type === "tous",

				loadingCalcCaisseOut: type === "CAISSE",
				loadingCalcEmbOut: type === "EMB",

				loadingCalcMatOut: type === "MAT",
			},
			() => {
				fetch(
					"/api/mariem/totaldetailsress/" +
						tableName +
						"/" +
						cle +
						"/" +
						id +
						"/" +
						som +
						"/" +
						cle2 +
						"/" +
						id2 +
						"/" +
						type +
						"/" +
						CX
				)
					.then((res) => res.json())
					.then((tots) => {
						//alert(JSON.stringify(tots));
						//montant
						type === "MONTANT" &&
							this.setState({
								sortieProduit: tots[0][0].resultP + tots[1][0].resultN,
								loadingCalcMontantOut: false,
							});
						//caisse
						type === "CAISSE" &&
							this.setState({
								sortieCaisse:
									tots.length > 2
										? tots[0][0].resultP + (tots[1][0].resultN || 0)
										: tots[0][0].resultP,
								loadingCalcCaisseOut: false,
							});
						//emballage
						type === "EMB" &&
							som === "tous" &&
							this.setState({
								sortieEmballage: tots[0][0].resultP,
								loadingCalcEmbOut: false,
							});
						type === "EMB" &&
							som !== "tous" &&
							CX === "tous" &&
							this.setState({
								sortieEmballage: tots[0][0].resultP,
								loadingCalcEmbOut: false,
							});
						type === "EMB" &&
							som !== "tous" &&
							CX !== "tous" &&
							this.setState({
								sortieEmballage: tots[0][0].resultP + tots[1][0].resultN,
								loadingCalcEmbOut: false,
							});
						//materiel
						type === "MAT" &&
							this.setState({
								sortieMateriel:
									parseInt(tots[1][0].resultN || 0) +
									parseInt(tots[0][0].resultP || 0),
								loadingCalcMatOut: false,
							});
					});
			}
		);
	}

	//#region Rapport
	getTotauxRapport() {}

	procedureTotalDetailRapport(som, cle2, id2, type, CX) {
		if (type === "MONTANT") {
			fetch(
				"/api/mariem/totaldetailsoppALLFournisseurs/montant/montant/123/tous/tous"
			)
				.then((res) => res.json())
				.then((tots) => {
					let totsTmp = tots;
					const Result = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("result")) {
							return tt;
						}
					});
					let Result2 = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("result2")) {
							return tt;
						}
					});
					this.setState({
						listeNewFournis: totsTmp.concat.apply([], totsTmp).filter((tt) => {
							return tt.idf;
						}),
					});

					(type === "MONTANT" || type === "tous") &&
						this.setState(
							{
								entreeProduitRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								//alert(JSON.stringify(this.entreeProduitRapportTotal));
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRess,
									this.state.cle2RapportRess,
									this.state.id2RapportRess,
									type,
									this.state.CXRapportRess
								);
							}
						);
					type === "CAISSE" &&
						this.setState(
							{
								entreeCaisseRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRess,
									this.state.cle2RapportRess,
									this.state.id2RapportRess,
									type,
									this.state.CXRapportRess
								);
							}
						);
					type === "EMB" &&
						this.setState(
							{
								entreeEmballageRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRess,
									this.state.cle2RapportRess,
									this.state.id2RapportRess,
									type,
									this.state.CXRapportRess
								);
							}
						);
					type === "MAT" &&
						this.setState(
							{
								entreeMaterielRapportTotal: Result.map((tb, j) => {
									return (
										parseInt(tb.result || 0) + parseInt(Result2[j].result2 || 0)
									);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRess,
									this.state.cle2RapportRess,
									this.state.id2RapportRess,
									type,
									this.state.CXRapportRess
								);
							}
						);

					type.indexOf("total") === 0 &&
						this.setState(
							{
								entreeProduitRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRess,
									this.state.cle2RapportRess,
									this.state.id2RapportRess,
									type,
									this.state.CXRapportRess
								);
							}
						);
				});
		} else {
			fetch(
				"/api/mariem/totaldetailsoppALLFournisseurs/" +
					som +
					"/" +
					cle2 +
					"/" +
					id2 +
					"/" +
					type +
					"/" +
					CX
			)
				.then((res) => res.json())
				.then((tots) => {
					let totsTmp = tots;
					let Result = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("result")) {
							return tt;
						}
					});
					let Result2 = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("result2")) {
							return tt;
						}
					});
					this.setState({
						listeNewFournis: totsTmp.concat.apply([], totsTmp).filter((tt) => {
							return tt.idf;
						}),
					});

					(type === "MONTANT" || type === "tous") &&
						this.setState(
							{
								entreeProduitRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									"ttt",
									"ttt",
									"ttt",
									type,
									"ttt"
								);
							}
						);
					type === "CAISSE" &&
						this.setState(
							{
								entreeCaisseRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRessCaisse,
									this.state.cle2RapportRessCaisse,
									this.state.id2RapportRessCaisse,
									type,
									this.state.CXRapportRessCaisse
								);
							}
						);
					type === "EMB" &&
						this.setState(
							{
								entreeEmballageRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRessEmb,
									this.state.cle2RapportRessEmb,
									this.state.id2RapportRessEmb,
									type,
									this.state.CXRapportRessEmb
								);
							}
						);
					type === "MAT" &&
						this.setState(
							{
								entreeMaterielRapportTotal: Result.map((tb, j) => {
									return (
										parseInt(tb.result || 0) + parseInt(Result2[j].result2 || 0)
									);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(
									this.state.somRapportRessMat,
									this.state.cle2RapportRessMat,
									this.state.id2RapportRessMat,
									type,
									this.state.CXRapportRessMat
								);
							}
						);

					type.indexOf("total") === 0 &&
						this.setState(
							{
								entreeProduitRapportTotal: Result.map((tb, j) => {
									return parseInt(tb.result || 0);
								}),
							},
							() => {
								this.procedureTotalDetailRessRapport(som, cle2, id2, type, CX);
							}
						);
				});
		}
	}
	procedureTotalDetailRessRapport(som, cle2, id2, type, CX) {
		if (type === "MONTANT") {
			fetch(
				"/api/mariem/totaldetailsressALLFournisseurs/montant/typePaiement/123/MONTANT/tous"
			)
				.then((res) => res.json())
				.then((tots) => {
					let ResultN = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("resultN")) {
							return tt;
						}
					});
					let ResultP = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("resultP")) {
							return tt;
						}
					});

					type === "MONTANT" &&
						this.setState(
							{
								sortieProduitRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//caisse
					type === "CAISSE" &&
						this.setState(
							{
								sortieCaisseRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//emballage
					type === "EMB" &&
						som === "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(tb.resultP || 0);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					type === "EMB" &&
						som !== "tous" &&
						CX === "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(tb.resultP || 0);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					type === "EMB" &&
						som !== "tous" &&
						CX !== "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//materiel
					type === "MAT" &&
						this.setState(
							{
								sortieMaterielRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
				});
		} else {
			fetch(
				"/api/mariem/totaldetailsressALLFournisseurs/" +
					som +
					"/" +
					cle2 +
					"/" +
					id2 +
					"/" +
					type +
					"/" +
					CX
			)
				.then((res) => res.json())
				.then((tots) => {
					let ResultN = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("resultN")) {
							return tt;
						}
					});
					let ResultP = tots.concat.apply([], tots).filter((tt, i) => {
						if (tt.hasOwnProperty("resultP")) {
							return tt;
						}
					});

					type === "MONTANT" &&
						this.setState(
							{
								sortieProduitRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//caisse
					type === "CAISSE" &&
						this.setState(
							{
								sortieCaisseRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//emballage
					type === "EMB" &&
						som === "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(tb.resultP || 0);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					type === "EMB" &&
						som !== "tous" &&
						CX === "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(tb.resultP || 0);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					type === "EMB" &&
						som !== "tous" &&
						CX !== "tous" &&
						this.setState(
							{
								sortieEmballageRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
					//materiel
					type === "MAT" &&
						this.setState(
							{
								sortieMaterielRapportTotal: ResultP.map((tb, j) => {
									return parseInt(
										(tb.resultP || 0) +
											(ResultN[j] ? ResultN[j].resultN || 0 : 0)
									);
								}),
							},
							() => {
								this.checkDone(type);
							}
						);
				});
		}
	}

	handleAddToRapportTotal(typ) {
		switch (typ) {
			case "MONTANT":
				this.procedureTotalDetailRapport("ttt", "ttt", "ttt", typ, "ttt");
				break;
			case "CAISSE":
				this.procedureTotalDetailRapport(
					this.state.somRapportCaisse,
					this.state.cle2RapportCaisse,
					this.state.id2RapportCaisse,
					typ,
					this.state.CXRapportCaisse
				);

				break;
			case "EMB":
				this.procedureTotalDetailRapport(
					this.state.somRapportEmb,
					this.state.cle2RapportEmb,
					this.state.id2RapportEmb,
					typ,
					this.state.CXRapportEmb
				);

				break;
			case "MAT":
				this.procedureTotalDetailRapport(
					this.state.somRapportMat,
					this.state.cle2RapportMat,
					this.state.id2RapportMat,
					typ,
					this.state.CXRapportMat
				);

				break;

			default:
				break;
		}
	}

	checkDone(typ) {
		let koi = {};
		switch (typ) {
			case "MONTANT":
				koi = {
					id: "",
					txt:
						this.state.selectedNomProduit +
						" " +
						this.state.selectedOptionPaiment,
					data: {
						entree: this.state.entreeProduitRapportTotal,
						sortie: this.state.sortieProduitRapportTotal,
					},
				};
				break;
			case "CAISSE":
				koi = {
					id: "",
					txt:
						this.state.selectedNomCaisse + " " + this.state.selectedTypeCaisse,
					data: {
						entree: this.state.entreeCaisseRapportTotal,
						sortie: this.state.sortieCaisseRapportTotal,
					},
				};
				break;
			case "EMB":
				koi = {
					id: "",
					txt: this.state.selectedNomEmballage,
					data: {
						entree: this.state.entreeEmballageRapportTotal,
						sortie: this.state.sortieEmballageRapportTotal,
					},
				};
				break;
			case "MAT":
				koi = {
					id: "",
					txt: this.state.selectedNomMateriel,
					data: {
						entree: this.state.entreeMaterielRapportTotal,
						sortie: this.state.sortieMaterielRapportTotal,
					},
				};
				break;
			case "total":
				koi = {
					id: "",
					txt: "ALL",
					data: {
						entree: this.state.entreeProduitRapportTotal,
						sortie: this.state.sortieProduitRapportTotal,
					},
				};
				break;

			default:
				break;
		}
		this.setState(
			{
				done: this.state.done + 1,
				loadingRapportTotal: false,
				rapportTot: [...this.state.rapportTot, { type: typ, koi: koi }],
			},
			() => {
				this.setState({
					entreeProduitRapportTotal: 0,
					entreeCaisseRapportTotal: 0,
					entreeEmballageRapportTotal: 0,
					entreeMaterielRapportTotal: 0,
					entreeProduitRapportTotal: 0,

					sortieProduitRapportTotal: 0,
					sortieCaisseRapportTotal: 0,
					sortieEmballageRapportTotal: 0,
					sortieMaterielRapportTotal: 0,
					sortieProduitRapportTotal: 0,
				});
			}
		);
	}

	handleAddToRapport(obj) {
		switch (obj) {
			case "caisse":
				this.setState({
					rapport: [
						...this.state.rapport,
						{
							ref: "cs-" + this.state.rapport.length + 1,
							titre: "Caisse",
							caisse: this.state.selectedNomCaisse,
							typeCaisse: this.state.selectedTypeCaisse,
							entree: this.state.entreeCaisse,
							sortie: this.state.sortieCaisse,
							solde: this.state.soldeCaisse,
						},
					],
				});

				break;
			case "embs":
				this.setState({
					rapport: [
						...this.state.rapport,
						{
							ref: "embs-" + this.state.rapport.length + 1,
							titre: "Emballage",
							emb: this.state.selectedEmballage,
							nomEmb: this.state.selectedNomEmballage,
							entree: this.state.entreeEmballage,
							sortie: this.state.sortieEmballage,
							solde: this.state.soldeEmballage,
						},
					],
				});
				break;
			case "mat":
				this.setState({
					rapport: [
						...this.state.rapport,
						{
							ref: "mat-" + this.state.rapport.length + 1,
							titre: "Materiel",
							mat: this.state.selectedMateriel,
							entree: this.state.entreeMateriel,
							sortie: this.state.sortieMateriel,
							solde: this.state.soldeMateriel,
						},
					],
				});
				break;
			case "montant":
				this.setState({
					rapport: [
						...this.state.rapport,
						{
							ref: "mnt-" + this.state.rapport.length + 1,
							titre: "Montant",
							produit: this.state.selectedProduit,
							typeProduit: this.state.selectedNomProduit,
							payment: this.state.selectedOptionPaiment,
							entree: this.state.entreeProduit,
							sortie: this.state.sortieProduit,
							solde: this.state.soldeProduit,
						},
					],
				});
				break;

			default:
				break;
		}
	}

	//#endregion rapport
	handlePrintRappor() {
		this.setState({ modalRapportOpen: false, preparingRapport: true });
		this.getDocument(this.props.globalDataProfile.Settings[0].IDDocRapport);
		const rapport = document.getElementById("RapportDivToPrint");

		let btns = rapport.getElementsByClassName("BTNTODELETE");
		while (btns.length > 0) {
			btns[0].parentNode.removeChild(btns[0]);
		}
		if (
			typeof this.props.nameFor === "undefined" ||
			this.props.nameFor === "" ||
			this.props.nameFor === "Tous"
		) {
			document.getElementById("RapportLongAlert").remove();
		}
		/*
		let doc = window.open(("", "PRINT", "height=400,width=600"));

		doc.document.write("<html><head><title>Impression Rapport</title>");
		doc.document.write("</head><body >");
		doc.document.write(rapport.innerHTML);
		doc.document.write("</body></html>");

		doc.document.close();
		doc.focus();

		doc.print();

		doc.close(); */
		let scpt = document.createElement("script");
		let funcTxt = document.createTextNode(`
		function actions(){
		document.close();
		window.focus();
		document.getElementById("btnPrintDeleteMe").remove();
		window.print();
		//window.close();
		}
		`);
		scpt.appendChild(funcTxt);
		let btnPrint = document.createElement("button");
		let txtbtn = document.createTextNode("Imprimer");
		btnPrint.id = "btnPrintDeleteMe";
		btnPrint.appendChild(txtbtn);
		btnPrint.setAttribute("onclick", "actions()");

		btnPrint.style.position = "absolute";
		btnPrint.style.fontSize = "20px";
		btnPrint.style.top = "0";
		btnPrint.style.alignSelf = "center";
		btnPrint.style.margin = "17px";

		btnPrint.classList.add("no-print");
		rapport.appendChild(btnPrint);
		rapport.appendChild(scpt);
		this.saveRapport(rapport.innerHTML);

		return true;
	}
	handleResetRapport() {
		this.setState({
			rapport: [],
			rapportTot: [],
		});
	}
	saveRapport(html) {
		fetch("/api/mariem/docdocs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: 0,
				reference:
					"RAP-" +
					(this.props.nameFor === "" ||
					typeof this.props.nameFor === "undefined" ||
					this.props.nameFor === "Tous"
						? "TOTAL"
						: this.props.nameFor),
				IDDoc: this.props.globalDataProfile.Settings[0].IDDocRapport,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.insertId) {
					toast.info(
						"Le rapport a été ajoutée à l'archive document avec succées",
						{ pauseOnFocusLoss: false }
					);
					fetch("/api/mariem/print/rapport", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							html: html,
							idDocDoc: res.insertId,
							docRapport: this.state.DocumentRapport,
						}),
					})
						.then((res) => res.json())
						.then((res) => {
							this.setState({
								preparingRapport: false,
							});
							window.open(
								"file:///" + res.replace("#", "%23"),
								"Impression Rapport",
								"frame=false"
							);
						});
				} else {
					toast.error(
						"Erreur: erreur de creation de la fichier RAPPORT dans l'archive ! ",
						{ autoClose: false }
					);
					console.log(JSON.stringify(res));
				}
			});
	}
	render() {
		let uuu = JSON.stringify(this.props.currentUser);

		let ENTNAME =
			this.props.globalDataProfile.Entreprises &&
			!isEmpty(this.props.globalDataProfile.Entreprises) &&
			!isEmpty(this.props.globalDataProfile.Settings) &&
			this.props.globalDataProfile.Entreprises.filter(
				(ent) =>
					parseInt(ent.IDEntreprise) ===
					parseInt(this.props.globalDataProfile.Settings[0].IDEntreprise)
			);
		ENTNAME = !isEmpty(ENTNAME) ? ENTNAME[0].nomEntreprise : "";
		const tab = JSON.parse(uuu);
		let canVisit =
			typeof tab.allowedModule !== "undefined" &&
			tab.allowedModule.split(",").includes("M_ProFGen");

		if (!canVisit) {
			return <AccessInterdit />;
		} else {
			return (
				<div>
					<IconButton
						style={{ borderRadius: 0, top: 0 }}
						className="no-print float-right"
						onClick={(e) => {
							this.setState({ modalRapportOpen: true });
						}}
						disabled={
							this.state.rapport.length === 0 &&
							this.state.rapportTot.length === 0
						}
					>
						<Badge
							badgeContent={
								this.props.nameFor !== "" &&
								this.props.nameFor !== "Tous" &&
								typeof this.props.nameFor !== "undefined"
									? this.state.rapport.length
									: this.state.rapportTot.length
							}
							color="secondary"
						>
							<AddToRapportIcon />{" "}
							{(this.state.rapport.length === 0 &&
								this.state.rapportTot.length === 0 &&
								"Rapport vide !") ||
								"Imprimer le rapport"}
						</Badge>
					</IconButton>

					<Grid spacing={2} container className="pt-3 no-print">
						<Grid item sm={12} md={12} lg={6} xs={12}>
							<Card
								style={{
									width: "100%",
									background: "#fff",
									margin: "5px",
									padding: 1,
								}}
							>
								<CardContent
									style={{
										margin: "0px",
										padding: 1,
									}}
								>
									<Grid container>
										<Grid item xs={12}>
											<Paper
												style={{
													borderBottom: "2px solid red",
													background: "#e7e7e7",
													margin: 20,
													marginLeft: 0,
													marginRight: 0,
													marginTop: 0,
												}}
											>
												<Typography
													style={{ color: "#fa8072" }}
													gutterBottom
													variant="h5"
													component="h2"
												>
													Montant
													<Button
														style={{ float: "right" }}
														onClick={(e) => {
															if (
																this.props.nameFor === "" ||
																typeof this.props.nameFor === "undefined" ||
																this.props.nameFor === "Tous"
															) {
																this.handleAddToRapportTotal("MONTANT");
															} else {
																this.handleAddToRapport("montant");
															}
														}}
													>
														<AddToRapportIcon />
													</Button>
													<Button
														onClick={this.handleClickDetailsProduit}
														style={{ float: "right" }}
													>
														<DetailsIcon />
													</Button>{" "}
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															value={this.state.selectedModePayement}
															onChange={this.handleChangePayement}
															id="modepaiementselect"
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															<option value="">Tous</option>
															{(!this.props.globalDataProfile.Paiement && (
																<option>Loading..</option>
															)) ||
																this.props.globalDataProfile.Paiement.map(
																	(pay) => (
																		<option
																			key={
																				"modepaiementGeneralPage" +
																				pay.IDPaiement +
																				"sps"
																			}
																			value={pay.IDPaiement}
																		>
																			{pay.nom}
																		</option>
																	)
																)}
														</Select>
													</FormControl>
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															type="select"
															id="selectedProdMontant"
															value={this.state.selectedProduit}
															onChange={this.handleChangeProduit}
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															<option value="">Tous</option>
															{!this.props.globalDataProfile.Produits && (
																<option>Loading..</option>
															)}

															<optgroup label="Produit">
																<option
																	key={"GenprodMain"}
																	value="totalPROD"
																	className="text-primary"
																>
																	Tous les produits
																</option>
																{this.props.globalDataProfile.Produits &&
																	this.props.globalDataProfile.Produits.filter(
																		(prd) => {
																			return (
																				prd.nomTypeProd === "MATIERE PRIMAIRE"
																			);
																		}
																	).map((produit) => (
																		<option
																			key={"Genprod" + produit.IDProduit}
																			value={"prod" + produit.IDProduit}
																		>
																			{produit.nom}
																		</option>
																	))}
															</optgroup>

															<optgroup label="Service">
																<option
																	key={"GenServMain"}
																	value="totalSERV"
																	className="text-primary"
																>
																	Tous les service
																</option>
																{this.props.globalDataProfile.Produits &&
																	this.props.globalDataProfile.Produits.filter(
																		(prd) => {
																			return prd.nomTypeProd === "SERVICE";
																		}
																	).map((produit) => (
																		<option
																			key={"GenServMain" + produit.IDProduit}
																			value={"prod" + produit.IDProduit}
																		>
																			{produit.nom}
																		</option>
																	))}
															</optgroup>
															<optgroup label="Materiaux">
																<option
																	key={"genMatMain"}
																	value="totalMAT"
																	className="text-primary"
																>
																	Tous les materiaux
																</option>
																{this.props.globalDataProfile.Produits &&
																	this.props.globalDataProfile.Produits.filter(
																		(prd) => {
																			return prd.nomTypeProd === "MATERIEL";
																		}
																	).map((produit) => (
																		<option
																			key={"genprodMat" + produit.IDProduit}
																			value={"prod" + produit.IDProduit}
																		>
																			{produit.nom}
																		</option>
																	))}
															</optgroup>
															<optgroup label="Caisse">
																<option
																	value="totalCAISSE"
																	className="text-primary"
																>
																	Tous les caisses
																</option>
																{this.props.globalDataProfile.Caisse &&
																	this.props.globalDataProfile.Caisse.map(
																		(caisse, i) => (
																			<Fragment key={"fragListCsOnGenPg" + i}>
																				<option
																					key={
																						"gencaisseTotalPgGen014567" +
																						caisse.IDCaisse +
																						"ToT" +
																						i
																					}
																					value={
																						"caisse" + caisse.IDCaisse + "T"
																					}
																				>
																					{caisse.nom} | Total
																				</option>
																				<option
																					key={
																						"gencaisseCSGenPage" +
																						caisse.IDCaisse +
																						"s"
																					}
																					value={
																						"caisse" + caisse.IDCaisse + "s"
																					}
																				>
																					{caisse.nom} | CS
																				</option>
																				<option
																					key={
																						"gencaisseCNGenPage" +
																						caisse.IDCaisse +
																						"n"
																					}
																					value={
																						"caisse" + caisse.IDCaisse + "n"
																					}
																				>
																					{caisse.nom} | CN
																				</option>
																				<option
																					key={
																						"gencaisseCAGenPage" +
																						caisse.IDCaisse +
																						"a"
																					}
																					value={
																						"caisse" + caisse.IDCaisse + "a"
																					}
																				>
																					{caisse.nom} | CA
																				</option>
																			</Fragment>
																		)
																	)}
															</optgroup>
															<optgroup label="Emballage">
																<option
																	key={"genEmbsMain54ae87"}
																	value="totalEMB"
																	className="text-primary"
																>
																	Tous les emballages
																</option>
															</optgroup>
															<optgroup label="Emballage Simple">
																{this.props.globalDataProfile.Emballage &&
																	this.props.globalDataProfile.Emballage.filter(
																		(emb) => {
																			return emb.composition === "simple";
																		}
																	).map((embs) => (
																		<option
																			key={
																				"genEmbsTotalGenPgaaaeef" +
																				embs.IDEmballage +
																				"t"
																			}
																			value={"embs" + embs.IDEmballage + "t"}
																		>
																			{embs.nom} - {embs.poid}Kg | Total
																		</option>
																	))}
															</optgroup>
															<optgroup label="Emballage Composée">
																{this.props.globalDataProfile.Emballage &&
																	this.props.globalDataProfile.Emballage.filter(
																		(emb) => {
																			return emb.composition === "compose";
																		}
																	).map((embs) => (
																		<Fragment>
																			<option
																				key={
																					"genEmbcTousGenPageEmComposee" +
																					embs.IDEmballage +
																					"t"
																				}
																				value={
																					"embctous" +
																					embs.IDEmballage +
																					"tstous"
																				}
																			>
																				{embs.nom} - {embs.poid}Kg | Total
																			</option>
																			<option
																				key={
																					"emFondgenEmbsEMBF" +
																					embs.IDEmballage +
																					"df"
																				}
																				value={
																					"embcEMBF" + embs.IDEmballage + "f"
																				}
																			>
																				{embs.nom} - {embs.poid}Kg | Fond
																			</option>
																			<option
																				key={
																					"EMbCouvgenEmbsEMBCTotal" +
																					embs.IDEmballage +
																					"ccc"
																				}
																				value={
																					"embcEMBC" + embs.IDEmballage + "c"
																				}
																			>
																				{embs.nom} - {embs.poid}Kg | Couvercle
																			</option>
																		</Fragment>
																	))}
															</optgroup>
														</Select>
													</FormControl>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={12}>
											{" "}
											<BottomNavigation showLabels>
												{" "}
												<BottomNavigationAction
													className={"fontyy"}
													style={{ fontWeight: "bold", fontSize: "0.944rem" }}
													id="IDOpenSelectProduit"
													aria-describedby="IDOpenSelectProduit"
													onClick={(e) => {
														this.setState({ selectProduitOpen: true });
													}}
													label={
														<strong
															className={
																!this.state.MoneyChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_OPPS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeProduit
																)}
														</strong>
													}
													icon={
														<span>
															<ProduitIcon />
															Produit
														</span>
													}
												/>
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													id="IDOpenSelectPaiment"
													aria-describedby="IDOpenSelectPaiment"
													onClick={(e) => {
														this.setState({
															selectPaimentOpen: !this.state.selectPaimentOpen,
														});
													}}
													label={
														<strong
															className={
																!this.state.MoneyChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_RESS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.sortieProduit
																)}
														</strong>
													}
													icon={
														<span>
															<ArgentIcon />
															Paiement
														</span>
													}
												/>
												<BottomNavigationAction
													onDoubleClick={(e) => {
														navigator.clipboard.writeText(
															this.state.entreeProduit -
																this.state.sortieProduit
														);
													}}
													style={{
														backgroundColor: "#fa8072",
														fontWeight: "bold",
													}}
													label={
														<strong
															className={
																!this.state.MoneyChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{((this.state.loadingTotaux_RESS ||
																this.state.loadingTotaux_OPPS) &&
																"Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeProduit -
																		this.state.sortieProduit
																)}
														</strong>
													}
													icon={
														<span>
															<SoldeIcon />
															Solde
														</span>
													}
												/>
											</BottomNavigation>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
						<Grid item sm={12} md={12} lg={6} xs={12}>
							<Card
								style={{
									width: "100%",
									background: "#fff",
									margin: "5px",
									padding: 1,
								}}
							>
								<CardContent
									style={{
										margin: "0px",
										padding: 1,
									}}
								>
									<Grid container>
										<Grid item xs={12}>
											<Paper
												style={{
													borderBottom: "2px solid yellow",
													background: "#e7e7e7",
													margin: 20,
													marginLeft: 0,
													marginRight: 0,
													marginTop: 0,
												}}
											>
												<Typography
													style={{ color: "yellow" }}
													gutterBottom
													variant="h5"
													component="h2"
												>
													Caisse
													<Button
														style={{ float: "right" }}
														onClick={(e) => {
															if (
																this.props.nameFor === "" ||
																typeof this.props.nameFor === "undefined" ||
																this.props.nameFor === "Tous"
															) {
																this.handleAddToRapportTotal("CAISSE");
															} else {
																this.handleAddToRapport("caisse");
															}
														}}
													>
														<AddToRapportIcon />
													</Button>
													<Button
														onClick={this.handleClickDetailsCaisse}
														style={{ float: "right" }}
													>
														<DetailsIcon />
													</Button>
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															type="select"
															value={this.state.selectedTypeCaisse}
															onChange={this.handleChangeTypeCaisse}
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															<option value="">Tous</option>
															<option value="CS">CS</option>
															<option value="CN">CN</option>
															<option value="CA">CA</option>
														</Select>
													</FormControl>
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															type="select"
															value={this.state.selectedCaisse}
															onChange={this.handleChangeCaisse}
															id="Caisseselect"
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															<option value="">Tous</option>
															{(!this.props.globalDataProfile.Caisse && (
																<option>Loading..</option>
															)) ||
																this.props.globalDataProfile.Caisse.map(
																	(caisse) => (
																		<option
																			key={
																				"CaisseSelectGenPage12300000" +
																				caisse.IDCaisse
																			}
																			value={caisse.IDCaisse}
																		>
																			{caisse.nom}
																		</option>
																	)
																)}
														</Select>
													</FormControl>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={12}>
											{" "}
											<BottomNavigation showLabels>
												{" "}
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.CseChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_OPPS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeCaisse
																)}
														</strong>
													}
													icon={
														<span>
															<ProduitIcon />
															Caisse Pleine
														</span>
													}
												/>
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.CseChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_RESS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.sortieCaisse
																)}
														</strong>
													}
													icon={
														<span>
															<ArgentIcon />
															Caisse Vide
														</span>
													}
												/>
												<BottomNavigationAction
													onDoubleClick={(e) => {
														navigator.clipboard.writeText(
															this.state.entreeCaisse - this.state.sortieCaisse
														);
													}}
													style={{
														backgroundColor: "#f0e68c",
														fontWeight: "bold",
													}}
													label={
														<strong
															className={
																!this.state.CseChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{((this.state.loadingTotaux_RESS ||
																this.state.loadingTotaux_OPPS) &&
																"Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeCaisse -
																		this.state.sortieCaisse
																)}
														</strong>
													}
													icon={
														<span>
															<SoldeIcon />
															Solde Caisse
														</span>
													}
												/>
											</BottomNavigation>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Grid spacing={2} container className="pt-3 no-print">
						<Grid item sm={12} md={12} lg={6} xs={12}>
							<Card
								style={{
									width: "100%",
									background: "#fff",
									margin: "5px",
									padding: 1,
								}}
							>
								<CardContent
									style={{
										margin: "0px",
										padding: 1,
									}}
								>
									<Grid container>
										<Grid item xs={12}>
											<Paper
												style={{
													borderBottom: "2px solid green",
													background: "#e7e7e7",
													margin: 20,
													marginLeft: 0,
													marginRight: 0,
													marginTop: 0,
												}}
											>
												<Typography
													style={{ color: "#66cdaa" }}
													gutterBottom
													variant="h5"
													component="h2"
												>
													Emballage
													<Button
														style={{ float: "right" }}
														onClick={(e) => {
															if (
																this.props.nameFor === "" ||
																typeof this.props.nameFor === "undefined" ||
																this.props.nameFor === "Tous"
															) {
																this.handleAddToRapportTotal("EMB");
															} else {
																this.handleAddToRapport("embs");
															}
														}}
													>
														<AddToRapportIcon />
													</Button>
													<Button
														onClick={this.handleClickDetailsEmballage}
														style={{ float: "right" }}
													>
														<DetailsIcon />
													</Button>
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															type="select"
															value={this.state.selectedEmballage}
															onChange={this.handleChangeEmballage}
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															<option value="">Tous</option>

															{!this.props.globalDataProfile.Emballage && (
																<option>Loading..</option>
															)}
															<optgroup label="Simple">
																{this.props.globalDataProfile.Emballage &&
																	this.props.globalDataProfile.Emballage.filter(
																		(emb) => {
																			return emb.composition === "simple";
																		}
																	).map((emb) => (
																		<option value={emb.IDEmballage}>
																			{emb.nom} - {emb.poid}Kg {emb.typeEmb}
																		</option>
																	))}
															</optgroup>
															<optgroup label="Composée">
																{this.props.globalDataProfile.Emballage &&
																	this.props.globalDataProfile.Emballage.filter(
																		(emb) => {
																			return emb.composition === "compose";
																		}
																	).map((emb) => (
																		<Fragment>
																			<option value={"EMBC" + emb.IDEmballage}>
																				{emb.nom} - {emb.poid}Kg {emb.typeEmb}{" "}
																				Couv.
																			</option>
																			<option value={"EMBF" + emb.IDEmballage}>
																				{emb.nom} - {emb.poid}Kg {emb.typeEmb}{" "}
																				Fond
																			</option>
																		</Fragment>
																	))}
															</optgroup>
														</Select>
													</FormControl>
												</Typography>
											</Paper>
										</Grid>
										<Grid item xs={12}>
											<BottomNavigation showLabels>
												{" "}
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.EmbChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_OPPS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeEmballage
																)}
														</strong>
													}
													icon={
														<span>
															<ProduitIcon />
															Emb. Plein
														</span>
													}
												/>
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.EmbChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_RESS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.sortieEmballage
																)}
														</strong>
													}
													icon={
														<span>
															<ArgentIcon />
															Emb. Vide
														</span>
													}
												/>
												<BottomNavigationAction
													onDoubleClick={(e) => {
														navigator.clipboard.writeText(
															this.state.entreeEmballage -
																this.state.sortieEmballage
														);
													}}
													style={{
														backgroundColor: "#66cdaa",
														fontWeight: "bold",
													}}
													label={
														<strong
															className={
																!this.state.EmbChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{((this.state.loadingTotaux_RESS ||
																this.state.loadingTotaux_OPPS) &&
																"Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeEmballage -
																		this.state.sortieEmballage
																)}
														</strong>
													}
													icon={
														<span>
															<SoldeIcon />
															Solde Emb.
														</span>
													}
												/>
											</BottomNavigation>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
						<Grid item sm={12} md={12} lg={6} xs={12}>
							<Card
								style={{
									width: "100%",
									background: "#fff",
									margin: "5px",
									padding: 1,
								}}
							>
								<CardContent
									style={{
										margin: "0px",
										padding: 1,
									}}
								>
									<Grid container>
										<Grid xs={12}>
											{" "}
											<Paper
												style={{
													borderBottom: "2px solid blue",
													background: "#e7e7e7",
													margin: 20,
													marginLeft: 0,
													marginRight: 0,
													marginTop: 0,
												}}
											>
												<Typography
													style={{ color: "#87ceeb" }}
													gutterBottom
													variant="h5"
													component="h2"
												>
													Materiel
													<Button
														style={{ float: "right" }}
														onClick={(e) => {
															if (
																this.props.nameFor === "" ||
																typeof this.props.nameFor === "undefined" ||
																this.props.nameFor === "Tous"
															) {
																this.handleAddToRapportTotal("MAT");
															} else {
																this.handleAddToRapport("mat");
															}
														}}
													>
														<AddToRapportIcon />
													</Button>
													<Button
														onClick={this.handleClickDetailsMateriel}
														style={{ float: "right" }}
													>
														<DetailsIcon />
													</Button>
													<FormControl
														style={{ float: "right", margin: 1, maxWidth: 200 }}
													>
														<Select
															type="select"
															value={this.state.selectedMateriel}
															onChange={this.handleChangeMateriel}
															native
															inputProps={{
																name: "age",
																id: "age-native-simple",
															}}
														>
															{" "}
															<option value="">Tous</option>
															{(!this.props.globalDataProfile.Produits && (
																<option>Loading..</option>
															)) ||
																this.props.globalDataProfile.Produits.filter(
																	(prd) => {
																		return prd.nomTypeProd === "MATERIEL";
																	}
																).map((mats) => (
																	<option value={mats.IDProduit}>
																		{mats.nom}
																	</option>
																))}
														</Select>
													</FormControl>
												</Typography>
											</Paper>
										</Grid>
										<Grid xs={12}>
											{" "}
											<BottomNavigation showLabels>
												{" "}
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.MatChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_OPPS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeMateriel
																)}
														</strong>
													}
													icon={
														<span>
															<ProduitIcon />
															Mat. Plein
														</span>
													}
												/>
												<BottomNavigationAction
													style={{ fontWeight: "bold" }}
													label={
														<strong
															className={
																!this.state.MatChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{(this.state.loadingTotaux_RESS && "Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.sortieMateriel
																)}
														</strong>
													}
													icon={
														<span>
															<ArgentIcon />
															Mat. Vide
														</span>
													}
												/>
												<BottomNavigationAction
													onDoubleClick={(e) => {
														navigator.clipboard.writeText(
															this.state.entreeMateriel -
																this.state.sortieMateriel
														);
													}}
													style={{
														backgroundColor: "#87ceeb",
														fontWeight: "bold",
													}}
													label={
														<strong
															className={
																!this.state.MatChange ? "" : "text-updated"
															}
															style={{ fontSize: "0.99rem" }}
														>
															{((this.state.loadingTotaux_RESS ||
																this.state.loadingTotaux_OPPS) &&
																"Calcule..") ||
																Intl.NumberFormat("fr-FR").format(
																	this.state.entreeMateriel -
																		this.state.sortieMateriel
																)}
														</strong>
													}
													icon={
														<span>
															<SoldeIcon />
															Solde Mat.
														</span>
													}
												/>
											</BottomNavigation>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>

					<Dialog
						fullScreen
						open={this.state.modalRapportOpen}
						onClose={(e) => {
							this.setState({ modalRapportOpen: false });
						}}
						TransitionComponent={Transition}
					>
						<AppBar className={" no-print "} style={{ position: "fixed" }}>
							<Toolbar>
								<IconButton
									edge="start"
									color="inherit"
									onClick={(e) => {
										this.setState({ modalRapportOpen: false });
									}}
									aria-label="close"
								>
									<CloseIcon />
								</IconButton>
								<Typography variant="h6" style={{ marginLeft: "2px", flex: 1 }}>
									Aperçu Rapport :{" "}
									{(this.props.nameFor !== "" &&
										typeof this.props.nameFor !== "undefined" &&
										this.props.nameFor !== "Tous" &&
										this.props.nameFor) ||
										"Total"}
								</Typography>
								<Button
									autoFocus
									color="inherit"
									onClick={(e) => {
										this.handleResetRapport();
										this.setState({ modalRapportOpen: false });
									}}
								>
									Vider
								</Button>
								<Button
									autoFocus
									color="inherit"
									onClick={this.handlePrintRappor}
								>
									Imprimer
								</Button>
								<Button
									autoFocus
									color="inherit"
									onClick={(e) => {
										this.setState({ modalRapportOpen: false });
									}}
								>
									Fermer
								</Button>
							</Toolbar>
						</AppBar>
						<div
							id="RapportDivToPrint"
							style={{ margin: "80px 70px 0px 70px" }}
						>
							{this.props.nameFor &&
								this.props.nameFor !== "" &&
								this.props.nameFor !== "Tous" && (
									<div id="RapportOne">
										{" "}
										<center>
											<h3>
												{ENTNAME}: Rapport {this.props.nameFor}
												<span
													className="float-right"
													style={{ float: "right" }}
												>
													<FaCalendarDay />{" "}
													{Moment()
														.locale("fr")
														.format("ddd, DD/MM/YYYY HH:mm")}
												</span>
											</h3>
										</center>
										<Row
											style={{
												display: "grid",
												gridTemplateColumns: "50% 50%",
												gridGap: "10px",
												//background: "#eee",
											}}
										>
											{this.state.rapport.length > 0 &&
												this.state.rapport.map((rpO, i) => {
													if (rpO.titre === "Montant") {
														return (
															<Col
																sm={6}
																style={{
																	borderBottom: "1px dashed white",
																	marginLeft: "20px",
																}}
																className="p-2 m-2"
															>
																<span
																	className="header-tab-rapport"
																	style={{
																		color: "black",
																		fontWeight: "bold",
																		fontSize: "12px",
																		margin: "3px",
																		padding: "3px",
																		marginLeft: 0,
																		marginBottom: 0,
																	}}
																>
																	Montant :{" "}
																	{rpO.typeProduit !== ""
																		? rpO.typeProduit
																		: " Tous produits "}{" "}
																	{rpO.payment !== ""
																		? " mode paiement " + rpO.payment
																		: "de Tous mode de paiement"}
																</span>
																<span
																	className="delete-line-rapport"
																	onClick={(e) => {
																		this.state.rapport.splice(i, 1);
																		this.setState({
																			rapport: this.state.rapport,
																		});
																	}}
																>
																	<FaTrash
																		color="red"
																		className="BTNTODELETE"
																	/>
																</span>

																<Table
																	className="td-rapport "
																	style={{
																		paddingTop: "7px",
																		fontWeight: "bold",
																		fontSize: "small",
																		width: "100%",
																	}}
																>
																	<thead>
																		<tr>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Entree
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Sortie
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Solde
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.sortie
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree - rpO.sortie
																				)}
																			</td>
																		</tr>
																	</tbody>
																</Table>
																<hr />
															</Col>
														);
													}
													if (rpO.titre === "Caisse") {
														return (
															<Col
																sm={6}
																style={{
																	borderBottom: "1px dashed white",
																	marginLeft: "20px",
																}}
																className="p-2 m-2"
															>
																<span
																	className="header-tab-rapport"
																	style={{
																		color: "black",
																		fontWeight: "bold",
																		fontSize: "12px",
																		margin: "3px",
																		padding: "3px",
																		marginLeft: 0,
																		marginBottom: 0,
																	}}
																>
																	Caisse :{" "}
																	{rpO.caisse !== ""
																		? rpO.caisse
																		: " Tous Caisses "}{" "}
																	{rpO.typeCaisse !== ""
																		? "de type " + rpO.typeCaisse
																		: "de Tous Types"}
																</span>
																<span
																	className="delete-line-rapport"
																	onClick={(e) => {
																		this.state.rapport.splice(i, 1);
																		this.setState({
																			rapport: this.state.rapport,
																		});
																	}}
																>
																	<FaTrash
																		color="red"
																		className="BTNTODELETE"
																	/>
																</span>

																<Table
																	className="td-rapport"
																	style={{
																		paddingTop: "7px",
																		fontWeight: "bold",
																		fontSize: "small",
																		width: "100%",
																	}}
																>
																	<thead>
																		<tr>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Entree
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Sortie
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Solde
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.sortie
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree - rpO.sortie
																				)}
																			</td>
																		</tr>
																	</tbody>
																</Table>
																<hr />
															</Col>
														);
													}
													if (rpO.titre === "Materiel") {
														return (
															<Col
																sm={6}
																style={{
																	borderBottom: "1px dashed white",
																	marginLeft: "20px",
																}}
																className="p-2 m-2"
															>
																<span
																	className="header-tab-rapport"
																	style={{
																		color: "black",
																		fontWeight: "bold",
																		fontSize: "12px",
																		margin: "3px",
																		padding: "3px",
																		marginLeft: 0,
																		marginBottom: 0,
																	}}
																>
																	Materiel :{" "}
																	{rpO.mat !== ""
																		? rpO.mat
																		: " Tous materiaux "}{" "}
																</span>
																<span
																	className="delete-line-rapport"
																	onClick={(e) => {
																		this.state.rapport.splice(i, 1);
																		this.setState({
																			rapport: this.state.rapport,
																		});
																	}}
																>
																	<FaTrash
																		color="red"
																		className="BTNTODELETE"
																	/>
																</span>

																<Table
																	className="td-rapport"
																	style={{
																		paddingTop: "7px",
																		fontWeight: "bold",
																		fontSize: "small",
																		width: "100%",
																	}}
																>
																	<thead>
																		<tr>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Entree
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Sortie
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Solde
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.sortie
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree - rpO.sortie
																				)}
																			</td>
																		</tr>
																	</tbody>
																</Table>
																<hr />
															</Col>
														);
													}
													if (rpO.titre === "Emballage") {
														return (
															<Col
																sm={6}
																style={{
																	borderBottom: "1px dashed white",
																	marginLeft: "20px",
																}}
																className="p-2 m-2"
															>
																<span
																	className="header-tab-rapport"
																	style={{
																		color: "black",
																		fontWeight: "bold",
																		fontSize: "12px",
																		margin: "3px",
																		padding: "3px",
																		marginLeft: 0,
																		marginBottom: 0,
																	}}
																>
																	Emballage :{" "}
																	{rpO.nomEmb !== ""
																		? rpO.nomEmb
																		: " Tous Emballages "}{" "}
																</span>{" "}
																<span
																	className="delete-line-rapport"
																	onClick={(e) => {
																		this.state.rapport.splice(i, 1);
																		this.setState({
																			rapport: this.state.rapport,
																		});
																	}}
																>
																	<FaTrash
																		color="red"
																		className="BTNTODELETE"
																	/>
																</span>
																<Table
																	className="td-rapport"
																	style={{
																		paddingTop: "7px",
																		fontWeight: "bold",
																		fontSize: "small",
																		width: "100%",
																	}}
																>
																	<thead>
																		<tr>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Entree
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Sortie
																			</th>
																			<th
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				Solde
																			</th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.sortie
																				)}
																			</td>
																			<td
																				style={{
																					border: "1px solid #000",
																					padding: "10px",
																					textAlign: "left",
																				}}
																			>
																				{Intl.NumberFormat("fr-FR").format(
																					rpO.entree - rpO.sortie
																				)}
																			</td>
																		</tr>
																	</tbody>
																</Table>
																<hr />
															</Col>
														);
													}
												})}
										</Row>
									</div>
								)}
							{(typeof this.props.nameFor === "undefined" ||
								this.props.nameFor === "" ||
								this.props.nameFor === "Tous") && (
								<div id="RapportALL">
									<Alert
										color="info"
										id="RapportLongAlert"
										className="no-print"
										hidden={this.state.rapportTot.length < 7}
									>
										<h5>Rapport large !</h5>
										<hr />
										Rapport trés large. Veuillez changer l'orientation de la
										page d'impression en "Paysage" pour garder les proportions
										correctes du rapport.
									</Alert>
									<center>
										<h3>
											{ENTNAME}: Rapport Total
											<span className="float-right" style={{ float: "right" }}>
												<FaCalendarDay />{" "}
												{Moment().locale("fr").format("ddd, DD/MM/YYYY HH:mm")}
											</span>{" "}
										</h3>
									</center>
									<Row>
										<Table
											className="td-rapport table-rapport-total"
											style={{ fontSize: "12px" }}
										>
											<thead>
												<tr>
													<th
														style={{
															border: "1px solid #000",
															padding: "10px",
															textAlign: "left",
														}}
													>
														fournisseurs
													</th>
													{this.state.rapportTot.length > 0 &&
														this.state.rapportTot.map((rt, i) => (
															<th
																style={{
																	border: "1px solid #000",
																	padding: "10px",
																	textAlign: "left",
																}}
															>
																{rt.type + " " + rt.koi.txt}

																<span
																	className="delete-line-rapport"
																	onClick={(e) => {
																		this.state.rapportTot.splice(i, 1);
																		this.setState({
																			rapportTot: this.state.rapportTot,
																		});
																	}}
																>
																	<FaTrash
																		color="red"
																		className="BTNTODELETE"
																	/>
																</span>
															</th>
														))}
												</tr>
											</thead>
											<tbody>
												{this.state.rapportTot.length > 0 &&
													this.state.listeNewFournis.map((frns, i) => (
														<tr>
															<td
																style={{
																	background: i % 2 === 0 ? "#a7a7a7" : "",
																	border: "1px solid #000",
																	padding: "3px",
																	textAlign: "left",
																}}
															>
																{this.props.globalGetIt(
																	this.props.globalDataProfile.Fournisseurs,
																	"IDFournisseurProd",
																	"nom",
																	frns.idf
																)}
															</td>
															{this.state.rapportTot.map((RT) => (
																<td
																	style={{
																		background: i % 2 === 0 ? "#a7a7a7" : "",
																		border: "1px solid #000",
																		padding: "3px",
																		textAlign: "left",
																	}}
																>
																	{(
																		parseInt(RT.koi.data.entree[i] || 0) -
																		parseInt(RT.koi.data.sortie[i] || 0)
																	).toLocaleString("fr")}
																</td>
															))}
														</tr>
													))}
											</tbody>
											<tfoot>
												<tr>
													<th
														style={{
															textAlign: "right",
															border: "1px solid #000",
															padding: "10px",
															textAlign: "left",
														}}
													>
														TOTAL
													</th>
													{this.state.rapportTot.map((RT) => (
														<th
															style={{
																border: "1px solid #000",
																padding: "10px",
																textAlign: "left",
															}}
														>
															{(
																RT.koi.data.entree.reduce((totIn, iin) => {
																	return totIn + parseInt(iin || 0);
																}, 0) -
																RT.koi.data.sortie.reduce((totOut, oout) => {
																	return totOut + parseInt(oout || 0);
																}, 0)
															).toLocaleString("fr")}
														</th>
													))}
												</tr>
											</tfoot>
										</Table>
									</Row>
								</div>
							)}
						</div>
					</Dialog>
					<Modal isOpen={this.state.preparingRapport}>
						<ModalHeader>Rapport</ModalHeader>
						<ModalBody>
							<strong>Préparation de rapport...</strong>
							<Spinner />
						</ModalBody>
					</Modal>
				</div>
			);
		}
	}
}

export default profileGeneral;
