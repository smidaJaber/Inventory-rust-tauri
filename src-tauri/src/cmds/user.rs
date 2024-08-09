#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::establish_connection;
use crate::models::user::{NewUser, User};
use crate::schema::users::{self, iduser};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[tauri::command]
#[specta::specta]
pub fn insert_user(new_user: NewUser ) -> Result<i32, ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
     

    let rows_inserted = diesel::insert_into(users)
        .values(&new_user)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_users(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<User>, ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = users
        .limit(max_limit)
        .select(User::as_select())
        .load(connection)
        .expect("Error loading Users");

    println!("Displaying {} Users", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_user_by_id(_id: String) -> Result<Option<User>, ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
    let results = users
        .filter(iduser.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
} 

#[tauri::command]
#[specta::specta]
pub fn delete_user(_id: i32) -> Result<(), ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(users)
       .filter(iduser.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_user(_id: i32, updated_user: NewUser) -> Result<(), ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(users)
        .filter(iduser.eq(_id.to_owned()))
        .set((

    login.eq(updated_user.login),
    
    password.eq(updated_user.password),
    
    role.eq(updated_user.role),
    
    date_creation.eq(updated_user.date_creation),
    
    last_login.eq(updated_user.last_login),
    
    is_connected.eq(updated_user.is_connected),
    
    locked.eq(updated_user.locked),
    
    nbr_attempts.eq(updated_user.nbr_attempts),
    
    allowed_module.eq(updated_user.allowed_module),
    
    deleted.eq(updated_user.deleted),
    
    created_by.eq(updated_user.created_by),
    
    theme.eq(updated_user.theme),
    
    user_agent.eq(updated_user.user_agent),
     
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
