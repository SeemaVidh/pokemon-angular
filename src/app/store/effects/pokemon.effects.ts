import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { PokemonService } from '../../services/pokemon.service';
import { loadPokemons, loadPokemonsSuccess, loadPokemonsFailure, loadPokemonDetail, loadPokemonDetailSuccess, loadPokemonDetailFailure, loadEvolutionChain, loadEvolutionChainSuccess, loadEvolutionChainFailure } from '../actions/pokemon.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class PokemonEffects {

  constructor(private actions$: Actions, private store: Store<AppState>, private pokemonService: PokemonService) { }

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      mergeMap(action =>
        this.pokemonService.getPokemons(action.page).pipe(
          map(pokemons => loadPokemonsSuccess({ pokemons })),
          catchError(error => of(loadPokemonsFailure({ error })))
        )
      )
    )
  );
  loadPokemonDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemonDetail),
      withLatestFrom(this.store.select(state => state.pokemon.pokemonDetails), this.store.select(state => state.pokemon.evolutionChains)),
      mergeMap(([action, pokemonDetails, evolutionChains]) => {
        const pokemonDetail = pokemonDetails[action.id];
        const evolutionChain = evolutionChains[action.id];

        if (pokemonDetail && evolutionChain) {
          return [
            loadPokemonDetailSuccess({ id: action.id, pokemonDetail }),
            loadEvolutionChainSuccess({ id: action.id, evolutionChain })
          ];
        } else {
          return forkJoin({
            pokemonDetail: this.pokemonService.getPokemonDetail(action.id),
            evolutionChain: this.pokemonService.getEvolutionChain(action.id)
          }).pipe(
            mergeMap(({ pokemonDetail, evolutionChain }) => [
              loadPokemonDetailSuccess({ id: action.id, pokemonDetail }),
              loadEvolutionChainSuccess({ id: action.id, evolutionChain })
            ]),
            catchError(error => of(loadPokemonDetailFailure({ error })))
          );
        }
      })
    )
  );


}
