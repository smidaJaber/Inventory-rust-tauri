#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::comptebancaire::{NewComptebancaire, Comptebancaire};
use crate::schema::comptebancaires::{self, idcompte};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_comptebancaire(new_comptebancaire: NewComptebancaire ) -> Result<i32, ()> {
    use crate::schema::comptebancaires::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(comptebancaires)
        .values(&new_comptebancaire)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_comptebancaires(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Comptebancaire>, ()> {
    use crate::schema::comptebancaires::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = comptebancaires
        .limit(max_limit)
        .select(Comptebancaire::as_select())
        .load(connection)
        .expect("Error loading Comptebancaires");

    println!("Displaying {} Comptebancaires", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_comptebancaire_by_id(_id: String) -> Result<Option<Comptebancaire>, ()> {
    use crate::schema::comptebancaires::dsl::*;

    let connection = &mut establish_connection();
    let results = comptebancaires
        .filter(idcompte.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_comptebancaire(_id: i32) -> Result<(), ()> {
    use crate::schema::comptebancaires::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(comptebancaires)
       .filter(idcompte.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_comptebancaire(_id: i32, updated_comptebancaire: NewComptebancaire) -> Result<(), ()> {
    use crate::schema::comptebancaires::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(comptebancaires)
        .filter(idcompte.eq(_id.to_owned()))
        .set((

    nom_banque.eq(updated_comptebancaire.nom_banque),
    
    iban.eq(updated_comptebancaire.iban),
    
    rib.eq(updated_comptebancaire.rib),
    
    swift.eq(updated_comptebancaire.swift),
    
    iduser.eq(updated_comptebancaire.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
