import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    component.message = 'Error al cargar datos';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Error al cargar datos');
  });

  it('should emit retry event when retry button is clicked', () => {
    spyOn(component.retry, 'emit');
    component.onRetry();
    expect(component.retry.emit).toHaveBeenCalled();
  });

  it('should show retry button when retry output is subscribed', () => {
    component.retry.subscribe(() => {});
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.retry-button')).toBeTruthy();
  });

  it('should have correct test id', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="error-message"]')).toBeTruthy();
  });
});



