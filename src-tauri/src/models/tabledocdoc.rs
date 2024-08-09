use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::tabledocdocs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Tabledocdoc {

pub iddoc_doc: i32,

pub numero: i32,

pub reference: String,

pub iddoc: i32,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::tabledocdocs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewTabledocdoc {


pub numero: i32,

pub reference: String,

pub iddoc: i32,

pub iduser: i32,

}