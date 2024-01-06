[![CI](https://github.com/NeKzor/cvars/workflows/CI/badge.svg?branch=main)](https://github.com/NeKzor/cvars/actions?query=branch%3Amain+workflow%3ACI)
[![CD](https://github.com/NeKzor/cvars/workflows/CD/badge.svg?branch=main)](https://github.com/NeKzor/cvars/actions?query=branch%3Amain+workflow%3ACD)

# Cvars Database

![preview](https://repository-images.githubusercontent.com/181779162/edc15280-675d-11e9-80e2-7b9f9f1b4913)

## Dumping Format

Dumping format is very simple. No dependencies or sanitizations are required:

`field[cvar_data]field[cvar_data]field[cvar_data]field[end_of_cvar]...`

|Field|Offset|Description|
|---|:-:|---|
|m_pszName|0|Name of cvar.|
|m_pszDefaultValue|1|Default value.|
|m_nFlags|2|FCVAR flags.|
|m_pszHelpString|3|Help description.|

## Dumper

Generic dumping module which will be injected into target process which can be done via `plugin_load` in most cases.
SourceEngine 2 games and engines based on Strata Source require an injector.

Latest builds can be downloaded [here] via GitHub artifacts (requires GitHub account).

[here]: https://github.com/NeKzor/cvars/actions?query=branch%3Amain+is%3Asuccess+workflow%3ACI

## License

[MIT License](./LICENSE)
