use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tableventes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tablevente {

pub idvente: i32,

pub idclient: i32,

pub type_caisse: i32,

pub nbr_caisse: i32,

pub nbr_cs: i32,

pub nbr_cn: i32,

pub nbr_ca: i32,

pub matriel1: i32,

pub nbr_m1: i32,

pub matriel2: i32,

pub nbr_m2: i32,

pub emballage: i32,

pub nbr_emballage: i32,

pub nbr_cov: i32,

pub nbr_fon: i32,

pub matiere_principale: i32,

pub qte_brut: i32,

pub qte_net: i32,

pub prix_unit: i32,

pub montant: i32,

pub date_vente: String,

pub observation: String,

pub num_fact: i32,

pub idbon_reclam: i32,

pub idbon_recp: i32,

pub idbon_entree: i32,

pub idcateg: i32,

pub iduser: i32,

pub type_produit: i32,

pub lieu_stock: i32,

pub selected: String,

pub num_lot: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tableventes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTablevente {


pub idclient: i32,

pub type_caisse: i32,

pub nbr_caisse: i32,

pub nbr_cs: i32,

pub nbr_cn: i32,

pub nbr_ca: i32,

pub matriel1: i32,

pub nbr_m1: i32,

pub matriel2: i32,

pub nbr_m2: i32,

pub emballage: i32,

pub nbr_emballage: i32,

pub nbr_cov: i32,

pub nbr_fon: i32,

pub matiere_principale: i32,

pub qte_brut: i32,

pub qte_net: i32,

pub prix_unit: i32,

pub montant: i32,

pub date_vente: String,

pub observation: String,

pub num_fact: i32,

pub idbon_reclam: i32,

pub idbon_recp: i32,

pub idbon_entree: i32,

pub idcateg: i32,

pub iduser: i32,

pub type_produit: i32,

pub lieu_stock: i32,

pub selected: String,

pub num_lot: String,

}