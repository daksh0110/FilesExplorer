use std::fs::metadata;


pub fn Readfile(path:String)  -> Result<(), String>{
    opener::open(path).map_err(|e| format!("Failed to delete directory: {}", e))

}