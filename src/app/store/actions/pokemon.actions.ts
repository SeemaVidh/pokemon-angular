import { createAction, props } from '@ngrx/store';
import { EvolutionChain, Pokemon, PokemonDetail } from 'src/app/models/pokemon.model';

export const loadPokemons = createAction('[Pokemon List] Load Pokemons', props<{ page: number }>());
export const loadPokemonsSuccess = createAction('[Pokemon List] Load Pokemons Success', props<{ pokemons: Pokemon[] }>());
export const loadPokemonsFailure = createAction('[Pokemon List] Load Pokemons Failure', props<{ error: any }>());

export const loadPokemonDetail = createAction('[Pokemon Detail] Load Pokemon Detail', props<{ id: number }>());
export const loadPokemonDetailSuccess = createAction('[Pokemon Detail] Load Pokemon Detail Success', props<{ id: number, pokemonDetail: PokemonDetail}>());
export const loadPokemonDetailFailure = createAction('[Pokemon Detail] Load Pokemon Detail Failure', props<{ error: any }>());

export const loadEvolutionChain = createAction('[Pokemon Evolution] Load Evolution Chain', props<{ id: number }>());
export const loadEvolutionChainSuccess = createAction('[Pokemon Evolution] Load Evolution Chain Success', props<{ id: number, evolutionChain: EvolutionChain }>());
export const loadEvolutionChainFailure = createAction('[Pokemon Evolution] Load Evolution Chain Failure', props<{ error: any }>());
