use chrono::{DateTime, Local};
use ignore::Walk;
use serde::Serialize;
use std::fs;
use std::time::SystemTime;
use tauri::{command, Emitter};

#[derive(Serialize, Clone, Debug)]
pub struct SearchResult {
    pub name: String,
    pub path: String,
    pub file_type: String,
    pub size: String,
    pub modified: String,
    pub accessed: String,
    pub created: String,
    pub extension: String,
}

#[command]
pub async fn search_files_stream(window: tauri::Window, path: String, query: String) {
    let query_lower = query.to_lowercase();

    tauri::async_runtime::spawn_blocking(move || {
        for entry in Walk::new(&path) {
            if let Ok(entry) = entry {
                let file_name = entry.file_name().to_string_lossy();

                if file_name.to_lowercase().contains(&query_lower) {
                    // Extract extension
                    let extension = entry
                        .path()
                        .extension()
                        .and_then(|ext| ext.to_str())
                        .unwrap_or("")
                        .to_string();

                    // File type → use extension if it's a file
                    let file_type = match entry.file_type() {
                        Some(ft) if ft.is_dir() => "Directory".to_string(),
                        Some(ft) if ft.is_file() => {
                            if extension.is_empty() {
                                "File".to_string()
                            } else {
                                extension.clone()
                            }
                        }
                        Some(ft) if ft.is_symlink() => "Symlink".to_string(),
                        _ => "Unknown".to_string(),
                    };

                    // Name → file stem (without extension)
                    let name = entry
                        .path()
                        .file_stem()
                        .and_then(|stem| stem.to_str())
                        .unwrap_or(&file_name)
                        .to_string();

                    // Metadata
                    let metadata = fs::metadata(entry.path()).ok();

                    let size = format_size(metadata.as_ref().map(|m| m.len()));
                    let modified = format_time(metadata.as_ref().and_then(|m| m.modified().ok()));
                    let accessed = format_time(metadata.as_ref().and_then(|m| m.accessed().ok()));
                    let created = format_time(metadata.as_ref().and_then(|m| m.created().ok()));

                    let result = SearchResult {
                        name,
                        path: entry.path().to_string_lossy().to_string(),
                        file_type,
                        size,
                        modified,
                        accessed,
                        created,
                        extension,
                    };

                    // Emit result immediately
                    let _ = window.emit("search://result", result);
                }
            }
        }

        let _ = window.emit("search://done", ());
    });
}

/// Format file size into human readable string (B, KB, MB, GB, TB).
fn format_size(size: Option<u64>) -> String {
    match size {
        Some(bytes) => {
            if bytes == 0 {
                return "0 B".to_string();
            }
            let sizes = ["B", "KB", "MB", "GB", "TB"];
            let i = (bytes as f64).log(1024.0).floor() as usize;
            let value = bytes as f64 / 1024_f64.powi(i as i32);
            format!("{:.1} {}", value, sizes[i])
        }
        None => "--".to_string(),
    }
}

/// Format `SystemTime` into a local human-readable timestamp.
fn format_time(time: Option<SystemTime>) -> String {
    match time {
        Some(t) => {
            let dt: DateTime<Local> = t.into();
            dt.format("%Y-%m-%d %H:%M:%S").to_string()
        }
        None => "--".to_string(),
    }
}
