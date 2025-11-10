import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleCardComponent } from './vehicle-card.component';
import { Vehicle } from '@domain/entities/Character';

describe('VehicleCardComponent', () => {
  let component: VehicleCardComponent;
  let fixture: ComponentFixture<VehicleCardComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCardComponent);
    component = fixture.componentInstance;
    component.vehicle = mockVehicle;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display vehicle name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.vehicle-name')?.textContent).toContain('Snowspeeder');
  });

  it('should display vehicle information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('t-47 airspeeder');
    expect(compiled.textContent).toContain('Incom corporation');
    expect(compiled.textContent).toContain('airspeeder');
    expect(compiled.textContent).toContain('4.5 m');
    expect(compiled.textContent).toContain('2');
  });

  it('should show "Desconocido" for unknown cost', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Desconocido');
  });

  it('should show cost with credits when cost is known', () => {
    component.vehicle = {
      ...mockVehicle,
      cost_in_credits: '50000'
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('50000 créditos');
  });

  it('should show "Desconocida" for unknown max speed', () => {
    component.vehicle = {
      ...mockVehicle,
      max_atmosphering_speed: 'unknown'
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Desconocida');
  });

  it('should show max speed with km/h when speed is known', () => {
    component.vehicle = {
      ...mockVehicle,
      max_atmosphering_speed: '1000'
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('1000 km/h');
  });

  it('should have correct test id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="vehicle-card"]')).toBeTruthy();
  });
});



