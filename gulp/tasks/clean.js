/**
 * @file Clean module
 * @module tasks/clean
 *
 * @exports cleanBuild
 */

/**`
 * @async
 * @function cleanBuild
 * @desc Clean [./dist]{@link module:configs/path.path.build}
 */
export const cleanBuild = () => app.plugins.del(app.path.buildFolder)
