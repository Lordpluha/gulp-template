import zipPlugin from 'gulp-zip'
/**
 * @file Module for archiving
 * @module tasks/zip
 *
 * @requires gulp-zip
 *
 * @exports ZipBuild
 * @exports ZipSource
 * @exports Zip
 */

/**
 * @function ZipBuild
 * @desc Function for archiving [./dist]{@link module:configs/path.path.build}
 */
export const ZipBuild = () => {
	app.plugins.del(`./${app.path.rootFolder}-dist.zip`)
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(zipPlugin(`${app.path.rootFolder}-dist.zip`))
		.pipe(app.gulp.dest('./'))
}

/**
 * @function ZipSource
 * @desc Function for archiving [./src]{@link module:configs/path.path.src}
 */
export const ZipSource = () => {
	app.plugins.del(`./${app.path.rootFolder}-src.zip`)
	return app.gulp.src(`${app.path.srcFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(zipPlugin(`${app.path.rootFolder}-src.zip`))
		.pipe(app.gulp.dest('./'))
}

/**
 * @function Zip
 * @desc Function for archiving all project
 */
export const Zip = () => {
	app.plugins.del(`./${app.path.rootFolder}.zip`)
	return app.gulp.src(`${app.path.rootFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./'))
}