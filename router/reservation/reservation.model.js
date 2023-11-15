const mongoose = require('mongoose')
const Schema = mongoose.Schema

let schema = Schema({
    guest_name: String,
    guest_contact: String,
    arrival_time: Date,
    table_size: Number,
    status: { type: String, enum: ['reserved', 'canceled', 'completed'], default: "reserved" },
    create_time: Date
}, {
    collection: 'reservation',
    versionKey: false,
    timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
})

let Model = mongoose.model('reservation', schema)

module.exports = Model;