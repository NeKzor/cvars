// Copyright (c) 2020-2023, NeKz
// SPDX-License-Identifier: MIT

use crate::offsets;

pub type CreateInterfaceFn = fn(*const libc::c_char, *mut libc::c_int) -> usize;

#[repr(C)]
#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "portal2_ce",
    feature = "vr"
))]
pub struct ConCommandBase {
    pub base_vtable: *mut libc::c_void,   // 0
    pub next: *mut ConCommandBase,        // 4
    pub registered: bool,                 // 8
    pub name: *const libc::c_char,        // 12
    pub help_string: *const libc::c_char, // 16
    pub flags: libc::c_int,               // 20
}

#[repr(C)]
#[cfg(feature = "dota2")]
pub struct ConCommandBase {
    pub base_vtable: *mut libc::c_void,   // 0
    pub _unk0: *mut libc::c_void,         // 4
    pub next: *mut ConCommandBase,        // 8
    pub registered: bool,                 // 12
    pub name: *const libc::c_char,        // 16
    pub help_string: *const libc::c_char, // 20
    pub flags: libc::c_int,               // 24
    pub _unk1: libc::c_int,               // 28
}

impl ConCommandBase {
    pub unsafe fn is_command(&self) -> bool {
        std::mem::transmute::<_, fn() -> bool>(
            (self.base_vtable as *mut usize)
                .offset(offsets::IS_COMMAND)
                .read() as *mut usize,
        )()
    }
}

#[repr(C)]
#[allow(unused)]
pub struct ConVar {
    // we don't need all fields here
    pub base: ConCommandBase,               // 0
    pub vtable: *mut libc::c_void,          // 24
    pub parent: *mut ConVar,                // 28
    pub default_value: *const libc::c_char, // 32
}

#[repr(C)]
#[allow(unused)]
#[derive(Copy, Clone)]
pub struct ICvar {
    pub con_command_list: *mut ConCommandBase, // 40, 44, 48 (80 x64)
}
