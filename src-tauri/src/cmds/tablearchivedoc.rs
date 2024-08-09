#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tablearchivedoc::{NewTablearchivedoc, Tablearchivedoc};
use crate::schema::tablearchivedocs::{self, idarch_doc};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tablearchivedoc(new_tablearchivedoc: NewTablearchivedoc ) -> Result<i32, ()> {
    use crate::schema::tablearchivedocs::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tablearchivedocs)
        .values(&new_tablearchivedoc)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tablearchivedocs(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tablearchivedoc>, ()> {
    use crate::schema::tablearchivedocs::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tablearchivedocs
        .limit(max_limit)
        .select(Tablearchivedoc::as_select())
        .load(connection)
        .expect("Error loading Tablearchivedocs");

    println!("Displaying {} Tablearchivedocs", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tablearchivedoc_by_id(_id: String) -> Result<Option<Tablearchivedoc>, ()> {
    use crate::schema::tablearchivedocs::dsl::*;

    let connection = &mut establish_connection();
    let results = tablearchivedocs
        .filter(idarch_doc.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tablearchivedoc(_id: i32) -> Result<(), ()> {
    use crate::schema::tablearchivedocs::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tablearchivedocs)
       .filter(idarch_doc.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tablearchivedoc(_id: i32, updated_tablearchivedoc: NewTablearchivedoc) -> Result<(), ()> {
    use crate::schema::tablearchivedocs::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tablearchivedocs)
        .filter(idarch_doc.eq(_id.to_owned()))
        .set((

    iddocument.eq(updated_tablearchivedoc.iddocument),
    
    url.eq(updated_tablearchivedoc.url),
    
    fichier.eq(updated_tablearchivedoc.fichier),
    
    datecreation.eq(updated_tablearchivedoc.datecreation),
    
    commentaire.eq(updated_tablearchivedoc.commentaire),
    
    iduser.eq(updated_tablearchivedoc.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
