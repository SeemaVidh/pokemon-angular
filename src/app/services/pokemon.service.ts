import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonDetail, EvolutionChain } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(page: number): Observable<Pokemon[]> {
    const offset = (page - 1) * 12;
    return this.http.get<any>(`${this.apiUrl}?limit=12&offset=${offset}`).pipe(
      map(response => response.results.map((pokemon: any) => ({
        ...pokemon,
        id: this.extractIdFromUrl(pokemon.url),
        sprites: {
          other: {
            dream_world: {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.extractIdFromUrl(pokemon.url)}.svg`
            }
          }
        }
      })))
    );
  }

  private extractIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(`${this.apiUrl}/${id}`);
  }

  getEvolutionChain(id: number): Observable<EvolutionChain> {
    return this.http.get<any>(`${this.apiUrl}-species/${id}`).pipe(
      switchMap(species => this.http.get<EvolutionChain>(species.evolution_chain.url))
    );
  }
}
