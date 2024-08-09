use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tablearchivedocs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tablearchivedoc {

pub idarch_doc: i32,

pub iddocument: i32,

pub url: String,

pub fichier: String,

pub datecreation: String,

pub commentaire: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tablearchivedocs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTablearchivedoc {


pub iddocument: i32,

pub url: String,

pub fichier: String,

pub datecreation: String,

pub commentaire: String,

pub iduser: i32,

}