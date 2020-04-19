use crate::mem::*;
use crate::offsets;
use crate::sdk::*;

pub trait Module {
    fn name(&self) -> &'static str;
    fn init(&mut self) -> Result<(), &'static str>;
    fn shutdown(&self) -> Result<(), &'static str>;
}

#[allow(unused)]
#[derive(Copy, Clone)]
pub struct Tier1 {
    pub cvar: Option<ICvar>,
}

pub type Msg = extern "cdecl" fn(msg_format: *const libc::c_char, ...) -> libc::c_void;
pub type Warning = extern "cdecl" fn(msg_format: *const libc::c_char, ...) -> libc::c_void;

#[allow(unused)]
#[derive(Copy, Clone)]
pub struct Console {
    pub msg: Option<Msg>,
    pub warning: Option<Warning>,
}

impl Console {
    pub fn new() -> Self {
        Self {
            msg: None,
            warning: None,
        }
    }
}

impl Module for Console {
    fn name(&self) -> &'static str {
        if cfg!(windows) {
            "tier0.dll"
        } else {
            "libtier0.so"
        }
    }

    fn init(&mut self) -> Result<(), &'static str> {
        let handle = get_module_handle(self.name());
        if handle != 0 {
            unsafe {
                self.msg = Some(std::mem::transmute::<_, Msg>(get_symbol_address(
                    handle, "Msg",
                )));
                self.warning = Some(std::mem::transmute::<_, Warning>(get_symbol_address(
                    handle, "Warning",
                )));
            }

            Ok(())
        } else {
            Err("unable to get handle")
        }
    }

    fn shutdown(&self) -> Result<(), &'static str> {
        Ok(())
    }
}

impl Tier1 {
    pub fn new() -> Self {
        Self { cvar: None }
    }
}

impl Module for Tier1 {
    fn name(&self) -> &'static str {
        if cfg!(windows) {
            "vstdlib.dll"
        } else {
            "libvstdlib.so"
        }
    }

    fn init(&mut self) -> Result<(), &'static str> {
        let handle = get_module_handle(self.name());
        let factory = get_symbol_address(handle, "CreateInterface");

        let create_interface = unsafe { std::mem::transmute::<_, CreateInterfaceFn>(factory) };
        let icvar = create_interface(cstring!("VEngineCvar007"), 0 as *mut libc::c_int);

        if icvar != 0 {
            let con_command_list =
                unsafe { *((icvar + offsets::CON_COMMAND_LIST) as *mut *mut ConCommandBase) };

            self.cvar = Some(ICvar { con_command_list });

            Ok(())
        } else {
            Err("unable to create VEngineCvar007 interface")
        }
    }

    fn shutdown(&self) -> Result<(), &'static str> {
        Ok(())
    }
}
