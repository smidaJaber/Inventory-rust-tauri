import React, { Component } from "react";
import {
	Row,
	Col,
	Button,
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

import ProfGeneral from "./profileSegments/general";
import ProfDetails from "./profileSegments/details";
import ProfRessources from "./profileSegments/ressources";
import ProfFacture from "./profileSegments/facture";
import ProfSoldeGeneral from "./profileSegments/soldeGeneral";

/* general // detail // resource // facturation  */
class profileFournisseur extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fournisseur: {},
			loading: false,
			activeTab: this.props.match.params.TAB,
			idFournisseur: this.props.match.params.id,
			detailsDe: "",
			configDetail: {},

			//select profile who
			suggs: [""],
			txtLienProfileFournisseur: "",
			fixedSuggs: [],
			IDFournisseur: this.props.match.params.id,
			nomFournisseur: "",
			doCalculate: this.props.match.params.CALC === "T",

			val: false,
		};

		this.toggleTtab = this.toggleTtab.bind(this);
		this.handleSetDetailsDe = this.handleSetDetailsDe.bind(this);
		this.getFournisseurs = this.getFournisseurs.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
		this.handleRefreshRessource = this.handleRefreshRessource.bind(this);
		this.getFournisseurEditMode = this.getFournisseurEditMode.bind(this);
		this.counter = this.counter.bind(this);
	}
	componentDidMount() {
		this.setState({
			idFournisseur: this.props.match.params.id,
			activeTab: this.props.match.params.TAB,
		});
		this.getFournisseurByID(this.state.idFournisseur);
		this.getFournisseurs();
	}
	counter() {
		this.setState({ val: true });
	}

	handleRefresh(nom, id) {
		this.getFournisseurs();
		id = parseInt(id) === 0 ? "tous" : id;
		//this.setState({ nomFournisseur: nom, IDFournisseur: id });
		let tab = this.state.activeTab === "2" ? "1" : this.state.activeTab;
		//	window.location.href =
		//		"/fournisseur/profile/" + (id || "tous") + "/" + tab + "/T";
		//this.toggleTtab("3");

		this.setState(
			{
				doCalculate: true,
				idFournisseur: id,
				activeTab: tab,
			},
			() => {
				this.refs.refModuleProfDetails.setcle();
				this.refs.refModuleProfGeneral.setcle();
				this.refs.refModuleProfGeneral.getGlobalTotaux(id);
				window.history.replaceState(
					"",
					"",
					"/fournisseur/profile/" + (id || "tous") + "/" + tab + "/T"
				);
			}
		);
	}

	handleRefreshRessource() {
		this.refs.refModuleProfileRessource.getRessourceByIDFournisseur();
	}
	toggleTtab(tab) {
		let id =
			parseInt(this.state.idFournisseur) === 0
				? "tous"
				: this.state.idFournisseur;
		this.setState({ activeTab: tab }, () => {
			window.history.replaceState(
				"",
				"",
				"/fournisseur/profile/" + id + "/" + tab + "/T"
			);
		});
	}
	getFournisseurs() {
		if (this.props.globalData.Fournisseurs) {
			let TabNomID = this.state.suggs;
			this.props.globalData.Fournisseurs.map((frnsr) => {
				TabNomID.push(frnsr.nom + "|" + frnsr.IDFournisseurProd);
			});

			this.setState({
				fournisseurs: this.props.globalData.Fournisseurs,
				fixedSuggs: this.props.globalData.Fournisseurs,
				suggs: TabNomID,
				fixedSuggs: TabNomID,
			});
		}

		/*
		fetch("/api/mariem/fournisseurs")
			.then((res) => res.json())
			.then((fournisseurs) => {
				this.setState({ fournisseurs, fixedSuggs: fournisseurs }, () =>
					console.log("fournisseurs fetched...", fournisseurs)
				);
				fournisseurs.map((frnsr, i) => {
					this.setState({
						suggs: [
							...this.state.suggs,
							frnsr.nom + "|" + frnsr.IDFournisseurProd,
						],
						fixedSuggs: [
							...this.state.suggs,
							frnsr.nom + "|" + frnsr.IDFournisseurProd,
						],
					});
				});
			});*/
	}
	getFournisseurByID(ID) {
		if (this.props.globalData.Fournisseurs) {
			const result = this.props.globalData.Fournisseurs.filter((fr) => {
				return parseInt(fr.IDFournisseurProd) === parseInt(ID);
			});
			this.setState({
				fournisseur: result[0] ? result[0] : [],
				IDFournisseur: result[0] ? result[0].IDFournisseurProd : "0",
				nomFournisseur: result[0] ? result[0].nom : "Tous",
				txtLienProfileFournisseur: result[0] ? result[0].nom : "Tous",
			});
		}
		/*
		fetch("/api/mariem/fournisseurs/" + ID, { method: "GET" })
			.then((res) => res.json())
			.then((fournisseur) => {
				this.setState({
					fournisseur: fournisseur,
					IDFournisseur: fournisseur.IDFournisseurProd,
					nomFournisseur: fournisseur.nom,
					txtLienProfileFournisseur: fournisseur.nom,
					loading: false,
				});
			});
			*/
		//this.refs.refModuleProfileRessource.getRessourceByID(ID);
	}
	getFournisseurEditMode(ID, nom) {
		//get nom fournisseur
		this.setState({ suggs: this.state.fixedSuggs });
		fetch("/api/mariem/getit/fournisseur/IDFournisseurProd/nom/" + ID)
			.then((res) => res.json())
			.then((fournisseur) => {
				this.setState({
					IDFournisseur: ID,
					nomFournisseur: fournisseur.nom,
					txtLienProfileFournisseur: fournisseur.nom,
					idFournisseur: ID,
				});
			});
	}
	handleSetDetailsDe(txt, objRech) {
		this.setState(
			{ detailsDe: txt, activeTab: "2", configDetail: objRech },
			() => {
				this.toggleTtab("2");
			}
		);
		this.refs.refModuleProfDetails.getOpps(txt, objRech);
		//alert(JSON.stringify(objRech));
	}
	shouldComponentUpdate(nextID) {
		const diffIDFournisseur = this.state.IDFournisseur !== nextID;
		return diffIDFournisseur;
	}
	render() {
		return (
			(this.state.loading && <h3>Loading ..</h3>) ||
			(!this.state.loading && (
				<div className={"bg-" + this.props.THEME.color}>
					<div
						className={
							"profile-Header   no-print bg-" +
							this.props.THEME.color +
							" " +
							(this.props.THEME.color === "dark" ? this.props.THEME.text : "")
						}
					>
						<Row>
							<Col sm={6}>
								<label>
									<h2> ACHAT: </h2>
								</label>
								<Label for="nomFournisseur">
									{this.state.IDFournisseur !== "" &&
										this.state.IDFournisseur !== "-1" && (
											<Link
												className="lien-profile"
												to={`/fournisseur/profile/${this.state.IDFournisseur}/1/T`}
											>
												Profile {this.state.txtLienProfileFournisseur}
											</Link>
										)}
								</Label>
							</Col>
							<Col sm={3}>
								<FormGroup row>
									<Col>
										<Input
											type="text"
											value={this.state.nomFournisseur}
											onChange={(e) => {
												this.setState(
													{
														nomFournisseur: e.currentTarget.value,
														suggs: this.state.fixedSuggs.filter(
															(suggestion) =>
																suggestion
																	.toLowerCase()
																	.indexOf(
																		e.currentTarget.value.toLowerCase()
																	) > -1
														),
													},
													() => {
														let fourn = this.state.suggs[0] || "|-1";
														fourn = fourn.split("|");
														let text = fourn[0];
														fourn = fourn[1];
														this.setState(
															{
																IDFournisseur: fourn,
																idFournisseur: fourn,
																txtLienProfileFournisseur: text,
															},
															() => {
																this.refs.refModuleProfileRessource.setnvIDFournisseur(
																	fourn
																);
																this.refs.refModuleProfileFacture.setnvIDFournisseur(
																	fourn
																);
															}
														);
													}
												);
											}}
										/>
										<Input
											type="select"
											value={this.state.IDFournisseur}
											onChange={(e) => {
												let IDF = e.currentTarget.value;
												this.setState(
													{
														IDFournisseur: e.target.value,
														idFournisseur: e.target.value,
														txtLienProfileFournisseur:
															e.currentTarget.selectedOptions[0].text,
														nomFournisseur:
															e.currentTarget.selectedOptions[0].text,
													},
													() => {
														this.refs.refModuleProfileRessource.setnvIDFournisseur(
															IDF
														);
														this.refs.refModuleProfileFacture.setnvIDFournisseur(
															IDF
														);
														this.refs.refModuleProfGeneral.handleResetRapport();
													}
												);
											}}
										>
											{this.state.suggs.map((sugg, indx) => {
												let CH = sugg.split("|");
												let txt = CH[0];

												let ID = CH[1];
												/*
											if (this.state.suggs.length === 1) {
												if (ID) {
													this.setState({ IDFournisseur: ID });
												}
											}*/

												return (
													<option
														key={"suggListe" + indx}
														onClick={(e) => {
															this.setState(
																{
																	txtLienProfileFournisseur: txt,
																	IDFournisseur: e.target.value,
																	idFournisseur: e.target.value,
																	nomFournisseur: txt,
																},
																() => {
																	this.refs.refModuleProfileFacture.getFactures();
																	this.refs.refModuleProfileFacture.handleReset();
																}
															);
														}}
														value={ID || "tous"}
													>
														{txt || "Tous"}
													</option>
												);
											})}
										</Input>
										<Button
											color="primary"
											onClick={(e) => {
												this.handleRefresh("", this.state.IDFournisseur);
											}}
										>
											Recherche
										</Button>
									</Col>
								</FormGroup>
							</Col>
						</Row>

						<Nav
							className={
								this.props.THEME.color === "dark" ? "border-primary" : ""
							}
						>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "1",
									})}
									onClick={() => {
										this.toggleTtab("1");
									}}
								>
									General
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "2",
									})}
									onClick={() => {
										this.toggleTtab("2");
									}}
								>
									Détails
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "3",
									})}
									onClick={() => {
										this.toggleTtab("3");
									}}
								>
									Resources
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "4",
									})}
									onClick={() => {
										this.toggleTtab("4");
									}}
								>
									Facturation
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink
									className={classnames({
										active: this.state.activeTab === "5",
									})}
									onClick={() => {
										this.toggleTtab("5");
									}}
								>
									Solde Général
								</NavLink>
							</NavItem>
						</Nav>
					</div>

					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ProfGeneral
								key="oijdsiuhyby1"
								globalGetIt={this.props.globalGetIt}
								setGlobalData={this.props.setGlobalData}
								globalData={this.props.globalData}
								printtable={this.props.printtable}
								THEME={this.props.THEME}
								currentUser={this.props.currentUser}
								ref="refModuleProfGeneral"
								idFournisseur={this.state.idFournisseur}
								stop={this.state.val}
								counter={this.counter}
								setDetailsDe={this.handleSetDetailsDe}
								activeTab={this.state.activeTab}
								nameFor={this.state.nomFournisseur}
								doCalculate={this.state.doCalculate}
								visibilityCheck={this.props.visibilityCheck}
							/>
						</TabPane>
						<TabPane tabId="2">
							<ProfDetails
								key="oijdsiuhyby2"
								globalGetIt={this.props.globalGetIt}
								globalData={this.props.globalData}
								printtable={this.props.printtable}
								setGlobalData={this.props.setGlobalData}
								THEME={this.props.THEME}
								currentUser={this.props.currentUser}
								idFournisseur={this.state.idFournisseur}
								detailsDe={this.state.detailsDe}
								config={this.state.configDetail}
								ref="refModuleProfDetails"
								activeTab={this.state.activeTab}
								visibilityCheck={this.props.visibilityCheck}
							/>
						</TabPane>
						<TabPane tabId="3">
							<ProfRessources
								key="oijdsiuhyby3"
								globalGetIt={this.props.globalGetIt}
								globalData={this.props.globalData}
								printtable={this.props.printtable}
								setGlobalData={this.props.setGlobalData}
								THEME={this.props.THEME}
								currentUser={this.props.currentUser}
								activeTabNow={this.state.activeTab}
								ref="refModuleProfileRessource"
								nomFournisseur={this.state.nomFournisseur}
								idFournisseur={this.state.idFournisseur}
								refreshListeFournisseur={this.handleRefresh}
								editModeFournisseurDetails={this.getFournisseurEditMode}
								IDFournisseurOnEdit={this.state.IDFournisseur}
								visibilityCheck={this.props.visibilityCheck}
							/>
						</TabPane>
						<TabPane tabId="4">
							<ProfFacture
								key="oijdsiuhyby4"
								globalGetIt={this.props.globalGetIt}
								globalData={this.props.globalData}
								printtable={this.props.printtable}
								setGlobalData={this.props.setGlobalData}
								THEME={this.props.THEME}
								currentUser={this.props.currentUser}
								ref="refModuleProfileFacture"
								nomFournisseur={this.state.nomFournisseur}
								idFournisseur={this.state.idFournisseur}
								IDFournisseurOnEdit={this.state.IDFournisseur}
								currentTab={this.state.activeTab}
								refreshRessource={this.handleRefreshRessource}
								visibilityCheck={this.props.visibilityCheck}
							/>
						</TabPane>
						<TabPane tabId="5">
							<ProfSoldeGeneral
								key="oijddzefzezdg4"
								globalGetIt={this.props.globalGetIt}
								globalData={this.props.globalData}
								printtable={this.props.printtable}
								setGlobalData={this.props.setGlobalData}
								THEME={this.props.THEME}
								currentUser={this.props.currentUser}
								ref="refModuleProfGeneral"
								nomFournisseur={this.state.nomFournisseur}
								idFournisseur={this.state.idFournisseur}
								IDFournisseurOnEdit={this.state.IDFournisseur}
								currentTab={this.state.activeTab}
								refreshRessource={this.handleRefreshRessource}
								visibilityCheck={this.props.visibilityCheck}
							/>
						</TabPane>
					</TabContent>
				</div>
			))
		);
	}
}

export default profileFournisseur;
