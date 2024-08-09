import {
	ProduitType,
	ProfileCardSelectedValue,
	ProfileRapport,
	ProfileViewMode,
	SelectedTous,
} from "../typings";
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
	Fournisseur,
	Tableressourceachat,
	Tableressourcevente,
} from "../bindings";
const profileSlice = createSlice({
	name: "profile",
	initialState: {
		selectedProduit: {
			selectedType: "tous",
			selectedValue: "tous",
		} as ProfileCardSelectedValue,
		selectedCaisse: {
			selectedType: "tous",
			selectedValue: "tous",
		} as ProfileCardSelectedValue,
		selectedEmballage: {
			selectedType: "tous",
			selectedValue: "tous",
		} as ProfileCardSelectedValue,
		selectedMAteriel: {
			selectedType: "tous",
			selectedValue: "tous",
		} as ProfileCardSelectedValue,
		rapport: [] as ProfileRapport[],
		listRessourceAchat: [] as Tableressourceachat[],
		listRessourceVente: [] as Tableressourcevente[],
		listFournisseur: [] as Fournisseur[],
		activeProfile: "tous" as SelectedTous | number,
		activeProfileView: "general" as ProfileViewMode,
	},
	reducers: {
		initialize(state, action: PayloadAction<any>) {},
		setSelectedProduit(state, action: PayloadAction<ProfileCardSelectedValue>) {
			state.selectedProduit = action.payload;
		},
		setSelectedCaisse(state, action: PayloadAction<ProfileCardSelectedValue>) {
			state.selectedCaisse = action.payload;
		},
		setSelectedEmballage(
			state,
			action: PayloadAction<ProfileCardSelectedValue>
		) {
			state.selectedEmballage = action.payload;
		},
		setSelectedMAteriel(
			state,
			action: PayloadAction<ProfileCardSelectedValue>
		) {
			state.selectedMAteriel = action.payload;
		},
		setListRessourceVent(state, action: PayloadAction<Tableressourcevente[]>) {
			state.listRessourceVente = action.payload;
		},
		setListFournisseu(state, action: PayloadAction<Fournisseur[]>) {
			state.listFournisseur = action.payload;
		},
		setActiveProfil(state, action: PayloadAction<SelectedTous | number>) {
			state.activeProfile = action.payload;
		},
		setActiveProfileView(state, action: PayloadAction<ProfileViewMode>) {
			state.activeProfileView = action.payload;
		},
	},
});

export const profileActions = profileSlice.actions;
export const profileStore = configureStore({
	reducer: profileSlice.reducer,
});

export type ProfileStoreState = ReturnType<typeof profileStore.getState>;
export type ProfileStoreActions = typeof profileStore.dispatch;

export const useProfileStoreValue: TypedUseSelectorHook<ProfileStoreState> =
	useSelector;
