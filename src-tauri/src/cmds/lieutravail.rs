#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::lieutravail::{NewLieutravail, Lieutravail};
use crate::schema::lieutravails::{self, idlieu_travail};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_lieutravail(new_lieutravail: NewLieutravail ) -> Result<i32, ()> {
    use crate::schema::lieutravails::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(lieutravails)
        .values(&new_lieutravail)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_lieutravails(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Lieutravail>, ()> {
    use crate::schema::lieutravails::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = lieutravails
        .limit(max_limit)
        .select(Lieutravail::as_select())
        .load(connection)
        .expect("Error loading Lieutravails");

    println!("Displaying {} Lieutravails", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_lieutravail_by_id(_id: String) -> Result<Option<Lieutravail>, ()> {
    use crate::schema::lieutravails::dsl::*;

    let connection = &mut establish_connection();
    let results = lieutravails
        .filter(idlieu_travail.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_lieutravail(_id: i32) -> Result<(), ()> {
    use crate::schema::lieutravails::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(lieutravails)
       .filter(idlieu_travail.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_lieutravail(_id: i32, updated_lieutravail: NewLieutravail) -> Result<(), ()> {
    use crate::schema::lieutravails::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(lieutravails)
        .filter(idlieu_travail.eq(_id.to_owned()))
        .set((

    nom_lieu.eq(updated_lieutravail.nom_lieu),
    
    information.eq(updated_lieutravail.information),
    
    iduser.eq(updated_lieutravail.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
