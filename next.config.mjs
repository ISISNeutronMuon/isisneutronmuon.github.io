import createMDX from "@next/mdx";

// Set the PUBLIC_ROOT environment variable to the subpath that the application
// is hosted under. It must include the leading /. Defaults to an empty string
const basePath = process.env.PUBLIC_ROOT || "";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  basePath: basePath,
  cleanDistDir: true,
  distDir: "./dist" + basePath,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
