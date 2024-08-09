use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::locals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Local {

pub idlocal: i32,

pub section: String,

pub adresse: String,

pub information: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::locals)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewLocal {


pub section: String,

pub adresse: String,

pub information: String,

pub iduser: i32,

}