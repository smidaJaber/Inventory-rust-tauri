use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::documents)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Document {

pub iddoc: i32,

pub code: String,

pub reference: String,

pub revision: String,

pub audit: String,

pub information: String,

pub date_creation: String,

pub url: String,

pub iduser: i32,

pub setting_for: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::documents)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewDocument {


pub code: String,

pub reference: String,

pub revision: String,

pub audit: String,

pub information: String,

pub date_creation: String,

pub url: String,

pub iduser: i32,

pub setting_for: String,

}