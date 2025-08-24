use std::fs;
#[warn(non_snake_case)]
pub fn delete(path: String, filetype: String) -> Result<(), String> {
    println!("entered here {}", filetype);
    if filetype.to_string() == "directory" {
        fs::remove_dir_all(path).map_err(|e| format!("Failed to delete directory: {}", e))
    } else if filetype != "directory" {
        fs::remove_file(path).map_err(|e| format!("Failed to delete file: {}", e))
    } else {
        Err("Invalid file type specified. Use 'file' or 'directory'.".to_string())
    }
}
