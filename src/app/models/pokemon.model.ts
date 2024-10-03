// src/app/models/pokemon.model.ts

// export interface Pokemon {
//     name: string;
//     url: string;
//   }
  export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  }
  
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  }
  
  export interface EvolutionChain {
    id: number;
    chain: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: EvolutionChain[];
    };
  }
  