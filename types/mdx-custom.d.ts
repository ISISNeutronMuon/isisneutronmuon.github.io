// remark-mdx-frontmatter extends the MDXModule with a frontmatter definition
declare module "*.mdx" {
  import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";

  export const frontmatter: remarkMdxFrontmatter;
  export default MDXContent;
}

declare module "*.md" {
  import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";

  export const frontmatter: remarkMdxFrontmatter;
  export default MDXContent;
}
