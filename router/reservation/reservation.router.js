const express = require('express')
const router = express.Router()
const joi = require('joi')
const swagger = require('express-joi-simple')
const reservation_model = require("./reservation.model")

router.get("/:reservation_id", swagger.Validate({
    description: 'create a reservation',
    model: 'reservation',
    params: {
        reservation_id: joi.string().required().description('reservation ID')
    },
}), async (req, res) => {

    const reservation_id = req.params.reservation_id;

    let reservation = await reservation_model.findOne({ _id: reservation_id })

    res.json(reservation)

})

router.get("/", swagger.Validate({
    description: 'list reservations',
    query: {
        guest_name: joi.string().optional().description('Guest Name')
    },
}), async (req, res) => {

    // let condition = parseJSON(req.query.condition)
    // let fields = parseJSON(req.query.fields)
    // let sort = parseJSON(req.query.sort)
    // let page_number = parseInt(req.query.page_number)
    // let page_size = parseInt(req.query.page_size)

    let condition = {}

    if (req.query.guest_name)
        condition['guest_name'] = req.query.guest_name

    let docs = await reservation_model
        .find(condition)
        // .select(fields)
        // .sort(sort)
        // .skip((page_number - 1) * page_size).limit(page_size)
        .lean()

    res.json(docs)
})

router.post("/", swagger.Validate({
    description: 'create a reservation',
    model: 'reservation',
    body: {
        guest_name: joi.string().required().description('Guest Name'),
        guest_contact: joi.string().required().description('Guest Contact'),
        arrival_time: joi.string().required().description('Arrival Time'),
        table_size: joi.number().required().description('Table Size')
    },
}), async (req, res) => {

    const guest_name = req.body.guest_name;
    const guest_contact = req.body.guest_contact;
    const arrival_time = req.body.arrival_time;
    const table_size = req.body.table_size;

    let reservation = new reservation_model({
        guest_name,
        guest_contact,
        arrival_time,
        table_size,
    })

    await reservation.save()

    res.json({ message: 'ok' })

})

router.post("/cancel", swagger.Validate({
    description: 'cancel a reservation',
    model: 'reservation',
    body: {
        reservation_id: joi.string().required().description('Reservation ID')
    },
}), async (req, res) => {

    let reservation_id = req.body.reservation_id;
    let reservation = await reservation_model.findById(reservation_id)

    if (!reservation)
        return res.status(404).json({ error: 'reservation_not_found' })

    reservation.status = 'canceled'
    await reservation.save()

    res.json({ message: 'success' })

})

router.post("/complete", swagger.Validate({
    description: 'complete a reservation',
    model: 'reservation',
    body: {
        reservation_id: joi.string().required().description('Reservation ID')
    },
}), async (req, res) => {

    let reservation_id = req.body.reservation_id;
    let reservation = await reservation_model.findById(reservation_id)

    if (!reservation)
        return res.status(404).json({ error: 'reservation_not_found' })

    reservation.status = 'completed'
    await reservation.save()

    res.json({ message: 'success' })

})


router.put("/:reservation_id", swagger.Validate({
    description: 'update a reservation',
    model: 'reservation',
    params: {
        reservation_id: joi.string().required().description('Reservation ID')
    },
}), async (req, res) => {

    let reservation_id = req.params.reservation_id;
    let update = req.body;

    await reservation_model.findOneAndUpdate({ _id: reservation_id }, update)

    res.json({ message: 'success' })

})


router.delete("/:reservation_id", swagger.Validate({
    description: 'delete a reservation',
    model: 'reservation',
    params: {
        reservation_id: joi.string().required().description('Reservation ID')
    },
}), async (req, res) => {

    let reservation_id = req.params.reservation_id;

    await reservation_model.findOneAndRemove({ _id: reservation_id })

    res.json({ message: 'success' })

})


module.exports = router;