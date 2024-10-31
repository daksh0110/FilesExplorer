use std::fs;
#[warn(non_snake_case)]
pub fn Delete (path:String) ->Result<(),String> {
    fs::remove_dir_all(path).map_err(|e| format!("Failed to delete directory: {}", e))
}