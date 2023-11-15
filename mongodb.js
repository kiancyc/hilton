const checkenv = require('check-env')
const mongoose = require('mongoose')

// check .env
try {
    checkenv(['MONGO_HOST', 'MONGO_DB', 'MONGO_USER', 'MONGO_PASS'])
} catch (error) {
    console.warn('[error]', error.message)
    return
}

// mongodb connect
async function connect() {

    let promise = mongoose.connect(`mongodb+srv://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, {
        useNewUrlParser: true, useUnifiedTopology: true,
        user: process.env.MONGO_USER, pass: process.env.MONGO_PASS
    })

    console.log(`[mongodb]`, `connect`, process.env.MONGO_DB)

    // throw Error('[error][mongodb] ' + e.message)

    return promise;
}

module.exports = { connect }