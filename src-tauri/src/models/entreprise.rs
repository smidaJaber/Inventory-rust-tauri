use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::entreprises)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Entreprise {

pub identreprise: i32,

pub nom_entreprise: String,

pub adresse: String,

pub tel: String,

pub fax: String,

pub mail: String,

pub matricule: String,

pub information: String,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::entreprises)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewEntreprise {


pub nom_entreprise: String,

pub adresse: String,

pub tel: String,

pub fax: String,

pub mail: String,

pub matricule: String,

pub information: String,

pub iduser: i32,

}