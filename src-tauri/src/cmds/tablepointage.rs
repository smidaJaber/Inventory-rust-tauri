#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tablepointage::{NewTablepointage, Tablepointage};
use crate::schema::tablepointages::{self, idpointage};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tablepointage(new_tablepointage: NewTablepointage ) -> Result<i32, ()> {
    use crate::schema::tablepointages::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tablepointages)
        .values(&new_tablepointage)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tablepointages(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tablepointage>, ()> {
    use crate::schema::tablepointages::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tablepointages
        .limit(max_limit)
        .select(Tablepointage::as_select())
        .load(connection)
        .expect("Error loading Tablepointages");

    println!("Displaying {} Tablepointages", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tablepointage_by_id(_id: String) -> Result<Option<Tablepointage>, ()> {
    use crate::schema::tablepointages::dsl::*;

    let connection = &mut establish_connection();
    let results = tablepointages
        .filter(idpointage.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tablepointage(_id: i32) -> Result<(), ()> {
    use crate::schema::tablepointages::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tablepointages)
       .filter(idpointage.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tablepointage(_id: i32, updated_tablepointage: NewTablepointage) -> Result<(), ()> {
    use crate::schema::tablepointages::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tablepointages)
        .filter(idpointage.eq(_id.to_owned()))
        .set((

    liste_pointage.eq(updated_tablepointage.liste_pointage),
    
    date_pointage.eq(updated_tablepointage.date_pointage),
    
    nbr_personnel.eq(updated_tablepointage.nbr_personnel),
    
    montant.eq(updated_tablepointage.montant),
    
    avance.eq(updated_tablepointage.avance),
    
    lieutravail.eq(updated_tablepointage.lieutravail),
    
    idcateg.eq(updated_tablepointage.idcateg),
    
    information.eq(updated_tablepointage.information),
    
    iduser.eq(updated_tablepointage.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
