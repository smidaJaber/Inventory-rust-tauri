use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tablefactureavoirs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tablefactureavoir {

pub idfact_avoir: i32,

pub idfact: i32,

pub idclient: i32,

pub type_produit: String,

pub montant: i32,

pub reference_doc: i32,

pub information: String,

pub iduser: i32,

pub date_facture_avoir: String,

pub idcateg: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tablefactureavoirs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTablefactureavoir {


pub idfact: i32,

pub idclient: i32,

pub type_produit: String,

pub montant: i32,

pub reference_doc: i32,

pub information: String,

pub iduser: i32,

pub date_facture_avoir: String,

pub idcateg: i32,

}