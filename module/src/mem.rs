use winapi::shared::minwindef::HMODULE;
use winapi::um::libloaderapi::{GetModuleHandleA, GetProcAddress};

pub fn get_module_handle(module_name: &str) -> usize {
    unsafe { GetModuleHandleA(cstring!(module_name)) as usize }
}

pub fn get_symbol_address(module_handle: usize, symbol_name: &str) -> usize {
    unsafe { GetProcAddress(module_handle as HMODULE, cstring!(symbol_name)) as usize }
}
