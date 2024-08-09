#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::facture::{NewFacture, Facture};
use crate::schema::factures::{self, idfact};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_facture(new_facture: NewFacture ) -> Result<i32, ()> {
    use crate::schema::factures::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(factures)
        .values(&new_facture)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_factures(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Facture>, ()> {
    use crate::schema::factures::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = factures
        .limit(max_limit)
        .select(Facture::as_select())
        .load(connection)
        .expect("Error loading Factures");

    println!("Displaying {} Factures", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_facture_by_id(_id: String) -> Result<Option<Facture>, ()> {
    use crate::schema::factures::dsl::*;

    let connection = &mut establish_connection();
    let results = factures
        .filter(idfact.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_facture(_id: i32) -> Result<(), ()> {
    use crate::schema::factures::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(factures)
       .filter(idfact.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_facture(_id: i32, updated_facture: NewFacture) -> Result<(), ()> {
    use crate::schema::factures::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(factures)
        .filter(idfact.eq(_id.to_owned()))
        .set((

    numero.eq(updated_facture.numero),
    
    iddoc.eq(updated_facture.iddoc),
    
    idclient.eq(updated_facture.idclient),
    
    type_fact.eq(updated_facture.type_fact),
    
    date_facture.eq(updated_facture.date_facture),
    
    op1.eq(updated_facture.op1),
    
    op2.eq(updated_facture.op2),
    
    op3.eq(updated_facture.op3),
    
    op4.eq(updated_facture.op4),
    
    op5.eq(updated_facture.op5),
    
    op6.eq(updated_facture.op6),
    
    op7.eq(updated_facture.op7),
    
    op8.eq(updated_facture.op8),
    
    op9.eq(updated_facture.op9),
    
    op10.eq(updated_facture.op10),
    
    information.eq(updated_facture.information),
    
    idbon_rec.eq(updated_facture.idbon_rec),
    
    numero_bon_rec.eq(updated_facture.numero_bon_rec),
    
    idbon_com.eq(updated_facture.idbon_com),
    
    numero_bon_com.eq(updated_facture.numero_bon_com),
    
    idbon_con.eq(updated_facture.idbon_con),
    
    numero_bon_con.eq(updated_facture.numero_bon_con),
    
    iduser.eq(updated_facture.iduser),
    
    identreprise.eq(updated_facture.identreprise),
    
    liste_idopps.eq(updated_facture.liste_idopps),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
