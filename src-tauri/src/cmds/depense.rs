#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::depense::{NewDepense, Depense};
use crate::schema::depenses::{self, idtype_depense};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_depense(new_depense: NewDepense ) -> Result<i32, ()> {
    use crate::schema::depenses::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(depenses)
        .values(&new_depense)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_depenses(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Depense>, ()> {
    use crate::schema::depenses::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = depenses
        .limit(max_limit)
        .select(Depense::as_select())
        .load(connection)
        .expect("Error loading Depenses");

    println!("Displaying {} Depenses", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_depense_by_id(_id: String) -> Result<Option<Depense>, ()> {
    use crate::schema::depenses::dsl::*;

    let connection = &mut establish_connection();
    let results = depenses
        .filter(idtype_depense.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_depense(_id: i32) -> Result<(), ()> {
    use crate::schema::depenses::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(depenses)
       .filter(idtype_depense.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_depense(_id: i32, updated_depense: NewDepense) -> Result<(), ()> {
    use crate::schema::depenses::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(depenses)
        .filter(idtype_depense.eq(_id.to_owned()))
        .set((

    nom.eq(updated_depense.nom),
    
    information.eq(updated_depense.information),
    
    iduser.eq(updated_depense.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
