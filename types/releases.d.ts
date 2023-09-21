type Release = {
  productName: string,
  title: string,
  date: Date
  url: string
}

type ReleaseInventory = Release[];

type ProductDescription = {
  name: string,
  groupId: string,

  // Optional attributes
  imgUrl?: string,
  org?: string,
  repo?: string
}

type ProductInventory = {
  [productName: string]: ProductDescription
};
