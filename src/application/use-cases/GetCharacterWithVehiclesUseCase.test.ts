import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCharacterWithVehiclesUseCase } from './GetCharacterWithVehiclesUseCase';
import { CharacterRepository } from '@domain/repositories/CharacterRepository';
import { Character, Vehicle, CharacterWithVehicles } from '@domain/entities/Character';

describe('GetCharacterWithVehiclesUseCase', () => {
  let useCase: GetCharacterWithVehiclesUseCase;
  let mockRepository: CharacterRepository;

  beforeEach(() => {
    mockRepository = {
      getCharacterById: vi.fn(),
      getVehicleByUrl: vi.fn(),
      getCharacterWithVehicles: vi.fn(),
    };
    useCase = new GetCharacterWithVehiclesUseCase(mockRepository);
  });

  it('debe ejecutar el caso de uso correctamente', async () => {
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

    const expectedResult: CharacterWithVehicles = {
      character,
      vehicles: [vehicle],
    };

    vi.mocked(mockRepository.getCharacterWithVehicles).mockResolvedValue(expectedResult);

    const result = await useCase.execute('1');

    expect(mockRepository.getCharacterWithVehicles).toHaveBeenCalledWith('1');
    expect(result).toEqual(expectedResult);
    expect(result.character.name).toBe('Luke Skywalker');
    expect(result.vehicles).toHaveLength(1);
  });

  it('debe propagar errores del repositorio', async () => {
    const error = new Error('Error al obtener el personaje');
    vi.mocked(mockRepository.getCharacterWithVehicles).mockRejectedValue(error);

    await expect(useCase.execute('1')).rejects.toThrow('Error al obtener el personaje');
    expect(mockRepository.getCharacterWithVehicles).toHaveBeenCalledWith('1');
  });
});



