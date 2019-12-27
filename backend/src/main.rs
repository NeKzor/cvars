#![allow(dead_code)]
use std::fs;
use std::path;
use std::io::Write;
use serde::Serialize;
use serde_repr::Serialize_repr;

const API: &str = "../api-new/";
const DATA: &str = "../data/";

const MAP: [(&str, &str); 13] = [
    ("half-life-2",           ""),
    ("portal",                ""),
    ("portal-2",              ""),
    ("the-beginners-guide",   "portal-2"),
    ("the-stanley-parable",   "portal-2"),
    ("infra",                 "portal-2"),
    ("global-offensive",      ""),
    ("black-mesa",            "half-life-2"),
    ("portal-2-sixense",      "portal-2"),
    ("alien-swarm",           ""),
    ("counter-strike-source", ""),
    ("half-life-source",      ""),
    ("team-fortress-2",       ""),
];

#[derive(Serialize_repr, Clone)]
#[repr(u8)]
enum OperatingSystem {
    Windows = 0,
    Linux = 1,
    All = 2,
}

#[derive(Serialize, Clone)]
struct Cvar {
    name: String,
    default: String,
    flags: i32,
    system: OperatingSystem,
    help: String,
    new: bool,
}

fn import_file(file : String, cvars : &mut Vec<Cvar>) {
    let contents = fs::read_to_string(&file)
        .expect("Failed to open file!");

    for cvar in contents.split("[end_of_cvar]") {
        let fields: Vec<&str> = cvar.split("[cvar_data]").collect();
        if fields.len() != 4 {
            break;
        }

        cvars.push(Cvar {
            name: fields[0].to_string(),
            default: fields[1].to_string(),
            flags: fields[2].parse().unwrap(),
            system: OperatingSystem::Windows,
            help: fields[3].to_string(),
            new: false,
        });
    }

    println!("imported {} cvars from {}", cvars.len(), file);    
}

fn merge_unique(a : &mut Vec<Cvar>, b : &mut Vec<Cvar>) {
    for cvar in a.iter_mut() {
        if b.iter().any(|x| x.name == cvar.name) {
            cvar.system = OperatingSystem::All;
        } else {
            cvar.system = OperatingSystem::Windows;
        }
    }

    for cvar in b.iter_mut() {
        if !a.iter().any(|x| x.name == cvar.name) {
            cvar.system = OperatingSystem::Linux;
            a.push(cvar.clone());
        }
    }
}

fn mark_as_new(a : &mut Vec<Cvar>, b : &Vec<Cvar>) {
    for cvar in a.iter_mut() {
        if !b.iter().any(|x| x.name == cvar.name) {
            cvar.new = true;
        }
    }
}

fn export_file(name : String, cvars : &mut Vec<Cvar>) {
    cvars.sort_by(|a, b| a.name.cmp(&b.name));

    fs::File::create(name)
        .expect("Failed to create file")
        .write_all(format!("{{\"Cvars\":{}}}", serde_json::to_string(cvars).unwrap()).as_bytes())
        .unwrap();
}

fn main() {
    if !path::Path::new(API).exists() {
       fs::create_dir(API).expect("Cannot create api direcory");
    }

    let mut sources = vec![];

    for (game, comp) in MAP.iter() {
        let mut windows : Vec<Cvar> = vec![];

        let win = format!("{}{}{}", DATA, game, "_windows.cvars");
        let lin = format!("{}{}{}", DATA, game, "_linux.cvars");

        if path::Path::new(&lin).exists() {
            let mut linux = vec![];

            import_file(lin, &mut linux);
            import_file(win, &mut windows);

            merge_unique(&mut windows, &mut linux);
        } else {
            import_file(win, &mut windows);
        }

        sources.push((*game, *comp, windows));
    }

    for (game, comp, source) in sources.iter() {
        let mut export = source.clone();

        if !comp.is_empty() {
            let reference = sources.iter().find(|x| x.1 == *comp).unwrap();
            mark_as_new(&mut export, &reference.2);
        }

        export_file(format!("{}{}{}", API, game, ".json"), &mut export);
    }
}
