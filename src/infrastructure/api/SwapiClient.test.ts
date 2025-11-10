import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SwapiClient } from './SwapiClient';
import axios from 'axios';
import { Character, Vehicle } from '@domain/entities/Character';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('SwapiClient', () => {
  let swapiClient: SwapiClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    swapiClient = new SwapiClient();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacter', () => {
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

      mockAxiosInstance.get.mockResolvedValue({ data: mockCharacter });

      const result = await swapiClient.getCharacter('1');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/people/1');
      expect(result).toEqual(mockCharacter);
      expect(result.name).toBe('Luke Skywalker');
    });

    it('debe lanzar un error si falla la petición', async () => {
      const error = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(error);

      await expect(swapiClient.getCharacter('1')).rejects.toThrow('Network Error');
    });
  });

  describe('getVehicle', () => {
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
      mockAxiosInstance.get.mockResolvedValue({ data: mockVehicle });

      const result = await swapiClient.getVehicle(vehicleUrl);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(vehicleUrl);
      expect(result).toEqual(mockVehicle);
      expect(result.name).toBe('Snowspeeder');
    });
  });

  describe('getVehicles', () => {
    it('debe obtener múltiples vehículos por URLs', async () => {
      const mockVehicle1: Vehicle = {
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

      const mockVehicle2: Vehicle = {
        name: 'X-34 landspeeder',
        model: 'X-34 landspeeder',
        manufacturer: 'SoroSuub Corporation',
        cost_in_credits: '10550',
        length: '3.4',
        max_atmosphering_speed: '250',
        crew: '1',
        passengers: '1',
        cargo_capacity: '5',
        consumables: 'unknown',
        vehicle_class: 'repulsorcraft',
        pilots: [],
        films: [],
        created: '2014-12-10T16:13:52.586000Z',
        edited: '2014-12-20T21:30:21.675000Z',
        url: 'https://swapi.dev/api/vehicles/7/',
      };

      const urls = [
        'https://swapi.dev/api/vehicles/14/',
        'https://swapi.dev/api/vehicles/7/',
      ];

      mockAxiosInstance.get
        .mockResolvedValueOnce({ data: mockVehicle1 })
        .mockResolvedValueOnce({ data: mockVehicle2 });

      const result = await swapiClient.getVehicles(urls);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Snowspeeder');
      expect(result[1].name).toBe('X-34 landspeeder');
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);
    });

    it('debe retornar un array vacío si no hay URLs', async () => {
      const result = await swapiClient.getVehicles([]);
      expect(result).toEqual([]);
      expect(mockAxiosInstance.get).not.toHaveBeenCalled();
    });
  });
});



