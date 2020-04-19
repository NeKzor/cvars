@echo off

SET "binary=cvars.dll"
SET "dest=C:\Program Files (x86)\Steam\SteamApps\common"

cargo build --lib --release --target i686-pc-windows-msvc -Z unstable-options --out-dir ./bin/%1/ --features %1 --no-default-features

IF "%1" == "portal2" (
    COPY /Y ".\bin\portal2\%binary%" "%dest%\Portal 2\%binary%"
)
