extern crate ctor;
extern crate libc;
#[cfg(windows)]
extern crate winapi;

use ctor::*;

#[macro_use]
mod macros;
mod mem;
mod modules;
mod offsets;
mod sdk;

#[allow(dead_code)]
fn main() {}

static mut CONSOLE: Option<modules::Console> = None;
static mut TIER1: Option<modules::Tier1> = None;

unsafe fn dump_cvars() -> std::io::Result<u32> {
    use std::fs::File;
    use std::io::prelude::*;

    let mut count: u32 = 0;

    let mut dump = File::create("cvars_dump.txt")?;

    let mut current = TIER1.unwrap().cvar.unwrap().con_command_list;

    while !current.is_null() {
        let cvar = &*current;

        write!(dump, "{}[cvar_data]", cstr!(cvar.name))?;

        if !cvar.is_command() {
            let variable = current as *mut sdk::ConVar;
            write!(dump, "{}[cvar_data]", cstr!((*variable).default_value))?;
        } else {
            write!(dump, "cmd[cvar_data]")?;
        }

        write!(dump, "{}[cvar_data]", cvar.flags)?;
        write!(dump, "{}[end_of_cvar]", cstr!(cvar.help_string))?;

        count += 1;

        current = cvar.next;
    }

    Ok(count)
}

unsafe fn init() -> Result<(), &'static str> {
    CONSOLE = Some(modules::Console::new());
    TIER1 = Some(modules::Tier1::new());

    use modules::Module;

    if let Some(mut console) = CONSOLE {
        match console.init() {
            Ok(()) => {
                CONSOLE = Some(console);
            }
            Err(e) => {
                panic!("console init error: {:#?}", e);
            }
        }
    }

    if let Some(mut tier1) = TIER1 {
        match tier1.init() {
            Ok(()) => {
                TIER1 = Some(tier1);
                msg!(
                    "con_command_list: %X (offset %i)\n",
                    tier1.cvar.unwrap().con_command_list,
                    crate::offsets::CON_COMMAND_LIST
                );
                msg!(
                    "size_of ConCommandBase: %i\n",
                    std::mem::size_of::<crate::sdk::ConCommandBase>()
                );
            }
            Err(e) => {
                warning!("%s", cstr!(format!("tier1 init error: {:#?}", e).as_ptr()));
            }
        }
    }

    match dump_cvars() {
        Ok(count) => {
            msg!("Dumped %i cvars to cvars_dump.txt.\n", count);
        }
        Err(e) => {
            warning!("%s", cstr!(format!("cvar dump error: {}", e).as_ptr()));
        }
    }

    Ok(())
}

#[no_mangle]
#[cfg(target_os = "windows")]
#[export_name = "DllMain"]
pub unsafe extern "stdcall" fn dll_main(
    _hinst_dll: winapi::shared::minwindef::HINSTANCE,
    fdw_reason: winapi::shared::minwindef::DWORD,
    _lpv_reserved: winapi::shared::minwindef::LPVOID,
) -> winapi::shared::minwindef::BOOL {
    match fdw_reason {
        winapi::um::winnt::DLL_PROCESS_ATTACH => {
            init().unwrap();
        }
        _ => {}
    }

    winapi::shared::minwindef::FALSE
}

#[cfg(target_os = "linux")]
#[ctor]
unsafe fn ctor() {
    init().unwrap();
}
