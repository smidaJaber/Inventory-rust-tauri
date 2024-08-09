#![allow(dead_code)]
#![allow(unused_variables)]

use std::any::Any;

use crate::database::{establish_connection, establish_multi_connection};
use crate::models::fournisseur::{Fournisseur, NewFournisseur};
use crate::models::personnel::Personnel;
use crate::models::tableachat::{NewTableachat, Tableachat};
use crate::models::tablepointage::Tablepointage;
use crate::models::tableressourceachat::{NewTableressourceachat, Tableressourceachat};
use crate::schema::fournisseurs::{self, idfournisseur_prod};
use diesel::associations::HasTable;
use diesel::{insert_into, prelude::*, sql_query};
use dotenvy::Error;
use serde::Deserialize;
use serde::Serialize;
use serde_json::Value;
use specta::Type;

static LIMIT_SELECT: i32 = 100;

#[derive(Serialize, Debug, Deserialize, Type)]
pub struct GetTotauxRequest {
    id: String,
    all_opps: Vec<Tableachat>,
    all_ress: Vec<Tableressourceachat>,
    fc: String,
}
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct GetTotauxResponse {
    total_opp_mont: i32,
    total_opp_caisse: i32,
    total_opp_emb: i32,
    total_opp_mat1: i32,
    total_opp_mat2: i32,
    total_opp_ress_mont: i32,
    total_opp_ress_mat: i32,
    total_opp_ress_emb: i32,
    total_opp_ress_caisse: i32,
}
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct GetTotauxOppsResponse {
    oppmont: i32,
    oppcaisse: i32,
    oppemb: i32,
    oppmat1: i32,
    oppmat2: i32,
}
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct GetTotauxRessResponse {
    opp_ress_mont: i32,
    opp_ress_mat: i32,
    opp_ress_emb: i32,
    opp_ress_caisse: i32,
}
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct Opp {
    // Define the fields of the Opp struct here
    // For example:
    id: i32,
    montant: i32,
    nbr_caisse: i32,
    nbr_emballage: i32,
    nbr_m1: i32,
    nbr_m2: i32,
}
#[derive(Serialize, Debug, Deserialize, Type)]
pub struct Ress {
    // Define the fields of the Opp struct here
    // For example:
    id: i32,
    montant: i32,
    nbr_caisse: i32,
    nbr_emballage: i32,
    nbr_m1: i32,
    nbr_m2: i32,
}

pub struct Opps {
    oppmont: i32,
    oppcaisse: i32,
    oppemb: i32,
    oppmat1: i32,
    oppmat2: i32,
}
fn do_calcs_opps(
    fc: String,
    f: String,
    all_opps_achat: Vec<Tableachat>,
) -> Result<GetTotauxOppsResponse, String> {
    let all_opps: Vec<&Tableachat> = if f == "tous" || f.parse::<i32>().unwrap_or(0) == 0 {
        all_opps_achat.iter().collect()
    } else {
        all_opps_achat
            .iter()
            .filter(|oa| {
                if fc == "Fournisseur" {
                    f.parse::<i32>().unwrap_or(0) == oa.idfournisseur
                } else {
                    f.parse::<i32>().unwrap_or(0) == oa.idfournisseur
                }
            })
            .collect()
    };

    let initial_values = GetTotauxOppsResponse {
        oppmont: 0,
        oppcaisse: 0,
        oppemb: 0,
        oppmat1: 0,
        oppmat2: 0,
    };

    let GetTotauxOppsResponse {
        oppmont,
        oppcaisse,
        oppemb,
        oppmat1,
        oppmat2,
    } = all_opps
        .iter()
        .fold(initial_values, |accumulator, current_value| {
            GetTotauxOppsResponse {
                oppmont: accumulator.oppmont + current_value.montant,
                oppcaisse: accumulator.oppcaisse + current_value.nbr_caisse,
                oppemb: accumulator.oppemb + current_value.nbr_emballage,
                oppmat1: accumulator.oppmat1 + current_value.nbr_m1,
                oppmat2: accumulator.oppmat2 + current_value.nbr_m2,
            }
        });

    Ok(GetTotauxOppsResponse {
        oppmont,
        oppcaisse,
        oppemb,
        oppmat1,
        oppmat2,
    })
}

