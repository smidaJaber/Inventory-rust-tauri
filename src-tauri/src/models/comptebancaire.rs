use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::comptebancaires)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Comptebancaire {

pub idcompte: i32,

pub nom_banque: String,

pub iban: String,

pub rib: String,

pub swift: String,

pub iduser: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::comptebancaires)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewComptebancaire {


pub nom_banque: String,

pub iban: String,

pub rib: String,

pub swift: String,

pub iduser: String,

}