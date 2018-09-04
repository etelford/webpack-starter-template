const pluginName = "CleanDirectoryPlugin"

let fs = require('fs');
let path = require('path');

class CleanDirectoryPlugin {
  constructor(paths) {
    this.paths = paths
  }

  apply(compiler) {
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      this.paths.forEach((dirPath) => {
        fs.readdir(dirPath, (err, files) => {
            files.forEach((file) => {
              fs.unlinkSync(path.resolve(`./${dirPath}/${file}`))
            })
        });
      })
    })
  }
}

module.exports = CleanDirectoryPlugin;
