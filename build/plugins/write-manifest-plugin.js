const pluginName = "WriteManifestPlugin"

let path = require("path");
let fs = require("fs");

class WriteManifestPlugin {
  constructor() {

  }

  apply(compiler) {
    compiler.hooks.emit.tap(pluginName, (compilation) => {
      let files = Object.assign({})
      let assets = compilation.getStats().toJson().assets

      assets.forEach((file) => {
        let keyArray = file.name.split(".")
        files[`${keyArray[0]}.${keyArray[2]}`] = file.name
      })

      fs.writeFileSync(
        path.resolve("public/manifest.json"),
        JSON.stringify(files, null, 4)
      )
    })
  }
}

module.exports = WriteManifestPlugin;
