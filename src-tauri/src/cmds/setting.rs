#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::setting::{NewSetting, Setting};
use crate::schema::settings::{self, id};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_setting(new_setting: NewSetting ) -> Result<i32, ()> {
    use crate::schema::settings::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(settings)
        .values(&new_setting)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_settings(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Setting>, ()> {
    use crate::schema::settings::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = settings
        .limit(max_limit)
        .select(Setting::as_select())
        .load(connection)
        .expect("Error loading Settings");

    println!("Displaying {} Settings", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_setting_by_id(_id: String) -> Result<Option<Setting>, ()> {
    use crate::schema::settings::dsl::*;

    let connection = &mut establish_connection();
    let results = settings
        .filter(id.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_setting(_id: i32) -> Result<(), ()> {
    use crate::schema::settings::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(settings)
       .filter(id.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_setting(_id: i32, updated_setting: NewSetting) -> Result<(), ()> {
    use crate::schema::settings::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(settings)
        .filter(id.eq(_id.to_owned()))
        .set((

    iddoc_normal.eq(updated_setting.iddoc_normal),
    
    iddoc_impexp.eq(updated_setting.iddoc_impexp),
    
    iddoc_avoir.eq(updated_setting.iddoc_avoir),
    
    iddoc_normal_vente.eq(updated_setting.iddoc_normal_vente),
    
    iddoc_impexpvente.eq(updated_setting.iddoc_impexpvente),
    
    iddoc_avoir_vente.eq(updated_setting.iddoc_avoir_vente),
    
    identreprise.eq(updated_setting.identreprise),
    
    idcompte.eq(updated_setting.idcompte),
    
    iddoc_devis.eq(updated_setting.iddoc_devis),
    
    iddoc_proformat.eq(updated_setting.iddoc_proformat),
    
    liste_ids_doc_to_print.eq(updated_setting.liste_ids_doc_to_print),
    
    iddoc_rapport.eq(updated_setting.iddoc_rapport),
    
    iddoc_scann.eq(updated_setting.iddoc_scann),
    
    iduser.eq(updated_setting.iduser),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
