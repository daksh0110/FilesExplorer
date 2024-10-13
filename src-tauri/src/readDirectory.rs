use std::fs;
use serde::Serialize;
#[warn(non_snake_case)]

#[derive(Serialize)]
pub struct EntryInfo {
    name:String,
    path:String
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
                     let name_string = name.into_string().unwrap_or_else(|_| String::from("Unknown"));
                    let path_string=path.to_string_lossy().to_string();
                     let entry=EntryInfo{
                        name:name_string,
                        path:path_string,
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