import { CharacterRepository } from '@domain/repositories/CharacterRepository';
import { CharacterWithVehicles } from '@domain/entities/Character';

export class GetCharacterWithVehiclesUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(characterId: string): Promise<CharacterWithVehicles> {
    return this.characterRepository.getCharacterWithVehicles(characterId);
  }
}






