use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::produits)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Produit {

pub idproduit: i32,

pub nom: String,

pub idtype_prod: i32,

pub nom_type_prod: String,

pub commentaire: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::produits)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewProduit {


pub nom: String,

pub idtype_prod: i32,

pub nom_type_prod: String,

pub commentaire: String,

pub iduser: i32,

}