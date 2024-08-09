use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::emballages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Emballage {

pub idemballage: i32,

pub nom: String,

pub poid: String,

pub type_emb: String,

pub composition: String,

pub information: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::emballages)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewEmballage {


pub nom: String,

pub poid: String,

pub type_emb: String,

pub composition: String,

pub information: String,

pub iduser: i32,

}