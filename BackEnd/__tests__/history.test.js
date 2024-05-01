const { response } = require("express");
let request = require("supertest");
require("dotenv").config();
request = request("http://localhost:5000");
let token = '';

describe("History function", () => {
    
    beforeAll(async () => {
        const response = await request
            .post('/api/v1/auth/login')
            .send({
                email: "admin1@gmail.com",
                password: "12345678"
            });
        token = response.body.token;
    }); 


    // Get all histories
    it("Get histories from the database and returns success message", async () => {
        const response = await request
            .get(`/api/v1/historys`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data")
    });


  // Add history
    it("Add history to the database and returns success message", async () => {
        const response = await request
        .post('/api/v1/historys')
        .send({
            content: "Test history",
        })
        .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data")
  });

  it("Add history to the database without history content and returns failure message", async () => {
    const response = await request
      .post('/api/v1/historys')
      .send({
        content: "",
    })
        .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({success:false,message:'Cannot create History'});
  });
});