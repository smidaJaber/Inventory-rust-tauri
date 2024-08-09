use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tablepointages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tablepointage {

pub idpointage: i32,

pub liste_pointage: String,

pub date_pointage: String,

pub nbr_personnel: i32,

pub montant: i32,

pub avance: i32,

pub lieutravail: String,

pub idcateg: String,

pub information: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tablepointages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTablepointage {


pub liste_pointage: String,

pub date_pointage: String,

pub nbr_personnel: i32,

pub montant: i32,

pub avance: i32,

pub lieutravail: String,

pub idcateg: String,

pub information: String,

pub iduser: i32,

}