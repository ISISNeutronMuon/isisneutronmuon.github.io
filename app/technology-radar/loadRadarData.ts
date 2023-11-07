import { jsonToRadar } from "@/lib/radar/io/json";
import { readFileSync } from "fs";
import { join } from "path";

const radarJsonPath = join(process.cwd(), 'public', 'radar.json');

export let loadRadarData = () => {
  const jsonContent = readFileSync(radarJsonPath);
  return jsonToRadar(jsonContent.toString());
};
