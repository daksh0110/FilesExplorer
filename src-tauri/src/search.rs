use ignore::Walk;
use serde::Serialize;
use tauri::{command, Emitter};

#[derive(Serialize, Clone)]
pub struct SearchResult {
    pub name: String,
    pub path: String,
    pub file_type: String,
}

#[command]
pub async fn search_files_stream(window: tauri::Window, path: String, query: String) {
    // Clone for async move
    let query_lower = query.to_lowercase();

    tauri::async_runtime::spawn_blocking(move || {
        for entry in Walk::new(&path) {
            if let Ok(entry) = entry {
                let file_name = entry.file_name().to_string_lossy();

                if file_name.to_lowercase().contains(&query_lower) {
                    let file_type = match entry.file_type() {
                        Some(ft) if ft.is_dir() => "Directory",
                        Some(ft) if ft.is_file() => "File",
                        Some(ft) if ft.is_symlink() => "Symlink",
                        _ => "Unknown",
                    }
                    .to_string();

                    let result = SearchResult {
                        name: file_name.to_string(),
                        path: entry.path().to_string_lossy().to_string(),
                        file_type,
                    };

                    // Emit result immediately
                    let _ = window.emit("search://result", result);
                }
            }
        }

        // Finished
        let _ = window.emit("search://done", ());
    });
}
