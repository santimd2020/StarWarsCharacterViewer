import { CharacterRepository } from '@domain/repositories/CharacterRepository';
import { Character, Vehicle, CharacterWithVehicles } from '@domain/entities/Character';
import { SwapiClient } from '../api/SwapiClient';

export class CharacterRepositoryImpl implements CharacterRepository {
  constructor(private readonly swapiClient: SwapiClient) {}

  async getCharacterById(id: string): Promise<Character> {
    return this.swapiClient.getCharacter(id);
  }

  async getVehicleByUrl(url: string): Promise<Vehicle> {
    return this.swapiClient.getVehicle(url);
  }

  async getCharacterWithVehicles(id: string): Promise<CharacterWithVehicles> {
    const character = await this.getCharacterById(id);
    const vehicles = character.vehicles.length > 0
      ? await this.swapiClient.getVehicles(character.vehicles)
      : [];

    return {
      character,
      vehicles,
    };
  }
}