// Function to perform the calculations on Ress data
fn do_calcs_ress(
    fc: String,
    f: String,
    all_ress_achat: Vec<Tableressourceachat>,
) -> Result<GetTotauxRessResponse, String> {
    let filtered_ress: Vec<Tableressourceachat> =
        if f == "tous" || f.parse::<i32>().unwrap_or(0) == 0 {
            all_ress_achat
        } else {
            all_ress_achat
                .into_iter()
                .filter(|opp_ress| {
                    if fc == "Fournisseur" {
                        f.parse::<i32>().unwrap_or(0) == opp_ress.idfornisseur
                    } else {
                        f.parse::<i32>().unwrap_or(0) == opp_ress.idfornisseur
                    }
                })
                .collect()
        };

    let mut opp_ress_mont = 0;
    let mut opp_ress_mat = 0;
    let mut opp_ress_emb = 0;
    let mut opp_ress_caisse = 0;

    for opp_ress in filtered_ress {
        opp_ress_mont += opp_ress.montant;
        opp_ress_mat += opp_ress.nbr_matriel;
        opp_ress_emb += opp_ress.nbr_emb;
        opp_ress_caisse += opp_ress.nbr_cs + opp_ress.nbr_cn + opp_ress.nbr_ca;
    }

    Ok(GetTotauxRessResponse {
        opp_ress_mont,
        opp_ress_mat,
        opp_ress_emb,
        opp_ress_caisse,
    })
}

fn do_calcs(
    fc: String,
    f: String,
    all_opps_achat: Vec<Tableachat>,
    all_ress_achat: Vec<Tableressourceachat>,
) -> Result<GetTotauxResponse, String> {
    let filtered_opps: Vec<Tableachat> = if f == "tous" || f.parse::<i32>().unwrap_or(0) == 0 {
        all_opps_achat
    } else {
        all_opps_achat
            .into_iter()
            .filter(|opp_achat| {
                if fc == "Fournisseur" {
                    f.parse::<i32>().unwrap_or(0) == opp_achat.idfournisseur
                } else {
                    f.parse::<i32>().unwrap_or(0) == opp_achat.idfournisseur
                }
            })
            .collect()
    };

    let filtered_ress: Vec<Tableressourceachat> =
        if f == "tous" || f.parse::<i32>().unwrap_or(0) == 0 {
            all_ress_achat
        } else {
            all_ress_achat
                .into_iter()
                .filter(|opp_ress| {
                    if fc == "Fournisseur" {
                        f.parse::<i32>().unwrap_or(0) == opp_ress.idfornisseur
                    } else {
                        f.parse::<i32>().unwrap_or(0) == opp_ress.idfornisseur
                    }
                })
                .collect()
        };

    let mut total_opp_mont = 0;
    let mut total_opp_caisse = 0;
    let mut total_opp_emb = 0;
    let mut total_opp_mat1 = 0;
    let mut total_opp_mat2 = 0;
    let mut total_opp_ress_mont = 0;
    let mut total_opp_ress_mat = 0;
    let mut total_opp_ress_emb = 0;
    let mut total_opp_ress_caisse = 0;

    for opp_achat in filtered_opps {
        total_opp_mont += opp_achat.montant;
        total_opp_caisse += opp_achat.nbr_caisse;
        total_opp_emb += opp_achat.nbr_emballage;
        total_opp_mat1 += opp_achat.nbr_m1;
        total_opp_mat2 += opp_achat.nbr_m2;
    }

    for opp_ress in filtered_ress {
        total_opp_ress_mont += opp_ress.montant;
        total_opp_ress_mat += opp_ress.nbr_matriel;
        total_opp_ress_emb += opp_ress.nbr_emb;
        total_opp_ress_caisse += opp_ress.nbr_cs + opp_ress.nbr_cn + opp_ress.nbr_ca;
    }

    Ok(GetTotauxResponse {
        total_opp_mont,
        total_opp_caisse,
        total_opp_emb,
        total_opp_mat1,
        total_opp_mat2,
        total_opp_ress_mont,
        total_opp_ress_mat,
        total_opp_ress_emb,
        total_opp_ress_caisse,
    })
}

