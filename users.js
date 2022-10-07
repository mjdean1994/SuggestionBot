const lockfile = require('proper-lockfile')
const fs = require("fs")
const { config } = require('process')

const file = "./users.json"
let cache = null

module.exports.setLastMessage = (userId, content, next) => {
    lockfile.lock(file)
        .then((release) => {
            _get((err, obj) => {
                if (err) {
                    release()
                    return next(`Failed to get users object: ${err}`)
                }
                obj[userId] = content
                _set(obj, (err) => {
                    release()
                    if (err) return next(`Failed to set users object: ${err}`)
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