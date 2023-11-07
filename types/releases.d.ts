type Release = {
  productName: string,
  title: string,
  date: Date
  url: string
}

type ReleaseInventory = Release[];

type ProductDescription = {
  // Name of the product
  name: string,
  // A short description, may contain markdown formatted text
  description: string,

  // Optional url pointing to the project pages. Must provide this or org/repo
  url?: string
  // Optional owning organization on VCS platform
  org?: string,
  // Optional repository name on VCS platform
  repo?: string
  // Optional url for an image to represent this product
  imgUrl?: string,
}

type ProductInventory = {
  [productName: string]: ProductDescription
};
