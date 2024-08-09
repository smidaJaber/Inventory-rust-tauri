#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::personnel::{NewPersonnel, Personnel};
use crate::schema::personnels::{self, idpersonnel};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_personnel(new_personnel: NewPersonnel ) -> Result<i32, ()> {
    use crate::schema::personnels::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(personnels)
        .values(&new_personnel)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_personnels(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Personnel>, ()> {
    use crate::schema::personnels::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = personnels
        .limit(max_limit)
        .select(Personnel::as_select())
        .load(connection)
        .expect("Error loading Personnels");

    println!("Displaying {} Personnels", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_personnel_by_id(_id: String) -> Result<Option<Personnel>, ()> {
    use crate::schema::personnels::dsl::*;

    let connection = &mut establish_connection();
    let results = personnels
        .filter(idpersonnel.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_personnel(_id: i32) -> Result<(), ()> {
    use crate::schema::personnels::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(personnels)
       .filter(idpersonnel.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_personnel(_id: i32, updated_personnel: NewPersonnel) -> Result<(), ()> {
    use crate::schema::personnels::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(personnels)
        .filter(idpersonnel.eq(_id.to_owned()))
        .set((

    nom_prenom.eq(updated_personnel.nom_prenom),
    
    cin.eq(updated_personnel.cin),
    
    date_naissance.eq(updated_personnel.date_naissance),
    
    sexe.eq(updated_personnel.sexe),
    
    adresse.eq(updated_personnel.adresse),
    
    tel.eq(updated_personnel.tel),
    
    date_recrutement.eq(updated_personnel.date_recrutement),
    
    statut.eq(updated_personnel.statut),
    
    titre.eq(updated_personnel.titre),
    
    iduser.eq(updated_personnel.iduser),
    
    prix_h.eq(updated_personnel.prix_h),
    
    prix_j.eq(updated_personnel.prix_j),
    
    prix_u.eq(updated_personnel.prix_u),
    
    idcv.eq(updated_personnel.idcv),
    
    idcontrat.eq(updated_personnel.idcontrat),
    
    iddocument.eq(updated_personnel.iddocument),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
