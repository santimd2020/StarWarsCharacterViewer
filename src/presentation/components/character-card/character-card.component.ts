import { Component, Input } from '@angular/core';
import { Character } from '@domain/entities/Character';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent {
  @Input() character!: Character;
}



