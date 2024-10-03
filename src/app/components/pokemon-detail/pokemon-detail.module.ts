import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonEvolutionComponent } from '../pokemon-evolution/pokemon-evolution.component';

const routes: Routes = [
  { path: '', component: PokemonDetailComponent }
];

@NgModule({
  declarations: [
    PokemonDetailComponent,
    PokemonEvolutionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonDetailModule { }
