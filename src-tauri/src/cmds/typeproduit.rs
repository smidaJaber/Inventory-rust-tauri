#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::typeproduit::{NewTypeproduit, Typeproduit};
use crate::schema::typeproduits::{self, idtype_prod};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_typeproduit(new_typeproduit: NewTypeproduit ) -> Result<i32, ()> {
    use crate::schema::typeproduits::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(typeproduits)
        .values(&new_typeproduit)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_typeproduits(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Typeproduit>, ()> {
    use crate::schema::typeproduits::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = typeproduits
        .limit(max_limit)
        .select(Typeproduit::as_select())
        .load(connection)
        .expect("Error loading Typeproduits");

    println!("Displaying {} Typeproduits", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_typeproduit_by_id(_id: String) -> Result<Option<Typeproduit>, ()> {
    use crate::schema::typeproduits::dsl::*;

    let connection = &mut establish_connection();
    let results = typeproduits
        .filter(idtype_prod.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_typeproduit(_id: i32) -> Result<(), ()> {
    use crate::schema::typeproduits::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(typeproduits)
       .filter(idtype_prod.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_typeproduit(_id: i32, updated_typeproduit: NewTypeproduit) -> Result<(), ()> {
    use crate::schema::typeproduits::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(typeproduits)
        .filter(idtype_prod.eq(_id.to_owned()))
        .set((

    nom.eq(updated_typeproduit.nom),
    
    information.eq(updated_typeproduit.information),
    
    iduser.eq(updated_typeproduit.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
