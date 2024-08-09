#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::equipement::{NewEquipement, Equipement};
use crate::schema::equipements::{self, idequip};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_equipement(new_equipement: NewEquipement ) -> Result<i32, ()> {
    use crate::schema::equipements::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(equipements)
        .values(&new_equipement)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_equipements(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Equipement>, ()> {
    use crate::schema::equipements::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = equipements
        .limit(max_limit)
        .select(Equipement::as_select())
        .load(connection)
        .expect("Error loading Equipements");

    println!("Displaying {} Equipements", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_equipement_by_id(_id: String) -> Result<Option<Equipement>, ()> {
    use crate::schema::equipements::dsl::*;

    let connection = &mut establish_connection();
    let results = equipements
        .filter(idequip.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_equipement(_id: i32) -> Result<(), ()> {
    use crate::schema::equipements::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(equipements)
       .filter(idequip.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_equipement(_id: i32, updated_equipement: NewEquipement) -> Result<(), ()> {
    use crate::schema::equipements::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(equipements)
        .filter(idequip.eq(_id.to_owned()))
        .set((

    nom.eq(updated_equipement.nom),
    
    periode_revision.eq(updated_equipement.periode_revision),
    
    statut.eq(updated_equipement.statut),
    
    idbon.eq(updated_equipement.idbon),
    
    information.eq(updated_equipement.information),
    
    date_mise_en_service.eq(updated_equipement.date_mise_en_service),
    
    date_control.eq(updated_equipement.date_control),
    
    iduser.eq(updated_equipement.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
