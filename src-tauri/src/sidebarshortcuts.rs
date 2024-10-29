use dirs::{document_dir, download_dir, picture_dir, video_dir};
use std::path::PathBuf;
use serde::Serialize;

#[derive(Debug,Serialize)]
pub struct UserDirectory {
    pub name: String,
    pub mount_point: Option<PathBuf>,
 
}

pub fn get_user_directories() -> Vec<UserDirectory> {
    vec![
        UserDirectory {
            name: "Documents".to_string(),
            mount_point: document_dir(),
        
        },
        UserDirectory {
            name: "Downloads".to_string(),
            mount_point: download_dir(),
         
        },
        UserDirectory {
            name: "Pictures".to_string(),
            mount_point: picture_dir(),
          
        },
        UserDirectory {
            name: "Videos".to_string(),
            mount_point: video_dir(),
        
        },
    ]
}