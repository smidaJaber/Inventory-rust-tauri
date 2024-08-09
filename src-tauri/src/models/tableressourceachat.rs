use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize, Debug)]
#[diesel(table_name = crate::schema::tableressourceachats)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tableressourceachat {
    pub idres_achat: i32,

    pub idfornisseur: i32,

    pub montant: i32,

    pub type_paiement: i32,

    pub nbr_cs: i32,

    pub nbr_cn: i32,

    pub nbr_ca: i32,

    pub type_caisse: i32,

    pub nbr_matriel: i32,

    pub type_matriel: i32,

    pub emballage: i32,

    pub nbr_emb: i32,

    pub nbr_cov: i32,

    pub nbr_fon: i32,

    pub information: String,

    pub date_ressource_achat: String,

    pub lieu_stock: i32,

    pub iddoc: i32,

    pub iduser: i32,
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tableressourceachats)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTableressourceachat {
    pub idfornisseur: i32,

    pub montant: i32,

    pub type_paiement: i32,

    pub nbr_cs: i32,

    pub nbr_cn: i32,

    pub nbr_ca: i32,

    pub type_caisse: i32,

    pub nbr_matriel: i32,

    pub type_matriel: i32,

    pub emballage: i32,

    pub nbr_emb: i32,

    pub nbr_cov: i32,

    pub nbr_fon: i32,

    pub information: String,

    pub date_ressource_achat: String,

    pub lieu_stock: i32,

    pub iddoc: i32,

    pub iduser: i32,
}
