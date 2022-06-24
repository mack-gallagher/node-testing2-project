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


  describe('can update dragon', () => {
    test('can change the morphology of AoC to `western DRAGON`', async () => {
      const expected_morphology = 'western dragon';

      const updates = { morphology: `${expected_morphology}` };
      const response = await request(server).put('/api/dragons/4').send(updates);
  
      expect(response.body.morphology).toEqual(expected_morphology);
      
    });
  });

});
