import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { Character } from '@domain/entities/Character';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = mockCharacter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.character-name')?.textContent).toContain('Luke Skywalker');
  });

  it('should display character information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('172 cm');
    expect(compiled.textContent).toContain('77 kg');
    expect(compiled.textContent).toContain('blond');
    expect(compiled.textContent).toContain('fair');
    expect(compiled.textContent).toContain('blue');
    expect(compiled.textContent).toContain('19BBY');
    expect(compiled.textContent).toContain('male');
  });

  it('should have correct test id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="character-card"]')).toBeTruthy();
  });
});



