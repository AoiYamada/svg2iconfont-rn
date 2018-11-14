/**
 * Created by Yamada246 on 2016/9/21.
 */

const gulp = require("gulp");
const rename = require("gulp-rename");
const argv = require("minimist")(process.argv.slice(1));
const fs = require("fs");
const iconfont = require("gulp-iconfont");
// var runTimestamp = Math.round(Date.now()/1000);
const consolidate = require("gulp-consolidate");
const { fontName, className, fontPath } = argv;
if(!(fontName && className && fontPath)) {
  throw new Error("Missing argv fontName, className or fontPath");
}

gulp.task("Iconfont", async () => {
  const iconStream = gulp.src([`svg/${fontName}/*.svg`]).pipe(
    iconfont({
      fontName,
      formats: ["ttf", "eot", "woff"],
      normalize: true,
      fontHeight: 2500,
    })
  );

  await Promise.all([
    new Promise(resolve => {
      iconStream.on("glyphs", function(glyphs, options) {
        html(glyphs);
        glyphmaps(glyphs);
        rn();
        gulp
          .src("templates/template.css")
          .pipe(
            consolidate("lodash", {
              glyphs,
              fontName,
              fontPath,
              className,
            })
          )
          .pipe(rename({
            basename: fontName,
          }))
          .pipe(gulp.dest("dest/css/"))
          .on("finish", resolve);
      });
    }),
    new Promise(resolve => {
      iconStream.pipe(gulp.dest("dest/fonts/")).on("finish", resolve);
    }),
  ]);
});

gulp.task("default", ["Iconfont"]);

function html(glyphs) {
  const dest = __dirname + "/dest/";
  const htmlTemplate = `${__dirname}/templates/index.html`;
  const destHTML = `${__dirname}/dest/${fontName}.html`;

  let content = "";
  let html = fs.readFileSync(htmlTemplate).toString();
  glyphs.forEach(function(glyphs) {
    content += `<div class="container"><i class="${className} ${className}-${glyphs.name}">${fontName}</i><br>&#x3C;i class="${className} ${className}-${glyphs.name}"&#x3E;${fontName}&#x3C;/i&#x3E</div>`;
  });

  html = replace(html, {
    ...argv,
    HTML: content,
  });

  fs.existsSync(dest) || fs.mkdirSync(dest);
  fs.writeFileSync(destHTML, html);
}

function rn() {
  const dest = `${__dirname}/react-native`;;
  const jsTemplate = `${__dirname}/templates/template.js`;
  const destJS = `${__dirname}/react-native/${fontName}.js`;

  let js = fs.readFileSync(jsTemplate).toString();

  js = replace(js, argv);

  fs.existsSync(dest) || fs.mkdirSync(dest);
  fs.writeFileSync(destJS, js);
}

function glyphmaps(glyphs) {
  const dest = `${__dirname}/dest/glyphmaps`;
  const destGlyphMap = `${dest}/${fontName}.json`;
  const glyphmap = glyphs.reduce((accu, curr) => {
    accu[curr.name] = curr.unicode[0].charCodeAt(0);
    return accu;
  }, Object.create(null));

  fs.existsSync(dest) || fs.mkdirSync(dest);
  fs.writeFileSync(destGlyphMap, JSON.stringify(glyphmap));
}

function replace(str, data) {
  const temp = str.replace(/<%=\w+%>/g, item => {
      item = item.match(/<%=(.*?)%>/)[1];
      return data[item] ? data[item].toString() : '';
  });
  return temp;
}
