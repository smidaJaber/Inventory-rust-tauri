#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::emballage::{NewEmballage, Emballage};
use crate::schema::emballages::{self, idemballage};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_emballage(new_emballage: NewEmballage ) -> Result<i32, ()> {
    use crate::schema::emballages::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(emballages)
        .values(&new_emballage)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_emballages(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Emballage>, ()> {
    use crate::schema::emballages::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = emballages
        .limit(max_limit)
        .select(Emballage::as_select())
        .load(connection)
        .expect("Error loading Emballages");

    println!("Displaying {} Emballages", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_emballage_by_id(_id: String) -> Result<Option<Emballage>, ()> {
    use crate::schema::emballages::dsl::*;

    let connection = &mut establish_connection();
    let results = emballages
        .filter(idemballage.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_emballage(_id: i32) -> Result<(), ()> {
    use crate::schema::emballages::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(emballages)
       .filter(idemballage.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_emballage(_id: i32, updated_emballage: NewEmballage) -> Result<(), ()> {
    use crate::schema::emballages::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(emballages)
        .filter(idemballage.eq(_id.to_owned()))
        .set((

    nom.eq(updated_emballage.nom),
    
    poid.eq(updated_emballage.poid),
    
    type_emb.eq(updated_emballage.type_emb),
    
    composition.eq(updated_emballage.composition),
    
    information.eq(updated_emballage.information),
    
    iduser.eq(updated_emballage.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
