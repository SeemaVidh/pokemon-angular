import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPokemons } from '../../store/actions/pokemon.actions';
import { Pokemon } from '../../models/pokemon.model';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;
  loading$: Observable<boolean>;
  currentPage: number = 1;
  totalPages: number = 10;
  pages: number[] = [];

  constructor(private store: Store<AppState>) {
    this.pokemons$ = this.store.select(state => state.pokemon.pokemons);
    this.loading$ = this.store.select(state => state.pokemon.loading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadPokemons({ page: this.currentPage }));
    this.updatePages();
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.store.dispatch(loadPokemons({ page }));
    this.updatePages();
  }

  updatePages(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
}
