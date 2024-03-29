'use strict';
/**
 * @author Lordpluha <Tesluakevlad@gmail.com>
 * @file Main project file
 * @version 1.0.0
 *
 * @requires gulp
 * @requires typescript
 * @requires jsdoc
 *
 * @requires configs/plugins
 * @requires configs/path
 *
 * @requires tasks/clean~cleanBuild
 * @requires tasks/scss~scss
 * @requires tasks/html~html
 * @requires tasks/images~images
 * @requires tasks/images~svgSprites
 * @requires tasks/js~js
 * @requires tasks/server~server
 * @requires tasks/server~CpCerts
 * @requires tasks/fonts~otfToTtf
 * @requires tasks/fonts~ttfToWoff
 * @requires tasks/fonts~ttfToWoff2
 * @requires tasks/fonts~fontsStyle
 * @requires tasks/fonts~fontsCp
 * @requires tasks/zip~ZipBuild
 * @requires tasks/deploy~FtpUpload
 *
 * @exports dev
 * @exports prod
 *
 * @todo ▶ Добавить bower вместо npm (@since 2.0.0)
 * @todo ▶ <b>{@link module:tasks/uploads}</b>Сделать функции для выгрузки файлов на другие типы удаленных файловых систем
 * @todo ▶ Удалить ненужные event в документации
 * @todo ▶ Улучшить код с помощью уже готового кода в проектах (CabHub.layout)
 * @todo ▶ Улучшить внешний вид и информативность документации (как в коде так и на страничке документации)
 *
 * @copyright Teslyuk Vlad 2020
 * @license GNU
 */

import gulp from 'gulp'
import { path } from "./gulp/configs/path.js"
import { plugins } from "./gulp/configs/plugins.js"

/**
 * @global
 * @type {object}
 * @prop {boolean} isBuild process argument includes --build
 * @prop {boolean} isDev process argument dosen`t include --build
 * @prop {plugin} gulp [gulp]{@link https://www.npmjs.com/package/gulp}
 * @prop {object} path [more about path]{@link module:configs/path}
 * @prop {object} plugins [more about plugins]{@link module:configs/plugins}
 * @prop {string} MainFileType controll [file processing]{@link module:tasks/html} and [serving]{@link module:tasks/server} methods (html/php)
 */
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    gulp: gulp,
    path: path,
    plugins: plugins,
    /**
     * @defaultvalue
     * @desc 'php'/'html'
     */
    MainFileType: 'html'
}

import { cleanBuild } from "./gulp/tasks/clean.js"
import { scss } from "./gulp/tasks/scss.js"
import { html } from "./gulp/tasks/html.js"
import { images, svgSprites } from "./gulp/tasks/images.js"
import { js } from "./gulp/tasks/js.js"
import { CpCerts, server } from "./gulp/tasks/server.js"
import { otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle, fontsCp } from "./gulp/tasks/fonts.js"
import { ZipBuild } from "./gulp/tasks/zip.js"
import { FtpUpload } from "./gulp/tasks/deploy.js"

/**
 * @function watcher
 * @desc Files wathcer
 */
function watcher() {
    /**
     * @desc Событие наблюдения за файлами .scss, .html, картинками и .js
     */
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.images, images)
    gulp.watch(path.watch.js, js)
}

/**
 * @function fonts
 * @async
 *
 * @desc Fonts Processing func
*/
const fonts = gulp.series(fontsStyle, fontsCp)

const fontsConverter = gulp.series(otfToTtf, gulp.parallel(ttfToWoff, ttfToWoff2))

/**
 * @function FilesProcess
 * @async
 *
 * @desc Files Processing func
 */
const FilesProcess = gulp.parallel(fonts, scss, images, svgSprites, html, js)

/**
 * @function dev
 * @async
 *
 * @desc Switch to dev mode func
 */
export const dev = gulp.series(cleanBuild, FilesProcess, gulp.parallel(watcher, gulp.series(CpCerts, server)))

/**
 * @function prod
 * @desc Swhitch to production mode func
 */
export const prod = gulp.series(cleanBuild, gulp.series(fontsConverter, FilesProcess))

/**
 * @desc Production mode UI
 */
gulp.task('prod', prod)

/**
 * @desc Developement mode UI
 */
gulp.task('default', dev)

/**
 * @desc Archivate UI
 */
gulp.task('zip', gulp.series(cleanBuild, FilesProcess, ZipBuild))

/**
 * @desc Project deploy UI
 */
gulp.task('deploy', gulp.series(cleanBuild, FilesProcess, ZipBuild, FtpUpload))

gulp.task('fontsConverter', fontsConverter)

/**
 * @typedef plugin
 * @desc npm module or external plugin
 */