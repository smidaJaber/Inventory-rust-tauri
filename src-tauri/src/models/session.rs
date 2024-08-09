use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::sessions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Session {

pub idsession: i32,

pub expires: i32,

pub data: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::sessions)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewSession {


pub expires: i32,

pub data: String,

}