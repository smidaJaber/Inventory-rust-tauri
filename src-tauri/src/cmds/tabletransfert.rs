#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tabletransfert::{NewTabletransfert, Tabletransfert};
use crate::schema::tabletransferts::{self, idtransfert};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tabletransfert(new_tabletransfert: NewTabletransfert ) -> Result<i32, ()> {
    use crate::schema::tabletransferts::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tabletransferts)
        .values(&new_tabletransfert)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tabletransferts(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tabletransfert>, ()> {
    use crate::schema::tabletransferts::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tabletransferts
        .limit(max_limit)
        .select(Tabletransfert::as_select())
        .load(connection)
        .expect("Error loading Tabletransferts");

    println!("Displaying {} Tabletransferts", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tabletransfert_by_id(_id: String) -> Result<Option<Tabletransfert>, ()> {
    use crate::schema::tabletransferts::dsl::*;

    let connection = &mut establish_connection();
    let results = tabletransferts
        .filter(idtransfert.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tabletransfert(_id: i32) -> Result<(), ()> {
    use crate::schema::tabletransferts::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tabletransferts)
       .filter(idtransfert.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tabletransfert(_id: i32, updated_tabletransfert: NewTabletransfert) -> Result<(), ()> {
    use crate::schema::tabletransferts::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tabletransferts)
        .filter(idtransfert.eq(_id.to_owned()))
        .set((

    de.eq(updated_tabletransfert.de),
    
    a.eq(updated_tabletransfert.a),
    
    nbr_caisse.eq(updated_tabletransfert.nbr_caisse),
    
    type_caisse.eq(updated_tabletransfert.type_caisse),
    
    nbr_cn.eq(updated_tabletransfert.nbr_cn),
    
    nbr_cs.eq(updated_tabletransfert.nbr_cs),
    
    nbr_ca.eq(updated_tabletransfert.nbr_ca),
    
    qte_net.eq(updated_tabletransfert.qte_net),
    
    produit.eq(updated_tabletransfert.produit),
    
    nbr_matriel.eq(updated_tabletransfert.nbr_matriel),
    
    matriel.eq(updated_tabletransfert.matriel),
    
    idemballage.eq(updated_tabletransfert.idemballage),
    
    nbr_emb.eq(updated_tabletransfert.nbr_emb),
    
    nbr_cov.eq(updated_tabletransfert.nbr_cov),
    
    nbr_fond.eq(updated_tabletransfert.nbr_fond),
    
    information.eq(updated_tabletransfert.information),
    
    date_transfer.eq(updated_tabletransfert.date_transfer),
    
    iduser.eq(updated_tabletransfert.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
