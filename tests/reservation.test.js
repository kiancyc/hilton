const request = require("superagent")

describe("demo test", () => {
    it("return 5", async () => {
        const res = 2 + 3
        expect(res).toBe(5)
    })
})

describe("GET /api/reservations", () => {
    it("should return all reservations", async () => {
        const res = await request.get("/api/reservation")
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
    })
})

// describe("POST /api/products", () => {
//     it("should create a product", async () => {
//         const res = await request(app).post("/api/products").send({
//             name: "Product 2",
//             price: 1009,
//             description: "Description 2",
//         });
//         expect(res.statusCode).toBe(201);
//         expect(res.body.name).toBe("Product 2");
//     });
// });

// describe("PUT /api/products/:id", () => {
//     it("should update a product", async () => {
//         const res = await request(app)
//             .patch("/api/products/6331abc9e9ececcc2d449e44")
//             .send({
//                 name: "Product 4",
//                 price: 104,
//                 description: "Description 4",
//             });
//         expect(res.statusCode).toBe(200);
//         expect(res.body.price).toBe(104);
//     });
// });

// describe("DELETE /api/products/:id", () => {
//     it("should delete a product", async () => {
//         const res = await request(app).delete(
//             "/api/products/6331abc9e9ececcc2d449e44"
//         );
//         expect(res.statusCode).toBe(200);
//     });
// });