const readline = require('readline');
const promises = require('./libs/promiseLib')
const fs = require("fs")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



let obj = {
    rl: rl
}

promises.readDir(obj)
    .then(promises.listFilesAndAskTarget)
    .then(promises.askDestinationDir)
    .then((obj) => {
        console.log(`Trying to copying ${obj.targetFilePath} to ${obj.destinationDir}`)

        readStream = fs.createReadStream(obj.targetFilePath)

        writeStream = fs.createWriteStream(obj.destinationDir)

        readStream.on('data', (chunk) => {
            writeStream.write(chunk)
        })

        readStream.on('end', () => {
            writeStream.end()
            rl.close()
        })

        writeStream.on('error', (err) => {
            console.log(`Could not finish operation: ${err.message}`)
            rl.close()
        })

        readStream.on('error', (err) => {
            console.log(`Could not finish operation: ${err.message}`)
            rl.close()
        })

        writeStream.on('finish',()=>{
            console.log("File copied")
        })

    })
    .catch((err) => {
        console.log(`Could not finish operation: ${err.message}`)
        rl.close()
    })


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})