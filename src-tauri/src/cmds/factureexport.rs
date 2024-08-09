#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::factureexport::{NewFactureexport, Factureexport};
use crate::schema::factureexports::{self, idfact};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_factureexport(new_factureexport: NewFactureexport ) -> Result<i32, ()> {
    use crate::schema::factureexports::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(factureexports)
        .values(&new_factureexport)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_factureexports(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Factureexport>, ()> {
    use crate::schema::factureexports::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = factureexports
        .limit(max_limit)
        .select(Factureexport::as_select())
        .load(connection)
        .expect("Error loading Factureexports");

    println!("Displaying {} Factureexports", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_factureexport_by_id(_id: String) -> Result<Option<Factureexport>, ()> {
    use crate::schema::factureexports::dsl::*;

    let connection = &mut establish_connection();
    let results = factureexports
        .filter(idfact.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_factureexport(_id: i32) -> Result<(), ()> {
    use crate::schema::factureexports::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(factureexports)
       .filter(idfact.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_factureexport(_id: i32, updated_factureexport: NewFactureexport) -> Result<(), ()> {
    use crate::schema::factureexports::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(factureexports)
        .filter(idfact.eq(_id.to_owned()))
        .set((

    numero.eq(updated_factureexport.numero),
    
    iddoc.eq(updated_factureexport.iddoc),
    
    idclient.eq(updated_factureexport.idclient),
    
    type_fact.eq(updated_factureexport.type_fact),
    
    date_facture_export.eq(updated_factureexport.date_facture_export),
    
    op1.eq(updated_factureexport.op1),
    
    op2.eq(updated_factureexport.op2),
    
    op3.eq(updated_factureexport.op3),
    
    op4.eq(updated_factureexport.op4),
    
    op5.eq(updated_factureexport.op5),
    
    op6.eq(updated_factureexport.op6),
    
    op7.eq(updated_factureexport.op7),
    
    op8.eq(updated_factureexport.op8),
    
    op9.eq(updated_factureexport.op9),
    
    op10.eq(updated_factureexport.op10),
    
    information.eq(updated_factureexport.information),
    
    idbon_rec.eq(updated_factureexport.idbon_rec),
    
    numero_bon_rec.eq(updated_factureexport.numero_bon_rec),
    
    idbon_com.eq(updated_factureexport.idbon_com),
    
    numero_bon_com.eq(updated_factureexport.numero_bon_com),
    
    idbon_con.eq(updated_factureexport.idbon_con),
    
    numero_bon_con.eq(updated_factureexport.numero_bon_con),
    
    iduser.eq(updated_factureexport.iduser),
    
    identreprise.eq(updated_factureexport.identreprise),
    
    modepaiement.eq(updated_factureexport.modepaiement),
    
    mode_livraison.eq(updated_factureexport.mode_livraison),
    
    banque.eq(updated_factureexport.banque),
    
    iban_rib.eq(updated_factureexport.iban_rib),
    
    liste_idopps.eq(updated_factureexport.liste_idopps),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
