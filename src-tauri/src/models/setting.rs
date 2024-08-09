use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::settings)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Setting {

pub id: i32,

pub iddoc_normal: i32,

pub iddoc_impexp: i32,

pub iddoc_avoir: i32,

pub iddoc_normal_vente: i32,

pub iddoc_impexpvente: i32,

pub iddoc_avoir_vente: i32,

pub identreprise: i32,

pub idcompte: i32,

pub iddoc_devis: i32,

pub iddoc_proformat: i32,

pub liste_ids_doc_to_print: String,

pub iddoc_rapport: i32,

pub iddoc_scann: i32,

pub iduser: i32,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::settings)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewSetting {


pub iddoc_normal: i32,

pub iddoc_impexp: i32,

pub iddoc_avoir: i32,

pub iddoc_normal_vente: i32,

pub iddoc_impexpvente: i32,

pub iddoc_avoir_vente: i32,

pub identreprise: i32,

pub idcompte: i32,

pub iddoc_devis: i32,

pub iddoc_proformat: i32,

pub liste_ids_doc_to_print: String,

pub iddoc_rapport: i32,

pub iddoc_scann: i32,

pub iduser: i32,

}