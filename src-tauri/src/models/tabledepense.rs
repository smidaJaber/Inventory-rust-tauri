use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tabledepenses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tabledepense {

pub iddepense: i32,

pub idtype_depense: i32,

pub montant: i32,

pub idcateg: i32,

pub information: String,

pub date_depense: String,

pub document: i32,

pub numero: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tabledepenses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTabledepense {


pub idtype_depense: i32,

pub montant: i32,

pub idcateg: i32,

pub information: String,

pub date_depense: String,

pub document: i32,

pub numero: String,

pub iduser: i32,

}