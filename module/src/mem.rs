// Copyright (c) 2020, NeKz
// SPDX-License-Identifier: MIT

#[cfg(target_os = "linux")]
use libc;
#[cfg(target_os = "windows")]
use winapi::shared::minwindef::HMODULE;
#[cfg(target_os = "windows")]
use winapi::um::libloaderapi::{GetModuleHandleA, GetProcAddress};

#[cfg(target_os = "windows")]
pub fn get_module_handle(module_name: &str) -> usize {
    unsafe { GetModuleHandleA(cstring!(module_name)) as usize }
}
#[cfg(target_os = "linux")]
#[must_use = "return value must be passed to close_module_handle"]
pub fn get_module_handle(module_name: &str) -> usize {
    unsafe { libc::dlopen(cstring!(module_name), libc::RTLD_NOLOAD | libc::RTLD_NOW) as usize }
}

#[cfg(target_os = "windows")]
pub fn close_module_handle(_module_handle: usize) {}
#[cfg(target_os = "linux")]
pub fn close_module_handle(module_handle: usize) {
    unsafe {
        libc::dlclose(module_handle as *mut libc::c_void);
    }
}

#[cfg(target_os = "windows")]
pub fn get_symbol_address(module_handle: usize, symbol_name: &str) -> usize {
    unsafe { GetProcAddress(module_handle as HMODULE, cstring!(symbol_name)) as usize }
}
#[cfg(target_os = "linux")]
pub fn get_symbol_address(module_handle: usize, symbol_name: &str) -> usize {
    unsafe { libc::dlsym(module_handle as *mut libc::c_void, cstring!(symbol_name)) as usize }
}
