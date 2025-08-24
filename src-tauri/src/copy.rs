use arboard::Clipboard;

// pub fn Copy (path:String,name:String) ->Result<(), String>{
// fs::copy(path,name)
// .map(|_| ())
// .map_err(|e| format!("Failed to copy : {}", e))
// }

pub fn copy(path: &String) {
    let mut clipboard = Clipboard::new().unwrap();
    println!("Clipboard text was: {}", clipboard.get_text().unwrap());

    clipboard.set_text(path).unwrap();
    println!("But now the clipboard text should be: \"{}\"", path);
}
