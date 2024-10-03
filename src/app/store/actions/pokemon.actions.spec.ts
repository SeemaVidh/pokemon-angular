import * as PokemonActions from '../actions/pokemon.actions';
import { EvolutionChain, Pokemon, PokemonDetail } from 'src/app/models/pokemon.model';

fdescribe('Pokemon Actions', () => {
  it('should create a loadPokemons action', () => {
    const action = PokemonActions.loadPokemons({ page: 1 });
    expect(action.type).toBe('[Pokemon List] Load Pokemons');
    expect(action.page).toBe(1);
  });

  it('should create a loadPokemonsSuccess action', () => {
    const pokemons: Pokemon[] = [];
    const action = PokemonActions.loadPokemonsSuccess({ pokemons });
    expect(action.type).toBe('[Pokemon List] Load Pokemons Success');
    expect(action.pokemons).toBe(pokemons);
  });

  it('should create a loadPokemonsFailure action', () => {
    const error = 'Error';
    const action = PokemonActions.loadPokemonsFailure({ error });
    expect(action.type).toBe('[Pokemon List] Load Pokemons Failure');
    expect(action.error).toBe(error);
  });

  it('should create a loadPokemonDetail action', () => {
    const action = PokemonActions.loadPokemonDetail({ id: 1 });
    expect(action.type).toBe('[Pokemon Detail] Load Pokemon Detail');
    expect(action.id).toBe(1);
  });

  it('should create a loadPokemonDetailSuccess action', () => {
    const pokemonDetail: PokemonDetail = { id: 1, name: 'Bulbasaur', height: 7, weight: 69, base_experience: 64, sprites: { other: { dream_world: { front_default: '' } } } };
    const action = PokemonActions.loadPokemonDetailSuccess({ id: 1, pokemonDetail });
    expect(action.type).toBe('[Pokemon Detail] Load Pokemon Detail Success');
    expect(action.id).toBe(1);
    expect(action.pokemonDetail).toBe(pokemonDetail);
  });

  it('should create a loadPokemonDetailFailure action', () => {
    const error = 'Error';
    const action = PokemonActions.loadPokemonDetailFailure({ error });
    expect(action.type).toBe('[Pokemon Detail] Load Pokemon Detail Failure');
    expect(action.error).toBe(error);
  });

  it('should create a loadEvolutionChain action', () => {
    const action = PokemonActions.loadEvolutionChain({ id: 1 });
    expect(action.type).toBe('[Pokemon Evolution] Load Evolution Chain');
    expect(action.id).toBe(1);
  });

  it('should create a loadEvolutionChainSuccess action', () => {
    const evolutionChain: EvolutionChain = { id: 1, chain: { species: { name: 'Bulbasaur', url: '' }, evolves_to: [] } };
    const action = PokemonActions.loadEvolutionChainSuccess({ id: 1, evolutionChain });
    expect(action.type).toBe('[Pokemon Evolution] Load Evolution Chain Success');
    expect(action.id).toBe(1);
  });

  it('should create a loadEvolutionChainFailure action', () => {
    const error = 'Error';
    const action = PokemonActions.loadEvolutionChainFailure({ error });
    expect(action.type).toBe('[Pokemon Evolution] Load Evolution Chain Failure');
    expect(action.error).toBe(error);
  });
});
