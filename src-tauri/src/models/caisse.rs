use diesel::prelude::*;
use serde::Deserialize;
use serde::Serialize;
use specta::Type;
#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::caisses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct Caisse {
    pub id: i32,
    pub name: String,
    pub weight: i32,
}
#[derive(Queryable, Serialize, Insertable)]
#[diesel(table_name = crate::schema::caisses)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[derive(Deserialize, Type)]
pub struct NewCaisse {
    pub name: String,
    pub weight: i32,
}
