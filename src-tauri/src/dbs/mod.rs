use std::{
    io::{BufRead, BufReader},
    path::Path,
    process::{Child, Command, Stdio},
    sync::Mutex,
    thread,
    time::Instant,
};

use tauri::Manager;

mod shell;

pub struct DatabaseState(pub Mutex<Option<Child>>);

#[tauri::command]
pub fn start_database(
    window: tauri::Window,
    username: &str,
    password: &str,
    port: u32,
    driver: &str,
    storage: &str,
    executable: &str,
) -> Result<(), String> {
    //let child_result = start_surreal_process(username, password, port, driver, storage, executable);
    let child_result = start_sqlite_database(storage, window.clone());
    let mut child_proc = match child_result {
        Ok(child) => child,
        Err(err) => {
            window
                .emit("database:error", err)
                .expect("error result should be delivered");

            return Err("Failed to start database".to_owned());
        }
    };

    Ok(())
}

#[tauri::command]
pub fn stop_database(window: tauri::Window) -> Result<bool, String> {
    window
        .emit("database:stop", true)
        .expect("start result should be delivered");
    Ok(true)
}

pub fn kill_surreal_process(id: u32) {
    let shell_cmd = shell::build_kill_command(&id);
    let mut cmd_chain = Command::new(&shell_cmd[0]);

    shell::configure_command(&mut cmd_chain);

    cmd_chain
        .args(&shell_cmd[1..])
        .output()
        .expect("surreal process should be killed");
}

pub fn start_surreal_process(
    username: &str,
    password: &str,
    port: u32,
    driver: &str,
    storage: &str,
    executable: &str,
) -> Result<Child, String> {
    let bind_addr = format!("0.0.0.0:{}", port);
    let path = if executable.is_empty() {
        "surreal"
    } else {
        executable
    };
    let mut args = vec![
        path, "start", "--bind", &bind_addr, "--user", username, "--pass", password, "--log",
        "debug",
    ];

    let file_uri = format!("file://{}", storage);
    let tikv_uri = format!("tikv://{}", storage);

    match driver {
        "memory" => args.push("memory"),
        "file" => args.push(file_uri.as_str()),
        "tikv" => args.push(tikv_uri.as_str()),
        _ => Err("Invalid database driver")?,
    }

    let shell_cmd = shell::build_start_command(args);
    let mut cmd_chain = Command::new(&shell_cmd[0]);

    shell::configure_command(&mut cmd_chain);

    let child_proc = cmd_chain
        .args(&shell_cmd[1..])
        .stdout(Stdio::null())
        .stderr(Stdio::piped())
        .spawn()
        .expect("surreal process should be spawned");

    Ok(child_proc)
}

pub fn start_sqlite_database(file: &str, window: tauri::Window) -> Result<(), String> {
    let exists = Path::new(file).exists();
    println!("{} exits ? {}", file, exists.to_string());
    if (exists) {
        window
            .emit("database:start", true)
            .expect("start result should be delivered");
    } else {
        window
            .emit("database:error", "DB file nott found")
            .expect("error result should be delivered");
    }
    //let correct_schema = check_db_grau_schema() TODOO
    Ok(())
}
