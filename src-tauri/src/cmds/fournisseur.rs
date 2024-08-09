#![allow(dead_code)]
#![allow(unused_variables)]

use crate::database::{establish_connection, establish_multi_connection};
use crate::models::fournisseur::{Fournisseur, NewFournisseur};
use crate::schema::fournisseurs::{self, idfournisseur_prod};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use serde::Serialize;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[derive(Serialize, Debug, Deserialize, Type)]
pub struct FormattedDataResults {
    dbname: String,
    data: Vec<Fournisseur>,
}
#[tauri::command]
#[specta::specta]
pub fn insert_fournisseur(new_fournisseur: NewFournisseur) -> Result<i32, ()> {
    use crate::schema::fournisseurs::dsl::*;

    let connection = &mut establish_connection();

    let rows_inserted = diesel::insert_into(fournisseurs)
        .values(&new_fournisseur)
        .execute(connection)
        .expect("error insertion");

    Ok(rows_inserted.try_into().unwrap())
}

#[tauri::command]
#[specta::specta]
pub fn get_all_fournisseurs_multi_db(
    skip: Option<i32>,
    limit: Option<i32>,
    databases: Option<Vec<String>>,
) -> Result<Vec<FormattedDataResults>, ()> {
    use crate::schema::fournisseurs::dsl::*;

    let database_urls: Option<Vec<String>> = databases.clone();

    let mut connections = establish_multi_connection(database_urls);

    let mut data_result: Vec<FormattedDataResults> = Vec::new();

    let databases: Vec<String> = databases.unwrap_or_else(Vec::new);
    // Loop through all connections and select
    for (index, (connection, dbname)) in connections
        .iter_mut()
        .zip(databases.iter().cloned())
        .enumerate()
    {
        let frns = fournisseurs
            .load::<Fournisseur>(&mut *connection)
            .expect("Error loading Fournisseurs");
        //println!("Users from Database {}: {:?}", index, frns);
        let formatted_result = FormattedDataResults {
            dbname: dbname.clone(),
            data: frns,
        };
        data_result.push(formatted_result);
    }
    Ok(data_result)
}
#[tauri::command]
#[specta::specta]
pub fn get_all_fournisseurs(skip: Option<i32>, limit: Option<i32>) -> Result<Vec<Fournisseur>, ()> {
    use crate::schema::fournisseurs::dsl::*;

    let connection = &mut establish_connection();
    let max_limit = limit.unwrap_or(LIMIT_SELECT.try_into().unwrap()).into();
    let results = fournisseurs
        .limit(max_limit)
        .select(Fournisseur::as_select())
        .load(connection)
        .expect("Error loading Fournisseurs");

    println!("Displaying {} Fournisseurs", results.len());

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn get_fournisseur_by_id(_id: String) -> Result<Option<Fournisseur>, ()> {
    use crate::schema::fournisseurs::dsl::*;

    let connection = &mut establish_connection();
    let results = fournisseurs
        .filter(idfournisseur_prod.eq(_id.parse::<i32>().unwrap()))
        .first(connection)
        .optional()
        .expect("error");

    Ok(results)
}

#[tauri::command]
#[specta::specta]
pub fn delete_fournisseur(_id: i32) -> Result<(), ()> {
    use crate::schema::fournisseurs::dsl::*;

    let connection = &mut establish_connection();
    diesel::delete(fournisseurs)
        .filter(idfournisseur_prod.eq(_id.to_owned()))
        .execute(connection)
        .unwrap();
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn update_fournisseur(_id: i32, updated_fournisseur: NewFournisseur) -> Result<(), ()> {
    use crate::schema::fournisseurs::dsl::*;

    let connection = &mut establish_connection();
    diesel::update(fournisseurs)
        .filter(idfournisseur_prod.eq(_id.to_owned()))
        .set((
            nom.eq(updated_fournisseur.nom),
            adresse.eq(updated_fournisseur.adresse),
            tel_mob.eq(updated_fournisseur.tel_mob),
            tel_fix.eq(updated_fournisseur.tel_fix),
            mail.eq(updated_fournisseur.mail),
            fax.eq(updated_fournisseur.fax),
            specialite.eq(updated_fournisseur.specialite),
            note.eq(updated_fournisseur.note),
            rib.eq(updated_fournisseur.rib),
            matricule.eq(updated_fournisseur.matricule),
            date_creation.eq(updated_fournisseur.date_creation),
            ajouter_par.eq(updated_fournisseur.ajouter_par),
            statut.eq(updated_fournisseur.statut),
            information.eq(updated_fournisseur.information),
            type_fornisseur.eq(updated_fournisseur.type_fornisseur),
            iduser.eq(updated_fournisseur.iduser),
        ))
        .execute(connection)
        .unwrap();
    Ok(())
}
