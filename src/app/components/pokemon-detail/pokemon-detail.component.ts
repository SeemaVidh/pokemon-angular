import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPokemonDetail } from '../../store/actions/pokemon.actions';
import { PokemonDetail, EvolutionChain } from '../../models/pokemon.model';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail$: Observable<PokemonDetail | null>;
  evolutionChain$: Observable<EvolutionChain | null>;
  selectedTab: string = 'details';
  currentPokemonId: number;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.currentPokemonId = id;
    this.pokemonDetail$ = this.store.select(state => state.pokemon.pokemonDetails[id]);
    this.evolutionChain$ = this.store.select(state => state.pokemon.evolutionChains[id]);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPokemonDetail({ id: this.currentPokemonId }));
  }

 
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
