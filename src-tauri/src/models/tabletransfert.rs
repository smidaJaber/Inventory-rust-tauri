use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tabletransferts)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tabletransfert {

pub idtransfert: i32,

pub de: i32,

pub a: i32,

pub nbr_caisse: i32,

pub type_caisse: i32,

pub nbr_cn: i32,

pub nbr_cs: i32,

pub nbr_ca: i32,

pub qte_net: i32,

pub produit: i32,

pub nbr_matriel: i32,

pub matriel: i32,

pub idemballage: i32,

pub nbr_emb: i32,

pub nbr_cov: i32,

pub nbr_fond: i32,

pub information: String,

pub date_transfer: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tabletransferts)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTabletransfert {


pub de: i32,

pub a: i32,

pub nbr_caisse: i32,

pub type_caisse: i32,

pub nbr_cn: i32,

pub nbr_cs: i32,

pub nbr_ca: i32,

pub qte_net: i32,

pub produit: i32,

pub nbr_matriel: i32,

pub matriel: i32,

pub idemballage: i32,

pub nbr_emb: i32,

pub nbr_cov: i32,

pub nbr_fond: i32,

pub information: String,

pub date_transfer: String,

pub iduser: i32,

}