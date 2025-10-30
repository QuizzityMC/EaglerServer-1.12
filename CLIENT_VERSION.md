# Eaglercraft 1.12.2 Client Version Information

## Current Version
This repository contains the **latest Eaglercraft 1.12.2 WASM-GC client**.

## Verification
All client files have been verified against multiple well-maintained sources:
- alexander-datskov/1.12-eaglercraftx (Updated 2025-04-13)
- glimmercharger/Eaglercraft-For-Offline-Play (Updated 2025-08-30)

### File Checksums (SHA256)
```
assets.epw:      0b5190227441ffd0caabfbeab8f0ecd15dc3b4a1fe89b20f81483aa1ef64a048
bootstrap.js:    59b7af0dc2f03a9b8a194f29aa725fe6a09db4b7e9aabf0d1453d0670ad5f99c
classes.js:      e0a72a8f7f0ad42f71df535b7fd882f6877bf25d6daebc810cb4e1c248a5e7f6
classes.js.map:  eb1f9b61c6c3a93c7f5e57ca31258472cf1b1b0d8dd5a1a1e67eb81cd2877550
favicon.png:     6cdd5b140cbb050fa8c7320aebe2bffe1eb21be34a556d7842ce459c15b57315
index.html:      dbdae32d56cdff52a3eeb0dcd4e6f788ca3f88e7e1f681b3a3631d5b2ab4ef4d
```

## Client Features
- **WASM-GC**: Uses WebAssembly Garbage Collection for improved performance
- **Minecraft 1.12.2**: Full Minecraft 1.12.2 gameplay in the browser
- **Multiplayer**: Supports connecting to Eaglercraft servers via WebSocket
- **Browser Compatible**: Works in modern browsers that support WASM-GC

## Client Files Location
All client files are located in the `/web` directory:
- `index.html` - Main HTML file
- `bootstrap.js` - Bootstrap loader
- `classes.js` - Compiled game code
- `classes.js.map` - Source map for debugging
- `assets.epw` - Game assets package (EPW format)
- `favicon.png` - Site favicon

## Version History
- **Current**: Eaglercraft 1.12.2 WASM-GC (Latest available)
- This version is the standard WASM distribution widely used in the Eaglercraft community

## How to Verify Updates
To check if newer client files are available:
1. Compare checksums with reliable sources like alexander-datskov/1.12-eaglercraftx
2. Check for announcements in the Eaglercraft community
3. Visit official Eaglercraft resources for update information

## Notes
- The term "u2" or "update 2" in relation to Eaglercraft 1.12.2 WASM refers to this current WASM-GC version
- This is the standard and most widely distributed version of the Eaglercraft 1.12 client
- No separate "u2" release has been officially documented or found in community repositories
