import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, from } from 'rxjs';
import { CharacterWithVehicles } from '@domain/entities/Character';
import { GetCharacterWithVehiclesUseCase } from '@application/use-cases/GetCharacterWithVehiclesUseCase';
import { CharacterRepositoryImpl } from '@infrastructure/repositories/CharacterRepositoryImpl';
import { SwapiClient } from '@infrastructure/api/SwapiClient';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly useCase: GetCharacterWithVehiclesUseCase;

  constructor() {
    const repository = new CharacterRepositoryImpl(new SwapiClient());
    this.useCase = new GetCharacterWithVehiclesUseCase(repository);
  }

  getCharacterWithVehicles(characterId: string): Observable<CharacterWithVehicles> {
    return from(this.useCase.execute(characterId)).pipe(
      catchError((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : 'Error al cargar el personaje';
        return throwError(() => errorMessage);
      })
    );
  }
}



