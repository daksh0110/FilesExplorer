use crate::disk_info::DiskInfo;
use crate::sidebarshortcuts::UserDirectory;
use serde::Serialize;

#[derive(Serialize)]
pub struct SidebarData {
    pub drives: Vec<DiskInfo>,
    pub shortcuts: Vec<UserDirectory>,
}

#[tauri::command]
pub fn fetch_sidebar_data() -> SidebarData {
    SidebarData {
        drives: crate::disk_info::get_disk_info(),
        shortcuts: crate::sidebarshortcuts::get_user_directories(),
    }
}
