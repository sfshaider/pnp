const request = require("supertest");
const faker = require("faker");
const app = require("../server/index.js");
const db = require("../db/contact.js");

let toFind = '0QZ2AzOn5kV7Rzqg'
let partialSearch = 'an'
let toUpdate = '8qezrrVjHKdb8pUV'
let toCreateAndThenDelete = '100'

describe("Find All Contacts", () => {
  it("return all contacts", async () => {
    const res = await request(app).get("/contacts/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

describe("Find A Contact", () => {
  it("should find a contact", async () => {
    const res = await request(app).get("/contacts/" + toFind);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

describe("Find A Contact (Partial Search)", () => {
  it("should find a contact", async () => {
    const res = await request(app).get("/find?=" + toFind);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });
});

describe("Create New Contact", () => {
  let newData = {
    name: {
      first: faker.name.firstName(),
      middle: faker.name.firstName(),
      last: faker.name.lastName(),
    },
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    },
    phone: [
      {
        number: faker.phone.phoneNumber,
        type: "home",
      },
      {
        number: faker.phone.phoneNumber,
        type: "mobile",
      },
    ],
    email: faker.internet.email(),
    _id: toCreateAndThenDelete
  }
  it("should create a new contact", async () => {
    const res = await request(app)
      .post("/contacts/")
      .send(newData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(expect.any(Object));
  });
});

describe("Update A Contact", () => {
  var updated = {
    name: {
      first: faker.name.firstName(),
      middle: faker.name.firstName(),
      last: faker.name.lastName(),
    },
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
    },
    phone: [
      {
        number: faker.phone.phoneNumber,
        type: "home",
      },
      {
        number: faker.phone.phoneNumber,
        type: "mobile",
      },
    ],
    email: faker.internet.email(),
  };

  it("should update a contact", async () => {
    const res = await request(app)
      .put("/contacts/" + toUpdate)
      .send(updated);
    expect(res.statusCode).toEqual(200);
  });
});

describe("Delete A Contact", () => {
  it("should delete a contact", async () => {
    const res = await request(app)
    .delete("/contacts/" + toCreateAndThenDelete);
    expect(res.statusCode).toEqual(200);
  });
});

