// CCvar::m_pConCommandList
#[cfg(feature = "hl2")]
pub const CON_COMMAND_LIST: usize = 44;
#[cfg(feature = "portal2")]
pub const CON_COMMAND_LIST: usize = 48;
#[cfg(all(target_arch = "x86", feature = "dota2"))]
pub const CON_COMMAND_LIST: usize = 40;
#[cfg(all(target_arch = "x86_64", any(feature = "dota2", feature = "vr")))]
pub const CON_COMMAND_LIST: usize = 80;

// ConCommandBase::IsCommand
#[cfg(target_os = "windows")]
pub const IS_COMMAND: isize = 1;
#[cfg(not(target_os = "windows"))]
pub const IS_COMMAND: isize = 2;
