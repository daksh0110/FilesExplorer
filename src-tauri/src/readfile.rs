pub fn readfile(path: String) -> Result<(), String> {
    opener::open(path).map_err(|e| format!("Failed to delete directory: {}", e))
}
