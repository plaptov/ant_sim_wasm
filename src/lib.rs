#![warn(clippy::all)]
mod utils;
extern crate js_sys;

use wasm_bindgen::prelude::*;
use utils::set_panic_hook;
pub mod internals;
pub mod components;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn init() {
    set_panic_hook();
}