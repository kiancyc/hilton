import { load } from "https://deno.land/std@0.201.0/dotenv/mod.ts"
import express, { Request, Response } from "npm:express@4"
import mongoose from "npm:mongoose"
import fallback from "npm:express-history-api-fallback"
import reservation from "./router/reservation/reservation.router.ts"

const app = express()
const env = await load()

// mongoose.connect(`mongodb://${env['MONGO_HOST']}/${env['MONGO_DB']}`, {
//     useNewUrlParser: true, useUnifiedTopology: true,
//     user: env['MONGO_USERNAME'], pass: env['MONGO_PASSWORD']
// }).then(() => console.log(`[database]`, `connect`, env['MONGO_DB'])).catch(e => { throw e })

app.use('/api/reservation', reservation)

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong!")
})

app.get("/api/bot/:id", async (req: Request, res: Response) => {
    const bot_id = req.params.id;

    res.send('ok')
})

app.get("/api/bot-list", async (req: Request, res: Response) => {
    res.send('ok')
})

app.get("/api/bot-create", async (req: Request, res: Response) => {

    res.send('ok')
})

app.use(express.static('public'))
app.use(fallback('index.html', { root: 'public' }))

app.listen(80)