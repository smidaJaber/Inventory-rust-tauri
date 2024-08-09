#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::lieustockage::{NewLieustockage, Lieustockage};
use crate::schema::lieustockages::{self, idlieu_stockage};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_lieustockage(new_lieustockage: NewLieustockage ) -> Result<i32, ()> {
    use crate::schema::lieustockages::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(lieustockages)
        .values(&new_lieustockage)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_lieustockages(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Lieustockage>, ()> {
    use crate::schema::lieustockages::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = lieustockages
        .limit(max_limit)
        .select(Lieustockage::as_select())
        .load(connection)
        .expect("Error loading Lieustockages");

    println!("Displaying {} Lieustockages", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_lieustockage_by_id(_id: String) -> Result<Option<Lieustockage>, ()> {
    use crate::schema::lieustockages::dsl::*;

    let connection = &mut establish_connection();
    let results = lieustockages
        .filter(idlieu_stockage.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_lieustockage(_id: i32) -> Result<(), ()> {
    use crate::schema::lieustockages::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(lieustockages)
       .filter(idlieu_stockage.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_lieustockage(_id: i32, updated_lieustockage: NewLieustockage) -> Result<(), ()> {
    use crate::schema::lieustockages::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(lieustockages)
        .filter(idlieu_stockage.eq(_id.to_owned()))
        .set((

    nom.eq(updated_lieustockage.nom),
    
    information.eq(updated_lieustockage.information),
    
    iduser.eq(updated_lieustockage.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
