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
pub fn get_user_by_email_pwd(username: String, password: String) -> Result<Option<User>, ()> {
    use crate::schema::users::dsl::*;

    let connection = &mut establish_connection();
    let results = users
        .filter(login.eq(username))
        .filter(password.eq(password))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
}
