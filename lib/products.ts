import fs from 'fs'
import { join } from 'path'
import { Octokit } from "@octokit/rest";
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';
import yaml from 'js-yaml'

type GetLatestReleaseResponse = RestEndpointMethodTypes["repos"]["getLatestRelease"]["response"];

const productsDataDirectory = join(process.cwd(), 'data', 'products')
const userAgent = 'isisneutronmuon.github.io'
const octokit = new Octokit({
  userAgent: userAgent,
  auth: process.env.GITHUB_TOKEN || ''
});
const githubRepoUrl = (org: string, repo: string) => { return `https://github.com/${org}/${repo}` }

export const ssgInventory = `${productsDataDirectory}/ssg.yml`

export async function loadProductDescriptions(yamlFullPath: string) {
  const fileContents = fs.readFileSync(yamlFullPath, 'utf8');
  // todo: needs validation!
  const rawProducts = yaml.load(fileContents) as ProductDescription[];
  // convert to object indexed on productName for easy lookup
  // and fill in anythin
  const inventory: ProductInventory = {};
  for (let rawProduct of rawProducts) {
    inventory[rawProduct.name] = finalize(rawProduct);
  }
  return inventory;
}

// Take a product and fill in any missing details
function finalize(product: ProductDescription) {
  // If no url is supplied the org/repo is required and
  // this will form the url
  if (!product.url) {
    let missing: string[] = []
    if (!product.org) missing.push('org');
    if (!product.repo) missing.push('repo');
    if (missing.length > 0) {
      throw Error(`${missing} are missing from ${product.name} block`);
    }
    // @ts-expect-error: product.{org,repo} have been checked and are not null
    product.url = githubRepoUrl(product.org, product.repo);
  }
  return product;
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
      productName: product.name,
      title: response.data.name || response.data.tag_name,
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
