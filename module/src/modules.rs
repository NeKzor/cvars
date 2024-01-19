// Copyright (c) 2020, NeKz
// SPDX-License-Identifier: MIT

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

#[repr(C)]
#[derive(Default)]
pub struct Color {
    pub r: libc::c_char,
    pub g: libc::c_char,
    pub b: libc::c_char,
    pub a: libc::c_char,
}

impl Color {
    #[allow(unused)]
    pub const fn new(r: libc::c_char, g: libc::c_char, b: libc::c_char, a: libc::c_char) -> Self {
        Self { r, g, b, a }
    }
}

#[allow(unused)]
pub const UNSPECIFIED_LOGGING_COLOR: Color = Color::new(0, 0, 0, 0);

#[allow(unused)]
pub type RegisterTagsFunc = *const libc::c_void;
#[allow(unused)]
pub type LoggingChannelId = libc::c_int;

#[allow(unused)]
#[repr(i32)]
pub enum LoggingChannelFlags {
    None = 0,
    ConsoleOnly = 1,
    DoNotEcho = 2,
}

#[allow(unused)]
#[repr(i32)]
pub enum LoggingSeverity {
    Message = 0,
    Warning = 1,
    Assert = 2,
    Error = 3,
    HighestSeverity = 4,
}

#[allow(unused)]
#[repr(i64)]
pub enum LoggingResponse {
    Continue = 0,
    Debugger = 1,
    Abort = 2,
}

#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "dota2",
    feature = "vr"
))]
pub type Msg = extern "cdecl" fn(msg_format: *const libc::c_char, ...) -> libc::c_void;
#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "dota2",
    feature = "vr"
))]
pub type Warning = extern "cdecl" fn(msg_format: *const libc::c_char, ...) -> libc::c_void;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemRegisterLoggingChannel = extern "fastcall" fn(
    name: *const libc::c_char,
    register_tags_func: RegisterTagsFunc,
    flags: LoggingChannelFlags,
    minimum_severity: LoggingSeverity,
    spew_color: Color,
) -> LoggingChannelId;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemIsChannelEnabled =
    extern "fastcall" fn(channel_id: LoggingChannelId, severity: LoggingSeverity) -> bool;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemGetChannelColor = extern "fastcall" fn(channel_id: LoggingChannelId) -> Color;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemLog = extern "cdecl" fn(
    channel_id: LoggingChannelId,
    severity: LoggingSeverity,
    msg_format: *const libc::c_char,
    ...
) -> LoggingResponse;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemLogColor = extern "cdecl" fn(
    channel_id: LoggingChannelId,
    severity: LoggingSeverity,
    spew_color: Color,
    msg_format: *const libc::c_char,
    ...
) -> LoggingResponse;

#[cfg(any(feature = "portal2_ce"))]
pub type LoggingSystemLogDirect = extern "fastcall" fn(
    channel_id: LoggingChannelId,
    severity: LoggingSeverity,
    spew_color: Color,
    message: *const libc::c_char,
) -> LoggingResponse;

#[allow(unused)]
#[derive(Copy, Clone)]
#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "dota2",
    feature = "vr"
))]
pub struct Console {
    pub msg: Option<Msg>,
    pub warning: Option<Warning>,
}

#[allow(unused)]
#[derive(Copy, Clone)]
#[cfg(any(feature = "portal2_ce"))]
pub struct Console {
    pub register_logging_channel: Option<LoggingSystemRegisterLoggingChannel>,
    pub is_channel_enabled: Option<LoggingSystemIsChannelEnabled>,
    pub get_channel_color: Option<LoggingSystemGetChannelColor>,
    pub log: Option<LoggingSystemLog>,
    pub log_color: Option<LoggingSystemLogColor>,
    pub log_direct: Option<LoggingSystemLogDirect>,
    pub log_channel_id: LoggingChannelId,
}

impl Console {
    #[cfg(any(
        feature = "hl2",
        feature = "portal2",
        feature = "dota2",
        feature = "vr"
    ))]
    pub fn new() -> Self {
        Self {
            msg: None,
            warning: None,
        }
    }
    #[cfg(any(feature = "portal2_ce"))]
    pub fn new() -> Self {
        Self {
            register_logging_channel: None,
            is_channel_enabled: None,
            get_channel_color: None,
            log: None,
            log_color: None,
            log_direct: None,
            log_channel_id: -1,
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

    #[cfg(any(
        feature = "hl2",
        feature = "portal2",
        feature = "dota2",
        feature = "vr"
    ))]
    fn init(&mut self) -> Result<(), &'static str> {
        let handle = get_module_handle(self.name());

        unsafe {
            self.msg = Some(std::mem::transmute::<_, Msg>(get_symbol_address(
                handle, "Msg",
            )));
            self.warning = Some(std::mem::transmute::<_, Warning>(get_symbol_address(
                handle, "Warning",
            )));
        }

        close_module_handle(handle);

        Ok(())
    }
    #[cfg(any(feature = "portal2_ce"))]
    fn init(&mut self) -> Result<(), &'static str> {
        let handle = get_module_handle(self.name());

        unsafe {
            self.register_logging_channel =
                Some(
                    std::mem::transmute::<_, LoggingSystemRegisterLoggingChannel>(
                        get_symbol_address(handle, "LoggingSystem_RegisterLoggingChannel"),
                    ),
                );
            self.is_channel_enabled =
                Some(std::mem::transmute::<_, LoggingSystemIsChannelEnabled>(
                    get_symbol_address(handle, "LoggingSystem_IsChannelEnabled"),
                ));
            self.get_channel_color = Some(std::mem::transmute::<_, LoggingSystemGetChannelColor>(
                get_symbol_address(handle, "LoggingSystem_GetChannelColor"),
            ));
            self.log = Some(std::mem::transmute::<_, LoggingSystemLog>(
                get_symbol_address(handle, "LoggingSystem_Log"),
            ));
            self.log_color = Some(std::mem::transmute::<_, LoggingSystemLogColor>(
                get_symbol_address(
                    handle,
                    if cfg!(target_os = "windows") {
                        "?LoggingSystem_Log@@YA?AW4LoggingResponse_t@@HW4LoggingSeverity_t@@VColor@@PEBDZZ"
                    } else {
                        "_Z17LoggingSystem_Logi17LoggingSeverity_t5ColorPKcz"
                    },
                ),
            ));
            self.log_direct = Some(std::mem::transmute::<_, LoggingSystemLogDirect>(
                get_symbol_address(handle, "LoggingSystem_LogDirect"),
            ));

            self.log_channel_id = (self.register_logging_channel.unwrap())(
                cstring!("General"),
                std::ptr::null(),
                LoggingChannelFlags::None,
                LoggingSeverity::Message,
                UNSPECIFIED_LOGGING_COLOR,
            );
        }

        close_module_handle(handle);

        Ok(())
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

        close_module_handle(handle);

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
