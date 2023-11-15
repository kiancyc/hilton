const dotenv = require('dotenv').config()
const mongodb = require("./mongodb")
const express = require('express')
const swagger = require('express-joi-simple')
const cors = require("cors")
const auth = require("express-basic-auth")
const fallback = require('express-history-api-fallback')
const catcherror = require("express-async-errors")
const schema = require('./graphql')
const { graphqlHTTP } = require("express-graphql")

process.env.PORT = process.env.PORT || 80

// mongodb connect
mongodb.connect()

// express
const app = express()
app.use(express.urlencoded({ limit: '100mb', extended: false }))
app.use(express.json({ limit: '100mb' }))
app.use(cors({ origin: true }))

app.use('/api/reservation', require('./router/reservation/reservation.router'))

// graphql
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }))

// error
app.use((err, req, res, next) => {

    console.error('[error]', req.url, req.method, err.message)

    if (err.message.includes('MongooseError'))
        return res.status(500).json({ message: "db_error" })

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: "please_log_in" })
    }

    // joi validate error
    if (err.details)
        return res.status(400).json({ error: err.message })

    return res.status(500).json({ error: err.message })

})

// swagger
app.use(swagger.RequestHandler)

swagger.Doc(app, {
    info: {
        version: "1.0.0",
        title: "Hilton Restaurants",
        description: "REST API",
    },
    host: 'localhost',
    documentationPath: '/docs'
})

// static
app.use('/admin', express.static('admin'))
app.use('/admin', fallback('index.html', { root: 'admin' }))
app.use(express.static('public'))
app.use(fallback('index.html', { root: 'public' }))

// express start
app.listen(80, () => {
    console.log('[express] start :80')

    // swagger doc
    // ...
})