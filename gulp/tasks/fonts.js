import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

/**
 * @file Fonts processing module
 * @module tasks/fonts
 *
 * @requires gulp-fonter
 * @requires gulp-ttf2woff2
 *
 * @exports otfToTtf
 * @exports ttfToWoff
 * @exports ttfToWoff2
 * @exports fontsStyle
 * @exports fontsCp
 */

/**
 * @function otfToTtf
 * @desc Fonts convert from .otf to .ttf in [./src/fonts]{@link module:configs/path.path.src}
 * @example otfToTtf()
 */
export const otfToTtf = () =>
    app.gulp.src(`${app.path.src.fontsDir}/**/*.otf`)
        .pipe(fonter({formats: ['ttf']}))
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(app.gulp.dest(app.path.src.fontsDir))

/**
 * @function ttfToWoff
 * @desc Fonts convert from .ttf to .woff in [./src/fonts]{@link module:configs/path.path.src}
 * @example ttfToWoff()
 */
export const ttfToWoff = () =>
    app.gulp.src(`${app.path.src.fontsDir}/**/*.ttf`)
        .pipe(fonter({formats: ['woff']}))
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(app.gulp.dest(app.path.src.fontsDir))

/**
 * @function ttfToWoff2
 * @desc Fonts convert from .ttf to .woff2 in [./src/fonts]{@link module:configs/path.path.src}
 * @example ttfToWoff2()
 */
export const ttfToWoff2 = () =>
    app.gulp.src(`${app.path.src.fontsDir}/**/*.ttf`)
        .pipe(ttf2woff2())
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(app.gulp.dest(app.path.src.fontsDir))

/**
 * @function getScssData
 * @package
 * @desc Getting styles code from [./src/scss/*.scss]{@link module:configs/path.path.src} except _fonts.scss
 * @returns {string} scss code
 *
 * @example const variable = getScssData()
 */
const getScssData = () =>
    app.plugins.fs.readdirSync(app.path.src.scssDir,()=>{})
        .reduce((scssData, file) =>
            file != app.path.src.fontScss
                ?? (scssData += app.plugins.fs.readFileSync(app.path.src.scssDir + '/' + file, 'utf-8')),
        '')

/**
 * @function DirWalk
 * @package
 * @version 1.0.1
 * @desc Recursive applying optional function func() to all font files
 *
 * @param {data_dir} dir scan start dir
 * @param {object} data object for messaging between DirWalk and func()
 * @param {function} func function for processing font files
 *
 * @example DirWalk(dir, Obj, function (data=Data) { // your code })
 */
const DirWalk = (dir, data, func) => {
    data.files_ = data.files_ || []
    app.plugins.fs.readdirSync(dir, ()=>{})
        .forEach((file) => {
            const name = `${dir}/${file}`
            if (app.plugins.fs.statSync(name).isDirectory()) {
                DirWalk(name, data, func)
            } else {
                data.files_.push(name)
                const [file_name, file_ext] = file.split('.')

                // Sending arg by using object Data
                data.file_ext, data.file_name, data.dir, data.name = file_ext, file_name, dir, name

                // Cheking file extension
                ['ttf','woff','woff2','otf','eot','eot?#iefix'].includes(file_ext) ?? func()
            }
        })
}

/**
 * @typedef data_dir
 * @desc Property StringLike of object data
 */

/**
 * @function checkFontParams
 * @package
 * @desc Function for check font params from his name
 *
 * @param {string} file_name file name, which include font style and weight type
 *
 * @return {list} [font_style, font_weight]
 *
 * @example let [font_style, font_weight] = checkFontParams(file_name)
 */
