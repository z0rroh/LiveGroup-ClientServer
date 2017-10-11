const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const pug = require("gulp-pug");
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const copy = require('gulp-contrib-copy');
const pugpage = "./lib/*.pug";

//Vector de tareas a realizar
gulp.task('default',['pug','sass','js','react','watch'],()=>{

    //servidor
    //para que funcione debe existir etiqueta body
    browserSync.init({
        server: {
           baseDir: './public',
        }
     });
});

gulp.task('stylesheet',()=>{
  browserSync.init({
      server: {
         baseDir: './',
         index: "stylesheet.html"
         // en la caso que no sea index.html
      }
   });
   gulp.watch("./stylesheet.html").on('change',reload);
   gulp.watch("./stylesheet.css").on('change',reload);
});

//Escucha la ruta y ejecuta las task si hay cambios
//On change recarga servidor
//./public/*.pug -> Los archivos dentro del public
//./public/**/*.pug -> Todos los archivos pug que exitan dentro de carpeta recursivo
gulp.task('watch',()=>{
  gulp.watch("./lib/**/*.pug",['pug']);
  gulp.watch("./lib/**/*.sass",['sass']);
  gulp.watch("./lib/**/*.js",['js']);
  gulp.watch("./lib/src/**/*.js",['react']);
  gulp.watch("./public/**/*.html").on('change',reload);
  gulp.watch("./assets/**/*.css").on('change',reload);
  gulp.watch("./assets/**/*.js").on('change',reload);
});

gulp.task('react',function(){
    return browserify('lib/src/app.js',{
        debug: true
    })
    .transform(babelify.configure({
        presets: ['es2015','react']
    }))
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./assets/linker/js/'));
});

gulp.task('flexbox',()=>{
  return gulp.src("./bower_components/flexboxgrid/dist/flexboxgrid.css")
          .pipe(gulp.dest("./public/css"));
});

gulp.task('material',['material-sass','material-js']);

gulp.task('material-js',()=>{
  return gulp.src(["./bower_components/materialize/js/initial.js",
          "./bower_components/materialize/js/jquery.easing.1.3.js",
          "./bower_components/materialize/js/animation.js",
          "./bower_components/materialize/js/velocity.min.js",
          "./bower_components/materialize/js/hammer.min.js",
          "./bower_components/materialize/js/jquery.hammer.js",
          "./bower_components/materialize/js/global.js",
          "./bower_components/materialize/js/collapsible.js",
          "./bower_components/materialize/js/dropdown.js",
          "./bower_components/materialize/js/leanModal.js",
          "./bower_components/materialize/js/materialbox.js",
          "./bower_components/materialize/js/parallax.js",
          "./bower_components/materialize/js/tabs.js",
          "./bower_components/materialize/js/tooltip.js",
          "./bower_components/materialize/js/waves.js",
          "./bower_components/materialize/js/toasts.js",
          "./bower_components/materialize/js/sideNav.js",
          "./bower_components/materialize/js/scrollspy.js",
          "./bower_components/materialize/js/forms.js",
          "./bower_components/materialize/js/slider.js",
          "./bower_components/materialize/js/cards.js",
          "./bower_components/materialize/js/chips.js",
          "./bower_components/materialize/js/pushpin.js",
          "./bower_components/materialize/js/buttons.js",
          "./bower_components/materialize/js/transitions.js",
          "./bower_components/materialize/js/scrollFire.js",
          "./bower_components/materialize/js/date_picker/picker.js",
          "./bower_components/materialize/js/date_picker/picker.date.js",
          "./bower_components/materialize/js/character_counter.js",
          "./bower_components/materialize/js/carousel.js"])
          .pipe(concat('materialize.js'))
          .pipe(gulp.dest('./public/js/'));
});

gulp.task('material-sass',()=>{
  return gulp.src('./bower_components/materialize/sass/materialize.scss')
          .pipe(sass.sync().on('error',sass.logError))
          .pipe(gulp.dest('./public/css'));
});

gulp.task('pug',()=>{
  /* pretty true modo develop */
  return gulp.src(pugpage)
          .pipe(pug({pretty:true}))
          .pipe(gulp.dest('./public/'));
});

gulp.task('sass',['sasscompiler','populatesass']);

gulp.task('sasscompiler',()=>{
  /* AUTOPREFIXER: Compila archivo y agrega prefijos navegadores */
  /* PRODUCCIÓN: pipe(sass.sync({outputStyle: 'compressed'}).on('error',sass.logError)) */
   var processors = [
   autoprefixer({browsers: ['last 3 versions']})
   ];
  gulp.src('./lib/app.sass')
    .pipe(sass.sync().on('error',sass.logError))
    .pipe(postcss(processors))
    .pipe(rename('9app.css'))
    .pipe(gulp.dest('./assets/linker/styles'));
});

gulp.task('populatesass',()=>{
  /* AUTOPREFIXER: Compila archivo y agrega prefijos navegadores */
  /* PRODUCCIÓN: pipe(sass.sync({outputStyle: 'compressed'}).on('error',sass.logError)) */
   var processors = [
   autoprefixer({browsers: ['last 3 versions']})
   ];
  gulp.src('./lib/app.sass')
    .pipe(sass.sync().on('error',sass.logError))
    .pipe(postcss(processors))
    .pipe(rename('9app.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js',['jscompiler','populatejs']);

gulp.task('jscompiler',()=>{
  /* .pipe(uglify()) -> produccion*/
  gulp.src(['./lib/util/**/*.js','./lib/Components/**/*.js','./lib/app.js','./lib/*.js'])
    .pipe(concat('app.js'))
    .pipe(rename('9app.js'))
    .pipe(gulp.dest('./assets/linker/js'));
});

gulp.task('populatejs',()=>{
  gulp.src(['./lib/util/**/*.js','./lib/Components/**/*.js','./lib/app.js','./lib/*.js'])
    .pipe(concat('app.js'))
    .pipe(rename('9app.js'))
    .pipe(gulp.dest('./public/js/'));
});
