use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::lieustockages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Lieustockage {

pub idlieu_stockage: i32,

pub nom: String,

pub information: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::lieustockages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewLieustockage {


pub nom: String,

pub information: String,

pub iduser: i32,

}