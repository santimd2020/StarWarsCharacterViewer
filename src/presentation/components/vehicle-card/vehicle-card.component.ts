import { Component, Input } from '@angular/core';
import { Vehicle } from '@domain/entities/Character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent {
  @Input() vehicle!: Vehicle;
}



