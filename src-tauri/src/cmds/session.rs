#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::session::{NewSession, Session};
use crate::schema::sessions::{self, idsession};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_session(new_session: NewSession ) -> Result<i32, ()> {
    use crate::schema::sessions::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(sessions)
        .values(&new_session)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_sessions(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Session>, ()> {
    use crate::schema::sessions::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = sessions
        .limit(max_limit)
        .select(Session::as_select())
        .load(connection)
        .expect("Error loading Sessions");

    println!("Displaying {} Sessions", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_session_by_id(_id: String) -> Result<Option<Session>, ()> {
    use crate::schema::sessions::dsl::*;

    let connection = &mut establish_connection();
    let results = sessions
        .filter(idsession.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_session(_id: i32) -> Result<(), ()> {
    use crate::schema::sessions::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(sessions)
       .filter(idsession.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_session(_id: i32, updated_session: NewSession) -> Result<(), ()> {
    use crate::schema::sessions::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(sessions)
        .filter(idsession.eq(_id.to_owned()))
        .set((

    expires.eq(updated_session.expires),
    
    data.eq(updated_session.data),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
