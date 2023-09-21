import fs from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

import { Octokit } from "@octokit/rest";
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

type GetLatestReleaseResponse = RestEndpointMethodTypes["repos"]["getLatestRelease"]["response"];

const releasesDataDirectory = join(process.cwd(), 'data', 'releases')
const userAgent = 'isisneutronmuon.github.io'
const octokit = new Octokit({
  userAgent: userAgent,
  auth: process.env.GITHUB_TOKEN || ''
});

export const githubInventory = `${releasesDataDirectory}/github.yml`

export async function loadProductDescriptions(yamlFullPath: string) {
  const fileContents = fs.readFileSync(yamlFullPath, 'utf8');
  // todo: needs validation!
  const descriptions = yaml.load(fileContents) as ProductDescription[];
  // convert to object indexed on productName for easy lookup
  const inventory: ProductInventory = {};
  for (let product of descriptions) {
    inventory[product.name] = product;
  }
  return inventory;
}

export async function getLatestReleases(products: ProductInventory) {
  const releases: ReleaseInventory = []
  for (let productName of Object.keys(products)) {
    const description = products[productName];
    const release = await getLatestRelease(description);
    if (release != null) {
      release["productName"] = description.name;
      releases.push(release);
    }
  }
  return releases;
}

async function getLatestRelease(product: ProductDescription) {
  if (product.org && product.repo) {
    // This could be tidied up with Pick and a typeguard...
    const response = validateReleaseResponse(await octokit.rest.repos.getLatestRelease({ owner: product.org, repo: product.repo }));
    const latestRelease: Release = {
      // @ts-expect-error: name has been validated to exist
      title: response.data.name,
      // @ts-expect-error: date has been validated to exist
      date: new Date(response.data.published_at),
      url: response.data.html_url,
    }
    return latestRelease;
  }
  return null;
}

function validateReleaseResponse(response: GetLatestReleaseResponse) {
  const expectedFields = ['name', 'published_at', 'html_url']
  let missing: string[] = []
  for (let field of expectedFields) {
    // @ts-expect-error: reponse.data not indexable
    if (typeof response.data[field] === 'undefined')
      missing.push(field);
  }
  if (missing.length > 0) {
    throw Error(`Missing attributes from response: ${missing}`)
  }

  return response
}

// async function main() {
//   const products = await loadProductInventory(githubInventory);
//   const releases = await getLatestReleases(products);
//   console.log(releases)
// }

// await main()
