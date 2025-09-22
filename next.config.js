/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // 정적 HTML export
  trailingSlash: true,    // GitHub Pages 라우팅 안전하게
}

module.exports = nextConfig;

