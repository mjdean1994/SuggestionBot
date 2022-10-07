const lockfile = require('proper-lockfile')
const fs = require("fs")
const { config } = require('process')
const file = "./config.json"
let cache = null

module.exports.setInputChannel = (channel, next) => {
    let channelId = channel.id
    lockfile.lock(file)
        .then((release) => {
            _get((err, obj) => {
                if (err) {
                    release()
                    return next(`Failed to get config object: ${err}`)
                }
                obj.inputChannelId = channelId
                _set(obj, (err) => {
                    release()
                    if (err) return next(`Failed to set config object: ${err}`)
                    console.log(`Successfully set input channel to ${channelId}.`)
                    return next(null)
                })
            })
        })
}

module.exports.setOutputChannel = (channel, next) => {
    let channelId = channel.id
    lockfile.lock(file)
        .then((release) => {
            _get((err, obj) => {
                if (err) {
                    release()
                    return next(`Failed to get config object: ${err}`)
                }
                obj.outputChannelId = channelId
                _set(obj, (err) => {
                    release()
                    if (err) return next(`Failed to set config object: ${err}`)
                    console.log(`Successfully set output channel to ${channelId}.`)
                    return next(null)
                })
            })
        })
}

const _get = (next) => {
    if (cache) return next(null, cache);
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            logger.error(`Failed to read ${file}: ${err}`)
            return next(err, null);
        }
        next(null, JSON.parse(data))
    })
}

const _set = (obj, next) => {
    fs.writeFile(file, JSON.stringify(obj), (err) => {
        if (err) logger.error(`Failed to write to ${file}: ${err}`)
        else cache = obj;
        next(err)
    })
}