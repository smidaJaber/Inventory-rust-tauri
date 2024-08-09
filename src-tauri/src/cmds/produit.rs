#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::produit::{NewProduit, Produit};
use crate::schema::produits::{self, idproduit};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_produit(new_produit: NewProduit ) -> Result<i32, ()> {
    use crate::schema::produits::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(produits)
        .values(&new_produit)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_produits(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Produit>, ()> {
    use crate::schema::produits::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = produits
        .limit(max_limit)
        .select(Produit::as_select())
        .load(connection)
        .expect("Error loading Produits");

    println!("Displaying {} Produits", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_produit_by_id(_id: String) -> Result<Option<Produit>, ()> {
    use crate::schema::produits::dsl::*;

    let connection = &mut establish_connection();
    let results = produits
        .filter(idproduit.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_produit(_id: i32) -> Result<(), ()> {
    use crate::schema::produits::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(produits)
       .filter(idproduit.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_produit(_id: i32, updated_produit: NewProduit) -> Result<(), ()> {
    use crate::schema::produits::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(produits)
        .filter(idproduit.eq(_id.to_owned()))
        .set((

    nom.eq(updated_produit.nom),
    
    idtype_prod.eq(updated_produit.idtype_prod),
    
    nom_type_prod.eq(updated_produit.nom_type_prod),
    
    commentaire.eq(updated_produit.commentaire),
    
    iduser.eq(updated_produit.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
