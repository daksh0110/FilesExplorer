use chrono::{DateTime, Local};
use serde::Serialize;
use std::fs;
use std::path::Path;
use std::time::SystemTime;

#[derive(Serialize)]
pub struct EntryInfo {
    name: String,
    path: String,
    file_type: String,
    current_directory: String,
    size: String,     // formatted like "12.3 MB"
    modified: String, // formatted like "2025-08-31 14:37:22"
    accessed: String,
    created: String,
}

pub fn read(path: String) -> Vec<EntryInfo> {
    let mut entries = Vec::new();

    let current_directory_name = Path::new(&path)
        .file_name()
        .unwrap_or_else(|| std::ffi::OsStr::new(""))
        .to_string_lossy()
        .to_string();

    match fs::read_dir(&path) {
        Ok(dir_entries) => {
            for entry_result in dir_entries {
                if let Ok(entry) = entry_result {
                    let path = entry.path();
                    let name = entry
                        .file_name()
                        .into_string()
                        .unwrap_or_else(|_| "Unknown".to_string());
                    let path_string = path.to_string_lossy().to_string();

                    // File type
                    let file_type_string = match entry.file_type() {
                        Ok(ft) if ft.is_dir() => "Directory".to_string(),
                        Ok(ft) if ft.is_file() => "File".to_string(),
                        Ok(ft) if ft.is_symlink() => "Symlink".to_string(),
                        _ => "Unknown".to_string(),
                    };

                    // Metadata
                    let metadata = fs::metadata(&path).ok();

                    let size_str = format_size(metadata.as_ref().map(|m| m.len()));
                    let modified_str =
                        format_time(metadata.as_ref().and_then(|m| m.modified().ok()));
                    let accessed_str =
                        format_time(metadata.as_ref().and_then(|m| m.accessed().ok()));
                    let created_str = format_time(metadata.as_ref().and_then(|m| m.created().ok()));

                    entries.push(EntryInfo {
                        name,
                        path: path_string,
                        file_type: file_type_string,
                        current_directory: current_directory_name.clone(),
                        size: size_str,
                        modified: modified_str,
                        accessed: accessed_str,
                        created: created_str,
                    });
                }
            }
        }
        Err(e) => eprintln!("Error reading dir {}: {}", path, e),
    }

    entries
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
