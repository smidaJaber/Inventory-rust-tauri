use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize, Debug)]
#[diesel(table_name = crate::schema::fournisseurs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Fournisseur {
    pub idfournisseur_prod: i32,

    pub nom: String,

    pub adresse: String,

    pub tel_mob: String,

    pub tel_fix: String,

    pub mail: String,

    pub fax: String,

    pub specialite: String,

    pub note: String,

    pub rib: String,

    pub matricule: String,

    pub date_creation: String,

    pub ajouter_par: i32,

    pub statut: String,

    pub information: String,

    pub type_fornisseur: String,

    pub iduser: i32,
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::fournisseurs)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewFournisseur {
    pub nom: String,

    pub adresse: String,

    pub tel_mob: String,

    pub tel_fix: String,

    pub mail: String,

    pub fax: String,

    pub specialite: String,

    pub note: String,

    pub rib: String,

    pub matricule: String,

    pub date_creation: String,

    pub ajouter_par: i32,

    pub statut: String,

    pub information: String,

    pub type_fornisseur: String,

    pub iduser: i32,
}
