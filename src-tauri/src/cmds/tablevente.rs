#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::tablevente::{NewTablevente, Tablevente};
use crate::schema::tableventes::{self, idvente};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_tablevente(new_tablevente: NewTablevente ) -> Result<i32, ()> {
    use crate::schema::tableventes::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(tableventes)
        .values(&new_tablevente)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tableventes(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tablevente>, ()> {
    use crate::schema::tableventes::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tableventes
        .limit(max_limit)
        .select(Tablevente::as_select())
        .load(connection)
        .expect("Error loading Tableventes");

    println!("Displaying {} Tableventes", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tablevente_by_id(_id: String) -> Result<Option<Tablevente>, ()> {
    use crate::schema::tableventes::dsl::*;

    let connection = &mut establish_connection();
    let results = tableventes
        .filter(idvente.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_tablevente(_id: i32) -> Result<(), ()> {
    use crate::schema::tableventes::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tableventes)
       .filter(idvente.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tablevente(_id: i32, updated_tablevente: NewTablevente) -> Result<(), ()> {
    use crate::schema::tableventes::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tableventes)
        .filter(idvente.eq(_id.to_owned()))
        .set((

    idclient.eq(updated_tablevente.idclient),
    
    type_caisse.eq(updated_tablevente.type_caisse),
    
    nbr_caisse.eq(updated_tablevente.nbr_caisse),
    
    nbr_cs.eq(updated_tablevente.nbr_cs),
    
    nbr_cn.eq(updated_tablevente.nbr_cn),
    
    nbr_ca.eq(updated_tablevente.nbr_ca),
    
    matriel1.eq(updated_tablevente.matriel1),
    
    nbr_m1.eq(updated_tablevente.nbr_m1),
    
    matriel2.eq(updated_tablevente.matriel2),
    
    nbr_m2.eq(updated_tablevente.nbr_m2),
    
    emballage.eq(updated_tablevente.emballage),
    
    nbr_emballage.eq(updated_tablevente.nbr_emballage),
    
    nbr_cov.eq(updated_tablevente.nbr_cov),
    
    nbr_fon.eq(updated_tablevente.nbr_fon),
    
    matiere_principale.eq(updated_tablevente.matiere_principale),
    
    qte_brut.eq(updated_tablevente.qte_brut),
    
    qte_net.eq(updated_tablevente.qte_net),
    
    prix_unit.eq(updated_tablevente.prix_unit),
    
    montant.eq(updated_tablevente.montant),
    
    date_vente.eq(updated_tablevente.date_vente),
    
    observation.eq(updated_tablevente.observation),
    
    num_fact.eq(updated_tablevente.num_fact),
    
    idbon_reclam.eq(updated_tablevente.idbon_reclam),
    
    idbon_recp.eq(updated_tablevente.idbon_recp),
    
    idbon_entree.eq(updated_tablevente.idbon_entree),
    
    idcateg.eq(updated_tablevente.idcateg),
    
    iduser.eq(updated_tablevente.iduser),
    
    type_produit.eq(updated_tablevente.type_produit),
    
    lieu_stock.eq(updated_tablevente.lieu_stock),
    
    selected.eq(updated_tablevente.selected),
    
    num_lot.eq(updated_tablevente.num_lot),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
