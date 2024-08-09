#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tabledepense::{NewTabledepense, Tabledepense};
use crate::schema::tabledepenses::{self, iddepense};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tabledepense(new_tabledepense: NewTabledepense ) -> Result<i32, ()> {
    use crate::schema::tabledepenses::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tabledepenses)
        .values(&new_tabledepense)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tabledepenses(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tabledepense>, ()> {
    use crate::schema::tabledepenses::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tabledepenses
        .limit(max_limit)
        .select(Tabledepense::as_select())
        .load(connection)
        .expect("Error loading Tabledepenses");

    println!("Displaying {} Tabledepenses", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tabledepense_by_id(_id: String) -> Result<Option<Tabledepense>, ()> {
    use crate::schema::tabledepenses::dsl::*;

    let connection = &mut establish_connection();
    let results = tabledepenses
        .filter(iddepense.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tabledepense(_id: i32) -> Result<(), ()> {
    use crate::schema::tabledepenses::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tabledepenses)
       .filter(iddepense.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tabledepense(_id: i32, updated_tabledepense: NewTabledepense) -> Result<(), ()> {
    use crate::schema::tabledepenses::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tabledepenses)
        .filter(iddepense.eq(_id.to_owned()))
        .set((

    idtype_depense.eq(updated_tabledepense.idtype_depense),
    
    montant.eq(updated_tabledepense.montant),
    
    idcateg.eq(updated_tabledepense.idcateg),
    
    information.eq(updated_tabledepense.information),
    
    date_depense.eq(updated_tabledepense.date_depense),
    
    document.eq(updated_tabledepense.document),
    
    numero.eq(updated_tabledepense.numero),
    
    iduser.eq(updated_tabledepense.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
