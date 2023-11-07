import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMDXFrontmatter from 'remark-mdx-frontmatter'

// Set the PUBLIC_URL environment variable to the subpath that the application
// is hosted under. It must include the leading /. Defaults to an empty string
const basePath = process.env.PUBLIC_URL || ""

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMDXFrontmatter]
  }
}
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', '.md', 'mdx'],
  basePath: basePath,
  cleanDistDir: true,
  distDir: './dist' + basePath,
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default withMDX(nextConfig)
