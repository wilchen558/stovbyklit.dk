var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var handlebars = require('handlebars');


metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Stovbyklit',
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
      pattern: ["*/*/*html","*/*html","*html"],
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
        }
    }))
    .use(serve({
      port: 8081,
      verbose: true
    }))
    .use(watch({
      paths: {
        "${source}/**/*": true,
        "layout/**/*": "**/*",
      }
    }))
    .build(function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Stovbyklit built!');
      }
    });
