use crate::database::establish_connection;
use crate::models::caisse::{Caisse, NewCaisse};
use crate::schema::caisses::{self, id};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use specta::Type;

#[tauri::command]
#[specta::specta]
pub fn get_posts() -> Result<Vec<Caisse>, ()> {
    //db.post().find_many(vec![]).exec().await
    use crate::schema::caisses::dsl::*;

    let connection = &mut establish_connection();
    let results = caisses
        .limit(5)
        .select(Caisse::as_select())
        .load(connection)
        .expect("Error loading posts");

    println!("Displaying {} posts", results.len());

    Ok(results)
}
