#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::saison::{NewSaison, Saison};
use crate::schema::saisons::{self, idsaison};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_saison(new_saison: NewSaison ) -> Result<i32, ()> {
    use crate::schema::saisons::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(saisons)
        .values(&new_saison)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_saisons(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Saison>, ()> {
    use crate::schema::saisons::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = saisons
        .limit(max_limit)
        .select(Saison::as_select())
        .load(connection)
        .expect("Error loading Saisons");

    println!("Displaying {} Saisons", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_saison_by_id(_id: String) -> Result<Option<Saison>, ()> {
    use crate::schema::saisons::dsl::*;

    let connection = &mut establish_connection();
    let results = saisons
        .filter(idsaison.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_saison(_id: i32) -> Result<(), ()> {
    use crate::schema::saisons::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(saisons)
       .filter(idsaison.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_saison(_id: i32, updated_saison: NewSaison) -> Result<(), ()> {
    use crate::schema::saisons::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(saisons)
        .filter(idsaison.eq(_id.to_owned()))
        .set((

    annee.eq(updated_saison.annee),
    
    nom.eq(updated_saison.nom),
    
    information.eq(updated_saison.information),
    
    iduser.eq(updated_saison.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
