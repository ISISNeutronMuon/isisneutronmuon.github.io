import nextMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMDXFrontmatter from 'remark-mdx-frontmatter'

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
  basePath: '',
  cleanDistDir: true,
  distDir: './dist',
  output: 'export',
  images: {
    unoptimized: true
  }
}

export default withMDX(nextConfig)
