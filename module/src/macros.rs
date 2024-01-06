// Copyright (c) 2020-2024, NeKz
// SPDX-License-Identifier: MIT

#[macro_export]
#[allow(unused)]
macro_rules! cstring {
    ($_str:expr) => {{
        // Disable this verbose lint.
        // See: https://github.com/rust-lang/rust/issues/78691
        #[allow(temporary_cstring_as_ptr)]
        std::ffi::CString::new($_str).unwrap().as_ptr()
    }};
}

#[macro_export]
#[allow(unused)]
macro_rules! cstr {
    ($_ptr:expr) => {{
        std::ffi::CStr::from_ptr($_ptr as *const i8).to_string_lossy()
    }};
}

#[macro_export]
#[allow(unused)]
#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "dota2",
    feature = "vr"
))]
macro_rules! msg {
    ($format:tt, $($arg:tt)*) => {{
        (CONSOLE.unwrap().msg.unwrap())(cstring!($format), $($arg)*);
    }}
}
#[macro_export]
#[allow(unused)]
#[cfg(any(feature = "portal2_ce"))]
macro_rules! msg {
    ($format:tt, $($arg:tt)*) => {{
        let con = CONSOLE.unwrap();
        if (con.is_channel_enabled.unwrap())(con.log_channel_id, crate::modules::LoggingSeverity::Message) {
            let color = (con.get_channel_color.unwrap())(con.log_channel_id);
            (con.log_color.unwrap())(con.log_channel_id, crate::modules::LoggingSeverity::Message, color, cstring!($format), $($arg)*);
        }
    }}
}

#[macro_export]
#[allow(unused)]
#[cfg(any(
    feature = "hl2",
    feature = "portal2",
    feature = "dota2",
    feature = "vr"
))]
macro_rules! warning {
    ($format:tt, $($arg:tt)*) => {{
        (CONSOLE.unwrap().warning.unwrap())(cstring!($format), $($arg)*);
    }}
}
#[macro_export]
#[allow(unused)]
#[cfg(any(feature = "portal2_ce"))]
macro_rules! warning {
    ($format:tt, $($arg:tt)*) => {{
        let con = CONSOLE.unwrap();
        if (con.is_channel_enabled.unwrap())(con.log_channel_id, crate::modules::LoggingSeverity::Warning) {
            let color = (con.get_channel_color.unwrap())(con.log_channel_id);
            (con.log_color.unwrap())(con.log_channel_id, crate::modules::LoggingSeverity::Warning, color, cstring!($format), $($arg)*);
        }
    }}
}
