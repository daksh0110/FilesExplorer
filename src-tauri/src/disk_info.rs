use sysinfo::Disks;

use serde::Serialize;
#[warn(dead_code)]
#[derive(Debug,Serialize)]
pub struct DiskInfo{
    name: String,
    mount_point: String,
    available_space: u64,
    total_space: u64,
    disk_type: String,
}

pub fn get_disk_info() ->Vec<DiskInfo> {
    let disks = Disks::new_with_refreshed_list();
    let mut disk_list: Vec<DiskInfo> = Vec::new();
    for disk in disks.list() {
        let disk_info = DiskInfo {
            name: disk.name().to_str().unwrap_or("Unknown").to_string(),
            mount_point: disk.mount_point().to_str().unwrap_or("Unknown").to_string(),
            available_space: disk.available_space(),
            total_space: disk.total_space(),
            disk_type: disk.kind().to_string(),
        };

    
        disk_list.push(disk_info);
    }
    disk_list
}
