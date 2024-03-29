import replace from "gulp-replace"
import plumber from "gulp-plumber"
import notify from "gulp-notify"
import browsersync from "browser-sync"
import newer from "gulp-newer"
import rename from 'gulp-rename'
import fs from 'fs'
import ifPlugin from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import { deleteAsync } from "del"

/**
 * @file Global used plugins module
 * @module configs/plugins
 *
 * @requires gulp-replace
 * @requires gulp-plumber
 * @requires gulp-notify
 * @requires browser-sync
 * @requires gulp-newer
 * @requires gulp-rename
 * @requires fs
 * @requires gulp-if
 * @requires del~deleteAsync
 *
 * @exports plugins
 */

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    rename: rename,
    fs: fs,
    if: ifPlugin,
    sourcemaps: sourcemaps,
    del: deleteAsync
}