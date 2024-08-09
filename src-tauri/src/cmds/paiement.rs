#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::paiement::{NewPaiement, Paiement};
use crate::schema::paiements::{self, idpaiement};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_paiement(new_paiement: NewPaiement ) -> Result<i32, ()> {
    use crate::schema::paiements::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(paiements)
        .values(&new_paiement)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_paiements(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Paiement>, ()> {
    use crate::schema::paiements::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = paiements
        .limit(max_limit)
        .select(Paiement::as_select())
        .load(connection)
        .expect("Error loading Paiements");

    println!("Displaying {} Paiements", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_paiement_by_id(_id: String) -> Result<Option<Paiement>, ()> {
    use crate::schema::paiements::dsl::*;

    let connection = &mut establish_connection();
    let results = paiements
        .filter(idpaiement.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_paiement(_id: i32) -> Result<(), ()> {
    use crate::schema::paiements::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(paiements)
       .filter(idpaiement.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_paiement(_id: i32, updated_paiement: NewPaiement) -> Result<(), ()> {
    use crate::schema::paiements::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(paiements)
        .filter(idpaiement.eq(_id.to_owned()))
        .set((

    nom.eq(updated_paiement.nom),
    
    description.eq(updated_paiement.description),
    
    iduser.eq(updated_paiement.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
