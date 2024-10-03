import { Component, Input, OnInit } from '@angular/core';
import { EvolutionChain } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  @Input() evolutionChain: EvolutionChain | null = null;
  @Input() currentPokemonId: number | null = null;

  constructor() { }

  ngOnInit(): void { }

  getEvolutionStages(chain: any): any[] {
    const stages: any[] = [];
    this.traverseChain(chain, stages);
    return stages;
  }

  traverseChain(chain: any, stages: any[]): void {
    if (chain?.species) {
      stages.push(chain.species);
      if (chain.evolves_to?.length) {
        chain.evolves_to.forEach((evolution: any) => this.traverseChain(evolution, stages));
      }
    }
  }

  getPokemonImageUrl(url: string): string {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
