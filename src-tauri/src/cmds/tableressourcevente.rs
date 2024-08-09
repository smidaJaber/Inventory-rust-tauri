#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tableressourcevente::{NewTableressourcevente, Tableressourcevente};
use crate::schema::tableressourceventes::{self, idres_vente};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tableressourcevente(new_tableressourcevente: NewTableressourcevente ) -> Result<i32, ()> {
    use crate::schema::tableressourceventes::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tableressourceventes)
        .values(&new_tableressourcevente)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tableressourceventes(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tableressourcevente>, ()> {
    use crate::schema::tableressourceventes::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tableressourceventes
        .limit(max_limit)
        .select(Tableressourcevente::as_select())
        .load(connection)
        .expect("Error loading Tableressourceventes");

    println!("Displaying {} Tableressourceventes", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tableressourcevente_by_id(_id: String) -> Result<Option<Tableressourcevente>, ()> {
    use crate::schema::tableressourceventes::dsl::*;

    let connection = &mut establish_connection();
    let results = tableressourceventes
        .filter(idres_vente.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tableressourcevente(_id: i32) -> Result<(), ()> {
    use crate::schema::tableressourceventes::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tableressourceventes)
       .filter(idres_vente.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tableressourcevente(_id: i32, updated_tableressourcevente: NewTableressourcevente) -> Result<(), ()> {
    use crate::schema::tableressourceventes::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tableressourceventes)
        .filter(idres_vente.eq(_id.to_owned()))
        .set((

    idclient.eq(updated_tableressourcevente.idclient),
    
    montant.eq(updated_tableressourcevente.montant),
    
    type_paiement.eq(updated_tableressourcevente.type_paiement),
    
    type_caisse.eq(updated_tableressourcevente.type_caisse),
    
    nbr_cs.eq(updated_tableressourcevente.nbr_cs),
    
    nbr_cn.eq(updated_tableressourcevente.nbr_cn),
    
    nbr_ca.eq(updated_tableressourcevente.nbr_ca),
    
    nbr_matriel.eq(updated_tableressourcevente.nbr_matriel),
    
    type_matriel.eq(updated_tableressourcevente.type_matriel),
    
    emballage.eq(updated_tableressourcevente.emballage),
    
    nbr_emb.eq(updated_tableressourcevente.nbr_emb),
    
    nbr_cov.eq(updated_tableressourcevente.nbr_cov),
    
    nbr_fon.eq(updated_tableressourcevente.nbr_fon),
    
    information.eq(updated_tableressourcevente.information),
    
    date_ressource_vente.eq(updated_tableressourcevente.date_ressource_vente),
    
    lieu_stock.eq(updated_tableressourcevente.lieu_stock),
    
    iddoc.eq(updated_tableressourcevente.iddoc),
    
    iduser.eq(updated_tableressourcevente.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
