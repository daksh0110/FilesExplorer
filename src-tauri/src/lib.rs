// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[warn(dead_code)]
#[warn(unused_imports)]
#[warn(non_snake_case)]
mod disk_info;
mod read;

use crate::disk_info::DiskInfo;
use crate::read::EntryInfo;
#[tauri::command]
 fn fetch_logical_drives() ->Vec<DiskInfo> {
   let drives = disk_info::get_disk_info();
   drives
   
}
#[tauri::command]
fn read(path:String )->Vec<EntryInfo> {
read:: read(path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![fetch_logical_drives,read])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
