import { Character, Vehicle, CharacterWithVehicles } from '../entities/Character';

export interface CharacterRepository {
  getCharacterById(id: string): Promise<Character>;
  getVehicleByUrl(url: string): Promise<Vehicle>;
  getCharacterWithVehicles(id: string): Promise<CharacterWithVehicles>;
}






