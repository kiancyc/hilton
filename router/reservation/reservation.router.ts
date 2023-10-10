import express, { Request, Response } from "npm:express@4"

const router = express.Router()

router.get("/ping", (req: Request, res: Response) => {
    res.send("pong!")
})

export default router;
