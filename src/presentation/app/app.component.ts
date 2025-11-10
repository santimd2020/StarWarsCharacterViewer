import { Component } from '@angular/core';
import { CharacterPageComponent } from '../pages/character-page/character-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CharacterPageComponent],
  template: '<app-character-page></app-character-page>'
})
export class AppComponent {
  title = 'Visor de Personajes Star Wars';
}