#[tauri::command]
#[specta::specta]
pub async fn get_totaux(request: GetTotauxRequest) -> Result<GetTotauxResponse, String> {
    let id = request.id.to_string();
    let all_opps = request.all_opps;
    let all_ress = request.all_ress;
    let fc = request.fc;

    match do_calcs(fc.clone(), id, all_opps, all_ress) {
        Ok(results) => Ok(GetTotauxResponse {
            total_opp_mont: results.total_opp_mont,
            total_opp_caisse: results.total_opp_caisse,
            total_opp_emb: results.total_opp_emb,
            total_opp_mat1: results.total_opp_mat1,
            total_opp_mat2: results.total_opp_mat2,
            total_opp_ress_mont: results.total_opp_ress_mont,
            total_opp_ress_mat: results.total_opp_ress_mat,
            total_opp_ress_emb: results.total_opp_ress_emb,
            total_opp_ress_caisse: results.total_opp_ress_caisse,
        }),
        Err(e) => Err(format!("Error in heavy calculations/totaux-{}: {}", fc, e)),
    }
}
#[tauri::command]
#[specta::specta]
pub async fn get_totaux_ress(request: GetTotauxRequest) -> Result<GetTotauxRessResponse, String> {
    let id = request.id.to_string();
    let all_opps = request.all_opps;
    let all_ress = request.all_ress;
    let fc = request.fc;

    match do_calcs_ress(fc.clone(), id, all_ress) {
        Ok(results) => Ok(GetTotauxRessResponse {
            opp_ress_mont: results.opp_ress_mont,
            opp_ress_caisse: results.opp_ress_caisse,
            opp_ress_emb: results.opp_ress_emb,
            opp_ress_mat: results.opp_ress_mat,
        }),
        Err(e) => Err(format!("Error in heavy calculations/totaux-{}: {}", fc, e)),
    }
}
#[tauri::command]
#[specta::specta]
pub async fn get_totaux_opps(request: GetTotauxRequest) -> Result<GetTotauxOppsResponse, String> {
    let id = request.id.to_string();
    let all_opps = request.all_opps;
    let all_ress = request.all_ress;
    let fc = request.fc;

    match do_calcs_opps(fc.clone(), id, all_opps) {
        Ok(results) => Ok(GetTotauxOppsResponse {
            oppmont: results.oppmont,
            oppcaisse: results.oppcaisse,
            oppemb: results.oppemb,
            oppmat1: results.oppmat1,
            oppmat2: results.oppmat2,
        }),
        Err(e) => Err(format!("Error in heavy calculations/totaux-{}: {}", fc, e)),
    }
}
/* #[tauri::command]
#[specta::specta]
pub async fn execute_raw_sql(request: String) -> Result<Vec<U>, Box<dyn std::error::Error>> {
    let connection = &mut establish_connection();
    let results = sql_query(request).load::<U>(connection);
    Ok(results)
} */

fn filtremontanttableopp(
    tablename: &str,
    cle: &str,
    id: i32,
    cle2: &str,
    id2: i32,
    typ: &str,
    cx: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let connection = &mut establish_connection();
    let mut sql_q = format!("SELECT * FROM {} WHERE montant != 0", tablename);

    if cle != "tous" {
        sql_q.push_str(&format!(" AND {} = {}", cle, id));
    }

    if cle2 != "tous" {
        sql_q.push_str(&format!(" AND {} = {}", cle2, id2));
        match typ {
            "PROD" | "SERV" => sql_q.push_str(&format!(" AND selected = '{}'", typ)),
            "MAT" => sql_q.push_str(&format!(
                " AND ({}1 = {} OR {}2 = {})",
                cle2, id2, cle2, id2
            )),
            "CAISSE" => {
                if cx == "total" {
                    sql_q.push_str(" AND (selected = 'CS' OR selected = 'CN' OR selected = 'CA')");
                } else {
                    sql_q.push_str(&format!(" AND selected = '{}'", cx));
                }
            }
            "EMB" => {
                if cx == "total" {
                    sql_q.push_str(
                        " AND (selected = 'boite' OR selected = 'EMBC' OR selected = 'EMBF')",
                    );
                } else {
                    sql_q.push_str(&format!(" AND selected = '{}'", cx));
                }
            }
            _ => {}
        }
    }

    sql_q.push_str(" ORDER BY date DESC");

    // let results = sql_query(&sql_q).load::<Value>(connection)?;

    Ok(())
}

// Define the Filter struct
pub struct Filter {
    property: String,
    operator: String,
    value: String,
}

// Define the Filterable trait
pub trait Filterable {
    fn matches_filter(&self, filter: &Filter) -> bool;
}

#[macro_export]
macro_rules! impl_filterable {
    ($type:ty) => {
        impl Filterable for $type {
            fn matches_filter(&self, filter: &Filter) -> bool {
                match filter.property.as_str() {
                    "some_field" => match filter.operator.as_str() {
                        ">" => self.some_field > filter.value.parse().unwrap(),
                        "<" => self.some_field < filter.value.parse().unwrap(),
                        "=" => self.some_field == filter.value,
                        _ => false,
                    },
                    _ => false,
                }
            }
        }
    };
}

// Use the macro to implement the Filterable trait for all types
//impl_filterable!(Fournisseur);
// Add more types as needed

// Modify the post_filter function to take an array of filters
pub fn post_filter<T, F>(fetch_fn: F, filters: &[Filter]) -> Result<Vec<T>, ()>
where
    F: Fn() -> Result<Vec<T>, ()>,
    T: Filterable,
{
    // Call the fetch function to get all items
    let all_items = fetch_fn()?;

    // Filter the results based on all filters
    let filtered_items = all_items
        .into_iter()
        .filter(|item| {
            // The item matches if it matches all filters
            filters.iter().all(|filter| item.matches_filter(filter))
        })
        .collect();

    Ok(filtered_items)
}
