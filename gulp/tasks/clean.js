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
export const cleanBuild = () =>
    /**
     * @event cleanBuild
     * @desc Event of clean [./dist]{@link module:configs/path.path.build}
     * @see [cleanBuild]{@link module:tasks/clean~cleanBuild}
     */
    app.plugins.del(app.path.buildFolder)
