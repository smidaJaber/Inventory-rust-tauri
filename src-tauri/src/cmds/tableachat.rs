#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::{establish_connection, establish_multi_connection};
use crate::models::tableachat::{NewTableachat, Tableachat};
use crate::schema::tableachats::{self, idachat};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::{Deserialize, Serialize};
use specta::Type;

static LIMIT_SELECT: i32 = 10_000;
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct FormattedDataResultsAchats {
    dbname: String,
    data: Vec<Tableachat>,
}
#[tauri::command]
#[specta::specta]
pub fn get_all_opps_achat_multi_db(
    skip: Option<i32>,
    limit: Option<i32>,
    databases: Option<Vec<String>>,
) -> Result<Vec<FormattedDataResultsAchats>, ()> {
    use crate::schema::tableachats::dsl::*;

    let database_urls: Option<Vec<String>> = databases.clone();

    let mut connections = establish_multi_connection(database_urls);

    let mut data_result: Vec<FormattedDataResultsAchats> = Vec::new();

    let databases: Vec<String> = databases.unwrap_or_else(Vec::new);
    // Loop through all connections and select
    for (index, (connection, dbname)) in connections
        .iter_mut()
        .zip(databases.iter().cloned())
        .enumerate()
    {
        let opp_achat = tableachats
            .load::<Tableachat>(&mut *connection)
            .expect("Error loading opperation achat");
        //println!("Users from Database {}: {:?}", index, frns);
        let formatted_result = FormattedDataResultsAchats {
            dbname: dbname.clone(),
            data: opp_achat,
        };
        data_result.push(formatted_result);
    }
    Ok(data_result)
}
#[tauri::command]
#[specta::specta]
pub fn insert_tableachat(new_tableachat: NewTableachat) -> Result<i32, ()> {
    use crate::schema::tableachats::dsl::*;

    let connection = &mut establish_connection();

    let rows_inserted = diesel::insert_into(tableachats)
        .values(&new_tableachat)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_tableachats(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Tableachat>, ()> {
    use crate::schema::tableachats::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = tableachats
        .limit(max_limit)
        .select(Tableachat::as_select())
        .load(connection)
        .expect("Error loading Tableachats");

    println!("Displaying {} Tableachats", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_tableachat_by_id(_id: String) -> Result<Option<Tableachat>, ()> {
    use crate::schema::tableachats::dsl::*;

    let connection = &mut establish_connection();
    let results = tableachats
        .filter(idachat.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn delete_tableachat(_id: i32) -> Result<(), ()> {
    use crate::schema::tableachats::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(tableachats)
        .filter(idachat.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_tableachat(_id: i32, updated_tableachat: NewTableachat) -> Result<(), ()> {
    use crate::schema::tableachats::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(tableachats)
        .filter(idachat.eq(_id.to_owned()))
        .set((
            idfournisseur.eq(updated_tableachat.idfournisseur),
            type_caisse.eq(updated_tableachat.type_caisse),
            nbr_caisse.eq(updated_tableachat.nbr_caisse),
            nbr_cs.eq(updated_tableachat.nbr_cs),
            nbr_cn.eq(updated_tableachat.nbr_cn),
            nbr_ca.eq(updated_tableachat.nbr_ca),
            matriel1.eq(updated_tableachat.matriel1),
            nbr_m1.eq(updated_tableachat.nbr_m1),
            matriel2.eq(updated_tableachat.matriel2),
            nbr_m2.eq(updated_tableachat.nbr_m2),
            emballage.eq(updated_tableachat.emballage),
            nbr_emballage.eq(updated_tableachat.nbr_emballage),
            nbr_cov.eq(updated_tableachat.nbr_cov),
            nbr_fon.eq(updated_tableachat.nbr_fon),
            matiere_principale.eq(updated_tableachat.matiere_principale),
            qte_brut.eq(updated_tableachat.qte_brut),
            qte_net.eq(updated_tableachat.qte_net),
            prix_unit.eq(updated_tableachat.prix_unit),
            montant.eq(updated_tableachat.montant),
            date_achat.eq(updated_tableachat.date_achat),
            observation.eq(updated_tableachat.observation),
            num_fact.eq(updated_tableachat.num_fact),
            idbon_reclam.eq(updated_tableachat.idbon_reclam),
            idbon_recp.eq(updated_tableachat.idbon_recp),
            idbon_entree.eq(updated_tableachat.idbon_entree),
            idcateg.eq(updated_tableachat.idcateg),
            iduser.eq(updated_tableachat.iduser),
            type_produit.eq(updated_tableachat.type_produit),
            lieu_stock.eq(updated_tableachat.lieu_stock),
            selected.eq(updated_tableachat.selected),
            num_lot.eq(updated_tableachat.num_lot),
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
