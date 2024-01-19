@echo off

SET "binary=cvars.dll"
SET "dest=C:\Program Files (x86)\Steam\SteamApps\common"

cargo build --lib --release --target i686-pc-windows-msvc --features %1 --no-default-features

IF "%1" == "portal2" (
    COPY /Y ".\target\i686-pc-windows-msvc\release\%binary%" "%dest%\Portal 2\%binary%"
)
