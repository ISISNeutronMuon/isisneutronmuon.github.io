// Define the path under the domain holding the public assets
export const publicRoot = (process.env.PUBLIC_ROOT || "").replace(/\/$/, "") + "/"

export let assetUrl = (asset: string) => {
  return publicRoot + asset;
}
