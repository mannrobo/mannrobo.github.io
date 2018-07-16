// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-templates-blog-post-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/templates/blog-post.tsx")),
  "component---src-templates-tags-page-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/templates/tags-page.tsx")),
  "component---src-templates-blog-page-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/templates/blog-page.tsx")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/.cache/dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/pages/404.tsx")),
  "component---src-pages-about-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/pages/about.tsx")),
  "component---src-pages-blog-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/pages/blog.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/nain/Documents/mannrobo.github.io/src/pages/index.tsx"))
}

exports.json = {
  "layout-index.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/layout-index.json"),
  "blog-2017-05-02-article-1.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-2017-05-02-article-1.json"),
  "blog-2017-04-18-welcoming.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-2017-04-18-welcoming.json"),
  "blog-2017-05-02-article-2.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-2017-05-02-article-2.json"),
  "blog-tags-test.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-tags-test.json"),
  "blog-tags-starter.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-tags-starter.json"),
  "blog-tags-gatsby.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-tags-gatsby.json"),
  "blog-page-1.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog-page-1.json"),
  "dev-404-page.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/dev-404-page.json"),
  "404.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/404.json"),
  "about.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/about.json"),
  "blog.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/blog.json"),
  "index.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/index.json"),
  "404-html.json": require("/Users/nain/Documents/mannrobo.github.io/.cache/json/404-html.json")
}