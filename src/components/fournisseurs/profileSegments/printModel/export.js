import React, { Component } from "react";
import Moment from "moment";
import { Fragment } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
class modelExport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenPreparingFacture: false,
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
			numero: 0,
			IDDoc: 0,
			IDClient: 0,
			typeFact: "",
			date: "",
			//liste opps
			oppsListe: [],
			information: "",
			IDBonRec: "",
			numeroBonRec: 0,
			IDBonCom: "",
			numeroBonCom: 0,
			IDBonCon: "",
			numeroBonCon: 0,
			IDUser: "",
			IDEntreprise: "",
			Modepaiement: "",
			incoterm: "",
			ibanRib: "",
			banque: "",
			listOppsInFacture: [],
			listIDs: "",
			listeIDOpps: [],

			banqueDet: {
				nom: "",
				IBAN: "",
				swift: "",
				paysOrigin: "",
				paysDest: "",
			},
			entrepriseDet: {
				nom: "",
				adresse: "",
				tel: "",
				fax: "",
				mail: "",
				matricule: "",
				information: "",
			},
			destinateurDet: {
				nom: "",
				adresse: "",
				pays: "",
			},
			autreDet: {
				numClient: "",
				refDevis: "",
				modeLivraison: "",
				modePayement: "",
				devis: "",
			},
			opperations: [],
			LoadinglisteTypePaiement: false,
			loadingALL: false,
			dataFactIMPEXP: [],
		};
		this.handleOpenFolder = this.handleOpenFolder.bind(this);
	}

	componentDidMount() {
		this.getFactureExportByID();
	}

	printDone() {
		this.setState({ loadingALL: true });
		fetch("/api/mariem/printFacture/export", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numero: this.state.numero,
				IDDoc: this.state.IDDoc,
				IDClient: this.state.IDClient,
				typeFact: this.state.typeFact,
				date: this.state.date,
				information: this.state.information,
				IDBonRec: this.state.IDBonRec,
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
				banqueDet: this.state.banqueDet,
				entrepriseDet: this.state.entrepriseDet,
				destinateurDet: this.state.destinateurDet,
				autreDet: this.state.autreDet,
				opperations: this.state.opperations,
				referenceDoc:
					this.state.dataFactIMPEXP.code +
					"-" +
					this.state.dataFactIMPEXP.reference +
					"-" +
					this.state.dataFactIMPEXP.revision,
				url: this.state.dataFactIMPEXP.url,
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
				this.setState(
					{
						loadingALL: false,
						linkdata: resfile.link64,
						isOpenPreparingFacture: false,
					},
					() => {
						let btn = document.createElement("a");
						btn.download = name;
						btn.href = resfile.link64;
						btn.click();
					}
				);
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
				fetch("/api/mariem/documents/" + setts[0].IDDocIMPEXP)
					.then((res) => res.json())
					.then((docIE) => {
						this.setState({ dataFactIMPEXP: docIE }, () => {
							this.getBanqueByID(this.state.banque);
						});
					});
			});
	}

	getDestinateur(ID) {
		fetch("/api/mariem/fournisseurs/" + ID)
			.then((res) => res.json())
			.then((fournisseurs) =>
				this.setState({ destinateurDet: fournisseurs }, () => {
					this.getOpps(this.state.listOppsInFacture.toString());
				})
			);
	}
	getOpps(listIDs) {
		let opps = listIDs.split(",");

		let resultsSetFacturee = opps.map((idOpp) => {
			return fetch("/api/mariem/oppsAchat/" + idOpp)
				.then((res) => res.json())
				.then(async (OA) => {
					return OA;
				});
		});
		Promise.all(resultsSetFacturee)
			.then((resSetFacts) => {
				this.setState({ opperations: resSetFacts });
			})
			.then((rr) => {
				this.printDone();
				this.setState({ loadingOpps: false });
			})

			.catch((e) => {
				this.setState({ loadingOpps: false });
				console.log(e);
			});
		this.setState({ loadingOpps: false });
	}
	getFactureExportByID() {
		this.setState({ loadingFact: true, isOpenPreparingFacture: true });

		fetch("/api/mariem/Factures/export/" + this.props.match.params.id)
			.then((res) => res.json())
			.then((ORA) => {
				this.setState(
					{
						numero: ORA.numero,
						IDDoc: ORA.IDDoc,
						IDClient: ORA.IDClient,
						typeFact: ORA.typeFact,
						date: Moment(ORA.date).format("YYYY-MM-DD"),
						//liste opps
						oppsListe: [],
						information: ORA.information,
						IDBonRec: ORA.IDBonRec,
						numeroBonRec: ORA.numeroBonRec,
						IDBonCom: ORA.IDBonCom,
						numeroBonCom: ORA.numeroBonCom,
						IDBonCon: ORA.IDBonCon,
						numeroBonCon: ORA.numeroBonCon,
						IDUser: ORA.IDUser,
						IDEntreprise: ORA.IDEntreprise,
						Modepaiement: ORA.Modepaiement,
						incoterm: ORA.modeLivraison,
						ibanRib: ORA.ibanRib,
						banque: ORA.banque,
						listOppsInFacture: ORA.listeIDOpps,
					},
					() => {
						this.setState({ loadingFact: false });
						this.getInfoDoc(this.state.IDDoc);
					}
				);
			})

			.then((rs) => {
				//window.print();
			});
	}
	render() {
		return (
			<Fragment>
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
				<Modal isOpen={this.state.isOpenPreparingFacture} className="pt-4 mt-4">
					<ModalHeader>Facture EXP/IMP Fournisseur</ModalHeader>
					<ModalBody>
						<h5>
							Préparation de la facture..
							<Spinner />
						</h5>
					</ModalBody>
				</Modal>
			</Fragment>
		);
	}
}

export default modelExport;
