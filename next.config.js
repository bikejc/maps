const basePath = process.env["CI"] ? "" : "/maps"
console.log("basePath", basePath)

module.exports = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  publicRuntimeConfig: { basePath, },
}
