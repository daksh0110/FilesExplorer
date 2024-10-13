use std::fs;
use serde::Serialize;
#[warn(non_snake_case)]

#[derive(Serialize)]
pub struct EntryInfo {
    name:String,
    path:String,
    file_type:String
}

pub fn read_directory(path:String)-> Vec<EntryInfo>{
    let mut directories=Vec::new();
    match fs::read_dir(path) {
       
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) =>{ 
                     let path=entry.path();
                     let name=entry.file_name();   
                     let file_type=entry.file_type().unwrap();
                     let name_string = name.into_string().unwrap_or_else(|_| String::from("Unknown"));
                    let path_string=path.to_string_lossy().to_string();
                    let file_type_string = if file_type.is_dir() {
                        "Directory".to_string()
                    } else if file_type.is_file() {
                        "File".to_string()
                    } else if file_type.is_symlink() {
                        "Symlink".to_string()
                    } else {
                        "Unknown".to_string()
                    };
                     let entry=EntryInfo{
                        name:name_string,
                        path:path_string,
                        file_type:file_type_string,
                    };
                     directories.push(entry);
                },
                   
                    Err(e) => eprintln!("Error: {}", e),
                }
            }
        }
        Err(e) => eprintln!("Error: {}", e),
    }
    directories
}