use std::fs;
use std::path::Path;
use arboard::Clipboard;

pub fn Paste(path:&String)-> Result<(), String > {
    let mut clipboard = Clipboard::new().map_err(|e| format!("Failed to access clipboard: {}", e))?;
    let source_path = clipboard.get_text().map_err(|e| format!("Failed to retrieve text from clipboard: {}", e))?;
    let source_path = Path::new(&source_path);

    let file_name = match source_path.file_name() {
        Some(name) => name,
        None => return Err("No file name found in clipboard path.".to_string()),
    };
    let destination_path = Path::new(path).join(file_name);
    fs::copy(&source_path, &destination_path)
        .map_err(|e| format!("Failed to copy file from '{}' to '{}': {}", source_path.display(), destination_path.display(), e))?;
    Ok(())
}