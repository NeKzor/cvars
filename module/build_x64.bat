@echo off

SET "binary=cvars.dll"
SET "dest=C:\Program Files (x86)\Steam\SteamApps\common"

cargo build --lib --release --target x86_64-pc-windows-msvc -Z unstable-options --out-dir ./bin/%1/ --features %1 --no-default-features
