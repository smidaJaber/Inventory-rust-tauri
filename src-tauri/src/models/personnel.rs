use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::personnels)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Personnel {

pub idpersonnel: i32,

pub nom_prenom: String,

pub cin: String,

pub date_naissance: String,

pub sexe: String,

pub adresse: String,

pub tel: String,

pub date_recrutement: String,

pub statut: String,

pub titre: String,

pub iduser: i32,

pub prix_h: i32,

pub prix_j: i32,

pub prix_u: i32,

pub idcv: i32,

pub idcontrat: i32,

pub iddocument: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::personnels)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewPersonnel {


pub nom_prenom: String,

pub cin: String,

pub date_naissance: String,

pub sexe: String,

pub adresse: String,

pub tel: String,

pub date_recrutement: String,

pub statut: String,

pub titre: String,

pub iduser: i32,

pub prix_h: i32,

pub prix_j: i32,

pub prix_u: i32,

pub idcv: i32,

pub idcontrat: i32,

pub iddocument: i32,

}