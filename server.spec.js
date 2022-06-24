const request = require('supertest');
const express = require('express');
const db = require('./data/db-config');

beforeEach(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  
  await db.seed.run();
});


const initial_expected_dragons = [
    {
        "genus": "Dragon",
        "id": 1,
        "is_dimorphic": 1,
        "is_event": 0,
        "is_holiday": 0,
        "is_hybrid": 0,
        "is_special": 0,
        "morphology": "semidrak",
        "name": "Terrae",
        "primary_elemental_affinity": "Earth",
        "secondary_elemental_affinity": null
    },
    {
        "genus": "Dragon",
        "id": 2,
        "is_dimorphic": 0,
        "is_event": 0,
        "is_holiday": 0,
        "is_hybrid": 0,
        "is_special": 0,
        "morphology": "polylindwyrm",
        "name": "Elux Lucis",
        "primary_elemental_affinity": "Light",
        "secondary_elemental_affinity": "Air"
    },
    {
        "genus": "Dragon",
        "id": 3,
        "is_dimorphic": 1,
        "is_event": 0,
        "is_holiday": 0,
        "is_hybrid": 0,
        "is_special": 0,
        "morphology": "wyvern",
        "name": "Aeon Wyvern",
        "primary_elemental_affinity": "Time",
        "secondary_elemental_affinity": null
    },
    {
        "genus": "Dragon",
        "id": 4,
        "is_dimorphic": 0,
        "is_event": 0,
        "is_holiday": 0,
        "is_hybrid": 1,
        "is_special": 1,
        "morphology": "western",
        "name": "Avatar Of Creation",
        "primary_elemental_affinity": "Light",
        "secondary_elemental_affinity": null
    }
];


const server = require('./api/server');

describe('server', () => {

  describe('index route', () => {
    test('should return an OK status code', async () => {

      const response = await request(server).get('/api/dragons');
      const expected_status_code = 200;

      expect(response.status).toEqual(expected_status_code);
    });

    test('should return the correct list of dragons', async () => {

      const response = await request(server).get('/api/dragons');
      expect(response.body).toEqual(initial_expected_dragons);
    });

  });

  describe('can get dragon by ID', () => {

    test('gets dragon with correct name at ID 1', async () => {

      const expected_dragon_ID_1_name = 'Terrae';

      const response = await request(server).get('/api/dragons/1');

      expect(response.body.name).toEqual(expected_dragon_ID_1_name);

    });

  });


  describe('can insert dragon', () => {
    
    test('inserting a dragon missing a required key [is_special] fails with a 400 invalid dragon response', async () => {
    
      const expected_status_code = 400;

      const invalid_dragon = { 
                        'name': 'Pink', genus: 'Dragon', is_holiday: 0, is_event: 0, 
                        is_hybrid: 0, is_dimorphic: 1, morphology: 'western'
                     };
      const response = await request(server).post('/api/dragons').send(invalid_dragon);

      expect(response.status).toEqual(expected_status_code);

    });


    test("inserting a dragon with keys that don't exist in the database returns a 400 invalid dragon response", async () => {
    
      const expected_status_code = 400;

      const invalid_dragon = { 
                        'name': 'Pink', genus: 'Dragon', is_holiday: 0, is_event: 0, 
                        is_hybrid: 0, is_dimorphic: 1, morphology: 'western', is_special: 0,
                        foo: 'bar',
                     };
      
      const response = await request(server).post('/api/dragons').send(invalid_dragon);

      expect(response.status).toEqual(expected_status_code);

    });

    test('inserting a correct dragon inserts the dragon into the database', async () => {
    
      const initial_dragons = await request(server).get('/api/dragons');
      const initial_dragons_length = initial_dragons.body.length

      const valid_dragon = { 
                        'name': 'Pink', genus: 'Dragon', is_holiday: 0, is_event: 0, 
                        is_hybrid: 0, is_dimorphic: 1, morphology: 'western', is_special: 0
                     };

      await request(server).post('/api/dragons').send(valid_dragon);

      const total_final_dragons = await request(server).get('/api/dragons');

      expect(total_final_dragons.body.length).toEqual(initial_dragons_length+1);
       
    });
  
  });

  describe('can update dragon', () => {

    test('valid put returns 200 OK', async () => {
      const expected_status_code = 200;

      const expected_morphology = 'western dragon';

      const updates = { morphology: `${expected_morphology}` };
      const response = await request(server).put('/api/dragons/4').send(updates);

      expect(response.status).toEqual(expected_status_code);

    });

    test("attempting to update a key that doesn't exist in the DB fails with a 400 invalid dragon response", async () => {

      const expected_status_code = 400;

      const response = await request(server).put('/api/dragons/3').send({ foo: 'bar' });

      expect(response.status).toEqual(expected_status_code);


    });


    test("attempting to update a dragon that doesn't exist in the DB returns a 404 response", async () => {
      const expected_status_code = 404;

      const valid_dragon = { 
                        'name': 'Pink', genus: 'Dragon', is_holiday: 0, is_event: 0, 
                        is_hybrid: 0, is_dimorphic: 1, morphology: 'western', is_special: 0
                     };

      const response = await request(server).put('/api/dragons/6').send(valid_dragon);

      expect(response.status).toEqual(expected_status_code);

    });

    test('can change the morphology of AoC to `western DRAGON`', async () => {
      const expected_morphology = 'western dragon';

      const updates = { morphology: `${expected_morphology}` };
      const response = await request(server).put('/api/dragons/4').send(updates);
  
      expect(response.body.morphology).toEqual(expected_morphology);
      
    });
  });

});
