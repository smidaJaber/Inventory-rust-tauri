#![allow(dead_code)]
#![allow(unused_variables)]
use crate::utils;
use crate::utils::get_app_dir;
use chrono::Local;
use tauri::regex::Regex;

use diesel::prelude::*;
use diesel::SqliteConnection;
use std::fs::OpenOptions;
use std::io::{Read, Write};
use std::time::Duration;
use std::vec;
use std::{fs, fs::File, path::Path};
use tauri::api::path::download_dir;
use tauri::api::path::home_dir;
use tokio::sync::OnceCell;
use zip::write::FileOptions;
/*use super::api_collection::{
    delete_all_api_collection, export_api_collection, get_api_collections_create_sql,
    get_table_name_api_collection, import_api_collection,
}; */

pub struct ExportData {
    pub name: String,
    pub data: Vec<serde_json::Value>,
}

use dotenvy::dotenv;
use std::env;

use diesel::prelude::*;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn init() {
    if !db_file_exists() {
        create_db_file();
    }

    run_migrations();
}

pub fn establish_db_connection() -> SqliteConnection {
    let db_path = get_db_path().clone();

    SqliteConnection::establish(db_path.as_str())
        .unwrap_or_else(|_| panic!("Error connecting to {}", db_path))
}

fn run_migrations() {
    let connection = &mut establish_connection();
    connection.run_pending_migrations(MIGRATIONS).unwrap();
}

fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    fs::File::create(db_path).unwrap();
}

fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

fn get_db_path() -> String {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").unwrap_or(String::from("db_all.db"));
    database_url
}

pub fn establish_multi_connection(database_urls: Option<Vec<String>>) -> Vec<SqliteConnection> {
    dotenv().ok();

    let database_urls_local: Vec<String> = env::var("DATABASE_URLS")
        .unwrap_or_else(|_| "db_all.db".to_string())
        .split(',')
        .map(|url| url.trim().to_string())
        .collect();
    let mut connections = Vec::new();
    if let Some(urls) = database_urls {
        for database_url in urls {
            let connection = SqliteConnection::establish(&database_url)
                .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));
            connections.push(connection);
        }
    } else {
        connections.push(establish_connection())
    }
    connections
}
pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").unwrap_or(String::from("db_all.db"));
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

async fn get_conn() -> SqliteConnection {
    let dir = Path::new(utils::get_app_dir());
    let file = dir.join("db_all.db");
    fs::create_dir_all(dir).unwrap();
    OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(file.clone())
        .unwrap();

    // dotenv().ok();

    //let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let database_url = file.into_os_string().into_string().unwrap();
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub async fn get_database() -> SqliteConnection {
    let db = get_conn().await;
    db
}

pub async fn init_tables() -> Result<(), std::io::Error> {
    let db: SqliteConnection = get_database().await;
    let init_sql_list = vec![
        "CREATE TABLE X IF NOT EXIST()",
        "CREATE TABLE Y IF NOT EXIST()",
    ];
    /* for sql in init_sql_list {
        db.execute(Statement::from_string(db.get_database_backend(), sql))
            .await?;
    } */
    Ok(())
}

pub async fn export_tables() -> Result<String, std::io::Error> {
    println!("called");
    let download = download_dir().unwrap();

    let local = Local::now();

    let filename = format!("grau-backup-{}.zip", local.format("%Y-%m-%d"));

    let file = File::create(&download.join(filename.clone()))?;
    let w = zip::ZipWriter::new(file);

    Ok(filename)
}

pub async fn import_tables(filename: String) -> Result<(), std::io::Error> {
    let r = zip::ZipArchive::new(File::open(filename)?)?;

    Ok(())
}