const checkFontParams = file_name => {
    let font_weight = 'normal',
        font_style = (file_name.includes('Italic') || file_name.includes('italic')) ? 'italic' : 'normal'

    // "Exp" decipher as "expression"
    const thinExp = file_name.includes('Thin') || file_name.includes('thin'),
        lightExp = file_name.includes('Light') || file_name.includes('light'),
        extraUltraExp = file_name.includes('Extra') || file_name.includes('extra') || file_name.includes('Ultra') || file_name.includes('ultra'),
        normalRegularExp = file_name.includes('Normal') || file_name.includes('normal') || file_name.includes('Regular') || file_name.includes('regular'),
        mediumExp = file_name.includes('Medium') || file_name.includes('medium'),
        boldExp = file_name.includes('Bold') || file_name.includes('bold'),
        semiDemiExp = file_name.includes('Semi') || file_name.includes('semi') || file_name.includes('Demi') || file_name.includes('demi'),
        blackHeavyExp = file_name.includes('Black') || file_name.includes('black') || file_name.includes('Heavy') || file_name.includes('heavy'),
        bolderExp = file_name.includes('Bolder') || file_name.includes('bolder')

    if (thinExp) font_weight = 100
    else if (lightExp) font_weight = extraUltraExp ? 200 : 300
    else if (normalRegularExp) font_weight = 400
    else if (mediumExp) font_weight = 500
    else if (boldExp) {
        font_weight = 700
        if (semiDemiExp) font_weight = 600
        else if (extraUltraExp) font_weight = 800
    } else if (blackHeavyExp) font_weight = extraUltraExp ? 950 : 900
    else if (bolderExp) font_weight = 1000
    return [font_style, font_weight]
}

/**
 *
 * @function fontsStyle
 * @desc Function, which writing used font in scss code by using mixin font() from _mixins.scss in _fonts.scss throught [DirWalk]{@link module:tasks/fonts~DirWalk}
 * @version 1.0.1
 * @param {functionCallback} done default callback function
 * @example fontsStyle()
 * done()
*/
export const fontsStyle = done => {
    /**
     * @namespace
     * @private
     * @type {object}
     * @prop {string} dir - [source fonts dir]{@link module:configs/path.path.src}
     */
    const Data = { dir: app.path.src.fontsDir },
        /**
         * @namespace
         * @private
         * @type {object}
         */
        out = {}
    app.plugins.fs.writeFileSync(app.path.src.fontsScss, '')
    DirWalk(Data.dir, Data, (data = Data) => {
        // Checking font for using in scss code
        if (getScssData().includes(data.file_name)) {
            // Dir with current files
            const final_dir = data.dir.replace(/\/src/gi, '.')

            out[data.file_name] = out[data.file_name] || {[final_dir]: []}
            out[data.file_name][final_dir].push(data.file_ext)
        }
    })

    // Writing fonts in _fonts.scss
    for (const [font_name, font_dir] in Object.entries(out)) {
        const [font_style, font_weight] = checkFontParams(font_name)
        app.plugins.fs.appendFileSync(app.path.src.fontsScss, `@include font('${font_name}', '${font_dir}', ${font_weight}, ${font_style}, '${out[font_name][font_dir].join("', '")}');\n`)
    }
    done()
}
/**
 * @callback functionCallback
 * @desc Callback function
 */

/**
 * @function fontsCp
 * @desc Function of copying from [./src/fonts]{@link module:configs/path.path.src} to [./dist/fonts]{@link module:configs/path.path.build}
 * @param {functionCallback} done default callback function
 * @example fontsCp()
 */
export const fontsCp = done => {
    /**
     * @namespace
     * @private
     * @type {Object}
     * @prop {string} dir - [source fonts dir]{@link module:configs/path.path.src}
     */
    const Data = { dir: app.path.src.fontsDir }
    app.plugins.fs.mkdirSync(app.path.build.fonts, { recursive: true })
    DirWalk(Data.dir, Data, (data = Data) => {
        // Cheking for using font in code
        getScssData().includes(data.file_name)
            ?? app.gulp.src(data.name)
                .pipe(app.gulp.dest(app.path.build.fonts + '/' + data.dir.split('/')[data.dir.split('/').length - 1]))
    })
    done()
}