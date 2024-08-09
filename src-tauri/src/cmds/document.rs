#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::document::{NewDocument, Document};
use crate::schema::documents::{self, iddoc};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_document(new_document: NewDocument ) -> Result<i32, ()> {
    use crate::schema::documents::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(documents)
        .values(&new_document)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_documents(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Document>, ()> {
    use crate::schema::documents::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = documents
        .limit(max_limit)
        .select(Document::as_select())
        .load(connection)
        .expect("Error loading Documents");

    println!("Displaying {} Documents", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_document_by_id(_id: String) -> Result<Option<Document>, ()> {
    use crate::schema::documents::dsl::*;

    let connection = &mut establish_connection();
    let results = documents
        .filter(iddoc.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_document(_id: i32) -> Result<(), ()> {
    use crate::schema::documents::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(documents)
       .filter(iddoc.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_document(_id: i32, updated_document: NewDocument) -> Result<(), ()> {
    use crate::schema::documents::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(documents)
        .filter(iddoc.eq(_id.to_owned()))
        .set((

    code.eq(updated_document.code),
    
    reference.eq(updated_document.reference),
    
    revision.eq(updated_document.revision),
    
    audit.eq(updated_document.audit),
    
    information.eq(updated_document.information),
    
    date_creation.eq(updated_document.date_creation),
    
    url.eq(updated_document.url),
    
    iduser.eq(updated_document.iduser),
    
    setting_for.eq(updated_document.setting_for),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
