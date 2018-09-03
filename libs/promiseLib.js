const fs = require('fs')
const path = require('path')

function readDir(obj) {

    return new Promise((resolve, reject) => {
        obj.rl.question("Enter target dir:", (ans) => {
            obj.targetDir = ans
            fs.readdir(ans, (err, files) => {
                if (err) reject(err)
                else {
                    obj.files = files
                    resolve(obj)
                }
            })
        })
    })

}

function listFilesAndAskTarget(obj) {

    return new Promise((resolve, reject) => {

        if (obj.files.length == 0) reject({ message: "Target directory empty", code: 'EEMPTY' }) // code made by me for empty directory inspired by ENOTEMPTY
        else {
            console.log("Following is the list of files in the target directory. Enter the index of the file to be copied.")
           
            for (let index in obj.files) {
                console.log(`${Number(index) + 1} ${obj.files[index]}`)
            }

            obj.rl.question("Enter index: ", (ans) => {
                if (obj.files[ans - 1]) {
                    obj.targetFile = obj.files[ans - 1]
                    obj.targetFilePath = path.join(obj.targetDir, obj.files[ans - 1])
                    resolve(obj)
                } else reject({ message: "Invalid index", code: 'ENOENT' })
            })
        }

    })
}

function askDestinationDir(obj) {

    return new Promise((resolve, reject) => {

        obj.rl.question("Enter destination: ", (ans) => {
            obj.destinationDir = path.join(ans, obj.targetFile)
            resolve(obj)
        })

    })


}






module.exports = {
    readDir: readDir,
    listFilesAndAskTarget: listFilesAndAskTarget,
    askDestinationDir: askDestinationDir
}