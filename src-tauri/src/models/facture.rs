use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::factures)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Facture {

pub idfact: i32,

pub numero: i32,

pub iddoc: i32,

pub idclient: i32,

pub type_fact: String,

pub date_facture: String,

pub op1: i32,

pub op2: i32,

pub op3: i32,

pub op4: i32,

pub op5: i32,

pub op6: i32,

pub op7: i32,

pub op8: i32,

pub op9: i32,

pub op10: i32,

pub information: String,

pub idbon_rec: i32,

pub numero_bon_rec: i32,

pub idbon_com: i32,

pub numero_bon_com: i32,

pub idbon_con: i32,

pub numero_bon_con: i32,

pub iduser: i32,

pub identreprise: i32,

pub liste_idopps: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::factures)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewFacture {


pub numero: i32,

pub iddoc: i32,

pub idclient: i32,

pub type_fact: String,

pub date_facture: String,

pub op1: i32,

pub op2: i32,

pub op3: i32,

pub op4: i32,

pub op5: i32,

pub op6: i32,

pub op7: i32,

pub op8: i32,

pub op9: i32,

pub op10: i32,

pub information: String,

pub idbon_rec: i32,

pub numero_bon_rec: i32,

pub idbon_com: i32,

pub numero_bon_com: i32,

pub idbon_con: i32,

pub numero_bon_con: i32,

pub iduser: i32,

pub identreprise: i32,

pub liste_idopps: String,

}