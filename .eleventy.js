const htmlmin = require("html-minifier")

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)
  eleventyConfig.addWatchTarget("./src/_tmp/style.css")
  eleventyConfig.addPassthroughCopy({ "./src/_tmp/style.css": "./style.css" })
  eleventyConfig.addPassthroughCopy({ "./src/js/transitions.js": "./js/transitions.js"})
  eleventyConfig.addPassthroughCopy({ "./src/js/scripts.js": "./js/scripts.js"})
  eleventyConfig.addPassthroughCopy({ "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js" })
  eleventyConfig.addPassthroughCopy("./src/img")
  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  })
  eleventyConfig.addTransform("htmlmin", function(content, outPath) {
    if (process.env.ELEVENTY_PRODUCTION && outPath && outPath.endsWith("html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
}