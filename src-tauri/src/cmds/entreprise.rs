#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::entreprise::{NewEntreprise, Entreprise};
use crate::schema::entreprises::{self, identreprise};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_entreprise(new_entreprise: NewEntreprise ) -> Result<i32, ()> {
    use crate::schema::entreprises::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(entreprises)
        .values(&new_entreprise)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_entreprises(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Entreprise>, ()> {
    use crate::schema::entreprises::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = entreprises
        .limit(max_limit)
        .select(Entreprise::as_select())
        .load(connection)
        .expect("Error loading Entreprises");

    println!("Displaying {} Entreprises", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_entreprise_by_id(_id: String) -> Result<Option<Entreprise>, ()> {
    use crate::schema::entreprises::dsl::*;

    let connection = &mut establish_connection();
    let results = entreprises
        .filter(identreprise.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_entreprise(_id: i32) -> Result<(), ()> {
    use crate::schema::entreprises::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(entreprises)
       .filter(identreprise.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_entreprise(_id: i32, updated_entreprise: NewEntreprise) -> Result<(), ()> {
    use crate::schema::entreprises::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(entreprises)
        .filter(identreprise.eq(_id.to_owned()))
        .set((

    nom_entreprise.eq(updated_entreprise.nom_entreprise),
    
    adresse.eq(updated_entreprise.adresse),
    
    tel.eq(updated_entreprise.tel),
    
    fax.eq(updated_entreprise.fax),
    
    mail.eq(updated_entreprise.mail),
    
    matricule.eq(updated_entreprise.matricule),
    
    information.eq(updated_entreprise.information),
    
    iduser.eq(updated_entreprise.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
