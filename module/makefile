ENGINE=portal2
GAME_PATH=/home/nekz/.steam/steam/steamapps/common/Portal 2
BINARY=libcvars.so
FLAGS=--lib --release --target i686-unknown-linux-gnu -Z unstable-options
EXPORT=cp -fu

-include config.mk

build:
	@cargo build $(FLAGS) --out-dir ./bin/$(ENGINE)/ --features $(ENGINE) --no-default-features
	@$(EXPORT) "./bin/$(ENGINE)/libcvars.so" "$(GAME_PATH)/$(BINARY)"

format:
	cargo fmt
