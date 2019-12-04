using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace nekzor.github.io
{
    internal class App
    {
        public static readonly string Api = "../api/";
        public static readonly string Data = "../data/";

        internal static async Task Main()
        {
            var data = new List<(string, string)>()
            {
                ("half-life-2", string.Empty),
                ("portal", string.Empty),
                ("portal-2", string.Empty),
                ( "the-beginners-guide", "portal-2"),
                ("the-stanley-parable", "portal-2"),
                ("infra", "portal-2"),
                ("global-offensive", string.Empty),
                ("black-mesa", "half-life-2"),
                ("portal-2-sixense", "portal-2"),
                ("alien-swarm", string.Empty),
                ("counter-strike-source", string.Empty),
                ("half-life-source", string.Empty),
                ("team-fortress-2", string.Empty)
            };

            var builders = new List<(string, string, PageBuilder)>();
            foreach (var (game, comp) in data)
            {
                var builder = new PageBuilder();

                var file = App.Data + game + "_linux.cvars";
                if (System.IO.File.Exists(file))
                {
                    var reference = new PageBuilder();
                    await builder.Import(file, OperatingSystem.Linux);
                    await reference.Import(App.Data + game + "_windows.cvars", OperatingSystem.Windows);
                    await builder.MergeUnique(reference);
                }
                else
                {
                    await builder.Import(App.Data + game + "_windows.cvars", OperatingSystem.Windows);
                }

                builders.Add((game, comp, builder));
            }

            foreach (var (game, comp, builder) in builders)
            {
                if (!string.IsNullOrEmpty(comp))
                {
                    var (_, _, reference) = builders.First(b => b.Item1 == comp);
                    await builder.MarkAsNew(reference);
                }

                await builder.Export(App.Api + game + ".json");
            }
        }

        internal static async Task PrintNew()
        {
            var game = "portal-2";
            //var game = "half-life-2";
            var builder = new PageBuilder();
            var file = App.Data + game + "-new_windows.cvars";
            var reference = new PageBuilder();
            await builder.Import(file, OperatingSystem.Linux);
            await reference.Import(App.Data + game + "_windows.cvars", OperatingSystem.Windows);
            await builder.MergeUnique(reference);
        }
    }

    public enum OperatingSystem
    {
        Windows,
        Linux,
        Both
    }

    public class Cvar
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("default")]
        public string DefaultValue { get; set; }
        [JsonProperty("flags")]
        public int FlagsValue { get; set; }
        [JsonIgnore]
        public IEnumerable<string> Flags { get; set; }
        [JsonProperty("system")]
        public OperatingSystem Os { get; set; }
        [JsonProperty("help")]
        public string HelpText { get; set; }
        [JsonProperty("new")]
        public bool IsNew { get; set; }
    }

    public class PageBuilder
    {
        public List<Cvar> Cvars { get; set; }
        public OperatingSystem Os { get; set; }

        public PageBuilder()
        {
            Cvars = new List<Cvar>();
        }

        public Task FindRealUnique(PageBuilder source)
        {
            var unique = new List<Cvar>();
            foreach (var match in source.Cvars)
            {
                var found = Cvars.FirstOrDefault(c => c.Name == match.Name);
                if (found != null && found.DefaultValue != match.DefaultValue)
                {
                    Console.Write($"{found.Name} -> ");
                    Console.Write($"{source.Os.ToString()}:{match.DefaultValue} ");
                    Console.Write($"{Os.ToString()}:{found.DefaultValue}");
                    Console.WriteLine();
                    unique.Add(match);
                }
            }

            Console.WriteLine($"Found {unique.Count} real unique cvars.");
            return Task.CompletedTask;
        }

        public Task MergeUnique(PageBuilder source)
        {
            var unique = new List<Cvar>();
            foreach (var match in source.Cvars)
            {
                if (Cvars.FirstOrDefault(c => c.Name == match.Name) == null)
                {
                    Console.WriteLine($"[{source.Os.ToString()}] {match.Name}");
                    match.Os = source.Os;
                    unique.Add(match);
                }
                else
                {
                    match.Os = OperatingSystem.Both;
                }
            }
            foreach (var match in Cvars)
            {
                if (source.Cvars.FirstOrDefault(c => c.Name == match.Name) == null)
                {
                    Console.WriteLine($"[{Os.ToString()}] {match.Name}");
                    match.Os = Os;
                }
                else
                {
                    match.Os = OperatingSystem.Both;
                }
            }

            Cvars.AddRange(unique);
            Console.WriteLine($"Merged {unique.Count} cvars.");
            return Task.CompletedTask;
        }

        public Task MarkAsNew(PageBuilder source)
        {
            var count = 0;
            foreach (var match in Cvars)
            {
                if (source.Cvars.FirstOrDefault(c => c.Name == match.Name) == null)
                {
                    Console.WriteLine($"{match.Name}");
                    match.IsNew = true;
                    ++count;
                }
            }

            Console.WriteLine($"Marked {count} cvars as new.");
            return Task.CompletedTask;
        }

        public Task Import(string file, OperatingSystem os = OperatingSystem.Both)
        {
            Cvars.Clear();
            Os = os;

            using var fs = System.IO.File.OpenRead(file);
            using var sr = new System.IO.StreamReader(fs);
            var text = sr.ReadToEnd();
            foreach (var cvar in text.Split(new string[] { "[end_of_cvar]" }, StringSplitOptions.RemoveEmptyEntries))
            {
                var values = cvar.Split(new string[] { "[cvar_data]" }, StringSplitOptions.None);
                if (values.Length != 4)
                    break;

                Cvars.Add(new Cvar()
                {
                    Name = values[0],
                    DefaultValue = values[1],
                    FlagsValue = int.Parse(values[2]),
                    HelpText = values[3],
                    Os = Os
                });
            }

            Console.WriteLine($"Imported {Cvars.Count} cvars from {file}");

            return Task.CompletedTask;
        }

        public Task Export(string file)
        {
            using var fs = System.IO.File.OpenWrite(file);
            using var sw = new System.IO.StreamWriter(fs);
            sw.Write(JsonConvert.SerializeObject(new { Cvars }));
            return Task.CompletedTask;
        }
    }
}
