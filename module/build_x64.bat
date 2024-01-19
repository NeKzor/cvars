@echo off

SET "binary=cvars.dll"
SET "dest=C:\Program Files (x86)\Steam\SteamApps\common"

cargo build --lib --release --target x86_64-pc-windows-msvc --features %1 --no-default-features

IF "%1" == "portal2_ce" (
    COPY /Y ".\target\x86_64-pc-windows-msvc\release\%binary%" "%dest%\Portal Revolution\%binary%"
)
