import React, { Component } from "react";
import Moment from "moment";
class modelAvoir extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingFact: false,
			loadingOpps: false,
			loadingNomFournisseur: false,
			loadingNomCategorie: false,
			loadingNomLieuStock: false,
			loadingNomProduit: false,
			loadingNomMat1: false,
			loadingNomMat2: false,
			loadingNomEmballage: false,
			loadingNomCaisse: false,
			numero: "",
			IDfact: "",
			IDClient: "",
			typeProduit: "",
			montant: "",
			referenceDoc: "",
			information: "",
			IDUser: "",

			date: "",
			IDCateg: "",
			IDEntreprise: "",
			banque: "",
			banqueDet: "",
			entrepriseDet: "",
			destinateurDet: "",
			referenceDoc: "",
			url: "",
			LoadinglisteTypePaiement: false,
			loadingALL: false,
		};
		this.handleOpenFolder = this.handleOpenFolder.bind(this);
	}

	componentDidMount() {
		this.getFactureAvoirByID();
	}

	printDone() {
		this.setState({ loadingALL: true });
		fetch("/api/mariem/printFacture/avoir", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: this.state.numero,
				IDfact: this.state.IDfact,
				IDClient: this.state.IDClient,
				typeProduit: this.state.typeProduit,
				montant: this.state.montant,
				referenceDoc: this.state.referenceDoc,
				information: this.state.information,
				IDUser: this.state.IDUser,

				date: Moment(this.state.date).format("YYYY-MM-DD"),
				IDCateg: this.state.IDCateg,
				IDEntreprise: this.state.IDEntreprise,
				banque: this.state.banque,
				banqueDet: this.state.banqueDet,
				entrepriseDet: this.state.entrepriseDet,
				destinateurDet: this.state.destinateurDet,
				refDesignation: this.state.referenceDoc,
				referenceDoc:
					this.state.dataFactAvoir.code +
					"-" +
					this.state.dataFactAvoir.reference +
					"-" +
					this.state.dataFactAvoir.revision,
				url: this.state.dataFactAvoir.url,
			}),
		})
			.then((res) => res.json())
			.then((printed) => {
				this.handleOpenFolder(printed.link, printed.fname);
			});
	}
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
				this.setState({ loadingALL: false, linkdata: resfile.link64 }, () => {
					let btn = document.createElement("a");
					btn.download = name;
					btn.href = resfile.link64;
					btn.click();
				});
			});
	}
	getEntreprise() {
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				fetch("/api/mariem/entreprises/" + setts[0].IDEntreprise)
					.then((res) => res.json())
					.then((Entreprises) =>
						this.setState({ entrepriseDet: Entreprises }, () => {
							this.getDestinateur(this.state.IDClient);
						})
					);
			});
	}
	getBanqueByID(ID) {
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				fetch("/api/mariem/CompteBancaires/" + setts[0].IDCompte)
					.then((res) => res.json())
					.then((CompteBancaires) =>
						this.setState({ banqueDet: CompteBancaires }, this.getEntreprise)
					);
			});
	}
	getInfoDoc(ID) {
		this.setState({ loadingParams: true });
		fetch("/api/mariem/settings")
			.then((res) => res.json())
			.then((setts) => {
				this.setState({ settings: setts[0], loadingParams: false }, () => {
					fetch("/api/mariem/documents/" + setts[0].IDDocAvoir)
						.then((res) => res.json())
						.then((docIE) => {
							this.setState({ dataFactAvoir: docIE }, () => {
								this.getBanqueByID(this.state.settings.IDCompte);
							});
						});
				});
			});
	}

	getDestinateur(ID) {
		fetch("/api/mariem/fournisseurs/" + ID)
			.then((res) => res.json())
			.then((fournisseurs) =>
				this.setState(
					{ destinateurDet: fournisseurs, loadingOpps: false },
					this.printDone
				)
			);
	}

	getFactureAvoirByID() {
		this.setState({ loadingFact: true });

		fetch("/api/mariem/Factures/avoir/" + this.props.match.params.id)
			.then((res) => res.json())
			.then((ORA) => {
				this.setState(
					{
						numero: ORA.IDFactAvoir,
						IDfact: ORA.IDfact,
						IDClient: ORA.IDClient,
						typeProduit: ORA.typeProduit,
						montant: ORA.montant,
						referenceDoc: ORA.referenceDoc,
						information: ORA.information,
						IDUser: ORA.IDUser,

						date: Moment(ORA.date).format("YYYY-MM-DD"),
						IDCateg: ORA.IDCateg,
						//liste opps
					},
					() => {
						this.setState({ loadingFact: false });
						this.getInfoDoc(this.state.IDfact);
					}
				);
			})

			.then((rs) => {
				//window.print();
			});
	}
	render() {
		return (
			<strong>
				Veuilelz imprimer la facture depuis Excel.
				<a
					href="#retour"
					onClick={(e) => {
						window.history.back();
					}}
				>
					Retour
				</a>
			</strong>
		);
	}
}

export default modelAvoir;
