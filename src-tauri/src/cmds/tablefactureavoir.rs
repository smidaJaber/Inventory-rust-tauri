#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tablefactureavoir::{NewTablefactureavoir, Tablefactureavoir};
use crate::schema::tablefactureavoirs::{self, idfact_avoir};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tablefactureavoir(new_tablefactureavoir: NewTablefactureavoir ) -> Result<i32, ()> {
    use crate::schema::tablefactureavoirs::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tablefactureavoirs)
        .values(&new_tablefactureavoir)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tablefactureavoirs(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tablefactureavoir>, ()> {
    use crate::schema::tablefactureavoirs::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tablefactureavoirs
        .limit(max_limit)
        .select(Tablefactureavoir::as_select())
        .load(connection)
        .expect("Error loading Tablefactureavoirs");

    println!("Displaying {} Tablefactureavoirs", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tablefactureavoir_by_id(_id: String) -> Result<Option<Tablefactureavoir>, ()> {
    use crate::schema::tablefactureavoirs::dsl::*;

    let connection = &mut establish_connection();
    let results = tablefactureavoirs
        .filter(idfact_avoir.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tablefactureavoir(_id: i32) -> Result<(), ()> {
    use crate::schema::tablefactureavoirs::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tablefactureavoirs)
       .filter(idfact_avoir.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tablefactureavoir(_id: i32, updated_tablefactureavoir: NewTablefactureavoir) -> Result<(), ()> {
    use crate::schema::tablefactureavoirs::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tablefactureavoirs)
        .filter(idfact_avoir.eq(_id.to_owned()))
        .set((

    idfact.eq(updated_tablefactureavoir.idfact),
    
    idclient.eq(updated_tablefactureavoir.idclient),
    
    type_produit.eq(updated_tablefactureavoir.type_produit),
    
    montant.eq(updated_tablefactureavoir.montant),
    
    reference_doc.eq(updated_tablefactureavoir.reference_doc),
    
    information.eq(updated_tablefactureavoir.information),
    
    iduser.eq(updated_tablefactureavoir.iduser),
    
    date_facture_avoir.eq(updated_tablefactureavoir.date_facture_avoir),
    
    idcateg.eq(updated_tablefactureavoir.idcateg),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
