import { load } from "https://deno.land/std@0.201.0/dotenv/mod.ts"
import express, { Request, Response } from "npm:express@4"
import { createClient } from 'npm:@supabase/supabase-js'
import fallback from "npm:express-history-api-fallback"

const app = express()
const env = await load()

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong")
})

const supabase = createClient(env['SUPABASE_URL'], env['SUPABASE_PROJECT_KEY'], { auth: { persistSession: false } })

app.get("/api/bot/:id", async (req: Request, res: Response) => {
    const bot_id = req.params.id;
    const { data, error } = await supabase
        .from('bot')
        .select()
        .eq('id', bot_id)
        .limit(1).single()

    res.send(data)
})

app.get("/api/bot-list", async (req: Request, res: Response) => {
    const { data, error } = await supabase
        .from('bot')
        .select().limit(10)

    res.send(data)
})

app.get("/api/bot-create", async (req: Request, res: Response) => {
    const { error } = await supabase
        .from('bot')
        .insert({
            name: '人造人2号',
        })
    res.send(error || 'ok')
})

app.use(express.static('public'))
app.use(fallback('index.html', { root: 'public' }))

app.listen(80)