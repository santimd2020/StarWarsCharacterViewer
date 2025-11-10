import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new CharacterService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get character with vehicles', (done) => {
    service.getCharacterWithVehicles('1').subscribe({
      next: (result) => {
        expect(result).toBeDefined();
        expect(result.character.name).toBe('Luke Skywalker');
        expect(result.vehicles.length).toBeGreaterThan(0);
        done();
      },
      error: () => {
        fail('Should not have errored');
        done();
      }
    });
  });

  it('should handle errors with Error instance', (done) => {
    // Mock the useCase to throw an Error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalExecute = (service as any).useCase.execute;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).useCase.execute = () => Promise.reject(new Error('Test error message'));

    service.getCharacterWithVehicles('1').subscribe({
      next: () => {
        fail('Should have errored');
        done();
      },
      error: (err) => {
        expect(err).toBe('Test error message');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (service as any).useCase.execute = originalExecute;
        done();
      }
    });
  });

  it('should handle errors with non-Error instance', (done) => {
    // Mock the useCase to throw a non-Error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalExecute = (service as any).useCase.execute;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (service as any).useCase.execute = () => Promise.reject('String error');

    service.getCharacterWithVehicles('1').subscribe({
      next: () => {
        fail('Should have errored');
        done();
      },
      error: (err) => {
        expect(err).toBe('Error al cargar el personaje');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (service as any).useCase.execute = originalExecute;
        done();
      }
    });
  });
});



