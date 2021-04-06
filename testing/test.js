const request = require('supertest')
const faker = require('faker')
const app = require('../server/index.js')
const db = require('../db/contact.js');

describe('Find All Contacts', () => {
    it('return all contacts', async () => {
      const res = await request(app)
        .get('/contacts/')
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.any(Array));
    })
  });

describe('Create New Contact', () => {
  it('should create a new contact', async () => {
    const res = await request(app)
      .post('/contacts/')
      .send({
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
              type: 'home'
            },
            {
              number: faker.phone.phoneNumber,
              type: 'mobile'
            }
          ],
          email: faker.internet.email()
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual(expect.any(Object));
  })
});

describe('Find A Contact', () => {
    it('should find a contact', async () => {
      const res = await request(app)
        .get('/contacts/:id')
        .send({
            _id: 'xZlIKREJuby6aarf'
        })
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expect.any(Object));
    })
  });
