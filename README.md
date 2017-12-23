# Using rust and wasm with parcel

## Setup
```bash
rustup update
rustup target add wasm32-unknown-unknown --toolchain nightly

git fetch origin pull/312/head:rust-wasm
git checkout rust-wasm

parcel index.html
```