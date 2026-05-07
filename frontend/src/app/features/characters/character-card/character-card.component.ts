import { Component, input } from '@angular/core';
import { Character } from '../../../core/models/character.model';

@Component({
  selector: 'app-character-card',
  standalone: true,
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  character = input.required<Character>();
}
