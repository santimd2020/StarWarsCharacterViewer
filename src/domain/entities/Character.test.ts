import { describe, it, expect } from 'vitest';
import { Character, Vehicle, CharacterWithVehicles } from './Character';

describe('Character Entity', () => {
  it('debe definir la estructura de Character correctamente', () => {
    const character: Character = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: ['https://swapi.dev/api/vehicles/14/'],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };

    expect(character.name).toBe('Luke Skywalker');
    expect(character.height).toBe('172');
    expect(character.vehicles).toHaveLength(1);
  });

  it('debe definir la estructura de Vehicle correctamente', () => {
    const vehicle: Vehicle = {
      name: 'Snowspeeder',
      model: 't-47 airspeeder',
      manufacturer: 'Incom corporation',
      cost_in_credits: 'unknown',
      length: '4.5',
      max_atmosphering_speed: '650',
      crew: '2',
      passengers: '0',
      cargo_capacity: '10',
      consumables: 'none',
      vehicle_class: 'airspeeder',
      pilots: ['https://swapi.dev/api/people/1/'],
      films: [],
      created: '2014-12-15T12:22:12Z',
      edited: '2014-12-20T21:30:21.672000Z',
      url: 'https://swapi.dev/api/vehicles/14/',
    };

    expect(vehicle.name).toBe('Snowspeeder');
    expect(vehicle.model).toBe('t-47 airspeeder');
    expect(vehicle.vehicle_class).toBe('airspeeder');
  });

  it('debe definir la estructura de CharacterWithVehicles correctamente', () => {
    const character: Character = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    };

    const vehicle: Vehicle = {
      name: 'Snowspeeder',
      model: 't-47 airspeeder',
      manufacturer: 'Incom corporation',
      cost_in_credits: 'unknown',
      length: '4.5',
      max_atmosphering_speed: '650',
      crew: '2',
      passengers: '0',
      cargo_capacity: '10',
      consumables: 'none',
      vehicle_class: 'airspeeder',
      pilots: [],
      films: [],
      created: '2014-12-15T12:22:12Z',
      edited: '2014-12-20T21:30:21.672000Z',
      url: 'https://swapi.dev/api/vehicles/14/',
    };

    const characterWithVehicles: CharacterWithVehicles = {
      character,
      vehicles: [vehicle],
    };

    expect(characterWithVehicles.character.name).toBe('Luke Skywalker');
    expect(characterWithVehicles.vehicles).toHaveLength(1);
    expect(characterWithVehicles.vehicles[0].name).toBe('Snowspeeder');
  });
});



