import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { CharacterWithVehicles, Vehicle } from '@domain/entities/Character';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { VehicleCardComponent } from '../../components/vehicle-card/vehicle-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-character-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CharacterCardComponent,
    VehicleCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {
  characterId: string = '1';
  data: CharacterWithVehicles | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacter();
  }

  onIdChange(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {
    if (!this.characterId) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.characterService.getCharacterWithVehicles(this.characterId).subscribe({
      next: (result) => {
        this.data = result;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  onRetry(): void {
    this.loadCharacter();
  }

  trackByVehicleUrl(index: number, vehicle: Vehicle): string {
    return vehicle.url || index.toString();
  }
}
