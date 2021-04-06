const request = require('supertest')
const faker = require('faker')
const app = require('../server/index.js')
const db = require('../db/contact.js');

describe('Find All Contacts', () => {
    it('return all contacts', async () => {
      const res = await request(app)
        .get('/contacts/')
      expect(res.statusCode).toEqual(200);
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
            last: faker.name.lastName()
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
    expect(res.statusCode).toEqual(201);
  })
});

describe('Find A Contact', () => {
    var query = ''
    db.contactInfo.find({ name: 'harold' }, function (err, docs) {
        query = docs._id;
        });

    it('should find a contact', async () => {
      const res = await request(app)
        .get('/contacts/:id')
        .send({
            _id: query
        })
      expect(res.statusCode).toEqual(200);
    })
  });

  describe('Update A Contact', () => {
    var query = ''
    db.contactInfo.find({ name: 'Harold'}, function (err, docs) {
        query = docs._id;
        });

    it('should update a contact', async () => {
      const res = await request(app)
        .put('/contacts/:id')
        .send({
            name: {
                first: 'Jim',
                middle: faker.name.firstName(),
                last: faker.name.lastName()
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
            
          });
      expect(res.statusCode).toEqual(200);
    })
  });

  describe('Delete A Contact', () => {
    var query = ''
    db.contactInfo.find({ name: 'Jim'}, function (err, docs) {
        query = docs._id;
        });

    it('should delete a contact', async () => {
      const res = await request(app)
        .delete('/contacts/:id')
        .send({
            _id: query
        })
      expect(res.statusCode).toEqual(200);
    })
  });