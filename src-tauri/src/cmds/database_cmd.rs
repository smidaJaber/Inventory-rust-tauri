use crate::database::export_tables;
use serde::Deserialize;
use specta::Type;

use chrono::Local;

use std::fs::OpenOptions;
use std::io::{Read, Write};
use std::time::Duration;
use std::vec;
use std::{fs, fs::File, path::Path};
use tauri::api::path::download_dir;
use tokio::sync::OnceCell;
use zip::write::FileOptions;

#[tauri::command]
#[specta::specta]
pub async fn export_db() -> Result<String, ()> {
    let download = download_dir().unwrap();

    let local = Local::now();

    let filename = format!("grau-backup-{}.zip", local.format("%Y-%m-%d"));

    let file = File::create(&download.join(filename.clone())).expect("error string name");
    let w = zip::ZipWriter::new(file);

    Ok(filename)
}
