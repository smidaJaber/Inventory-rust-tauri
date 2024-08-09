use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::equipements)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Equipement {

pub idequip: i32,

pub nom: String,

pub periode_revision: i32,

pub statut: String,

pub idbon: i32,

pub information: String,

pub date_mise_en_service: String,

pub date_control: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::equipements)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewEquipement {


pub nom: String,

pub periode_revision: i32,

pub statut: String,

pub idbon: i32,

pub information: String,

pub date_mise_en_service: String,

pub date_control: String,

pub iduser: i32,

}