import { createReducer, on } from '@ngrx/store';
import { loadPokemons, loadPokemonsSuccess, loadPokemonsFailure, loadPokemonDetail, loadPokemonDetailSuccess, loadPokemonDetailFailure, loadEvolutionChain, loadEvolutionChainSuccess, loadEvolutionChainFailure } from '../actions/pokemon.actions';
import { EvolutionChain, Pokemon, PokemonDetail } from 'src/app/models/pokemon.model';

export interface PokemonState {
  pokemons: Pokemon[];
  pokemonDetails: { [id: number]: PokemonDetail };
  evolutionChains: { [id: number]: EvolutionChain };
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  pokemons: [],
  pokemonDetails: {},
  evolutionChains: {},
  loading: false,
  error: null
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, state => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, { pokemons }) => ({ ...state, pokemons, loading: false })),
  on(loadPokemonsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadPokemonDetail, state => ({ ...state, loading: true })),
  on(loadPokemonDetailSuccess, (state, { id, pokemonDetail }) => ({
    ...state,
    pokemonDetails: { ...state.pokemonDetails, [id]: pokemonDetail },
    loading: false
  })),
  on(loadPokemonDetailFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(loadEvolutionChain, state => ({ ...state, loading: true })),
  on(loadEvolutionChainSuccess, (state, { id, evolutionChain }) => ({
    ...state,
    evolutionChains: { ...state.evolutionChains, [id]: evolutionChain },
    loading: false
  })),
  on(loadEvolutionChainFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
