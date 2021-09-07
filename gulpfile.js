const { series, src, dest, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

const concat = require('gulp-concat');

const gulpSass = require('gulp-dart-sass');

// ? Utilidades CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// ? Utilidades Js

const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    css: './build/css',
    js: 'src/js/**/*.js'
};

// * Función que compila SASS

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(gulpSass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css));

}

function minificarcss() {
    return src(paths.scss)
        .pipe(gulpSass({
            outputStyle: "compressed"
        }))
        .pipe(dest(paths.css));
}

function imagenes() {

    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Imagen Minificada' }));
}

function javaScript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./build/js'))
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({ message: 'Version Webp lista' }));
}

function watchArchivos() {
    watch(paths.scss, css); // ? * - La carpeta actual - ** -- Todas las carpetas
    watch(paths.js, javaScript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javaScript, imagenes, versionWebp, watchArchivos);