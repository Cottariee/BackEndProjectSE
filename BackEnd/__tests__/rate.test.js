let request = require("supertest");
require("dotenv").config();
request = request("http://localhost:5000");

describe("Rate function", () => {
  // Get all ratings
  it("Get rate from the database and returns success message", async () => {
    const cid = "65fd9a8ab477d9016553c764";
    const response = await request.get(`/api/v1/campgrounds/${cid}/rates`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data")
  });

  it("Get rate from the database and returns failure message", async () => {
    const cid = "error";
    const response = await request.get(`/api/v1/campgrounds/${cid}/rates`);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ success: false, message: 'cannot find Rate' });
  });


  // Get single rating
  it("Get a specific rate to the database and returns success message", async () => {
    const cid = "65fd9a8ab477d9016553c764";
    const rateID = "6621c394489b18f5e181b816";
    const response = await request.get(`/api/v1/campgrounds/${cid}/rates/${rateID}`)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data")
  });

  it("Get a specific rate from the database with no campground found and returns failure message", async () => {
    const cid = "65fd9a8ab477d9016553c764";
    const rateID = "65e3155e8afe949a4b740773"; // using user ID instead of campground ID
    const response = await request.get(`/api/v1/campgrounds/${cid}/rates/${rateID}`)
    expect(response.status).toBe(404);
    expect(response.body).toEqual({success:false, message: `No rate with the id of ${rateID}`});
  });

  it("Get a specific rate from the database and returns failure message", async () => {
    const cid = "error"; 
    const rateID = "error";
    const response = await request.get(`/api/v1/campgrounds/${cid}/rates/${rateID}`)
    expect(response.status).toBe(500);
    expect(response.body).toEqual({success:false,message: 'Cannot find Rate'});
  });


  // Add rating
  it("Add rate to the database and returns success message", async () => {
    const cid = "65fd9a8ab477d9016553c764";
    const response = await request
      .post(`/api/v1/campgrounds/${cid}/rates`)
      .send({
        rateContent: 3,
        user:"65e3155e8afe949a4b740773",
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data")
  });

  it("Add rate from the database with no campground found and returns failure message", async () => {
    const cid = "65e3155e8afe949a4b740773";  // using user ID instead of campground ID
    const response = await request
      .post(`/api/v1/campgrounds/${cid}/rates`)
      .send({
        rateContent: 3,
        user:"65e3155e8afe949a4b740773",
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({success: false, message: `No campground with the id of ${cid}`});
  });

  it("Add rate from the database and returns failure message", async () => {
    const cid = "error"; 
    const response = await request
      .post(`/api/v1/campgrounds/${cid}/rates`)
      .send({
        rateContent: 3
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({success:false,message:'Cannot create rating'});
  });
});