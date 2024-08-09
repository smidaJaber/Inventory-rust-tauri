#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::local::{NewLocal, Local};
use crate::schema::locals::{self, idlocal};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_local(new_local: NewLocal ) -> Result<i32, ()> {
    use crate::schema::locals::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(locals)
        .values(&new_local)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_locals(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Local>, ()> {
    use crate::schema::locals::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = locals
        .limit(max_limit)
        .select(Local::as_select())
        .load(connection)
        .expect("Error loading Locals");

    println!("Displaying {} Locals", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_local_by_id(_id: String) -> Result<Option<Local>, ()> {
    use crate::schema::locals::dsl::*;

    let connection = &mut establish_connection();
    let results = locals
        .filter(idlocal.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_local(_id: i32) -> Result<(), ()> {
    use crate::schema::locals::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(locals)
       .filter(idlocal.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_local(_id: i32, updated_local: NewLocal) -> Result<(), ()> {
    use crate::schema::locals::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(locals)
        .filter(idlocal.eq(_id.to_owned()))
        .set((

    section.eq(updated_local.section),
    
    adresse.eq(updated_local.adresse),
    
    information.eq(updated_local.information),
    
    iduser.eq(updated_local.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
