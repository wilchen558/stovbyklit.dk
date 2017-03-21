var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var cleanCSS = require('metalsmith-clean-css');
var handlebars = require('handlebars');


metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Stovbyklit.dk',
      description: "Stovbyklit description."
    }
  })
  .source('./src')
  .destination('./public')
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    },
    latestArticles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      limit: 6,
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    relative: false,
    pattern: ':title',
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ["*/*/*html", "*/*html", "*html"],
    partials: {
      header: 'partials/header',
      footer: 'partials/footer',
      menu: 'partials/menu'
    }
  }))
  .use(serve({
    port: 8081,
    verbose: true
  }))
  .use(cleanCSS({
    files: 'assets/**/*.css',
    cleanCSS: {
      rebase: true
    }
  }))
  .use(watch({
    paths: {
      "${source}/**/*": true,
      "layouts/**/*": "**/*",
    }
  }))
  .clean(true)
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Stovbyklit built!');
    }
  });
