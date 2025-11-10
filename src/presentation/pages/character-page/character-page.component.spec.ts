import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterPageComponent } from './character-page.component';
import { CharacterService } from '../../services/character.service';
import { of, throwError } from 'rxjs';
import { Character, Vehicle, CharacterWithVehicles } from '@domain/entities/Character';

describe('CharacterPageComponent', () => {
  let component: CharacterPageComponent;
  let fixture: ComponentFixture<CharacterPageComponent>;
  let characterService: jasmine.SpyObj<CharacterService>;

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

  const mockData: CharacterWithVehicles = {
    character: mockCharacter,
    vehicles: [mockVehicle],
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CharacterService', ['getCharacterWithVehicles']);

    await TestBed.configureTestingModule({
      imports: [CharacterPageComponent],
      providers: [
        { provide: CharacterService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterPageComponent);
    component = fixture.componentInstance;
    characterService = TestBed.inject(CharacterService) as jasmine.SpyObj<CharacterService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load character on init', () => {
    characterService.getCharacterWithVehicles.and.returnValue(of(mockData));
    fixture.detectChanges();

    expect(characterService.getCharacterWithVehicles).toHaveBeenCalledWith('1');
  });

  it('should display character when loaded', () => {
    characterService.getCharacterWithVehicles.and.returnValue(of(mockData));
    fixture.detectChanges();

    expect(component.data).toEqual(mockData);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should display error when service fails', () => {
    const errorMessage = 'Error al cargar el personaje';
    characterService.getCharacterWithVehicles.and.returnValue(throwError(() => errorMessage));
    fixture.detectChanges();

    expect(component.error).toBe(errorMessage);
    expect(component.loading).toBeFalse();
    expect(component.data).toBeNull();
  });

  it('should reload character when ID changes', () => {
    characterService.getCharacterWithVehicles.and.returnValue(of(mockData));
    fixture.detectChanges();

    component.characterId = '2';
    component.onIdChange();

    expect(characterService.getCharacterWithVehicles).toHaveBeenCalledWith('2');
  });

  it('should retry loading on retry', () => {
    characterService.getCharacterWithVehicles.and.returnValue(of(mockData));
    component.onRetry();

    expect(characterService.getCharacterWithVehicles).toHaveBeenCalled();
  });
});



