import { Blip } from "@/app/technology-radar/lib/models/blip";

// Testing data
export const TESTING_BLIPS = [
  new Blip("Git", "Tools", "Adopt"),
  new Blip("GitHub", "Tools", "Adopt"),
  new Blip("Jenkins", "Tools", "Adopt"),
  new Blip("Betterer", "Tools", "Trial"),
  new Blip("Flux", "Tools", "Assess"),
  new Blip("GoCD", "Tools", "Hold"),

  new Blip("Continuous Integration", "Techniques", "Adopt"),
  new Blip("GraphQL", "Techniques", "Trial"),
  new Blip("Flux", "Techniques", "Assess"),
  new Blip("SOAP", "Techniques", "Hold"),

  new Blip("M365", "Platforms", "Adopt"),
  new Blip("Podman", "Platforms", "Trial"),
  new Blip("S3 Compatible Storage", "Platforms", "Assess"),
  new Blip("Oracle", "Platforms", "Hold"),

  new Blip("Java", "Languages & Frameworks", "Adopt"),
  new Blip("Rust", "Languages & Frameworks", "Trial"),
  new Blip("Flask", "Languages & Frameworks", "Assess"),
  new Blip(".NET Framework", "Languages & Frameworks", "Hold")
];
