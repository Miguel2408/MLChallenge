const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const DnaData = require('../../api/models/DnaData');

let api;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

test('Mutants | Verify', async () => {
  let DnaDataRow = await DnaData.findOne({
        where: {
          dna: JSON.stringify([
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACGA"
      ]), 
        }
  });
  if (DnaDataRow) await DnaDataRow.destroy();
  const res = await request(api)
    .post('/mutant')
    .set('Accept', /json/)
    .send({
      "dna":[
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACGA"
      ]
    })
    .expect(200);

  // expect(res.body.user).toBeTruthy();

});

test('Mutants | Stats', async () => {

  const res = await request(api)
    .get('/stats')
    .expect(200);


});

