// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[warn(dead_code)]
#[warn(unused_imports)]
#[warn(non_snake_case)]
use std::fs;

mod disk_info;
mod read;
mod sidebarshortcuts;
mod delete;
mod readfile;
mod copy;
mod paste;


use crate::disk_info::DiskInfo;
use crate::read::EntryInfo;
use sidebarshortcuts::UserDirectory;
use delete::Delete;
use readfile::Readfile;
use copy::Copy;
use paste::Paste;
 
#[tauri::command]
 fn fetch_logical_drives() ->Vec<DiskInfo> {
   let drives = disk_info::get_disk_info();
   drives
   
}
#[tauri::command]
fn read(path:String )->Vec<EntryInfo> {
read:: read(path)
}
#[tauri::command]
fn createfolder(path: String ,name:String) ->Result<(),String> {
  let folder_path = format!("{}/{}", path ,name);
    
  // Attempt to create the directory
  fs::create_dir(&folder_path).map_err(|e| e.to_string())?; // Handle any errors and convert them to String

  println!("Successfully created folder at: {}", folder_path); // Optional: print success message
  Ok(()) // Return Ok if successful
}
#[tauri::command]
fn fetch_user_directories() -> Vec<UserDirectory> {
  sidebarshortcuts::get_user_directories()
}
#[tauri::command]
fn delete(path:String ,filetype:String)->Result<(),String>{
  println!("file tpye");
  Delete(path ,filetype)
}
#[tauri::command]
fn readfile (path:String)->Result<(),String>{
  Readfile(path)
}

#[tauri::command]
fn copy(path:String) {
  Copy(&path)
}

#[tauri::command]
fn paste(path:String)->Result<(),String>{
Paste(&path)

}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![fetch_logical_drives,read,createfolder,fetch_user_directories,delete,readfile,copy,paste])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
