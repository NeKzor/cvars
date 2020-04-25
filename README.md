[![CI](https://github.com/NeKzor/cvars/workflows/CI/badge.svg?branch=master)](https://github.com/NeKzor/cvars/actions?query=branch%3Amaster+workflow%3ACI)
[![CD](https://github.com/NeKzor/cvars/workflows/CD/badge.svg?branch=master)](https://github.com/NeKzor/cvars/actions?query=branch%3Amaster+workflow%3ACD)

# Cvars Database

![preview](https://repository-images.githubusercontent.com/181779162/edc15280-675d-11e9-80e2-7b9f9f1b4913)

## Dumping Format

Dumping format is very simple. No dependencies or sanitisations are required:

`field[cvar_data]field[cvar_data]field[cvar_data]field[end_of_cvar]...`

|Field|Offset|Description|
|---|:-:|---|
|m_pszName|0|Name of cvar.|
|m_pszDefaultValue|1|Default value.|
|m_nFlags|2|FCVAR flags.|
|m_pszHelpString|3|Help description.|

## Dumper

Generic dumping module which will be injected into target process. Can easily be done via `plugin_load`. Requires an injector for SourceEngine 2 games.

Latest builds can be downloaded [here](https://github.com/NeKzor/cvars/actions?query=branch%3Amaster+is%3Asuccess+workflow%3ACI) via GitHub artifacts (requires GitHub account).
