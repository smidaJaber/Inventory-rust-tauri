use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct User {

pub iduser: i32,

pub login: String,

pub password: String,

pub role: String,

pub date_creation: String,

pub last_login: String,

pub is_connected: i32,

pub locked: i32,

pub nbr_attempts: i32,

pub allowed_module: String,

pub deleted: i32,

pub created_by: i32,

pub theme: String,

pub user_agent: String,
 
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewUser {


pub login: String,

pub password: String,

pub role: String,

pub date_creation: String,

pub last_login: String,

pub is_connected: i32,

pub locked: i32,

pub nbr_attempts: i32,

pub allowed_module: String,

pub deleted: i32,

pub created_by: i32,

pub theme: String,

pub user_agent: String,

}