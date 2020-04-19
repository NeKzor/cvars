#[macro_export]
#[allow(unused)]
macro_rules! cstring {
    ($_str:expr) => {{
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
macro_rules! msg {
    ($format:tt, $($arg:tt)*) => {{
        (CONSOLE.unwrap().msg.unwrap())(cstring!($format), $($arg)*);
    }}
}

#[macro_export]
#[allow(unused)]
macro_rules! warning {
    ($format:tt, $($arg:tt)*) => {{
        (CONSOLE.unwrap().warning.unwrap())(cstring!($format), $($arg)*);
    }}
}
