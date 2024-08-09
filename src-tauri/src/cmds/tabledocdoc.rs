#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tabledocdoc::{NewTabledocdoc, Tabledocdoc};
use crate::schema::tabledocdocs::{self, iddoc_doc};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tabledocdoc(new_tabledocdoc: NewTabledocdoc ) -> Result<i32, ()> {
    use crate::schema::tabledocdocs::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tabledocdocs)
        .values(&new_tabledocdoc)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tabledocdocs(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tabledocdoc>, ()> {
    use crate::schema::tabledocdocs::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tabledocdocs
        .limit(max_limit)
        .select(Tabledocdoc::as_select())
        .load(connection)
        .expect("Error loading Tabledocdocs");

    println!("Displaying {} Tabledocdocs", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tabledocdoc_by_id(_id: String) -> Result<Option<Tabledocdoc>, ()> {
    use crate::schema::tabledocdocs::dsl::*;

    let connection = &mut establish_connection();
    let results = tabledocdocs
        .filter(iddoc_doc.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tabledocdoc(_id: i32) -> Result<(), ()> {
    use crate::schema::tabledocdocs::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tabledocdocs)
       .filter(iddoc_doc.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tabledocdoc(_id: i32, updated_tabledocdoc: NewTabledocdoc) -> Result<(), ()> {
    use crate::schema::tabledocdocs::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tabledocdocs)
        .filter(iddoc_doc.eq(_id.to_owned()))
        .set((

    numero.eq(updated_tabledocdoc.numero),
    
    reference.eq(updated_tabledocdoc.reference),
    
    iddoc.eq(updated_tabledocdoc.iddoc),
    
    iduser.eq(updated_tabledocdoc.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
