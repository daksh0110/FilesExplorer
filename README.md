# 📂 Files Explorer (Tauri + React)

A modern **desktop file explorer app** built with [Tauri](https://tauri.app/) and [React](https://react.dev/).  
This project combines the speed and safety of **Rust** with the flexibility of a **React frontend**, resulting in a lightweight, cross-platform desktop app.  

---

## ✨ Features
- ⚡ **Fast & lightweight** – powered by Rust backend  
- 🖥️ **Cross-platform** – runs on Windows, Linux, and macOS  
- 🎨 **Beautiful UI** – built with React + Vite  
- 📑 **File management** – explore, open, and manage files easily  
- 🔌 **Extensible** – easy to add new Rust commands and connect them to React  

---

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 18) → [Download here](https://nodejs.org/)  
- **Rust (cargo, rustc)** → Install via [rustup](https://rustup.rs/)  

  ```bash
  rustc --version
  cargo --version
  
- **Tauri CLI (installed as dev dependency)**
    ```bash
    npm install @tauri-apps/cli --save-dev
**Windows Only: Install Microsoft C++ Build Tools**

During installation, check:

- **Desktop development with C++**

This installs:

- `cl.exe`
- `link.exe`
- Windows SDK (required for Rust)

### 2. Clone the Repo
   ```bash
   git clone https://github.com/daksh0110/FilesExplorer
   ```
### 3. Run in development mode

```bash
npm run tauri dev
```
### 4. Build a distributable app

To package your app into an installer:

```bash
npm run tauri build
Output:
