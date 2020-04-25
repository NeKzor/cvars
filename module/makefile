BINARY=libcvars.so
STEAM=/home/nekz/.steam/steam/steamapps/common/
ENGINE=portal2
FLAGS=--lib --release --target i686-unknown-linux-gnu -Z unstable-options
EXPORT=cp -fu

build:
	@cargo build $(FLAGS) --out-dir ./bin/$(ENGINE)/ --features $(ENGINE) --no-default-features
	@$(EXPORT) "./bin/$(ENGINE)/$(BINARY)" "$(STEAM)Portal 2/$(BINARY)"

format:
	cargo fmt
