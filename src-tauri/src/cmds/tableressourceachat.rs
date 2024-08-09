#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::{establish_connection, establish_multi_connection};
use crate::models::tableressourceachat::{NewTableressourceachat, Tableressourceachat};
use crate::schema::tableressourceachats::{self, idres_achat};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::{Deserialize, Serialize};
use specta::Type;

static LIMIT_SELECT: i32 = 10_000;
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct FormattedDataResultsRessAchats {
    dbname: String,
    data: Vec<Tableressourceachat>,
}
#[tauri::command]
#[specta::specta]
pub fn get_all_ress_achat_multi_db(
    skip: Option<i32>,
    limit: Option<i32>,
    databases: Option<Vec<String>>,
) -> Result<Vec<FormattedDataResultsRessAchats>, ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let database_urls: Option<Vec<String>> = databases.clone();

    let mut connections = establish_multi_connection(database_urls);

    let mut data_result: Vec<FormattedDataResultsRessAchats> = Vec::new();

    let databases: Vec<String> = databases.unwrap_or_else(Vec::new);
    // Loop through all connections and select
    for (index, (connection, dbname)) in connections
        .iter_mut()
        .zip(databases.iter().cloned())
        .enumerate()
    {
        let opp_achat = tableressourceachats
            .load::<Tableressourceachat>(&mut *connection)
            .expect("Error loading opperation ressource achat");
        //println!("Users from Database {}: {:?}", index, frns);
        let formatted_result = FormattedDataResultsRessAchats {
            dbname: dbname.clone(),
            data: opp_achat,
        };
        data_result.push(formatted_result);
    }
    Ok(data_result)
}

#[tauri::command]
#[specta::specta]
pub fn insert_tableressourceachat(
    new_tableressourceachat: NewTableressourceachat,
) -> Result<i32, ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let connection = &mut establish_connection();

    let rows_inserted = diesel::insert_into(tableressourceachats)
        .values(&new_tableressourceachat)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tableressourceachats(
    skip: Option<i32>,
    limit: Option<i32>,
) -> Result<Vec<Tableressourceachat>, ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tableressourceachats
        .limit(max_limit)
        .select(Tableressourceachat::as_select())
        .load(connection)
        .expect("Error loading Tableressourceachats");

    println!("Displaying {} Tableressourceachats", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tableressourceachat_by_id(_id: String) -> Result<Option<Tableressourceachat>, ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let connection = &mut establish_connection();
    let results = tableressourceachats
        .filter(idres_achat.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn delete_tableressourceachat(_id: i32) -> Result<(), ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tableressourceachats)
        .filter(idres_achat.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tableressourceachat(
    _id: i32,
    updated_tableressourceachat: NewTableressourceachat,
) -> Result<(), ()> {
    use crate::schema::tableressourceachats::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tableressourceachats)
        .filter(idres_achat.eq(_id.to_owned()))
        .set((
            idfornisseur.eq(updated_tableressourceachat.idfornisseur),
            montant.eq(updated_tableressourceachat.montant),
            type_paiement.eq(updated_tableressourceachat.type_paiement),
            nbr_cs.eq(updated_tableressourceachat.nbr_cs),
            nbr_cn.eq(updated_tableressourceachat.nbr_cn),
            nbr_ca.eq(updated_tableressourceachat.nbr_ca),
            type_caisse.eq(updated_tableressourceachat.type_caisse),
            nbr_matriel.eq(updated_tableressourceachat.nbr_matriel),
            type_matriel.eq(updated_tableressourceachat.type_matriel),
            emballage.eq(updated_tableressourceachat.emballage),
            nbr_emb.eq(updated_tableressourceachat.nbr_emb),
            nbr_cov.eq(updated_tableressourceachat.nbr_cov),
            nbr_fon.eq(updated_tableressourceachat.nbr_fon),
            information.eq(updated_tableressourceachat.information),
            date_ressource_achat.eq(updated_tableressourceachat.date_ressource_achat),
            lieu_stock.eq(updated_tableressourceachat.lieu_stock),
            iddoc.eq(updated_tableressourceachat.iddoc),
            iduser.eq(updated_tableressourceachat.iduser),
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
