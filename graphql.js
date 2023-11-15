const { GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const mongodb = require("mongodb")
const mongoose = require("mongoose")

const Reservation = new GraphQLObjectType({
    name: "reservation",
    fields: () => ({
        _id: { type: GraphQLString, description: "Reservation ID" },
        guest_name: { type: GraphQLString, description: "Guest Name" },
        arrival_time: { type: GraphQLString, description: "Arrival Time" },
        status: { type: GraphQLString, description: "Status" },
    }),
})

const ReservationConditon = new GraphQLInputObjectType({
    name: "ReservationConditon",
    fields: {
        _id: { type: GraphQLString },
        guest_name: { type: GraphQLString },
        status: { type: GraphQLString },
        arrival_time: { type: GraphQLString },
    }
})

const ReservationFields = new GraphQLInputObjectType({
    name: "ReservationFields",
    fields: {
        _id: { type: GraphQLInt },
        guest_name: { type: GraphQLInt },
    }
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            reservations: {
                type: new GraphQLList(Reservation),
                args: {
                    condition: {
                        name: 'condition', description: 'reservation condition', type: ReservationConditon,
                    },
                    fields: {
                        name: 'fields', description: 'fields', type: ReservationFields,
                    },
                    sort: {
                        name: 'sort', description: 'sort', type: ReservationFields
                    },
                    page_size: {
                        name: 'page_size', description: 'page size', type: GraphQLInt,
                    },
                    page_number: {
                        name: 'page_number', description: 'page number', type: GraphQLInt,
                    }
                },
                resolve: async (root, args) => {

                    let condition = args.condition;

                    let options = {
                        projection: args.fields,
                        sort: args.sort,
                        limit: args.page_size,
                        skip: (args.page_number - 1) * args.page_size || 0,
                    }

                    if (condition?._id)
                        condition._id = new mongodb.ObjectId(condition._id)

                    let reservations = await mongoose.connection.client.db()
                        .collection(Reservation.name).find(condition, options).toArray()
                    return reservations;

                },
            },
            reservation: {
                type: Reservation,
                args: {
                    condition: {
                        name: 'condition', description: 'reservation condition', type: ReservationConditon,
                    },
                },
                resolve: async (root, args) => {

                    let condition = args.condition;

                    if (condition?._id)
                        condition._id = new mongodb.ObjectId(condition._id)

                    let reservation = await mongoose.connection.client.db()
                        .collection(Reservation.name).findOne(condition)
                    return reservation;

                },
            },
        },
        description: "Hilton Restaurants API"
    }),
})

module.exports = schema;