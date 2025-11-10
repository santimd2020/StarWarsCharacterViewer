import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CharacterRepositoryImpl } from './CharacterRepositoryImpl';
import { SwapiClient } from '../api/SwapiClient';
import { Character, Vehicle } from '@domain/entities/Character';

describe('CharacterRepositoryImpl', () => {
  let repository: CharacterRepositoryImpl;
  let mockSwapiClient: SwapiClient;

  beforeEach(() => {
    mockSwapiClient = {
      getCharacter: vi.fn(),
      getVehicle: vi.fn(),
      getVehicles: vi.fn(),
    } as unknown as SwapiClient;

    repository = new CharacterRepositoryImpl(mockSwapiClient);
  });

  describe('getCharacterById', () => {
    it('debe obtener un personaje por ID', async () => {
      const mockCharacter: Character = {
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

      vi.mocked(mockSwapiClient.getCharacter).mockResolvedValue(mockCharacter);

      const result = await repository.getCharacterById('1');

      expect(mockSwapiClient.getCharacter).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('getVehicleByUrl', () => {
    it('debe obtener un vehículo por URL', async () => {
      const mockVehicle: Vehicle = {
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

      const vehicleUrl = 'https://swapi.dev/api/vehicles/14/';
      vi.mocked(mockSwapiClient.getVehicle).mockResolvedValue(mockVehicle);

      const result = await repository.getVehicleByUrl(vehicleUrl);

      expect(mockSwapiClient.getVehicle).toHaveBeenCalledWith(vehicleUrl);
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('getCharacterWithVehicles', () => {
    it('debe obtener un personaje con sus vehículos', async () => {
      const mockCharacter: Character = {
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

      const mockVehicle: Vehicle = {
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

      vi.mocked(mockSwapiClient.getCharacter).mockResolvedValue(mockCharacter);
      vi.mocked(mockSwapiClient.getVehicles).mockResolvedValue([mockVehicle]);

      const result = await repository.getCharacterWithVehicles('1');

      expect(mockSwapiClient.getCharacter).toHaveBeenCalledWith('1');
      expect(mockSwapiClient.getVehicles).toHaveBeenCalledWith(mockCharacter.vehicles);
      expect(result.character).toEqual(mockCharacter);
      expect(result.vehicles).toHaveLength(1);
      expect(result.vehicles[0]).toEqual(mockVehicle);
    });

    it('debe retornar un array vacío de vehículos si el personaje no tiene vehículos', async () => {
      const mockCharacter: Character = {
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

      vi.mocked(mockSwapiClient.getCharacter).mockResolvedValue(mockCharacter);

      const result = await repository.getCharacterWithVehicles('1');

      expect(result.character).toEqual(mockCharacter);
      expect(result.vehicles).toEqual([]);
      expect(mockSwapiClient.getVehicles).not.toHaveBeenCalled();
    });
  });
});



